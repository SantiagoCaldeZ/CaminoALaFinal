import type { MatchState } from "@/lib/game/types";

type ScoreboardProps = {
  matchState: MatchState;
  currentMinute?: number;
};

function getMatchLabel(matchState: MatchState, currentMinute?: number): string {
  if (matchState.status === "finished") {
    return "Final";
  }

  if (typeof currentMinute === "number") {
    return `Min ${currentMinute}`;
  }

  return "Partido en vivo";
}

export function Scoreboard({ matchState, currentMinute }: ScoreboardProps) {
  const playerIsWinning = matchState.playerScore > matchState.rivalScore;
  const rivalIsWinning = matchState.rivalScore > matchState.playerScore;
  const isDraw = matchState.playerScore === matchState.rivalScore;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/75 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-lime-200/60 to-transparent" />

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <TeamScoreBlock
          label="Tu equipo"
          name={matchState.playerTeam.name}
          score={matchState.playerScore}
          tone="player"
          isWinning={playerIsWinning}
          isDraw={isDraw}
        />

        <div className="mx-auto w-full max-w-xs rounded-3xl border border-lime-200/25 bg-black/40 p-4 text-center shadow-xl shadow-black/30 lg:w-64">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-100">
            {getMatchLabel(matchState, currentMinute)}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-5xl font-black tracking-tight text-zinc-50">
              {matchState.playerScore}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-black text-zinc-400">
              VS
            </span>

            <span className="text-5xl font-black tracking-tight text-zinc-50">
              {matchState.rivalScore}
            </span>
          </div>

          <p className="mt-3 text-xs font-bold text-zinc-500">
            {playerIsWinning
              ? "Ventaja del barrio"
              : rivalIsWinning
                ? "Toca reaccionar"
                : "Partido igualado"}
          </p>
        </div>

        <TeamScoreBlock
          label="Rival"
          name={matchState.rivalTeam.name}
          score={matchState.rivalScore}
          tone="rival"
          isWinning={rivalIsWinning}
          isDraw={isDraw}
          align="right"
        />
      </div>
    </section>
  );
}

type TeamScoreBlockProps = {
  label: string;
  name: string;
  score: number;
  tone: "player" | "rival";
  isWinning: boolean;
  isDraw: boolean;
  align?: "left" | "right";
};

function TeamScoreBlock({
  label,
  name,
  score,
  tone,
  isWinning,
  isDraw,
  align = "left",
}: TeamScoreBlockProps) {
  const toneClasses =
    tone === "player"
      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
      : "border-rose-300/25 bg-rose-300/10 text-rose-100";

  return (
    <article
      className={`rounded-3xl border p-4 ${toneClasses} ${
        align === "right" ? "lg:text-right" : ""
      }`}
    >
      <div
        className={`flex items-start gap-3 ${
          align === "right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-2xl font-black text-zinc-50">
          {score}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
            {label}
          </p>

          <h2 className="mt-1 truncate text-2xl font-black text-zinc-50">
            {name}
          </h2>

          <p className="mt-1 text-xs font-bold text-zinc-400">
            {isWinning
              ? "Arriba en el marcador"
              : isDraw
                ? "Empatado"
                : "Abajo en el marcador"}
          </p>
        </div>
      </div>
    </article>
  );
}