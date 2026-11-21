from pathlib import Path

replacements = {
    r"C:\laragon\www\repo-atlas-next\components\dashboard.tsx": [
        ("Repo Atlas</div>", "Devarent</div>"),
        ("<span>Repo Atlas · 52 repo @devarent", "<span>Devarent · 52 repo @devarent"),
        ('alt="Logo AF"', 'alt="Logo Devarent"'),
    ],
    r"C:\laragon\www\repo-atlas-next\app\layout.tsx": [
        ("Repo Atlas — Cloud & Data Control Center", "Devarent — Cloud & Data Control Center"),
    ],
    r"C:\laragon\www\repo-atlas-next\PROFILE-SNIPPET.md": [
        ("## 🗺️ Repo Atlas — Cloud & Data Control Center", "## 🚀 Devarent — Cloud & Data Control Center"),
    ],
    r"C:\laragon\www\repo-atlas-next\README.md": [
        ("# Repo Atlas — Cloud & Data Control Center", "# Devarent — Cloud & Data Control Center"),
    ],
    r"C:\laragon\www\repo-atlas-next\scripts\update-profile.mjs": [
        ("Repo Atlas — Cloud & Data Control Center", "Devarent — Cloud & Data Control Center"),
        ("blok Repo Atlas", "blok Devarent"),
        ("tambahkan Repo Atlas Cloud", "tambahkan Devarent Cloud"),
    ],
    r"C:\laragon\www\aryafatthurahman4-collab\README.md": [
        ("[![Repo Atlas](https://img.shields.io/badge/Repo%20Atlas-52%20repos", "[![Devarent](https://img.shields.io/badge/Devarent-52%20repos"),
        ("## 🗺️ Repo Atlas — Cloud & Data Control Center", "## 🚀 Devarent — Cloud & Data Control Center"),
    ],
    r"C:\laragon\www\aryafatthurahman4-collab\ATLAS.md": [
        ("Dibuat oleh Repo Atlas", "Dibuat oleh Devarent"),
    ],
}

for path, pairs in replacements.items():
    p = Path(path)
    s = p.read_text(encoding="utf-8")
    for old, new in pairs:
        if old not in s:
            print("MISSING in", p.name, "->", old[:60])
            continue
        s = s.replace(old, new)
    p.write_text(s, encoding="utf-8")
    print("updated", p)
