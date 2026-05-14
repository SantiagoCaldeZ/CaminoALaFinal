import type { MatchProgressionReward } from "@/lib/game/progression";

type ProgressionPanelProps = {
  reward: MatchProgressionReward | null | undefined;
};

export function ProgressionPanel({ reward }: ProgressionPanelProps) {
  if (reward === undefined) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Progreso del equipo
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Calculando progreso obtenido...
        </p>
      </section>
    );
  }

  if (!reward) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Progreso del equipo
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Este partido ya había otorgado progreso.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
        Progreso obtenido
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs font-bold text-zinc-500">Resultado</p>
          <h3 className="mt-1 text-2xl font-black text-zinc-50">
            {reward.resultLabel}
          </h3>

          <p className="mt-4 text-xs font-bold text-zinc-500">Reputación</p>
          <p className="mt-1 text-3xl font-black text-emerald-300">
            +{reward.reputationGained}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            Jugadores que ganaron XP
          </p>

          {reward.playerGains.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-400">
              Ningún jugador destacó lo suficiente para ganar XP adicional.
            </p>
          ) : (
            <div className="mt-3 grid gap-2">
              {reward.playerGains.map((gain) => (
                <div
                  key={gain.playerId}
                  className="rounded-xl bg-black/30 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-zinc-100">
                        {gain.playerName}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {gain.reason}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-emerald-300">
                        +{gain.xpGained} XP
                      </p>

                      {gain.leveledUp && (
                        <p className="mt-1 text-xs font-bold text-amber-300">
                          Nivel {gain.previousLevel} → {gain.newLevel}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}