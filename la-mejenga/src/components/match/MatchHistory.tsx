import type { MatchEvent } from "@/lib/game/types";
import { Panel } from "@/components/ui/Panel";

type MatchHistoryProps = {
  history: MatchEvent[];
};

function formatOutcome(outcome: string): string {
  return outcome.replaceAll("_", " ");
}

export function MatchHistory({ history }: MatchHistoryProps) {
  const latest = history.slice(-5).reverse();

  return (
    <Panel>
      <h2 className="text-lg font-black text-zinc-50">Historial reciente</h2>

      {latest.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">Todavía no hay jugadas registradas.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {latest.map((event) => (
            <article key={event.id} className="rounded-xl bg-zinc-950 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-emerald-300">Min {event.minute}</p>
                  <p className="mt-1 text-sm font-black capitalize text-zinc-100">
                    {formatOutcome(event.outcome)}
                  </p>
                </div>
                <p className="text-sm font-black text-zinc-300">
                  {event.playerScore} - {event.rivalScore}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
}