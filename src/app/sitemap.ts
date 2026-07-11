import { MetadataRoute } from "next";
import { getBlogPosts } from "./blog/utils";
import { getAllProjects } from "./showcase/lib/showcase";
import { getAllCertificates } from "./lib/certificates-data";
import { SITE_URL } from "./lib/profile-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const [projects, posts, certificates] = await Promise.all([
    getAllProjects(),
    getBlogPosts(),
    Promise.resolve(getAllCertificates()),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/showcase`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/certificates`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/showcase/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.pubDate ? new Date(post.pubDate) : currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const certificateRoutes: MetadataRoute.Sitemap = certificates.map(
    (certificate) => ({
      url: `${SITE_URL}/certificates/${certificate.slug}`,
      lastModified: new Date(`${certificate.date}-01-01`),
      changeFrequency: "yearly",
      priority: 0.75,
    })
  );

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...certificateRoutes];
}
