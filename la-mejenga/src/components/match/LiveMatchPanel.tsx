import type { MatchState } from "@/lib/game/types";
import { getLiveMatchInsight } from "@/lib/game/live-match-insight";
import { TimeProgressBar } from "./TimeProgressBar";

type LiveMatchPanelProps = {
  matchState: MatchState;
  currentMinute?: number;
};

const toneStyles = {
  neutral: "border-zinc-800 bg-zinc-950",
  positive: "border-emerald-400/30 bg-emerald-400/10",
  warning: "border-amber-400/30 bg-amber-400/10",
  danger: "border-rose-400/30 bg-rose-400/10",
};

const toneTextStyles = {
  neutral: "text-zinc-300",
  positive: "text-emerald-300",
  warning: "text-amber-300",
  danger: "text-rose-300",
};

export function LiveMatchPanel({
  matchState,
  currentMinute,
}: LiveMatchPanelProps) {
  const insight = getLiveMatchInsight(matchState, currentMinute);

  return (
    <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <TimeProgressBar currentMinute={currentMinute} />

      <article className={`rounded-2xl border p-4 ${toneStyles[insight.tone]}`}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
            Lectura en vivo
          </p>

          <span
            className={`rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-black ${toneTextStyles[insight.tone]}`}
          >
            {insight.matchStateLabel}
          </span>
        </div>

        <h2 className="text-lg font-black text-zinc-50">{insight.title}</h2>

        <p className="mt-2 text-sm leading-6 text-zinc-300">
          {insight.description}
        </p>
      </article>
    </section>
  );
}