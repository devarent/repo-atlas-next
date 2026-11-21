from pathlib import Path

readme = Path(r"C:\laragon\www\aryafatthurahman4-collab\README.md")
s = readme.read_text(encoding="utf-8")

# 1. Perbaiki karakter rusak hasil encode lama
s = s.replace("ΓÇö", "\u2014").replace("┬╖", "\u00b7").replace("ΓÇô", "\u2014")

# 2. Hero baru: logo animasi + identitas + quick links
old_hero = """<!-- identity-block -->
<div align="center">

<img src="assets/brand-logo.svg" alt="AF monogram" width="72" />

# devarent

<sub>Engineering portfolio - hands-on labs in DevOps, Backend, QA, and AI, built and documented in the open.</sub>

</div>
"""
new_hero = """<!-- identity-block -->
<div align="center">

<img src="assets/logo-pulse.gif" alt="AF monogram" width="92" />

<h1>devarent</h1>

<b>AI Engineering \u00b7 Software, Data &amp; Cloud</b>

<br>

<sub>Engineering portfolio \u2014 hands-on labs in DevOps, Backend, QA, and AI, built and documented in the open.</sub>

<br>

<sub>\U0001f4cd Jakarta, Indonesia \u00b7 they/them \u00b7 [@devarent](https://github.com/devarent)</sub>

</div>

<div align="center">

[![Repo Atlas](https://img.shields.io/badge/Repo%20Atlas-52%20repos-8b5cf6?style=for-the-badge&logo=github)](https://github.com/devarent/repo-atlas-next)
[![Database Labs](https://img.shields.io/badge/Database%20Labs-26%20engines-22d3ee?style=for-the-badge&logo=postgresql)](https://github.com/devarent/database-labs)
[![Role Fit](https://img.shields.io/badge/Role%20Fit-4%20roles-0ea5e9?style=for-the-badge)](ROLE-FIT.md)
[![Email](https://img.shields.io/badge/Email-Contact-14b8a6?style=for-the-badge&logo=gmail)](mailto:aryafatthurahman4@gmail.com)

<br><br>

</div>
"""
assert old_hero in s, "hero block not found"
s = s.replace(old_hero, new_hero, 1)

# 3. Hapus duplikat Tech Stack yang pertama (yang bukan <details>)
start = s.index("## Tech Stack")
end = s.index("## Selected Work")
s = s[:start] + s[end:]

# 4. Lipat Tech Stack wall yang tersisa
old_wall = """## Tech Stack

<div align="center">

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />

</div>

<details>
<summary><b>Full Tech Stack Wall</b></summary>
<br>
"""
new_wall = """<details>
<summary>\U0001f6e0\ufe0f <b>Full Tech Stack Wall</b> \u2014 languages, frontend, databases, streaming, DevOps &amp; tooling (klik untuk buka)</summary>
<br>
"""
assert old_wall in s, "tech stack wall block not found"
s = s.replace(old_wall, new_wall, 1)

# 5. Lipat DBX Connections
old_dbx_open = """<!-- dbx-connections -->
## DBX Connections

<div align="center">
"""
new_dbx_open = """<!-- dbx-connections -->
<details>
<summary>\U0001f50c <b>DBX Connections</b> \u2014 23 decorative reference badges (klik untuk buka)</summary>
<br>

<div align="center">
"""
assert old_dbx_open in s, "dbx open not found"
s = s.replace(old_dbx_open, new_dbx_open, 1)

old_dbx_close = """</div>

<sub>Connection names shown in the DBX sidebar - decorative reference badges.</sub>

---
"""
new_dbx_close = """</div>

<sub>Connection names shown in the DBX sidebar \u2014 decorative reference badges.</sub>

</details>

---
"""
assert old_dbx_close in s, "dbx close not found"
s = s.replace(old_dbx_close, new_dbx_close, 1)

# 6. Emoji pada heading utama
heads = {
    "## At a glance": "## \U0001f9ed At a glance",
    "## Overview": "## \U0001f44b Overview",
    "## Hi, I'm Arya": "## \U0001f44b Hi, I'm Arya",
    "## 2026 Flagship Labs": "## \U0001f680 2026 Flagship Labs",
    "## Database Labs (2026)": "## \U0001f5c3\ufe0f Database Labs (2026)",
    "## Skill Matrix": "## \U0001f9e0 Skill Matrix",
    "## Stack Coverage": "## \U0001f9e9 Stack Coverage",
    "## Selected Work": "## \U0001f52c Selected Work",
    "## Engineering References": "## \U0001f4da Engineering References",
    "## Now": "## \u26a1 Now",
    "## GitHub Activity": "## \U0001f4ca GitHub Activity",
    "## Explore": "## \U0001f50e Explore",
}
for a, b in heads.items():
    s = s.replace(a, b, 1)

# 7. Perkuat blok Repo Atlas dengan tautan
old_atlas = """<img src="https://img.shields.io/badge/IaC-Terraform-844fba?style=for-the-badge" alt="Terraform" />

<br><br>

## \U0001f5fa\ufe0f Repo Atlas"""
new_atlas = """<img src="https://img.shields.io/badge/IaC-Terraform-844fba?style=for-the-badge" alt="Terraform" />

<br><br>

[![Source](https://img.shields.io/badge/Source-repo--atlas--next-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/devarent/repo-atlas-next)
[![Live dashboard](https://img.shields.io/badge/Dashboard-localhost%3A3100-22d3ee?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://github.com/devarent/repo-atlas-next#jalankan)

<br><br>

## \U0001f5fa\ufe0f Repo Atlas"""
if old_atlas in s:
    s = s.replace(old_atlas, new_atlas, 1)
else:
    # heading mungkin belum punya emoji karena replace di atas
    s = s.replace(
        "<img src=\"https://img.shields.io/badge/IaC-Terraform-844fba?style=for-the-badge\" alt=\"Terraform\" />\n\n<br><br>\n\n## \U0001f5fa\ufe0f Repo Atlas",
        new_atlas,
        1,
    )

readme.write_text(s, encoding="utf-8")
print("README diperbarui:", len(s), "karakter")
