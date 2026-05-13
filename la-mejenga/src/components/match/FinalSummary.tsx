import { getMatchWinner } from "@/lib/game/match-engine";
import type { MatchState } from "@/lib/game/types";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { MatchHistory } from "./MatchHistory";

type FinalSummaryProps = {
  matchState: MatchState;
  onRestart: () => void;
  onChangeTeam: () => void;
};

export function FinalSummary({ matchState, onRestart, onChangeTeam }: FinalSummaryProps) {
  const winner = getMatchWinner(matchState);

  const title =
    winner === "player"
      ? `Ganó ${matchState.playerTeam.name}`
      : winner === "rival"
        ? `Ganó ${matchState.rivalTeam.name}`
        : "Empate cerrado";

  return (
    <div className="space-y-5">
      <Panel className="border-emerald-400/40 bg-emerald-400/10">
        <p className="text-sm font-bold text-emerald-300">Resumen final</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-50">{title}</h1>

        <p className="mt-4 text-5xl font-black text-zinc-50">
          {matchState.playerScore} - {matchState.rivalScore}
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Energía final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerEnergy}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Momentum final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerMomentum}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRestart}>Jugar de nuevo</Button>
          <Button variant="secondary" onClick={onChangeTeam}>
            Cambiar equipo
          </Button>
        </div>
      </Panel>

      <MatchHistory history={matchState.history} />
    </div>
  );
}