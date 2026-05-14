import type { MatchSituation } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";

type SituationPanelProps = {
  situation: MatchSituation;
  momentNumber: number;
  totalMoments: number;
};

const situationLabels: Record<MatchSituation["type"], string> = {
  attack: "Ataque",
  defense: "Defensa",
  midfield: "Medio campo",
  set_piece: "Balón parado",
  special: "Especial",
};

export function SituationPanel({
  situation,
  momentNumber,
  totalMoments,
}: SituationPanelProps) {
  const progress = Math.round((momentNumber / totalMoments) * 100);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/75 p-5 shadow-2xl shadow-black/25 backdrop-blur">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-lime-200 via-emerald-300 to-cyan-300" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
            Momento {momentNumber}/{totalMoments} · Minuto {situation.minute}
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-50">
            {situation.title}
          </h2>
        </div>

        <Badge variant={situation.type === "special" ? "warning" : "info"}>
          {situationLabels[situation.type]}
        </Badge>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">
        {situation.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[11px] font-black uppercase tracking-wide text-zinc-500">
          <span>Progreso de momentos</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-black/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-lime-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}