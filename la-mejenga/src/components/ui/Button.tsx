import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-emerald-200/40 bg-gradient-to-r from-emerald-300 to-lime-300 text-zinc-950 shadow-emerald-950/40 hover:from-emerald-200 hover:to-lime-200",
  secondary:
    "border-white/15 bg-white/10 text-zinc-100 shadow-black/20 hover:bg-white/15",
  ghost:
    "border-transparent text-zinc-300 hover:bg-white/10 hover:text-zinc-50",
  danger:
    "border-rose-300/35 bg-rose-500 text-white shadow-rose-950/30 hover:bg-rose-400",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-2xl border px-5 py-3 text-sm font-black shadow-xl transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-lime-200/70 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}