import Link from "next/link";
import { TACTICAL_CARDS } from "@/lib/game/cards";
import { MATCH_SITUATIONS } from "@/lib/game/situations";
import { TEAMS } from "@/lib/game/teams";

export default function MatchPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-emerald-300">Sprint 1</p>
            <h1 className="text-3xl font-black">Base del partido</h1>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            Volver
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Equipos cargados</p>
            <p className="mt-2 text-4xl font-black text-emerald-300">{TEAMS.length}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Cartas tácticas</p>
            <p className="mt-2 text-4xl font-black text-emerald-300">
              {TACTICAL_CARDS.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Momentos clave</p>
            <p className="mt-2 text-4xl font-black text-emerald-300">
              {MATCH_SITUATIONS.length}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-xl font-bold">Equipos iniciales</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {TEAMS.map((team) => (
              <article key={team.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black">{team.name}</h3>
                    <p className="mt-1 text-sm capitalize text-emerald-300">{team.style}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-300">{team.description}</p>

                <div className="mt-4">
                  <p className="text-sm font-bold text-zinc-200">Jugadores</p>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                    {team.players.map((player) => (
                      <li key={player.id}>
                        {player.name} “{player.nickname}” · {player.role}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-xl font-bold">Siguiente paso</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            La base de datos mock ya está cargada. El próximo sprint debe construir el motor:
            iniciar partido, generar mano de cartas, elegir carta rival, resolver jugada,
            actualizar marcador, energía, momentum e historial.
          </p>
        </section>
      </div>
    </main>
  );
}