import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: "Devarent — Cloud & Data Control Center",
  description:
    "52 repositori @devarent, 26 teknologi data, Terraform, AWS EC2, Docker, Kubernetes, CI/CD, dan roadmap DevOps dalam satu dashboard.",
  applicationName: "Devarent Control Center",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Devarent",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "Devarent",
    "cloud data control center",
    "DevOps portfolio",
    "Next.js dashboard",
    "Tailwind CSS",
    "shadcn ui",
    "Radix UI",
    "Terraform",
    "AWS EC2",
    "Docker",
    "Kubernetes",
    "Databricks",
    "data engineering",
  ],
  authors: [{ name: "Arya Fatthurahman", url: "https://github.com/devarent" }],
  creator: "Arya Fatthurahman",
  publisher: "Devarent",
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('atlas-theme');if(t==='light'){document.documentElement.classList.remove('dark')}}catch(e){}`}
        </Script>
        <div className="atmosphere" aria-hidden />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
