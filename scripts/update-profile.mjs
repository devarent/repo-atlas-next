import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const token = execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
const repo = "devarent/devarent";
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "repo-atlas-profile-updater",
  "X-GitHub-Api-Version": "2022-11-28",
};

const get = await fetch(`https://api.github.com/repos/${repo}/contents/README.md`, { headers });
if (!get.ok) throw new Error(`Gagal membaca README: ${get.status} ${await get.text()}`);
const file = await get.json();
let content = Buffer.from(file.content, "base64").toString("utf8");

const marker = "Devarent — Cloud & Data Control Center";
if (content.includes(marker)) {
  console.log("README profil sudah memuat blok Devarent. Tidak ada perubahan.");
  process.exit(0);
}

const snippet = fs.readFileSync(path.join(root, "PROFILE-SNIPPET.md"), "utf8").trim();
content = `${content.trimEnd()}\n\n---\n\n${snippet}\n`;

const put = await fetch(`https://api.github.com/repos/${repo}/contents/README.md`, {
  method: "PUT",
  headers,
  body: JSON.stringify({
    message: "docs: tambahkan Devarent Cloud & Data Control Center",
    content: Buffer.from(content, "utf8").toString("base64"),
    sha: file.sha,
  }),
});
if (!put.ok) throw new Error(`Gagal menulis README: ${put.status} ${await put.text()}`);
const result = await put.json();
console.log(`README profil diperbarui: ${result.commit.html_url}`);
