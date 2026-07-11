import Link from "next/link";
import CertificatePreview from "../../components/home/CertificatePreview";
import type { CertificateRecord } from "../../lib/certificates-data";

type CertificateCardProps = {
  certificate: CertificateRecord;
  variant?: "grid" | "compact";
};

export default function CertificateCard({
  certificate,
  variant = "grid",
}: CertificateCardProps) {
  const detailUrl = `/certificates/${certificate.slug}`;
  const hasProof = Boolean(certificate.proofUrl);

  const imageBlock = certificate.imageUrl ? (
    <CertificatePreview
      src={certificate.imageUrl}
      alt={`Certificate: ${certificate.title}`}
    />
  ) : (
    <div className="mb-3 flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-transparent">
      <span className="px-4 text-center text-[12px] font-medium text-neutral-400">
        Certificate preview
      </span>
    </div>
  );

  return (
    <article
      className={`group flex flex-col rounded-xl border border-black/5 bg-transparent bg-gradient-to-b ${certificate.gradient} p-5 transition-shadow hover:shadow-md`}
      style={{
        boxShadow:
          "0px 4px 6px -2px rgba(0,0,0,0.05), 0px 10px 15px -3px rgba(0,0,0,0.08)",
      }}
    >
      {variant === "grid" && imageBlock}

      <span className="text-[12px] font-medium text-neutral-400">
        {certificate.organization}
      </span>
      <Link href={detailUrl} className="group/title">
        <h3 className="text-[18px] font-medium leading-[120%] tracking-[-0.005em] text-neutral-800 transition-colors group-hover/title:text-red-600 md:text-[20px]">
          {certificate.result} — {certificate.title}
        </h3>
      </Link>
      <p className="flex-1 text-[13px] leading-[150%] text-neutral-500">
        {certificate.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          href={detailUrl}
          className="text-[14px] font-medium text-neutral-800 underline transition-colors hover:text-red-600"
        >
          View certificate page
        </Link>
        {hasProof && (
          <Link
            href={certificate.proofUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium text-amber-600 underline transition-colors hover:text-amber-700"
          >
            View proof
          </Link>
        )}
      </div>
    </article>
  );
}
