import { getBlogPosts } from "./utils";
import BlogPage from "./components/BlogPage";
import { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageSection from "../components/PageSection";
import { PERSON } from "../lib/profile-data";

export const metadata: Metadata = {
  title: "Blog - Writing & Perspectives",
  description: `Articles and perspectives by ${PERSON.name} on AI, public transport technology, machine learning, and building real-world systems.`,
  openGraph: {
    title: `Blog - ${PERSON.name}`,
    description:
      "Writing on AI, public transportation technology, machine learning, and engineering lessons.",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function BlogPageWrapper() {
  const posts = await getBlogPosts();

  return (
    <PageShell>
      <PageSection
        badge="Perspectives"
        title="Writing & Perspectives"
        description="Thoughts on AI, public transport technology, and lessons from building real-world systems."
      >
        <BlogPage initialPosts={posts} />
      </PageSection>
    </PageShell>
  );
}
