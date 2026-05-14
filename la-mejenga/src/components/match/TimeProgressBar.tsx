type TimeProgressBarProps = {
  currentMinute?: number;
};

export function TimeProgressBar({ currentMinute = 1 }: TimeProgressBarProps) {
  const safeMinute = Math.max(1, Math.min(90, currentMinute));
  const progress = Math.round((safeMinute / 90) * 100);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Tiempo de partido
        </p>
        <p className="text-sm font-black text-zinc-100">{safeMinute}&apos;</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[11px] font-bold text-zinc-600">
        <span>1&apos;</span>
        <span>45&apos;</span>
        <span>90&apos;</span>
      </div>
    </div>
  );
}