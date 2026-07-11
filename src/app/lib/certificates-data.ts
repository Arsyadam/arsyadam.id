export type CertificateRecord = {
  slug: string;
  title: string;
  organization: string;
  result: string;
  category: "Innovation" | "AI" | "IoT" | "Data Science" | "STEAM" | "Business" | "Academic";
  date: string;
  description: string;
  proofUrl?: string;
  imageUrl?: string | null;
  gradient: string;
  keywords: string[];
};

export function driveCertificateThumbnail(url: string): string | null {
  const match = url.match(/\/d\/([^/]+)/);
  if (!match?.[1]) return null;
  return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
}

export const CERTIFICATES: CertificateRecord[] = [
  {
    slug: "fiksi-gold-medal",
    title: "FIKSI National Digital Technology Competition",
    organization: "Puspresnas",
    result: "1st Gold Medal",
    category: "Innovation",
    date: "2024",
    description:
      "National innovation competition focused on creating digital technology solutions for real-world problems. Awarded for Revive, an AI and IoT-based textile waste management system.",
    proofUrl:
      "https://drive.google.com/file/d/1-0JLawWPEafudhWz18h5sNnVAPLSDYjG/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1-0JLawWPEafudhWz18h5sNnVAPLSDYjG/view?usp=drive_link"
    ),
    gradient: "from-red-50/50 to-transparent",
    keywords: ["FIKSI", "Puspresnas", "innovation", "AI", "IoT", "national competition"],
  },
  {
    slug: "best-student-smk-telkom",
    title: "Best Academic & Non-Academic Student",
    organization: "SMK Telkom Malang",
    result: "School Award",
    category: "Academic",
    date: "2024",
    description:
      "Recognized as the best student in both academic and non-academic categories at SMK Telkom Malang, combining academic excellence with leadership and extracurricular impact.",
    gradient: "from-rose-50/50 to-transparent",
    keywords: ["SMK Telkom Malang", "academic excellence", "leadership"],
  },
  {
    slug: "lks-artificial-intelligence",
    title: "LKS Artificial Intelligence",
    organization: "Puspresnas & East Java Education Office",
    result: "1st Place",
    category: "AI",
    date: "2024",
    description:
      "National vocational school AI competition testing machine learning, computer vision, and problem-solving skills.",
    proofUrl:
      "https://drive.google.com/file/d/1NKivuheEOHrlkUGcxfmcKQruVNgqMxV3/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1NKivuheEOHrlkUGcxfmcKQruVNgqMxV3/view?usp=drive_link"
    ),
    gradient: "from-purple-50/50 to-transparent",
    keywords: ["LKS", "artificial intelligence", "machine learning", "computer vision"],
  },
  {
    slug: "iot-competition-mage-its",
    title: "IoT Competition",
    organization: "Mage ITS",
    result: "1st Place",
    category: "IoT",
    date: "2024",
    description:
      "Technology and engineering competition by ITS, focusing on developing IoT-based industrial solutions.",
    proofUrl:
      "https://drive.google.com/file/d/1-qLxDfabJoLoemI_TE52bMLhmEImWm62/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1-qLxDfabJoLoemI_TE52bMLhmEImWm62/view?usp=drive_link"
    ),
    gradient: "from-blue-50/50 to-transparent",
    keywords: ["IoT", "ITS", "industrial solutions", "engineering"],
  },
  {
    slug: "national-standardization-competition",
    title: "National Standardization Competition (KSN)",
    organization: "BSN (Indonesia National Standardization Agency)",
    result: "1st Runner Up",
    category: "Innovation",
    date: "2024",
    description:
      "National competition promoting innovation aligned with industry standards.",
    proofUrl:
      "https://drive.google.com/file/d/1phQxQ5REzsWvjTPXxqKn7_4DtSJt28U8/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1phQxQ5REzsWvjTPXxqKn7_4DtSJt28U8/view?usp=drive_link"
    ),
    gradient: "from-amber-50/50 to-transparent",
    keywords: ["BSN", "standardization", "national competition"],
  },
  {
    slug: "visual-data-competition",
    title: "Visual Data Competition",
    organization: "Ministry of Finance of Indonesia",
    result: "3rd Place",
    category: "Data Science",
    date: "2024",
    description:
      "Data visualization competition tackling social issues including climate change.",
    proofUrl:
      "https://drive.google.com/file/d/1-QjYElyXZDDp7-fdP5A48xFvvdFuBRmq/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1-QjYElyXZDDp7-fdP5A48xFvvdFuBRmq/view?usp=drive_link"
    ),
    gradient: "from-green-50/50 to-transparent",
    keywords: ["data visualization", "climate change", "Ministry of Finance"],
  },
  {
    slug: "steam-competition",
    title: "STEAM Competition",
    organization: "Sampoerna Academy",
    result: "3rd Place",
    category: "STEAM",
    date: "2024",
    description:
      "Multidisciplinary competition combining Science, Technology, Engineering, Arts, and Mathematics for innovative solutions.",
    proofUrl:
      "https://drive.google.com/file/d/104Gj8-95XiGqGmJyTKsojSqsNpPlYmyu/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/104Gj8-95XiGqGmJyTKsojSqsNpPlYmyu/view?usp=drive_link"
    ),
    gradient: "from-teal-50/50 to-transparent",
    keywords: ["STEAM", "multidisciplinary", "innovation"],
  },
  {
    slug: "fedex-international-trade-challenge",
    title: "FedEx International Trade Challenge",
    organization: "Junior Achievement",
    result: "Top 10 Finalist",
    category: "Business",
    date: "2024",
    description:
      "Global competition promoting innovative international trade strategies among young entrepreneurs.",
    proofUrl:
      "https://drive.google.com/file/d/10EbarSaYREOMJQr10LEBPBMI879GvamG/view?usp=drive_link",
    imageUrl: driveCertificateThumbnail(
      "https://drive.google.com/file/d/10EbarSaYREOMJQr10LEBPBMI879GvamG/view?usp=drive_link"
    ),
    gradient: "from-indigo-50/50 to-transparent",
    keywords: ["FedEx", "international trade", "Junior Achievement", "global competition"],
  },
  {
    slug: "samsung-solve-for-tomorrow",
    title: "Samsung Solve for Tomorrow",
    organization: "Samsung",
    result: "Semifinalist",
    category: "Innovation",
    date: "2024",
    description:
      "Samsung's global competition empowering students to solve community challenges using STEM innovation.",
    gradient: "from-neutral-50/40 to-transparent",
    keywords: ["Samsung", "STEM", "Solve for Tomorrow", "community innovation"],
  },
];

export function getAllCertificates(): CertificateRecord[] {
  return CERTIFICATES;
}

export function getCertificateBySlug(slug: string): CertificateRecord | undefined {
  return CERTIFICATES.find((certificate) => certificate.slug === slug);
}

export function getCertificateSlugs(): string[] {
  return CERTIFICATES.map((certificate) => certificate.slug);
}

export function getCertificateUrl(slug: string): string {
  return `https://arsyadam.id/certificates/${slug}`;
}
