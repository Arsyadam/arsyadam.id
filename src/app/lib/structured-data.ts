import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  KNOWS_ABOUT,
  PERSON,
  SITE_URL,
} from "./profile-data";
import type { Project } from "../showcase/lib/showcase";
import type { CertificateRecord } from "./certificates-data";
import { getCertificateUrl } from "./certificates-data";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildSiteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSON.name,
        alternateName: PERSON.alternateName,
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpg`,
        email: PERSON.email,
        jobTitle: PERSON.jobTitle,
        description: PERSON.headline,
        worksFor: EXPERIENCE.slice(0, 1).map((item) => ({
          "@type": "Organization",
          name: item.organization,
          url: item.url,
        })),
        alumniOf: EDUCATION.map((item) => ({
          "@type": "EducationalOrganization",
          name: item.title,
          url: item.url,
        })),
        knowsAbout: [...KNOWS_ABOUT],
        award: ACHIEVEMENTS.map((item) => `${item.title} — ${item.organization}`),
        address: {
          "@type": "PostalAddress",
          addressLocality: PERSON.location.city,
          addressRegion: PERSON.location.region,
          addressCountry: PERSON.location.countryCode,
        },
        sameAs: [...PERSON.sameAs],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: PERSON.name,
        url: SITE_URL,
        description: PERSON.headline,
        inLanguage: "en-US",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${PERSON.name} — Portfolio`,
        description: PERSON.headline,
        inLanguage: "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
}

export function buildCertificateJsonLd(certificate: CertificateRecord) {
  const url = getCertificateUrl(certificate.slug);

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: `${certificate.result} — ${certificate.title}`,
    description: certificate.description,
    url,
    dateCreated: certificate.date,
    credentialCategory: certificate.category,
    recognizedBy: {
      "@type": "Organization",
      name: certificate.organization,
    },
    about: certificate.keywords.join(", "),
    holder: {
      "@type": "Person",
      name: PERSON.name,
      url: SITE_URL,
    },
    ...(certificate.proofUrl ? { sameAs: certificate.proofUrl } : {}),
    ...(certificate.imageUrl ? { image: certificate.imageUrl } : {}),
  };
}

export function buildCertificatesCollectionJsonLd(
  certificates: CertificateRecord[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${PERSON.name} — Certificates & Awards`,
    description:
      "Public index of competition awards and certificates earned by Arsyad Ali Mahardika.",
    url: `${SITE_URL}/certificates`,
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: certificates.map((certificate, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getCertificateUrl(certificate.slug),
        name: `${certificate.result} — ${certificate.title}`,
      })),
    },
  };
}

export function buildProjectJsonLd(project: Project) {
  const projectUrl = `${SITE_URL}/showcase/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: projectUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: PERSON.name,
      url: SITE_URL,
    },
    creator: {
      "@type": "Person",
      name: PERSON.name,
      url: SITE_URL,
    },
    keywords: project.technologies.join(", "),
    datePublished: project.date,
    image: project.image.startsWith("http")
      ? project.image
      : `${SITE_URL}${project.image}`,
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };
}
