export type StackItem = {
  name: string;
  glyph: string;
  color: string;
  role: string;
  detail: string;
  repo: string;
};

export const stack: StackItem[] = [
  { name: "WSL 2 Ubuntu", glyph: "🐧", color: "#f79420", role: "Laptop → cloud", detail: "Terminal kerja: Docker Engine, Terraform, AWS CLI, kubectl, Helm, kind. Perintah wsl di PowerShell, bukan di dalam Ubuntu.", repo: "scripts" },
  { name: "Amazon EC2", glyph: "🖥️", color: "#ff9900", role: "Compute", detail: "Ubuntu 24.04 atau Amazon Linux 2023 (dnf, user ec2-user). SSH 22, HTTP 80, HTTPS 443. Elastic IP = IP publik statis.", repo: "amazon-linux-ami-kernel" },
  { name: "Terraform", glyph: "🏗️", color: "#844fba", role: "Infrastructure as Code", detail: "Provider hashicorp/aws ~> 6.x. VPC, SG, key pair, EC2, EIP, ECR, RDS, remote state S3 + lock DynamoDB.", repo: "devops-platform-2026" },
  { name: "Docker", glyph: "🐳", color: "#2496ed", role: "Container", detail: "Multi-stage build, non-root user, healthcheck, Compose, GHCR/ECR, image prune otomatis.", repo: "nextjs-aws-production" },
  { name: "Kubernetes + Helm", glyph: "☸️", color: "#326ce5", role: "Orchestration", detail: "kind untuk lokal, EKS untuk produksi, Helm chart, Ingress, HPA/PDB, NetworkPolicy.", repo: "k8s" },
  { name: "GitHub Actions", glyph: "⚙️", color: "#6e7681", role: "CI/CD", detail: "push → build image → push registry → SSH/SSM ke EC2 → pull → healthcheck → rollback.", repo: "qa-automation-2026" },
  { name: "Databricks", glyph: "🧱", color: "#ff3621", role: "Lakehouse & AI", detail: "Spark, Delta Lake, Databricks SQL, Unity Catalog, Terraform SRA, Zerobus Ingest SDK.", repo: "terraform-databricks-sra-modernized" },
  { name: "Keras / TensorFlow", glyph: "🧠", color: "#e45c47", role: "Deep learning", detail: "CNN computer vision, quantum-hybrid diffusion, pipeline ML dari preprocessing sampai deployment.", repo: "cnn" },
  { name: "Route 53 + AC + CloudFront", glyph: "🌐", color: "#8c4fff", role: "DNS, TLS, CDN", detail: "Domain → ALB/EC2, sertifikat HTTPS gratis, caching global untuk aset statis.", repo: "aws-ec2-web-hosting-part-1" },
  { name: "Prometheus + Grafana", glyph: "📈", color: "#e6522c", role: "Observability", detail: "Metrik container, dashboard, alert, SLO/error budget, runbook insiden.", repo: "devops-platform-2026" },
];

export type Runbook = {
  id: string;
  title: string;
  env: string;
  summary: string;
  code: string;
};

export const runbooks: Runbook[] = [
  {
    id: "aws-login",
    title: "1 · Kredensial AWS yang valid",
    env: "WSL 2 Ubuntu",
    summary: "Hapus kunci dummy AKIA…EXAMPLE, lalu pakai aws login (sesi browser) atau Access Key IAM asli. Tanpa ini, terraform plan pasti AuthFailure.",
    code: `# Bersihkan kredensial contoh yang tidak valid
rm -rf ~/.aws

# Opsi A — login browser (kredensial sementara)
aws login
aws sts get-caller-identity

# Opsi B — Access Key IAM asli
aws configure
# Access Key ID     : AKIA...
# Secret Access Key : ...
# Default region    : us-east-1
# Output format     : json`,
  },
  {
    id: "ec2-eip",
    title: "2 · Terraform EC2 + Elastic IP",
    env: "WSL 2 Ubuntu",
    summary: "Buat security group, key pair RSA 4096, EC2 Ubuntu, lalu EIP. IP publik dibaca lewat terraform output public_ip — bukan localhost.",
    code: `mkdir -p ~/ec2-public-ip && cd ~/ec2-public-ip

AMI_ID=$(aws ec2 describe-images \\
  --region us-east-1 --owners 099720109477 \\
  --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" \\
  --query "sort_by(Images, &CreationDate)[-1].ImageId" --output text)

ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
cat > main.tf <<'EOF'
provider "aws" { region = "us-east-1" }

resource "aws_security_group" "web" {
  name = "atlas-web-sg"
  ingress { from_port=22  to_port=22  protocol="tcp" cidr_blocks=["0.0.0.0/0"] }
  ingress { from_port=80  to_port=80  protocol="tcp" cidr_blocks=["0.0.0.0/0"] }
  ingress { from_port=443 to_port=443 protocol="tcp" cidr_blocks=["0.0.0.0/0"] }
  egress  { from_port=0   to_port=0   protocol="-1"  cidr_blocks=["0.0.0.0/0"] }
}
resource "aws_key_pair" "deployer" {
  key_name = "atlas-key"
  public_key = file("~/.ssh/id_rsa.pub")
}
resource "aws_instance" "web" {
  ami = var.ami
  instance_type = "t3.micro"
  key_name = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.web.id]
}
variable "ami" { type = string }
resource "aws_eip" "web" { instance = aws_instance.web.id domain = "vpc" }
output "public_ip" { value = aws_eip.web.public_ip }
EOF

terraform init
terraform apply -auto-approve -var="ami=$AMI_ID"
terraform output -raw public_ip   # ← IP publik asli`,
  },
  {
    id: "ec2-docker",
    title: "3 · Docker di EC2 + container publik",
    env: "Ubuntu EC2 / Amazon Linux 2023",
    summary: "Install Docker, build image, jalankan di port 80. Untuk AL2023 pakai dnf dan user ec2-user; untuk Ubuntu pakai apt dan user ubuntu.",
    code: `# --- Ubuntu ---
sudo apt update -y && sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu && newgrp docker

# --- Amazon Linux 2023 ---
sudo dnf update -y && sudo dnf install -y docker
sudo systemctl enable --now docker
sudo usermod -aG docker ec2-user && newgrp docker

# Build & run (di folder yang ADA Dockerfile)
docker build -t atlas-web:v1 .
docker rm -f atlas-web || true
docker run -d --name atlas-web --restart unless-stopped -p 80:3000 atlas-web:v1
curl -fsS http://localhost/health || curl -I http://localhost

# Buka dari laptop: http://<PUBLIC_IP>`,
  },
  {
    id: "cicd",
    title: "4 · GitHub Actions → EC2",
    env: "GitHub Repository",
    summary: "Simpan EC2_HOST, EC2_USER, EC2_SSH_KEY, DOCKERHUB_USERNAME, DOCKERHUB_TOKEN sebagai Secrets. Setiap push main akan build, push, pull, deploy, healthcheck.",
    code: `name: Build and Deploy to EC2
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ secrets.DOCKERHUB_USERNAME }}/atlas-web:latest
      - uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.EC2_HOST }}
          username: \${{ secrets.EC2_USER }}
          key: \${{ secrets.EC2_SSH_KEY }}
          script: |
            set -e
            sudo docker pull \${{ secrets.DOCKERHUB_USERNAME }}/atlas-web:latest
            sudo docker rm -f atlas-web || true
            sudo docker run -d --name atlas-web --restart unless-stopped \\
              -p 80:3000 \${{ secrets.DOCKERHUB_USERNAME }}/atlas-web:latest
            sleep 5
            curl -fsS http://localhost/health || curl -I http://localhost`,
  },
  {
    id: "k8s",
    title: "5 · Kubernetes lokal + Helm",
    env: "WSL 2 Ubuntu",
    summary: "kind + Helm untuk simulasi cluster sebelum EKS. Bersihkan control-plane lama bila nama cluster bentrok.",
    code: `kind delete cluster --name atlas || true
kind create cluster --name atlas
kubectl cluster-info

curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh && ./get_helm.sh

helm repo add bitnami https://charts.bitnami.com/bitnami
helm upgrade --install web bitnami/nginx \\
  --set service.type=NodePort --namespace web --create-namespace
kubectl get pods,svc -n web`,
  },
  {
    id: "ops",
    title: "6 · Operasional harian",
    env: "EC2",
    summary: "Cek status, log, rollback, cleanup image, dan disk.",
    code: `docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"
docker logs --tail=50 atlas-web
docker compose pull && docker compose up -d --remove-orphans
docker stop atlas-web && docker rm atlas-web   # rollback ke image lama
docker image prune -af --filter "until=24h"
docker system df
curl -fsS http://localhost/health || echo "HEALTH CHECK FAILED"`,
  },
];

export type Reference = { title: string; url: string; group: string; note: string };

export const references: Reference[] = [
  { title: "shadcn/ui — dokumentasi", url: "https://ui.shadcn.com", group: "UI", note: "Komponen Radix + Tailwind yang jadi dasar tampilan ini." },
  { title: "shadcn/ui — GitHub", url: "https://github.com/shadcn-ui/ui", group: "UI", note: "Sumber komponen, blok, dan pola komposisi." },
  { title: "Next.js — CSS & Tailwind", url: "https://nextjs.org/docs/app/getting-started/css", group: "UI", note: "Panduan resmi Tailwind v4 di App Router." },
  { title: "Tailwind CSS v4", url: "https://tailwindcss.com/docs", group: "UI", note: "Utility-first CSS engine terbaru." },
  { title: "Radix UI Primitives", url: "https://www.radix-ui.com/primitives/docs/overview/introduction", group: "UI", note: "Fondasi aksesibel untuk dialog, tabs, tooltip." },
  { title: "AWS EC2 Backend Deployment Guide", url: "https://github.com/shipshitdev/skills/blob/main/skills/ec2-backend-deployer/references/full-guide.md", group: "Cloud", note: "Panduan lengkap Docker + GHCR + GitHub Actions + Tailscale." },
  { title: "Deploy Next.js ke EC2 (Docker + NGINX + GH Actions)", url: "https://dev.to/kilamaelie/deploy-a-nextjs-app-on-aws-ec2-with-docker-nginx-and-automate-with-github-actions-5g4m", group: "Cloud", note: "Contoh workflow dua job: build image lalu deploy SSH." },
  { title: "Next.js + CodePipeline + CodeBuild + CodeDeploy", url: "https://awstip.com/next-js-deployment-on-aws-ec2-with-ci-cd-using-docker-and-codepipeline-e8a4bb502227", group: "Cloud", note: "Alternatif CI/CD native AWS." },
  { title: "AWS Provider Terraform (hashicorp/aws)", url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs", group: "IaC", note: "Semua resource AWS: EC2, EIP, VPC, ECR, RDS, S3, IAM." },
  { title: "Terraform AWS VPC Module", url: "https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest", group: "IaC", note: "VPC multi-AZ siap pakai." },
  { title: "Helm Dokumentasi", url: "https://helm.sh/docs/", group: "Kubernetes", note: "Chart, values, release, repository." },
  { title: "kind — Kubernetes in Docker", url: "https://kind.sigs.k8s.io/docs/user/quick-start/", group: "Kubernetes", note: "Cluster lokal di WSL 2 tanpa EKS." },
  { title: "K3s + Helm Controller", url: "https://docs.k3s.io/helm", group: "Kubernetes", note: "HelmChart CRD untuk gitops ringan." },
  { title: "Databricks SQL", url: "https://docs.databricks.com/sql/index.html", group: "Data", note: "Lakehouse SQL, warehouse, query editor." },
  { title: "Databricks Terraform Provider", url: "https://registry.terraform.io/providers/databricks/databricks/latest/docs", group: "Data", note: "Workspace, cluster, job, Unity Catalog sebagai kode." },
  { title: "Zero to Production CI/CD (AWS native)", url: "https://codingbbq.github.io/docs/Cloud/AWS-Cloud-Native-Architecture-Handbook/#28-aws-cicd-codepipeline--codebuild", group: "Cloud", note: "Arsitektur AWS native lengkap." },
  { title: "Roadmap DevOps Engineer", url: "https://openlume.com/roadmaps/devops-engineer", group: "Belajar", note: "Linux → Git → Docker → K8s → Terraform → Helm → Argo CD." },
  { title: "Roadmap Full-Stack Developer", url: "https://openlume.com/roadmaps/fullstack-developer", group: "Belajar", note: "Next.js, database, testing, deployment." },
  { title: "Dari Beginner ke Cloud Engineer (AWS Builder)", url: "https://builder.aws.com/content/3J2ZEDQGErttAi3moLT9ica87Bb/from-beginner-to-cloud-engineer-a-practical-aws-and-devops-learning-roadmap", group: "Belajar", note: "Urutan belajar Linux → AWS → Docker → Terraform." },
];

export const roadmap = [
  { phase: "01", name: "Linux Foundations", topics: "Bash, permission, user, proses, systemd, jaringan, SSH", badge: "WSL 2 Ubuntu" },
  { phase: "02", name: "Git & GitHub", topics: "clone, commit, branch, PR, merge conflict, Actions", badge: "62 repo" },
  { phase: "03", name: "Cloud Fundamentals", topics: "IaaS/PaaS/SaaS, region/AZ, VPC, IAM, high availability", badge: "AWS" },
  { phase: "04", name: "Docker", topics: "Dockerfile multi-stage, image, volume, network, Compose", badge: "Container" },
  { phase: "05", name: "Kubernetes", topics: "Pod, Deployment, Service, ConfigMap, Secret, Ingress, Helm", badge: "kind / EKS" },
  { phase: "06", name: "Terraform", topics: "provider, resource, module, state, plan/apply/destroy", badge: "IaC" },
  { phase: "07", name: "CI/CD", topics: "GitHub Actions, CodePipeline, ECR/GHCR, healthcheck, rollback", badge: "Otomasi" },
  { phase: "08", name: "Data & AI", topics: "26 database, Databricks, Spark, Keras, Qdrant, Kafka", badge: "Lakehouse" },
  { phase: "09", name: "Observability", topics: "Prometheus, Grafana, SLO, tracing, incident response", badge: "SRE" },
];

export const roles = [
  { title: "DevOps / Cloud Engineer", fit: "Terraform · AWS EC2/EIP · Docker · EKS/Helm · GitHub Actions · Prometheus/Grafana · Trivy · IAM", repo: "devops-platform-2026" },
  { title: "Backend Engineer", fit: "Java 21 Quarkus · C#/.NET · REST/OpenAPI · PostgreSQL/Redis · Kafka · Docker/Kubernetes", repo: "backend-service-2026" },
  { title: "QA Banking", fit: "Playwright E2E · API test · SQL data integrity · k6 load · CI reporting · STLC/SDLC", repo: "qa-automation-2026" },
  { title: "AI / Data Engineer", fit: "Python · CNN/Keras · Databricks/Snowflake · Spark · Qdrant · quantum-hybrid ML", repo: "quantum-hybrid-diffusion-models" },
];
