import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type GameButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "tournament";

type GameButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: GameButtonVariant;
  size?: GameButtonSize;
  className?: string;
};

type GameButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedButtonProps;

type GameButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  SharedButtonProps & {
    href: string;
  };

const variantClasses: Record<GameButtonVariant, string> = {
  primary:
    "border-emerald-200/40 bg-gradient-to-r from-emerald-300 to-lime-300 text-zinc-950 shadow-emerald-950/40 hover:from-emerald-200 hover:to-lime-200",
  secondary:
    "border-white/15 bg-white/10 text-zinc-50 shadow-black/20 hover:border-white/25 hover:bg-white/15",
  ghost:
    "border-transparent bg-transparent text-zinc-300 shadow-none hover:bg-white/10 hover:text-zinc-50",
  danger:
    "border-rose-300/35 bg-rose-500 text-white shadow-rose-950/30 hover:bg-rose-400",
  tournament:
    "border-amber-200/50 bg-gradient-to-r from-amber-300 via-orange-300 to-lime-300 text-zinc-950 shadow-amber-950/35 hover:from-amber-200 hover:via-orange-200 hover:to-lime-200",
};

const sizeClasses: Record<GameButtonSize, string> = {
  sm: "rounded-xl px-4 py-2 text-xs",
  md: "rounded-2xl px-5 py-3 text-sm",
  lg: "rounded-2xl px-6 py-4 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 border font-black transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-lime-200/70 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

function getButtonClasses({
  variant,
  size,
  className,
}: Required<Pick<SharedButtonProps, "variant" | "size" | "className">>) {
  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
}

export function GameButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: GameButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}

export function GameButtonLink({
  children,
  className = "",
  variant = "primary",
  size = "md",
  href,
  ...props
}: GameButtonLinkProps) {
  return (
    <Link
      href={href}
      className={getButtonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </Link>
  );
}