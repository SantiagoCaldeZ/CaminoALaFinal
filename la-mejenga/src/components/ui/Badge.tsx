import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-white/10 bg-white/10 text-zinc-200",
  success: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  warning: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  danger: "border-rose-300/35 bg-rose-300/10 text-rose-100",
  info: "border-sky-300/35 bg-sky-300/10 text-sky-100",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] shadow-sm backdrop-blur ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}