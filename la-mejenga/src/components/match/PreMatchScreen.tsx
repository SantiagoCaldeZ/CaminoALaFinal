import Link from "next/link";
import type { PlayerRole } from "@/lib/game/types";
import { getTeamStyleLabel, type Team } from "@/lib/game/teams";
import { getMatchPreview } from "@/lib/game/match-preview";
import { getTeamSignatureCard } from "@/lib/game/signature-cards";

type PreMatchScreenProps = {
  playerTeam: Team;
  rivalTeam: Team;
  onStartMatch: () => void;
};

const roleLabels: Record<PlayerRole, string> = {
  goalkeeper: "Portero",
  defender: "Defensa",
  midfielder: "Medio",
  forward: "Delantero",
  utility: "Comodín",
};

function StatBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-xs text-zinc-400">
        <span>{label}</span>
        <span className="font-bold text-zinc-100">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function TeamPreviewCard({
  team,
  label,
}: {
  team: Team;
  label: string;
}) {
  const mainPlayers = team.players.slice(0, 3);
  const signatureCard = getTeamSignatureCard(team.id);

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            {label}
          </p>
          <h2 className="mt-2 text-2xl font-black text-zinc-50">{team.name}</h2>
          <p className="mt-1 text-sm text-zinc-400">{team.city}</p>
        </div>

        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-200">
          {getTeamStyleLabel(team.style)}
        </span>
      </div>

      <div className="mb-5 flex gap-2">
        <span
          className="h-7 w-7 rounded-full border border-white/10"
          style={{ backgroundColor: team.colors.primary }}
        />
        <span
          className="h-7 w-7 rounded-full border border-white/10"
          style={{ backgroundColor: team.colors.secondary }}
        />
      </div>

      <p className="mb-5 text-sm leading-6 text-zinc-300">{team.description}</p>

      <div className="mb-5 grid gap-3">
        <StatBar label="Ataque" value={team.stats.attack} />
        <StatBar label="Defensa" value={team.stats.defense} />
        <StatBar label="Medio campo" value={team.stats.midfield} />
        <StatBar label="Energía" value={team.stats.energy} />
        <StatBar label="Mentalidad" value={team.stats.mentality} />
      </div>

      {signatureCard && (
        <div className="mb-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-amber-300">
            Carta insignia
          </p>

          <h3 className="mt-2 text-lg font-black text-zinc-50">
            {signatureCard.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {signatureCard.description}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-black/30 p-2">
              <p className="text-zinc-500">Poder</p>
              <p className="font-black text-zinc-100">{signatureCard.basePower}</p>
            </div>

            <div className="rounded-lg bg-black/30 p-2">
              <p className="text-zinc-500">Riesgo</p>
              <p className="font-black text-zinc-100">{signatureCard.risk}</p>
            </div>

            <div className="rounded-lg bg-black/30 p-2">
              <p className="text-zinc-500">Energía</p>
              <p className="font-black text-zinc-100">{signatureCard.energyCost}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-zinc-900/80 p-4">
          <p className="mb-2 text-xs font-black uppercase text-emerald-300">
            Fortalezas
          </p>
          <ul className="space-y-1 text-sm text-zinc-300">
            {team.strengths.map((strength) => (
              <li key={strength}>• {strength}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-zinc-900/80 p-4">
          <p className="mb-2 text-xs font-black uppercase text-rose-300">
            Debilidades
          </p>
          <ul className="space-y-1 text-sm text-zinc-300">
            {team.weaknesses.map((weakness) => (
              <li key={weakness}>• {weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-zinc-900/80 p-4">
        <p className="mb-3 text-xs font-black uppercase text-zinc-400">
          Jugadores clave
        </p>

        <div className="grid gap-2">
          {mainPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2"
            >
              <div>
                <p className="text-sm font-bold text-zinc-100">{player.name}</p>
                <p className="text-xs text-zinc-500">{player.trait}</p>
              </div>
              <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs font-bold text-zinc-300">
                {roleLabels[player.role]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function PreMatchScreen({
  playerTeam,
  rivalTeam,
  onStartMatch,
}: PreMatchScreenProps) {
  const preview = getMatchPreview(playerTeam, rivalTeam);
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <p className="text-sm font-black text-emerald-300">La Mejenga</p>
          <h1 className="mt-2 text-3xl font-black text-zinc-50">
            Previa del partido
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Revisá el enfrentamiento antes de iniciar la mejenga.
          </p>
        </div>

        <Link
          href="/teams"
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:bg-zinc-900"
        >
          Cambiar equipos
        </Link>
      </header>

      <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-wide text-zinc-500">
          Enfrentamiento
        </p>

        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="text-sm font-bold text-emerald-300">Tu equipo</p>
            <h2 className="mt-1 text-2xl font-black text-zinc-50">
              {playerTeam.name}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black px-6 py-4 text-3xl font-black text-zinc-50">
            VS
          </div>

          <div>
            <p className="text-sm font-bold text-rose-300">Rival</p>
            <h2 className="mt-1 text-2xl font-black text-zinc-50">
              {rivalTeam.name}
            </h2>
          </div>
        </div>
      </section>

            <section className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            Lectura táctica
          </p>

          <h2 className="mt-2 text-2xl font-black text-zinc-50">
            {preview.tempoLabel}
          </h2>

          <div className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300">
            <p>{preview.favoriteLabel}</p>
            <p>{preview.playerAdvantage}</p>
            <p>{preview.rivalThreat}</p>
            <p className="font-bold text-zinc-100">{preview.tacticalKey}</p>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
              Recomendación
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {preview.recommendation}
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
            Comparación rápida
          </p>

          <div className="mt-4 space-y-3">
            {preview.comparisons.map((comparison) => (
              <div key={comparison.key}>
                <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-zinc-300">
                    {comparison.label}
                  </span>
                  <span
                    className={
                      comparison.leader === "player"
                        ? "font-black text-emerald-300"
                        : comparison.leader === "rival"
                          ? "font-black text-rose-300"
                          : "font-black text-zinc-400"
                    }
                  >
                    {comparison.playerValue} - {comparison.rivalValue}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${comparison.playerValue}%` }}
                    />
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-rose-400"
                      style={{ width: `${comparison.rivalValue}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <TeamPreviewCard team={playerTeam} label="Tu equipo" />
        <TeamPreviewCard team={rivalTeam} label="Rival" />
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onStartMatch}
          className="rounded-xl bg-emerald-400 px-8 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
        >
          Iniciar partido
        </button>

        <Link
          href="/"
          className="rounded-xl border border-zinc-700 px-8 py-3 text-sm font-black text-zinc-100 transition hover:bg-zinc-900"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}