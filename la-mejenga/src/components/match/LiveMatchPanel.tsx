import type { MatchState } from "@/lib/game/types";
import { getLiveMatchInsight } from "@/lib/game/live-match-insight";
import { TimeProgressBar } from "./TimeProgressBar";

type LiveMatchPanelProps = {
  matchState: MatchState;
  currentMinute?: number;
};

const toneStyles = {
  neutral: "border-white/10 bg-zinc-950/75",
  positive: "border-emerald-300/30 bg-emerald-300/10",
  warning: "border-amber-300/35 bg-amber-300/10",
  danger: "border-rose-300/35 bg-rose-300/10",
};

const toneTextStyles = {
  neutral: "text-zinc-300",
  positive: "text-emerald-200",
  warning: "text-amber-100",
  danger: "text-rose-100",
};

export function LiveMatchPanel({
  matchState,
  currentMinute,
}: LiveMatchPanelProps) {
  const insight = getLiveMatchInsight(matchState, currentMinute);

  return (
    <section className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <TimeProgressBar currentMinute={currentMinute} />

      <article
        className={`relative overflow-hidden rounded-3xl border p-5 shadow-xl shadow-black/25 backdrop-blur ${toneStyles[insight.tone]}`}
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
              Lectura en vivo
            </p>

            <h2 className="mt-2 text-2xl font-black text-zinc-50">
              {insight.title}
            </h2>
          </div>

          <span
            className={`rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-black uppercase tracking-wide ${toneTextStyles[insight.tone]}`}
          >
            {insight.matchStateLabel}
          </span>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">
          {insight.description}
        </p>
      </article>
    </section>
  );
}