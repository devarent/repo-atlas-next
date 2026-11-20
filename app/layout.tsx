import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Atlas — Cloud & Data Control Center",
  description:
    "52 repositori @devarent, 26 teknologi data, Terraform, AWS EC2, Docker, Kubernetes, CI/CD, dan roadmap DevOps dalam satu dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-grid antialiased">{children}</body>
    </html>
  );
}
