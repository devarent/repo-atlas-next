#!/bin/bash
# =============================================================================
# Repo Atlas — satu skrip dari WSL 2 Ubuntu ke IP publik EC2
# Jalankan di terminal Ubuntu WSL 2 (bukan PowerShell).
# =============================================================================
set -e

REGION="us-east-1"
KEY_PATH="$HOME/.ssh/id_rsa"
PUB_PATH="$HOME/.ssh/id_rsa.pub"
TF_DIR="$HOME/repo-atlas-terraform"

echo "============================================================"
echo " [1/6] Cek kredensial AWS"
echo "============================================================"
if ! aws sts get-caller-identity >/dev/null 2>&1; then
  echo "Kredensial tidak valid. Jalankan: rm -rf ~/.aws && aws login"
  echo "Atau isi Access Key IAM asli: aws configure"
  exit 1
fi
aws sts get-caller-identity

echo "============================================================"
echo " [2/6] Siapkan SSH key RSA 4096"
echo "============================================================"
mkdir -p ~/.ssh
if [ ! -f "$PUB_PATH" ]; then ssh-keygen -t rsa -b 4096 -f "$KEY_PATH" -N ""; fi

echo "============================================================"
echo " [3/6] Terraform: EC2 Ubuntu + Elastic IP"
echo "============================================================"
mkdir -p "$TF_DIR"
cp -r "$(dirname "$0")/../terraform/." "$TF_DIR/"
cd "$TF_DIR"

terraform init
read -rp "IP rumah untuk SSH (contoh 122.161.49.187/32, Enter untuk 0.0.0.0/0): " MY_IP
MY_IP=${MY_IP:-0.0.0.0/0}
terraform apply -auto-approve \
  -var="region=$REGION" \
  -var="public_key_path=$PUB_PATH" \
  -var="my_ip=$MY_IP"

PUBLIC_IP=$(terraform output -raw public_ip)
echo ">>> IP PUBLIK: $PUBLIC_IP"

echo "============================================================"
echo " [4/6] Tunggu EC2 siap + install Docker"
echo "============================================================"
for i in $(seq 1 30); do
  if nc -z -w2 "$PUBLIC_IP" 22 2>/dev/null; then break; fi
  echo "Menunggu SSH... ($i/30)"; sleep 5
done

ssh -o StrictHostKeyChecking=no -i "$KEY_PATH" ubuntu@"$PUBLIC_IP" <<'ENDSSH'
  sudo apt-get update -y
  sudo apt-get install -y docker.io
  sudo systemctl enable --now docker
  sudo usermod -aG docker ubuntu
  echo "Docker siap di EC2"
ENDSSH

echo "============================================================"
echo " [5/6] Build & jalankan Repo Atlas di EC2"
echo "============================================================"
# Salin source proyek (tanpa node_modules/.next)
rsync -az --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  -e "ssh -i $KEY_PATH" "$(dirname "$0")/../" ubuntu@"$PUBLIC_IP":~/repo-atlas-next/

ssh -o StrictHostKeyChecking=no -i "$KEY_PATH" ubuntu@"$PUBLIC_IP" <<'ENDSSH'
  cd ~/repo-atlas-next
  sudo docker build -t repo-atlas-next:latest .
  sudo docker rm -f repo-atlas || true
  sudo docker run -d --name repo-atlas --restart unless-stopped -p 80:3000 repo-atlas-next:latest
  sleep 8
  curl -fsS http://localhost/ >/dev/null && echo "HEALTH OK"
ENDSSH

echo "============================================================"
echo " [6/6] SELESAI"
echo "============================================================"
echo " Lokal   : http://localhost:3100"
echo " Publik  : http://$PUBLIC_IP"
echo " SSH     : ssh -i $KEY_PATH ubuntu@$PUBLIC_IP"
echo " Hapus   : cd $TF_DIR && terraform destroy"
