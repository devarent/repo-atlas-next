import Dashboard from "@/components/dashboard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Devarent — Cloud & Data Control Center",
      description:
        "52 repositori, 26 teknologi data, dan seluruh toolchain cloud dalam satu dashboard.",
      inLanguage: "id",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Arya Fatthurahman",
      alternateName: "Devarent",
      url: "https://github.com/devarent",
      sameAs: [
        "https://github.com/devarent",
        "https://github.com/devarent/repo-atlas-next",
      ],
      jobTitle: "Cloud, Data & AI Engineer",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Dashboard />
    </>
  );
}
