import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: "Devarent — Cloud & Data Control Center",
  description:
    "52 repositori @devarent, 26 teknologi data, Terraform, AWS EC2, Docker, Kubernetes, CI/CD, dan roadmap DevOps dalam satu dashboard.",
  applicationName: "Devarent Control Center",
  openGraph: {
    title: "Devarent — Cloud & Data Control Center",
    description:
      "52 repositori, 26 teknologi data, dan seluruh toolchain cloud dalam satu dashboard Astral Grain.",
    type: "website",
    images: [{ url: "/og.png", width: 1280, height: 640, alt: "Devarent — Cloud, Data & AI Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devarent — Cloud & Data Control Center",
    description: "52 repositori, 26 teknologi data, Terraform, AWS, Kubernetes, dan CI/CD.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05060c",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased">
        <div className="atmosphere" aria-hidden />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
