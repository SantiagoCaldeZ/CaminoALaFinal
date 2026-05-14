import type { MatchState } from "@/lib/game/types";
import { getFinalMatchReport } from "@/lib/game/final-match-report";
import { Panel } from "@/components/ui/Panel";
import { MatchHistory } from "./MatchHistory";

type FinalSummaryProps = {
  matchState: MatchState;
  onRestart: () => void;
  onChangeTeam: () => void;
};

export function FinalSummary({
  matchState,
  onRestart,
  onChangeTeam,
}: FinalSummaryProps) {
  const report = getFinalMatchReport(matchState);

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center shadow-xl shadow-black/20">
        <p className="text-sm font-black uppercase tracking-wide text-emerald-300">
          Final del partido
        </p>

        <h1 className="mt-3 text-4xl font-black text-zinc-50">
          {report.resultTitle}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          {report.resultSubtitle}
        </p>

        <div className="mt-6 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Tu equipo
            </p>
            <h2 className="mt-2 text-2xl font-black text-zinc-50">
              {matchState.playerTeam.name}
            </h2>
          </div>

          <div className="rounded-2xl bg-emerald-400 px-8 py-5 text-4xl font-black text-black">
            {matchState.playerScore} - {matchState.rivalScore}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-rose-300">
              Rival
            </p>
            <h2 className="mt-2 text-2xl font-black text-zinc-50">
              {matchState.rivalTeam.name}
            </h2>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
          >
            Jugar de nuevo
          </button>

          <button
            type="button"
            onClick={onChangeTeam}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-black text-zinc-100 transition hover:bg-zinc-900"
          >
            Cambiar equipos
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <Panel>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            Figura del partido
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-50">
            {report.figureName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {report.figureReason}
          </p>
        </Panel>

        <Panel>
          <p className="text-xs font-black uppercase tracking-wide text-amber-300">
            Momento clave
          </p>
          <h2 className="mt-2 text-xl font-black text-zinc-50">
            {report.keyMomentTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {report.keyMomentDescription}
          </p>
        </Panel>

        <Panel>
          <p className="text-xs font-black uppercase tracking-wide text-sky-300">
            Rendimiento
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-50">
            {report.performanceLabel}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {report.performanceDescription}
          </p>
        </Panel>
      </section>

      <Panel>
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Lectura táctica final
        </p>
        <p className="mt-3 text-base leading-7 text-zinc-300">
          {report.tacticalReading}
        </p>
      </Panel>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryStat label="Goles a favor" value={report.stats.playerGoals} />
        <SummaryStat label="Goles rivales" value={report.stats.rivalGoals} />
        <SummaryStat label="Ocasiones generadas" value={report.stats.playerChances} />
        <SummaryStat label="Amenazas rivales" value={report.stats.rivalThreats} />
        <SummaryStat label="Atajadas" value={report.stats.saves} />
        <SummaryStat label="Pérdidas/intercepciones" value={report.stats.turnovers} />
        <SummaryStat label="Energía final" value={report.stats.finalPlayerEnergy} />
        <SummaryStat label="Momentum final" value={report.stats.finalPlayerMomentum} />
      </section>

      <MatchHistory events={matchState.history} />
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-zinc-50">{value}</p>
    </div>
  );
}