import type { ReactNode } from "react";

type GameShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  maxWidth?: "5xl" | "6xl" | "7xl";
  showFieldLines?: boolean;
};

const maxWidthClasses: Record<
  NonNullable<GameShellProps["maxWidth"]>,
  string
> = {
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export function GameShell({
  children,
  className = "",
  contentClassName = "",
  maxWidth = "6xl",
  showFieldLines = true,
}: GameShellProps) {
  return (
    <main
      className={`mejenga-shell min-h-screen px-4 py-8 text-zinc-50 sm:px-6 lg:px-8 ${className}`}
    >
      {showFieldLines && <div className="mejenga-field-lines" />}

      <div
        className={`relative z-10 mx-auto w-full ${maxWidthClasses[maxWidth]} ${contentClassName}`}
      >
        {children}
      </div>
    </main>
  );
}