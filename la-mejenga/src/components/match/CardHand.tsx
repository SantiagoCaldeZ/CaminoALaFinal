import type { MatchSituation, TacticalCard } from "@/lib/game/types";
import { TacticalCardView } from "./TacticalCardView";

type CardHandProps = {
  cards: TacticalCard[];
  situation: MatchSituation;
  currentEnergy: number;
  onSelectCard: (card: TacticalCard) => void;
};

export function CardHand({
  cards,
  situation,
  currentEnergy,
  onSelectCard,
}: CardHandProps) {
  const hasAffordableCard = cards.some(
    (card) => card.energyCost <= currentEnergy,
  );

  const cheapestEnergyCost =
    cards.length > 0 ? Math.min(...cards.map((card) => card.energyCost)) : 0;

  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-950/55 p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-200">
            Decisión táctica
          </p>

          <h2 className="mt-1 text-3xl font-black text-zinc-50">
            Elegí tu carta
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Pensá el momento, cuidá la energía y buscá cambiar el partido.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200/25 bg-emerald-300/10 px-4 py-3 text-right">
          <p className="text-[11px] font-black uppercase tracking-wide text-emerald-100">
            Energía disponible
          </p>

          <p className="mt-1 text-2xl font-black text-lime-200">
            {currentEnergy}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const isAffordable = card.energyCost <= currentEnergy;

          const isEmergencyOption =
            !hasAffordableCard && card.energyCost === cheapestEnergyCost;

          const disabled = !isAffordable && !isEmergencyOption;

          return (
            <TacticalCardView
              key={card.id}
              card={card}
              situation={situation}
              currentEnergy={currentEnergy}
              disabled={disabled}
              isEmergencyOption={isEmergencyOption}
              onSelect={onSelectCard}
            />
          );
        })}
      </div>
    </section>
  );
}