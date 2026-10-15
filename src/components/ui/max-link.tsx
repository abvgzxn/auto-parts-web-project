import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type MaxLinkProps = {
  text: string;
  variant?: "primary" | "secondary" | "compact";
  // Полное оформление вместо варианта — для сохранения существующего дизайна.
  className?: string;
};

const variantStyles = {
  primary:
    "min-h-12 justify-center rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#003653]",
  secondary:
    "min-h-12 justify-center rounded-lg bg-white px-6 py-3 font-semibold text-brand-navy transition-colors hover:bg-surface",
  compact:
    "min-h-11 rounded-sm font-semibold text-inherit hover:underline",
};

export default function MaxLink({
  text,
  variant = "primary",
  className,
}: MaxLinkProps) {
  return (
    <a
      href={siteConfig.maxUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full items-center gap-2 text-center ${className ?? variantStyles[variant]}`}
    >
      <Image
        src="/images/logo/max.svg"
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        unoptimized
        className="shrink-0"
      />
      <span>{text}</span>
    </a>
  );
}
