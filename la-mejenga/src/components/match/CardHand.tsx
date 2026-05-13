import type { MatchSituation, TacticalCard } from "@/lib/game/types";
import { TacticalCardView } from "./TacticalCardView";

type CardHandProps = {
  cards: TacticalCard[];
  situation: MatchSituation;
  currentEnergy: number;
  onSelectCard: (card: TacticalCard) => void;
};

export function CardHand({ cards, situation, currentEnergy, onSelectCard }: CardHandProps) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-emerald-300">Elegí tu carta</p>
          <h2 className="text-2xl font-black text-zinc-50">Decisión táctica</h2>
        </div>
        <p className="text-sm text-zinc-400">Energía disponible: {currentEnergy}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <TacticalCardView
            key={card.id}
            card={card}
            situation={situation}
            currentEnergy={currentEnergy}
            disabled={card.energyCost > currentEnergy}
            onSelect={onSelectCard}
          />
        ))}
      </div>
    </section>
  );
}