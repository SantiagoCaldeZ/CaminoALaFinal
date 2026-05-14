import { getCardById } from "@/lib/game/cards";
import { getOutcomeMeta } from "@/lib/game/outcome-meta";
import type { MatchEvent } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type PlayResolutionPanelProps = {
  event: MatchEvent;
  onContinue: () => void;
  isLastMoment: boolean;
};

type OutcomeTone = ReturnType<typeof getOutcomeMeta>["tone"];

function getToneClasses(tone: OutcomeTone): string {
  if (tone === "success") {
    return "border-emerald-300/45 bg-emerald-300/10 shadow-emerald-950/25";
  }

  if (tone === "danger") {
    return "border-rose-300/45 bg-rose-300/10 shadow-rose-950/25";
  }

  if (tone === "warning") {
    return "border-amber-300/45 bg-amber-300/10 shadow-amber-950/25";
  }

  if (tone === "info") {
    return "border-sky-300/45 bg-sky-300/10 shadow-sky-950/25";
  }

  return "border-white/10 bg-zinc-950/75 shadow-black/25";
}

function getBadgeVariant(
  tone: OutcomeTone,
): "success" | "danger" | "warning" | "info" | "default" {
  if (tone === "success") return "success";
  if (tone === "danger") return "danger";
  if (tone === "warning") return "warning";
  if (tone === "info") return "info";
  return "default";
}

function formatSignedNumber(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

export function PlayResolutionPanel({
  event,
  onContinue,
  isLastMoment,
}: PlayResolutionPanelProps) {
  const playerCard = getCardById(event.playerCardId);
  const rivalCard = getCardById(event.rivalCardId);
  const meta = getOutcomeMeta(event.outcome);

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-2xl backdrop-blur ${getToneClasses(
        meta.tone,
      )}`}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-200">
            Resolución de jugada
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight text-zinc-50">
            {meta.headline}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
            {meta.description}
          </p>
        </div>

        <Badge variant={getBadgeVariant(meta.tone)}>{meta.label}</Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <CardReveal
          label="Tu carta"
          tone="player"
          cardName={playerCard?.name ?? event.playerCardId}
          protagonistLabel="Protagonista"
          protagonistName={event.protagonistName}
        />

        <div className="flex items-center justify-center">
          <div className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-center shadow-xl shadow-black/25">
            <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
              Marcador
            </p>

            <p className="mt-1 text-3xl font-black text-zinc-50">
              {event.playerScore} - {event.rivalScore}
            </p>
          </div>
        </div>

        <CardReveal
          label="Carta rival revelada"
          tone="rival"
          cardName={rivalCard?.name ?? event.rivalCardId}
          protagonistLabel="Rival"
          protagonistName={event.rivalProtagonistName}
        />
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
          Narración
        </p>

        <p className="mt-3 text-base leading-8 text-zinc-100">
          {event.narration}
        </p>
      </div>

      <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
        <ImpactStat
          label="Energía"
          value={formatSignedNumber(event.playerEnergyChange)}
          tone={event.playerEnergyChange < 0 ? "bad" : "good"}
        />

        <ImpactStat
          label="Momentum"
          value={formatSignedNumber(event.playerMomentumChange)}
          tone={event.playerMomentumChange >= 0 ? "good" : "bad"}
        />

        <ImpactStat
          label="Energía actual"
          value={`${event.playerEnergy}`}
          tone="neutral"
        />

        <ImpactStat
          label="Lectura interna"
          value={`${event.scoreValue}`}
          tone="neutral"
        />
      </div>

      <Button className="mt-6 w-full sm:w-auto" onClick={onContinue}>
        {isLastMoment ? "Ver resumen final" : "Siguiente jugada"}
      </Button>
    </section>
  );
}

function CardReveal({
  label,
  tone,
  cardName,
  protagonistLabel,
  protagonistName,
}: {
  label: string;
  tone: "player" | "rival";
  cardName: string;
  protagonistLabel: string;
  protagonistName: string;
}) {
  const classes =
    tone === "player"
      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
      : "border-rose-300/25 bg-rose-300/10 text-rose-100";

  return (
    <article className={`rounded-3xl border p-4 ${classes}`}>
      <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-black leading-tight text-zinc-50">
        {cardName}
      </h3>

      <p className="mt-3 text-sm text-zinc-400">
        {protagonistLabel}:{" "}
        <span className="font-bold text-zinc-200">{protagonistName}</span>
      </p>
    </article>
  );
}

function ImpactStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "good" | "bad" | "neutral";
}) {
  const valueClass =
    tone === "good"
      ? "text-emerald-200"
      : tone === "bad"
        ? "text-rose-200"
        : "text-zinc-50";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className={`mt-2 text-2xl font-black ${valueClass}`}>{value}</p>
    </div>
  );
}