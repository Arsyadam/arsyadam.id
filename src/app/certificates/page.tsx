import { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageSection from "../components/PageSection";
import CertificateCard from "./components/CertificateCard";
import { getAllCertificates } from "../lib/certificates-data";
import { PERSON, SITE_URL } from "../lib/profile-data";
import { buildCertificatesCollectionJsonLd } from "../lib/structured-data";

export const metadata: Metadata = {
  title: "Certificates & Awards",
  description: `Competition awards, certificates, and recognitions earned by ${PERSON.name}, including FIKSI gold medal, LKS AI, IoT, data science, and international competitions.`,
  openGraph: {
    title: `Certificates & Awards — ${PERSON.name}`,
    description:
      "Index of competition awards and certificates in AI, IoT, innovation, data science, and STEM.",
    type: "website",
    url: `${SITE_URL}/certificates`,
  },
  alternates: {
    canonical: `${SITE_URL}/certificates`,
  },
};

export default function CertificatesPage() {
  const certificates = getAllCertificates();
  const jsonLd = buildCertificatesCollectionJsonLd(certificates);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageSection
        badge="Credentials"
        title="Certificates & Awards"
        badgeClassName="text-amber-600"
        description="A public index of competition awards and certificates in AI, IoT, innovation, data science, and STEM — each with a dedicated page for search engines and LLM crawlers."
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.slug} certificate={certificate} />
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
