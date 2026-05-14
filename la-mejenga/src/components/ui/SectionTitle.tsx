import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-200">
          {eyebrow}
        </p>
      )}

      <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-50 sm:text-6xl">
        {title}
      </h1>

      {description && (
        <p
          className={`mt-5 text-base leading-7 text-zinc-300 sm:text-lg ${
            align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}