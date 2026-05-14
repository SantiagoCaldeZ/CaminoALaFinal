import type { CaminoProgressionReward } from "@/lib/game/progression";

type CaminoProgressionRewardPanelProps = {
  reward: CaminoProgressionReward | null;
};

export function CaminoProgressionRewardPanel({
  reward,
}: CaminoProgressionRewardPanelProps) {
  if (!reward) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-amber-300/40 bg-amber-300/10 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-amber-300">
        Premio del camino
      </p>

      <div className="mt-3 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-black text-zinc-50">{reward.title}</h2>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {reward.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-black/30 p-4">
              <p className="text-xs font-bold text-zinc-500">Reputación</p>
              <p className="mt-1 text-3xl font-black text-emerald-300">
                +{reward.reputationGained}
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 p-4">
              <p className="text-xs font-bold text-zinc-500">Trofeos</p>
              <p className="mt-1 text-3xl font-black text-amber-300">
                +{reward.trophyGained}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
            XP de torneo
          </p>

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
                    <p className="mt-1 text-xs text-zinc-500">{gain.reason}</p>
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
        </div>
      </div>
    </section>
  );
}