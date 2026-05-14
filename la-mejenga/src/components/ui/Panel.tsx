import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <section
      className={`mejenga-card-shine rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/25 backdrop-blur transition ${className}`}
    >
      {children}
    </section>
  );
}