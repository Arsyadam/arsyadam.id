import Link from "next/link";
import Image from "next/image";
import TimelineList from "./components/home/TimelineList";
import { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import SectionHeader from "./components/home/SectionHeader";
import CtaSection from "./components/home/CtaSection";
import TransitMapBackground from "./components/home/transit/TransitMapBackground";
import HomeShowcaseSection from "./components/home/HomeShowcaseSection";
import HomePerspectivesSection from "./components/home/HomePerspectivesSection";
import CertificateCard from "./certificates/components/CertificateCard";
import { getBlogPosts } from "./blog/utils";
import { getAllProjects } from "./showcase/lib/showcase";
import { pickFeaturedProjects } from "./showcase/lib/project-order";
import { linkLabel } from "./lib/link-label";
import { getAllCertificates } from "./lib/certificates-data";
import { PERSON, SITE_URL } from "./lib/profile-data";

export const metadata: Metadata = {
  title: `${PERSON.name} - AI Engineer | Public Transport & Smart Mobility AI`,
  description: PERSON.headline,
  openGraph: {
    title: `${PERSON.name} - AI Engineer | AI in Public Transport`,
    description: PERSON.headline,
    url: SITE_URL,
    type: "profile",
  },
};

export const revalidate = 3600;

const educationItems = [
  {
    title: "SMK Telkom Malang",
    subtitle: "Software Engineering",
    href: "https://smktelkom-mlg.sch.id",
    label: linkLabel("https://smktelkom-mlg.sch.id"),
  },
  {
    title: "Sakura Science High School Program",
    subtitle: "Exchange program by JST",
    href: "https://drive.google.com/file/d/1sAqaZnOM4-I0aILb1NC9Q3SCcZXihtJ_/view?usp=drive_link",
    label: linkLabel(
      "https://drive.google.com/file/d/1sAqaZnOM4-I0aILb1NC9Q3SCcZXihtJ_/view?usp=drive_link"
    ),
  },
  {
    title: "Algoritma Data Science School",
    subtitle: "Data Visualization, Machine Learning",
    href: "https://algorit.ma",
    label: linkLabel("https://algorit.ma"),
  },
];

const experienceItems = [
  {
    period: "May 2026 - Present",
    title: "AI Engineer Intern at Transjakarta",
    subtitle:
      "Developing AI and machine learning solutions for smart mobility, translating operational needs into data-driven tools that support Jakarta's public transportation ecosystem.",
    href: "https://transjakarta.co.id",
    label: linkLabel("https://transjakarta.co.id"),
    logo: "/img/showcase/transjakarta.png",
    logoAlt: "Transjakarta Logo",
  },
  {
    period: "Nov 2025 - Apr 2026",
    title: "AI Engineer Intern at dot.co.id",
    subtitle:
      "Developed and implemented AI solutions to enhance business processes and customer experiences.",
    href: "https://dot.co.id",
    label: linkLabel("https://dot.co.id"),
    logo: "https://assets.cdn.dicoding.com/original/jobs/dos:lowongan_dicoding_pt_digdaya_olah_teknologi_indonesia_260322191647.png",
    logoAlt: "dot.co.id Logo",
  },
  {
    period: "Sep 2024 - Dec 2025",
    title: "Lead, METIC",
    subtitle:
      "Lead at Moklet Education Technology and Informatic Club (METIC), driving student-led tech programs, workshops, and innovation initiatives across software engineering, AI, and digital literacy.",
    href: "https://metic.moklet.org",
    label: linkLabel("https://metic.moklet.org"),
    logo: "https://res.cloudinary.com/mokletorg/image/upload/v1721611310/app_media/file_u6zi7e.png",
    logoAlt: "METIC Logo",
  },
];

const achievements = getAllCertificates();

export default async function Home() {
  const [allPosts, allProjects] = await Promise.all([
    getBlogPosts(),
    getAllProjects(),
  ]);
  const latestPosts = allPosts.slice(0, 5);
  const featuredProjects = pickFeaturedProjects(
    Array.isArray(allProjects) ? allProjects : []
  );

  return (
    <div id="landing-page" className="relative isolate w-full flex-1 bg-neutral-50">
      <TransitMapBackground rootId="landing-page" />
      <main
        id="webpage"
        className="relative z-10 flex w-full flex-1 flex-col items-center bg-transparent"
      >
        <HeroSection />

        {/* Experience */}
        <section
          id="experience"
          className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
        >
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
          <SectionHeader
            badge="Experience"
            title="Learning by Doing"
            description="From leading student tech communities to building AI solutions at scale, turning knowledge into real impact."
          />

          <div className="w-full max-w-4xl">
            <TimelineList
              items={experienceItems}
              showPeriod
              spineId="experience"
            />
          </div>
        </div>
      </section>

      <HomeShowcaseSection projects={featuredProjects} />

      {/* Education */}
        <section
          id="education"
          className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
        >
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
          <SectionHeader
            badge="Education"
            title="Building a Strong Foundation"
            description="Chosen to master AI, machine learning, and analytics, aiming to develop innovative tech solutions and create real-world impact."
          />

          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <TimelineList items={educationItems} spineId="education" />

            <div className="hidden justify-center lg:flex">
              <Image
                src="/img/education.png"
                alt="Education illustration"
                width={400}
                height={200}
                className="max-w-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievement */}
        <section
          id="achievement"
          className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
        >
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
          <SectionHeader
            badge="Achievement"
            title="Recognition & Milestones"
            badgeClassName="text-amber-600"
            transitCrossing
            description="A journey of competitions and challenges that sharpened my critical thinking, innovation, and teamwork, both technical and human."
          />

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {achievements.map((certificate) => (
              <CertificateCard key={certificate.slug} certificate={certificate} />
            ))}
          </div>

          <Link
            href="/certificates"
            className="text-sm font-medium text-amber-600 underline transition-colors hover:text-amber-700"
          >
            View all certificates
          </Link>
        </div>
      </section>

      <HomePerspectivesSection posts={latestPosts} />

      <CtaSection />
      </main>
    </div>
  );
}
