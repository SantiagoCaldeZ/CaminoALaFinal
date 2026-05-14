import { GameButtonLink } from "@/components/ui/GameButton";
import { GameCard } from "@/components/ui/GameCard";
import { GameShell } from "@/components/ui/GameShell";
import { SectionTitle } from "@/components/ui/SectionTitle";

const modeCards = [
  {
    title: "Partido rápido",
    href: "/teams",
    badge: "Clásico de barrio",
    description:
      "Elegí tu equipo, definí el rival y resolvé el partido con cartas tácticas, energía y momentum.",
    cta: "Jugar ahora",
    variant: "success" as const,
  },
  {
    title: "Camino a la Final",
    href: "/camino",
    badge: "Modo torneo",
    description:
      "Ganá semifinal, superá la final y coroná al barrio. Si empatás, todo se define por penales.",
    cta: "Entrar al torneo",
    variant: "warning" as const,
  },
  {
    title: "Progreso",
    href: "/progreso",
    badge: "Tu historia",
    description:
      "Revisá reputación, récord, trofeos, niveles de jugadores y la evolución de tus equipos.",
    cta: "Ver progreso",
    variant: "info" as const,
  },
];

const quickStats = [
  { value: "6", label: "equipos" },
  { value: "20", label: "cartas tácticas" },
  { value: "8", label: "momentos clave" },
  { value: "XP", label: "progresión" },
];

export default function HomePage() {
  return (
    <GameShell maxWidth="7xl" contentClassName="space-y-10 py-4 sm:py-8">
      <section className="grid min-h-[78vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-lime-200/30 bg-lime-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-lime-100 shadow-xl shadow-black/20">
            Sprint 12 · Interfaz 2.0
          </div>

          <SectionTitle
            eyebrow="Fútbol de barrio táctico"
            title={
              <>
                La Mejenga:{" "}
                <span className="text-lime-200">Camino a la Final</span>
              </>
            }
            description="Un juego rápido, táctico y rejugable donde cada carta puede cambiar el partido, cada gol pesa y cada torneo construye la historia de tu equipo."
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GameButtonLink href="/teams" size="lg">
              Jugar partido rápido
            </GameButtonLink>

            <GameButtonLink href="/camino" size="lg" variant="tournament">
              Camino a la Final
            </GameButtonLink>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 text-center shadow-xl shadow-black/20 backdrop-blur"
              >
                <p className="text-2xl font-black text-lime-200">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <GameCard variant="elevated" className="relative p-6 lg:p-7">
          <div className="absolute right-6 top-6 rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-100">
            Partido en vivo
          </div>

          <div className="mt-9 rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                  Tu barrio
                </p>
                <h2 className="mt-2 text-xl font-black text-zinc-50">
                  Cemento FC
                </h2>
              </div>

              <div className="rounded-2xl border border-lime-200/30 bg-lime-200 px-5 py-4 text-4xl font-black text-zinc-950 shadow-2xl shadow-lime-950/30">
                2-1
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-wide text-rose-200">
                  Rival
                </p>
                <h2 className="mt-2 text-xl font-black text-zinc-50">
                  Los del Parque
                </h2>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full border border-white/10 bg-zinc-950">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300" />
            </div>

            <div className="mt-2 flex justify-between text-[11px] font-bold text-zinc-500">
              <span>1&apos;</span>
              <span>Min 72</span>
              <span>90&apos;</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/20 bg-emerald-300/10 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                Carta elegida
              </p>
              <h3 className="mt-2 text-lg font-black text-zinc-50">
                Presión alta del barrio
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Riesgosa, intensa y capaz de cambiar el momentum.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200/20 bg-amber-300/10 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-amber-100">
                Recompensa
              </p>
              <h3 className="mt-2 text-lg font-black text-zinc-50">
                +18 XP · +10 reputación
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Cada partido deja consecuencias para el equipo.
              </p>
            </div>
          </div>
        </GameCard>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {modeCards.map((mode) => (
          <GameCard
            key={mode.title}
            variant={mode.variant}
            as="article"
            className="flex min-h-72 flex-col"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300">
              {mode.badge}
            </p>

            <h2 className="mt-3 text-2xl font-black text-zinc-50">
              {mode.title}
            </h2>

            <p className="mt-3 flex-1 text-sm leading-6 text-zinc-300">
              {mode.description}
            </p>

            <GameButtonLink
              href={mode.href}
              variant={
                mode.title === "Camino a la Final" ? "tournament" : "secondary"
              }
              className="mt-5 w-full"
            >
              {mode.cta}
            </GameButtonLink>
          </GameCard>
        ))}
      </section>
    </GameShell>
  );
}