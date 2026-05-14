import { getCardAdvice } from "@/lib/game/card-advice";
import { isSignatureCard } from "@/lib/game/signature-cards";
import type { MatchSituation, TacticalCard } from "@/lib/game/types";

type TacticalCardViewProps = {
  card: TacticalCard;
  situation: MatchSituation;
  currentEnergy: number;
  disabled?: boolean;
  isEmergencyOption?: boolean;
  onSelect?: (card: TacticalCard) => void;
};

type CardVisual = {
  label: string;
  icon: string;
  frame: string;
  accent: string;
  chip: string;
};

const cardVisuals: Record<TacticalCard["type"], CardVisual> = {
  attack: {
    label: "Ataque",
    icon: "⚡",
    frame:
      "border-rose-300/35 bg-rose-400/10 hover:border-rose-200/70",
    accent: "from-rose-300 via-orange-300 to-amber-200",
    chip: "border-rose-200/30 bg-rose-300/10 text-rose-100",
  },
  defense: {
    label: "Defensa",
    icon: "🛡️",
    frame:
      "border-emerald-300/35 bg-emerald-400/10 hover:border-emerald-200/70",
    accent: "from-emerald-300 via-teal-300 to-cyan-200",
    chip: "border-emerald-200/30 bg-emerald-300/10 text-emerald-100",
  },
  midfield: {
    label: "Medio",
    icon: "🎯",
    frame:
      "border-sky-300/35 bg-sky-400/10 hover:border-sky-200/70",
    accent: "from-sky-300 via-cyan-300 to-lime-200",
    chip: "border-sky-200/30 bg-sky-300/10 text-sky-100",
  },
  special: {
    label: "Especial",
    icon: "✨",
    frame:
      "border-amber-300/40 bg-amber-300/10 hover:border-amber-200/80",
    accent: "from-amber-200 via-orange-300 to-lime-200",
    chip: "border-amber-200/35 bg-amber-300/10 text-amber-100",
  },
};

function getAdviceClasses(
  tone: ReturnType<typeof getCardAdvice>["tone"],
): string {
  if (tone === "recommended") {
    return "border-emerald-300/35 bg-emerald-300/10 text-emerald-100";
  }

  if (tone === "risky") {
    return "border-amber-300/35 bg-amber-300/10 text-amber-100";
  }

  if (tone === "expensive") {
    return "border-rose-300/35 bg-rose-300/10 text-rose-100";
  }

  return "border-white/10 bg-white/5 text-zinc-300";
}

function getStatTone(value: number, type: "power" | "risk"): string {
  if (type === "power") {
    if (value >= 75) return "text-lime-200";
    if (value >= 60) return "text-emerald-200";
    return "text-zinc-100";
  }

  if (value >= 70) return "text-rose-200";
  if (value >= 50) return "text-amber-200";
  return "text-emerald-200";
}

export function TacticalCardView({
  card,
  situation,
  currentEnergy,
  disabled = false,
  isEmergencyOption = false,
  onSelect,
}: TacticalCardViewProps) {
  const advice = getCardAdvice(card, situation, currentEnergy);
  const visual = cardVisuals[card.type];
  const isSignature = isSignatureCard(card.id);
  const isTooExpensive = card.energyCost > currentEnergy;

  return (
    <button
      disabled={disabled}
      onClick={() => onSelect?.(card)}
      className={`group relative flex min-h-[330px] w-full flex-col overflow-hidden rounded-3xl border p-4 text-left shadow-xl shadow-black/25 transition duration-200 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${
        isSignature
          ? "border-amber-200/70 bg-amber-300/10 hover:border-amber-100"
          : visual.frame
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${visual.accent}`}
      />

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/15" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${visual.chip}`}
          >
            <span className="mr-1">{visual.icon}</span>
            {visual.label}
          </span>

          {isSignature && (
            <span className="rounded-full border border-amber-200/50 bg-amber-200/15 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-amber-100">
              Insignia
            </span>
          )}

          {isEmergencyOption && (
            <span className="rounded-full border border-sky-200/40 bg-sky-300/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-sky-100">
              Emergencia
            </span>
          )}
        </div>

        <span
          className={`rounded-2xl border px-3 py-2 text-xs font-black ${
            isTooExpensive
              ? "border-rose-200/30 bg-rose-300/10 text-rose-100"
              : "border-lime-200/30 bg-lime-200/10 text-lime-100"
          }`}
        >
          {card.energyCost} EN
        </span>
      </div>

      <div className="relative z-10 mt-5">
        <h3 className="text-2xl font-black leading-tight text-zinc-50">
          {card.name}
        </h3>

        <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-300">
          {card.description}
        </p>
      </div>

      <div
        className={`relative z-10 mt-4 rounded-2xl border px-3 py-3 text-xs font-bold leading-5 ${getAdviceClasses(
          advice.tone,
        )}`}
      >
        <p className="font-black uppercase tracking-wide">{advice.label}</p>
        <p className="mt-1 opacity-85">{advice.description}</p>
      </div>

      <div className="relative z-10 mt-auto grid grid-cols-3 gap-2 pt-5 text-center text-xs font-bold text-zinc-200">
        <CardMetric
          label="Poder"
          value={card.basePower}
          className={getStatTone(card.basePower, "power")}
        />

        <CardMetric
          label="Riesgo"
          value={card.risk}
          className={getStatTone(card.risk, "risk")}
        />

        <CardMetric
          label="Energía"
          value={card.energyCost}
          className={isTooExpensive ? "text-rose-200" : "text-lime-200"}
        />
      </div>
    </button>
  );
}

function CardMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
      <p className="text-[11px] font-black uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className={`mt-1 text-xl font-black ${className}`}>{value}</p>
    </div>
  );
}