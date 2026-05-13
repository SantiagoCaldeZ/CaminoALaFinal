import { getOutcomeMeta } from "@/lib/game/outcome-meta";
import type { MatchEvent } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";

type MatchHistoryProps = {
  history: MatchEvent[];
};

function getBadgeVariant(tone: ReturnType<typeof getOutcomeMeta>["tone"]): "success" | "danger" | "warning" | "info" | "default" {
  if (tone === "success") return "success";
  if (tone === "danger") return "danger";
  if (tone === "warning") return "warning";
  if (tone === "info") return "info";
  return "default";
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
          {latest.map((event) => {
            const meta = getOutcomeMeta(event.outcome);

            return (
              <article key={event.id} className="rounded-xl bg-zinc-950 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-emerald-300">Min {event.minute}</p>
                    <p className="mt-1 text-sm font-black text-zinc-100">{meta.label}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
                      {event.narration}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge variant={getBadgeVariant(meta.tone)}>{meta.label}</Badge>
                    <p className="mt-2 text-sm font-black text-zinc-300">
                      {event.playerScore} - {event.rivalScore}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Panel>
  );
}