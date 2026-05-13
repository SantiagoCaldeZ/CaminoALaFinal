import type { TacticalCard } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";

type TacticalCardViewProps = {
  card: TacticalCard;
  disabled?: boolean;
  onSelect?: (card: TacticalCard) => void;
};

function getBadgeVariant(type: TacticalCard["type"]): "success" | "danger" | "info" | "warning" {
  if (type === "attack") return "danger";
  if (type === "defense") return "success";
  if (type === "midfield") return "info";
  return "warning";
}

export function TacticalCardView({ card, disabled = false, onSelect }: TacticalCardViewProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => onSelect?.(card)}
      className="group flex min-h-[260px] w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-zinc-800 disabled:hover:translate-y-0 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant={getBadgeVariant(card.type)}>{card.type}</Badge>
        <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-emerald-300">
          {card.energyCost} EN
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black text-zinc-50">{card.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{card.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs font-bold text-zinc-200">
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Poder</p>
          <p className="mt-1 text-lg text-zinc-50">{card.basePower}</p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Riesgo</p>
          <p className="mt-1 text-lg text-zinc-50">{card.risk}</p>
        </div>
      </div>
    </button>
  );
}