<!-- Salin blok ini ke bagian atas/bawah README repo profil devarent/devarent. -->
<div align="center">

<img src="https://img.shields.io/badge/REPO%20ATLAS-52-8b5cf6?style=for-the-badge" alt="52 repos" />
<img src="https://img.shields.io/badge/DATA%20STACK-26-22d3ee?style=for-the-badge" alt="26 data technologies" />
<img src="https://img.shields.io/badge/CLOUD-AWS%20%2B%20K8s-ff9900?style=for-the-badge" alt="AWS and Kubernetes" />
<img src="https://img.shields.io/badge/IaC-Terraform-844fba?style=for-the-badge" alt="Terraform" />

<br><br>

## 🗺️ Repo Atlas — Cloud & Data Control Center

Seluruh repository dipetakan ke **9 konstelasi bertema negara**, lalu disambungkan ke **26 teknologi data** dan toolchain cloud: Terraform, AWS EC2 + Elastic IP, Docker, Kubernetes/Helm, GitHub Actions, Databricks, dan Keras.

</div>

| Konstelasi | Fokus | Contoh |
| --- | --- | --- |
| 🇮🇸 Aurora | Frontier AI & Quantum | Aurora Diffusion, Obsidian Guard |
| 🇳🇿 Kiwi | Web & Product | Kauri HRIS, Pohutukawa Web |
| 🇨🇭 Alpine | Cloud & DevOps | Summit Platform, Matterhorn Host |
| 🇸🇮 Dragon | Backend & Data Bridge | Dragon Order, Triglav Bridge |
| 🇮🇪 Clover | Quality & Testing | Clover Unit, Shamrock Flow |
| 🇦🇹 Danube | Data & Learning | Waltz Pipeline, Edelweiss SQL |
| 🇵🇹 Azulejo | Reference Mirrors | Lisbon SRA, Estoril Zerobus |
| 🇸🇬 Merlion | Platform & Ops | Lion Profile, Hawker Scripts |
| 🇫🇮 Sisu | Systems & Practicum | Birch Assembly, Reindeer IoT |

### 26 teknologi data

- **Relational & distributed SQL:** Firebird, IBM Db2, MariaDB, SQL Server, CockroachDB, InterSystems IRIS, JDBC
- **Cloud & analytics:** Databricks SQL, Snowflake, Redshift, BigQuery, Teradata, Vertica, Databend, Apache Kylin
- **NoSQL & search:** Redis, MongoDB, Cassandra, Elasticsearch
- **Vector & graph:** Qdrant, ChromaDB, Neo4j
- **Streaming & time-series:** Kafka, VictoriaMetrics, InfluxDB, TDengine

### Pipeline andal

`WSL 2 Ubuntu` → `aws login / IAM` → `Terraform (EC2 + EIP)` → `Docker build` → `GHCR/ECR` → `GitHub Actions` → `SSH/SSM ke EC2` → `healthcheck + rollback` → `Prometheus/Grafana`.

> Semua kredensial disimpan di GitHub Secrets / AWS IAM. Tidak ada Access Key yang di-commit. IP publik dibaca dari `terraform output -raw public_ip`, bukan `localhost`.

Dashboard interaktif (Next.js + Tailwind + shadcn/Radix) ada di workspace lokal: `repo-atlas-next`. Jalankan dengan `npm run dev` lalu buka `http://localhost:3100`.

---

Dibangun dan didokumentasikan di terbuka oleh **Arya Fatthurahman** · [github.com/devarent](https://github.com/devarent)
