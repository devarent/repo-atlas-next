import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const assets = path.join(root, "assets");
fs.mkdirSync(assets, { recursive: true });

const jobs = [
  { svg: "brand-logo-v2.svg", out: "avatar-1024.png", size: 1024 },
  { svg: "brand-logo-v2.svg", out: "avatar-512.png", size: 512 },
  { svg: "brand-logo-v2.svg", out: "brand-logo.png", size: 512 },
  { svg: "brand-banner-v2.svg", out: "social-preview.png", width: 1280, height: 640 },
  { svg: "brand-banner-v2.svg", out: "brand-banner.png", width: 1280, height: 640 },
];

for (const j of jobs) {
  const input = fs.readFileSync(path.join(assets, j.svg));
  let img = sharp(input);
  if (j.size) img = img.resize(j.size, j.size);
  else img = img.resize(j.width, j.height);
  await img.png({ compressionLevel: 9, palette: false }).toFile(path.join(assets, j.out));
  console.log(`${j.out} <- ${j.svg}`);
}
