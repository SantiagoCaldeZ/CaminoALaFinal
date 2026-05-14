type EventBadgeProps = {
  label: string;
  tone: "positive" | "negative" | "neutral" | "warning";
};

const toneClasses: Record<EventBadgeProps["tone"], string> = {
  positive: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  negative: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  warning: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  neutral: "border-zinc-600 bg-zinc-800 text-zinc-300",
};

export function EventBadge({ label, tone }: EventBadgeProps) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}