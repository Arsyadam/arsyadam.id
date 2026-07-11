import { Metadata } from "next";
import { PERSON } from "../lib/profile-data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${PERSON.name} for AI in public transport, smart mobility, machine learning, and software engineering collaborations. Email and social links available.`,
  openGraph: {
    title: `Contact - ${PERSON.name}`,
    description:
      "Get in touch for AI, public transportation technology, and software engineering collaborations.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
