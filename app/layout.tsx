import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devarent — Cloud & Data Control Center",
  description:
    "52 repositori @devarent, 26 teknologi data, Terraform, AWS EC2, Docker, Kubernetes, CI/CD, dan roadmap DevOps dalam satu dashboard.",
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
