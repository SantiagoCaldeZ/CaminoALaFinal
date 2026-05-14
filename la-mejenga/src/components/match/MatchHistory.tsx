import type { MatchEvent } from "@/lib/game/types";
import { formatMatchEvent } from "@/lib/game/event-formatters";
import { EventBadge } from "./EventBadge";

type MatchHistoryProps = {
  events: MatchEvent[];
};

export function MatchHistory({ events }: MatchHistoryProps) {
  const recentEvents = events.slice().reverse();

  return (
    <aside className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/25 backdrop-blur">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
          Crónica
        </p>

        <h2 className="mt-1 text-xl font-black text-zinc-50">
          Historial reciente
        </h2>
      </div>

      {recentEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4">
          <p className="text-sm leading-6 text-zinc-500">
            Todavía no hay jugadas registradas. La historia empieza con tu
            primera carta.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentEvents.map((event) => {
            const formattedEvent = formatMatchEvent(event);

            return (
              <article
                key={event.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20 hover:bg-black/40"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                      Min {event.minute}
                    </p>

                    <h3 className="mt-1 text-base font-black text-zinc-50">
                      {formattedEvent.title}
                    </h3>
                  </div>

                  <EventBadge
                    label={formattedEvent.label}
                    tone={formattedEvent.tone}
                  />
                </div>

                <p className="text-sm leading-relaxed text-zinc-400">
                  {formattedEvent.shortDescription}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                  <p className="text-xs font-bold text-zinc-500">
                    Impacto:{" "}
                    <span className="text-zinc-300">
                      {formattedEvent.impact}
                    </span>
                  </p>

                  <p className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-1 text-sm font-black text-zinc-50">
                    {event.playerScore} - {event.rivalScore}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </aside>
  );
}