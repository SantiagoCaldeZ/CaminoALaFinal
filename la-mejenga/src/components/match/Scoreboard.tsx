import type { MatchState } from "@/lib/game/types";
import { Panel } from "@/components/ui/Panel";

type ScoreboardProps = {
  matchState: MatchState;
  currentMinute?: number;
};

export function Scoreboard({ matchState, currentMinute }: ScoreboardProps) {
  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Tu equipo</p>
          <h2 className="mt-1 text-xl font-black text-zinc-50">{matchState.playerTeam.name}</h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            {matchState.status === "finished" ? "Final" : currentMinute ? `Min ${currentMinute}` : "Partido"}
          </p>
          <p className="mt-1 text-4xl font-black text-zinc-50">
            {matchState.playerScore} - {matchState.rivalScore}
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xs font-bold uppercase tracking-wide text-red-300">Rival</p>
          <h2 className="mt-1 text-xl font-black text-zinc-50">{matchState.rivalTeam.name}</h2>
        </div>
      </div>
    </Panel>
  );
}