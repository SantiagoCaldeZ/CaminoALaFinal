import { TEAMS, getTeamStyleLabel, type Team } from "@/lib/game/teams";
import Link from "next/link";

type CaminoTeamSelectProps = {
  onSelectTeam: (team: Team) => void;
};

export function CaminoTeamSelect({ onSelectTeam }: CaminoTeamSelectProps) {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-zinc-800 pb-7">
          <div>
            <p className="text-sm font-black text-emerald-300">La Mejenga</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Elegí tu equipo
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Este será tu equipo para todo el Camino a la Final. Ganá la
              semifinal, superá la final y coroná al barrio.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:bg-zinc-900"
          >
            Volver al inicio
          </Link>
        </header>

        <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            Modo torneo
          </p>
          <h2 className="mt-2 text-2xl font-black">Camino a la Final</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
            No es solo un partido rápido: cada decisión pesa. Si ganás, seguís.
            Si perdés, el camino termina. Si empatás, todo se define desde el
            punto penal.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TEAMS.map((team) => (
            <TeamCard key={team.id} team={team} onSelectTeam={onSelectTeam} />
          ))}
        </section>
      </section>
    </main>
  );
}

function TeamCard({
  team,
  onSelectTeam,
}: {
  team: Team;
  onSelectTeam: (team: Team) => void;
}) {
  return (
    <article className="group flex min-h-[420px] flex-col rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            {team.city}
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-50">{team.name}</h2>
        </div>

        <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-black text-zinc-300">
          {getTeamStyleLabel(team.style)}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        <span
          className="h-7 w-7 rounded-full border border-white/10"
          style={{ backgroundColor: team.colors.primary }}
        />
        <span
          className="h-7 w-7 rounded-full border border-white/10"
          style={{ backgroundColor: team.colors.secondary }}
        />
      </div>

      <p className="mt-5 min-h-[72px] text-sm leading-6 text-zinc-300">
        {team.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatBox label="Ataque" value={team.stats.attack} />
        <StatBox label="Defensa" value={team.stats.defense} />
        <StatBox label="Medio" value={team.stats.midfield} />
        <StatBox label="Energía" value={team.stats.energy} />
        <StatBox label="Mentalidad" value={team.stats.mentality} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <TraitBox title="Fortalezas" items={team.strengths.slice(0, 2)} />
        <TraitBox title="Riesgos" items={team.weaknesses.slice(0, 2)} danger />
      </div>

      <button
        type="button"
        onClick={() => onSelectTeam(team)}
        className="mt-auto rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
      >
        Empezar con {team.shortName}
      </button>
    </article>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-black/35 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-black text-zinc-50">{value}</p>
    </div>
  );
}

function TraitBox({
  title,
  items,
  danger = false,
}: {
  title: string;
  items: string[];
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl bg-black/30 p-3">
      <p
        className={`text-xs font-black uppercase ${
          danger ? "text-rose-300" : "text-emerald-300"
        }`}
      >
        {title}
      </p>

      <ul className="mt-2 space-y-1 text-xs leading-5 text-zinc-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}