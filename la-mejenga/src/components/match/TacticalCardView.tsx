import { getCardAdvice } from "@/lib/game/card-advice";
import type { MatchSituation, TacticalCard } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";

type TacticalCardViewProps = {
  card: TacticalCard;
  situation: MatchSituation;
  currentEnergy: number;
  disabled?: boolean;
  onSelect?: (card: TacticalCard) => void;
};

function getBadgeVariant(type: TacticalCard["type"]): "success" | "danger" | "info" | "warning" {
  if (type === "attack") return "danger";
  if (type === "defense") return "success";
  if (type === "midfield") return "info";
  return "warning";
}

function getAdviceClasses(tone: ReturnType<typeof getCardAdvice>["tone"]): string {
  if (tone === "recommended") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (tone === "risky") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  if (tone === "expensive") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  return "border-zinc-700 bg-zinc-800 text-zinc-300";
}

export function TacticalCardView({
  card,
  situation,
  currentEnergy,
  disabled = false,
  onSelect,
}: TacticalCardViewProps) {
  const advice = getCardAdvice(card, situation, currentEnergy);
  const isDisabled = disabled || card.energyCost > currentEnergy;

  return (
    <button
      disabled={isDisabled}
      onClick={() => onSelect?.(card)}
      className={`group flex min-h-[290px] w-full flex-col rounded-2xl border bg-zinc-900 p-5 text-left transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        advice.tone === "recommended"
          ? "border-emerald-400/40 hover:border-emerald-300"
          : "border-zinc-800 hover:border-emerald-400/60"
      } hover:-translate-y-1 hover:bg-zinc-800 disabled:hover:translate-y-0 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900`}
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant={getBadgeVariant(card.type)}>{card.type}</Badge>
        <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-emerald-300">
          {card.energyCost} EN
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black text-zinc-50">{card.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{card.description}</p>

      <div className={`mt-4 rounded-xl border px-3 py-2 text-xs font-bold ${getAdviceClasses(advice.tone)}`}>
        <p>{advice.label}</p>
        <p className="mt-1 font-medium opacity-80">{advice.description}</p>
      </div>

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