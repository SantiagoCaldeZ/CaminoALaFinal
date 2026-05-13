type StatBarVariant = "emerald" | "red" | "amber" | "sky" | "zinc";

type StatBarProps = {
  label: string;
  value: number;
  max?: number;
  variant?: StatBarVariant;
  helperText?: string;
};

const fillClasses: Record<StatBarVariant, string> = {
  emerald: "bg-emerald-400",
  red: "bg-red-400",
  amber: "bg-amber-400",
  sky: "bg-sky-400",
  zinc: "bg-zinc-400",
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
          <p className="text-sm font-bold text-zinc-100">{label}</p>
          {helperText && <p className="text-xs text-zinc-500">{helperText}</p>}
        </div>
        <p className="text-sm font-black text-zinc-100">{safeValue}</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillClasses[variant]}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}