import { getMatchWinner } from "@/lib/game/match-engine";
import type { MatchEvent, MatchState } from "@/lib/game/types";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { MatchHistory } from "./MatchHistory";

 type FinalSummaryProps = {
  matchState: MatchState;
  onRestart: () => void;
  onChangeTeam: () => void;
};

function getFeaturedEvent(history: MatchEvent[]): MatchEvent | null {
  const goal = history.find((event) => event.outcome === "goal");

  if (goal) {
    return goal;
  }

  const chance = history.find((event) => event.outcome === "chance_created" || event.outcome === "shot_saved");

  if (chance) {
    return chance;
  }

  return history.at(-1) ?? null;
}

export function FinalSummary({ matchState, onRestart, onChangeTeam }: FinalSummaryProps) {
  const winner = getMatchWinner(matchState);
  const featuredEvent = getFeaturedEvent(matchState.history);

  const title =
    winner === "player"
      ? `Ganó ${matchState.playerTeam.name}`
      : winner === "rival"
        ? `Ganó ${matchState.rivalTeam.name}`
        : "Empate cerrado";

  const subtitle =
    winner === "player"
      ? "Tu equipo cerró mejor los momentos clave."
      : winner === "rival"
        ? "El rival aprovechó mejor sus oportunidades."
        : "Nadie logró romper definitivamente el partido.";

  return (
    <div className="space-y-5">
      <Panel className="border-emerald-400/40 bg-emerald-400/10">
        <p className="text-sm font-bold text-emerald-300">Resumen final</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-50">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{subtitle}</p>

        <p className="mt-5 text-6xl font-black text-zinc-50">
          {matchState.playerScore} - {matchState.rivalScore}
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Energía final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerEnergy}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Momentum final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerMomentum}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Jugadas</p>
            <p className="text-xl font-black text-zinc-50">{matchState.history.length}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Goles</p>
            <p className="text-xl font-black text-zinc-50">
              {matchState.playerScore + matchState.rivalScore}
            </p>
          </div>
        </div>

        {featuredEvent && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
              Jugada destacada · Min {featuredEvent.minute}
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{featuredEvent.narration}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRestart}>Jugar de nuevo</Button>
          <Button variant="secondary" onClick={onChangeTeam}>
            Cambiar equipo
          </Button>
        </div>
      </Panel>

      <MatchHistory events={matchState.history} />
    </div>
  );
}