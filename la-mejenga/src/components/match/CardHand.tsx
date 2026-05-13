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
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-emerald-300">Elegí tu carta</p>
          <h2 className="text-2xl font-black text-zinc-50">Decisión táctica</h2>
        </div>

        <p className="text-sm text-zinc-400">
          Energía disponible: {currentEnergy}
        </p>
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
              onSelect={onSelectCard}
            />
          );
        })}
      </div>
    </section>
  );
}