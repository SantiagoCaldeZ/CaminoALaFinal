import {
  getCaminoCurrentOpponent,
  getCaminoPlayerTeam,
  getCaminoRoundLabel,
  type CaminoRun,
} from "@/lib/game/camino";
import { getTeamById } from "@/lib/game/teams";

type CaminoBracketProps = {
  camino: CaminoRun;
  onStartMatch: () => void;
  onReset: () => void;
};

export function CaminoBracket({
  camino,
  onStartMatch,
  onReset,
}: CaminoBracketProps) {
  const playerTeam = getCaminoPlayerTeam(camino);
  const currentOpponent = getCaminoCurrentOpponent(camino);
  const otherA = getTeamById(camino.otherSemifinalTeamAId);
  const otherB = getTeamById(camino.otherSemifinalTeamBId);
  const otherWinner = getTeamById(camino.otherSemifinalWinnerTeamId);

  const isChampion = camino.status === "champion";
  const isEliminated = camino.status === "eliminated";

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <p className="text-sm font-black text-emerald-300">
              La Mejenga
            </p>
            <h1 className="mt-2 text-4xl font-black">
              Camino a la Final
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Ganá la semifinal, avanzá a la final y coroná a tu equipo como campeón.
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:bg-zinc-900"
          >
            Reiniciar camino
          </button>
        </header>

        {isChampion && (
          <section className="rounded-3xl border border-emerald-400/40 bg-emerald-400/10 p-6 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-emerald-300">
              Campeón
            </p>
            <h2 className="mt-2 text-4xl font-black text-zinc-50">
              {playerTeam.name} ganó el Camino a la Final
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
              Tu equipo superó los momentos clave y cerró el torneo con carácter.
            </p>
          </section>
        )}

        {isEliminated && (
          <section className="rounded-3xl border border-rose-400/40 bg-rose-400/10 p-6 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-rose-300">
              Camino terminado
            </p>
            <h2 className="mt-2 text-4xl font-black text-zinc-50">
              {playerTeam.name} quedó eliminado
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
              El torneo terminó para tu equipo. Podés reiniciar e intentarlo con otra estrategia.
            </p>
          </section>
        )}

        {!isChampion && !isEliminated && (
          <section className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              Próximo partido
            </p>
            <h2 className="mt-2 text-3xl font-black text-zinc-50">
              {getCaminoRoundLabel(camino.currentRound)}
            </h2>
            <p className="mt-2 text-lg font-bold text-zinc-200">
              {playerTeam.name} vs {currentOpponent.name}
            </p>

            <button
              type="button"
              onClick={onStartMatch}
              className="mt-5 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
            >
              Jugar {getCaminoRoundLabel(camino.currentRound)}
            </button>
          </section>
        )}

        <section className="grid gap-5 lg:grid-cols-3">
          <BracketCard
            title="Tu semifinal"
            main={`${playerTeam.name} vs ${getTeamById(camino.semifinalRivalTeamId).name}`}
            detail={
              camino.results[0]
                ? `${camino.results[0].playerScore} - ${camino.results[0].rivalScore}`
                : "Pendiente"
            }
          />

          <BracketCard
            title="Otra semifinal"
            main={`${otherA.name} vs ${otherB.name}`}
            detail={`Ganador simulado: ${otherWinner.name}`}
          />

          <BracketCard
            title="Final"
            main={
              camino.currentRound === "final" || camino.status === "champion"
                ? `${playerTeam.name} vs ${getTeamById(camino.finalRivalTeamId).name}`
                : `Ganador de tu semifinal vs ${otherWinner.name}`
            }
            detail={
              camino.results[1]
                ? `${camino.results[1].playerScore} - ${camino.results[1].rivalScore}`
                : "Pendiente"
            }
          />
        </section>

        {camino.results.length > 0 && (
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
              Resultados del camino
            </p>

            <div className="mt-4 space-y-3">
              {camino.results.map((result) => {
                const rival = getTeamById(result.rivalTeamId);

                return (
                  <article
                    key={result.id}
                    className="rounded-xl border border-zinc-800 bg-black/30 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase text-emerald-300">
                          {getCaminoRoundLabel(result.round)}
                        </p>
                        <p className="mt-1 text-sm font-bold text-zinc-100">
                          {playerTeam.name} vs {rival.name}
                        </p>
                      </div>

                      <p className="rounded-xl bg-zinc-900 px-4 py-2 text-lg font-black">
                        {result.playerScore} - {result.rivalScore}
                      </p>
                    </div>

                    {result.wentToPenalties && result.penaltySummary && (
                      <p className="mt-3 text-sm leading-6 text-amber-200">
                        {result.penaltySummary}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function BracketCard({
  title,
  main,
  detail,
}: {
  title: string;
  main: string;
  detail: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        {title}
      </p>
      <h3 className="mt-2 text-xl font-black text-zinc-50">{main}</h3>
      <p className="mt-3 text-sm text-zinc-400">{detail}</p>
    </article>
  );
}