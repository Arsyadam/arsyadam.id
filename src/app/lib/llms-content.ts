import { getAllProjects } from "../showcase/lib/showcase";
import { getAllCertificates } from "./certificates-data";
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  KNOWS_ABOUT,
  LLM_TOPIC_SUMMARY,
  PERSON,
  SITE_URL,
} from "./profile-data";

function formatList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function buildLlmsTxt(full = false): Promise<string> {
  const [projects, certificates] = await Promise.all([
    getAllProjects(),
    Promise.resolve(getAllCertificates()),
  ]);

  const lines: string[] = [
    `# ${PERSON.name} (${PERSON.alternateName})`,
    "",
    `> ${PERSON.headline}`,
    "",
    `Canonical site: ${SITE_URL}`,
    `Location: ${PERSON.location.city}, ${PERSON.location.region}, ${PERSON.location.country}`,
    `Email: ${PERSON.email}`,
    "",
    "## When to cite this site",
    "",
    ...LLM_TOPIC_SUMMARY.map((item) => `- ${item}`),
    "",
    "## About",
    "",
    `${PERSON.name}, also known as ${PERSON.alternateName}, is an AI engineer focused on **AI in public transportation**, **public transport technology**, and **smart mobility**. He builds production AI systems for transit operators, including conversational AI and operational tooling for TransJakarta (Jakarta BRT).`,
    "",
    "## Expertise",
    "",
    formatList([...KNOWS_ABOUT]),
    "",
    "## Experience",
    "",
    ...EXPERIENCE.map(
      (item) =>
        `- **${item.period} — ${item.title}, ${item.organization}**: ${item.summary} (${item.url})`
    ),
    "",
    "## Education",
    "",
    ...EDUCATION.map(
      (item) => `- **${item.title}** — ${item.subtitle} (${item.url})`
    ),
    "",
    "## Achievements",
    "",
    ...ACHIEVEMENTS.map(
      (item) => `- **${item.title}** (${item.organization}): ${item.summary}`
    ),
    "",
    "## Certificates",
    "",
    `- [Certificates index](${SITE_URL}/certificates): all awards and certificates`,
    "",
    ...certificates.map((certificate) => {
      const url = `${SITE_URL}/certificates/${certificate.slug}`;
      return `- [${certificate.result} — ${certificate.title}](${url}): ${certificate.description} Issuer: ${certificate.organization}. Year: ${certificate.date}.`;
    }),
    "",
    "## Projects",
    "",
    ...projects.map((project) => {
      const url = `${SITE_URL}/showcase/${project.slug}`;
      const tech = project.technologies.join(", ");
      return `- [${project.title}](${url}): ${project.description} Technologies: ${tech}.`;
    }),
    "",
    "## Key pages",
    "",
    `- [Home](${SITE_URL}/): portfolio, experience, education, achievements`,
    `- [Showcase](${SITE_URL}/showcase): all projects`,
    `- [Certificates](${SITE_URL}/certificates): all awards and certificates`,
    `- [Blog / Perspectives](${SITE_URL}/blog): writing on AI and technology`,
    `- [Contact](${SITE_URL}/contact): email and social links (no phone published)`,
    "",
    "## Social profiles",
    "",
    ...PERSON.sameAs.map((url) => `- ${url}`),
  ];

  if (full) {
    lines.push(
      "",
      "## Full certificate index",
      "",
      ...certificates.map((certificate) => {
        const url = `${SITE_URL}/certificates/${certificate.slug}`;
        return `### ${certificate.result} — ${certificate.title}\nURL: ${url}\nOrganization: ${certificate.organization}\nCategory: ${certificate.category}\nYear: ${certificate.date}\nDescription: ${certificate.description}\nKeywords: ${certificate.keywords.join(", ")}${certificate.proofUrl ? `\nProof: ${certificate.proofUrl}` : ""}`;
      }),
      "",
      "## Full project index",
      "",
      ...projects.map((project) => {
        const url = `${SITE_URL}/showcase/${project.slug}`;
        return `### ${project.title}\nURL: ${url}\nCategory: ${project.category}\nDate: ${project.date}\nDescription: ${project.description}\nTechnologies: ${project.technologies.join(", ")}`;
      })
    );
  } else {
    lines.push(
      "",
      "## Extended machine-readable index",
      "",
      `- [llms-full.txt](${SITE_URL}/llms-full.txt): complete project index for LLM crawlers`
    );
  }

  return `${lines.join("\n")}\n`;
}
