import type { ReactNode } from "react";

type GameCardVariant =
  | "default"
  | "elevated"
  | "success"
  | "warning"
  | "danger"
  | "info";

type GameCardProps = {
  children: ReactNode;
  className?: string;
  variant?: GameCardVariant;
  as?: "section" | "article" | "div";
};

const variantClasses: Record<GameCardVariant, string> = {
  default: "border-white/10 bg-zinc-950/70 shadow-black/25",
  elevated: "border-white/15 bg-zinc-900/80 shadow-black/35",
  success: "border-emerald-300/30 bg-emerald-300/10 shadow-emerald-950/20",
  warning: "border-amber-300/30 bg-amber-300/10 shadow-amber-950/20",
  danger: "border-rose-300/30 bg-rose-300/10 shadow-rose-950/20",
  info: "border-sky-300/30 bg-sky-300/10 shadow-sky-950/20",
};

export function GameCard({
  children,
  className = "",
  variant = "default",
  as: Component = "section",
}: GameCardProps) {
  return (
    <Component
      className={`mejenga-card-shine rounded-3xl border p-5 shadow-2xl backdrop-blur transition ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}