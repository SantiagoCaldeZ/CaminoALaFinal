type TimeProgressBarProps = {
  currentMinute?: number;
};

export function TimeProgressBar({ currentMinute = 1 }: TimeProgressBarProps) {
  const safeMinute = Math.max(1, Math.min(90, currentMinute));
  const progress = Math.round((safeMinute / 90) * 100);
  const isFinalStretch = safeMinute >= 75;

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/75 p-4 shadow-xl shadow-black/25 backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Tiempo de partido
          </p>

          <p className="mt-1 text-sm font-bold text-zinc-300">
            {isFinalStretch ? "Tramo final" : "Partido en desarrollo"}
          </p>
        </div>

        <div className="rounded-2xl border border-lime-200/25 bg-lime-200 px-4 py-2 text-xl font-black text-zinc-950">
          {safeMinute}&apos;
        </div>
      </div>

      <div className="relative h-4 overflow-hidden rounded-full border border-white/10 bg-black/40 shadow-inner shadow-black/50">
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/25" />

        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[11px] font-black uppercase tracking-wide text-zinc-600">
        <span>1&apos;</span>
        <span>Descanso</span>
        <span>90&apos;</span>
      </div>
    </div>
  );
}