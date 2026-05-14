import Link from "next/link";
import { TEAMS, getDefaultRivalTeam, getTeamStyleLabel } from "@/lib/game/teams";

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-[#050607] text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-bold text-emerald-400">La Mejenga</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Elegí tu equipo
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Cada equipo tiene un estilo distinto. Por ahora esta selección
              prepara el flujo del partido rápido; luego vamos a conectar estos
              datos directamente con el motor del juego.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {TEAMS.map((team) => {
            const rival = getDefaultRivalTeam(team.id);

            return (
              <article
                key={team.id}
                className="rounded-2xl border border-white/10 bg-[#151619] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/50"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-400">
                      {team.city}
                    </p>
                    <h2 className="mt-2 text-2xl font-black">{team.name}</h2>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-zinc-300">
                    {getTeamStyleLabel(team.style)}
                  </span>
                </div>

                <div className="mb-5 flex gap-2">
                  <span
                    className="h-8 w-8 rounded-full border border-white/20"
                    style={{ backgroundColor: team.colors.primary }}
                  />
                  <span
                    className="h-8 w-8 rounded-full border border-white/20"
                    style={{ backgroundColor: team.colors.secondary }}
                  />
                </div>

                <p className="mb-5 min-h-16 text-sm leading-6 text-zinc-400">
                  {team.description}
                </p>

                <div className="mb-5 grid grid-cols-2 gap-2 text-sm">
                  <Stat label="Ataque" value={team.stats.attack} />
                  <Stat label="Defensa" value={team.stats.defense} />
                  <Stat label="Medio" value={team.stats.midfield} />
                  <Stat label="Energía" value={team.stats.energy} />
                  <Stat label="Mentalidad" value={team.stats.mentality} />
                </div>

                <Link
                  href={`/match?team=${team.id}&rival=${rival.id}`}
                  className="block rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-black text-black transition hover:bg-emerald-300"
                >
                  Jugar con {team.shortName}
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-black/35 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}