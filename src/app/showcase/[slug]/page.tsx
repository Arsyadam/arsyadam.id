import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "../lib/showcase";
import ProjectDetail from "../components/ProjectDetail";
import PageShell from "../../components/PageShell";
import { buildProjectJsonLd } from "../../lib/structured-data";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Arsyadam's Portfolio`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const showcaseProject = {
    ...project,
    gif: project.gif || "",
  };

  const projectJsonLd = buildProjectJsonLd(project);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetail project={showcaseProject} />
    </PageShell>
  );
}
