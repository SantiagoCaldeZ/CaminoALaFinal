type StatBarVariant = "emerald" | "red" | "amber" | "sky" | "zinc";

type StatBarProps = {
  label: string;
  value: number;
  max?: number;
  variant?: StatBarVariant;
  helperText?: string;
};

const fillClasses: Record<StatBarVariant, string> = {
  emerald: "bg-gradient-to-r from-emerald-400 to-lime-300",
  red: "bg-gradient-to-r from-rose-500 to-orange-300",
  amber: "bg-gradient-to-r from-amber-400 to-orange-300",
  sky: "bg-gradient-to-r from-sky-400 to-cyan-300",
  zinc: "bg-gradient-to-r from-zinc-400 to-zinc-200",
};

export function StatBar({
  label,
  value,
  max = 100,
  variant = "emerald",
  helperText,
}: StatBarProps) {
  const safeValue = Math.max(0, Math.min(value, max));
  const width = `${(safeValue / max) * 100}%`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-zinc-100">{label}</p>
          {helperText && <p className="text-xs text-zinc-500">{helperText}</p>}
        </div>

        <p className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm font-black text-zinc-50">
          {safeValue}
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/35 shadow-inner shadow-black/40">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillClasses[variant]}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}