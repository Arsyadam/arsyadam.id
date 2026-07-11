import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageShell from "../../components/PageShell";
import PageSection from "../../components/PageSection";
import CertificatePreview from "../../components/home/CertificatePreview";
import {
  getAllCertificates,
  getCertificateBySlug,
  getCertificateSlugs,
} from "../../lib/certificates-data";
import { PERSON, SITE_URL } from "../../lib/profile-data";
import { buildCertificateJsonLd } from "../../lib/structured-data";

export async function generateStaticParams() {
  return getCertificateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const certificate = getCertificateBySlug(slug);

  if (!certificate) {
    return {
      title: "Certificate Not Found",
      description: "The requested certificate could not be found.",
    };
  }

  const title = `${certificate.result} — ${certificate.title}`;
  const description = `${certificate.description} Issued by ${certificate.organization}.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${PERSON.name}`,
      description,
      type: "article",
      url: `${SITE_URL}/certificates/${slug}`,
      ...(certificate.imageUrl ? { images: [{ url: certificate.imageUrl }] } : {}),
    },
    alternates: {
      canonical: `${SITE_URL}/certificates/${slug}`,
    },
  };
}

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certificate = getCertificateBySlug(slug);

  if (!certificate) {
    notFound();
  }

  const jsonLd = buildCertificateJsonLd(certificate);
  const allCertificates = getAllCertificates();

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageSection
        badge={certificate.category}
        title={`${certificate.result} — ${certificate.title}`}
        badgeClassName="text-amber-600"
        description={certificate.description}
      >
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="space-y-6">
            {certificate.imageUrl ? (
              <CertificatePreview
                src={certificate.imageUrl}
                alt={`Certificate: ${certificate.title}`}
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-white/80">
                <span className="px-4 text-center text-sm font-medium text-neutral-400">
                  Certificate image not available
                </span>
              </div>
            )}

            <div className="rounded-xl border border-neutral-200 bg-white/90 p-6 text-sm leading-relaxed text-neutral-600">
              <p>
                <strong className="text-neutral-800">Organization:</strong>{" "}
                {certificate.organization}
              </p>
              <p className="mt-2">
                <strong className="text-neutral-800">Result:</strong>{" "}
                {certificate.result}
              </p>
              <p className="mt-2">
                <strong className="text-neutral-800">Year:</strong>{" "}
                {certificate.date}
              </p>
              <p className="mt-2">
                <strong className="text-neutral-800">Category:</strong>{" "}
                {certificate.category}
              </p>
              <p className="mt-4">{certificate.description}</p>
              {certificate.keywords.length > 0 && (
                <p className="mt-4">
                  <strong className="text-neutral-800">Keywords:</strong>{" "}
                  {certificate.keywords.join(", ")}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {certificate.proofUrl && (
                <Link
                  href={certificate.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 px-4 text-sm font-medium text-white shadow-button transition-[filter] hover:from-neutral-950 hover:to-neutral-700"
                >
                  View original proof
                </Link>
              )}
              <Link
                href="/certificates"
                className="inline-flex h-10 items-center rounded-[12px] border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 shadow-button-secondary transition-colors hover:bg-neutral-50"
              >
                All certificates
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-neutral-200 bg-white/90 p-5">
            <h2 className="mb-4 text-sm font-medium text-neutral-800">
              More certificates
            </h2>
            <ul className="space-y-3">
              {allCertificates
                .filter((item) => item.slug !== certificate.slug)
                .slice(0, 6)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/certificates/${item.slug}`}
                      className="block text-sm text-neutral-600 transition-colors hover:text-red-600"
                    >
                      {item.result} — {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </aside>
        </div>
      </PageSection>
    </PageShell>
  );
}
