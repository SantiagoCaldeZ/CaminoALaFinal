import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-emerald-400 text-zinc-950 hover:bg-emerald-300",
  secondary: "border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
  ghost: "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50",
  danger: "bg-red-500 text-white hover:bg-red-400",
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
      className={`rounded-xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}