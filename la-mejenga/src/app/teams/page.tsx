"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  TEAMS,
  getDefaultRivalTeam,
  getRandomRivalTeam,
  getTeamStyleLabel,
  type Team,
} from "@/lib/game/teams";

export default function TeamsPage() {
  const [selectedPlayerTeam, setSelectedPlayerTeam] = useState<Team | null>(null);
  const [selectedRivalTeam, setSelectedRivalTeam] = useState<Team | null>(null);

  const rivalOptions = useMemo(() => {
    if (!selectedPlayerTeam) {
      return [];
    }

    return TEAMS.filter((team) => team.id !== selectedPlayerTeam.id);
  }, [selectedPlayerTeam]);

  function handleSelectPlayerTeam(team: Team) {
    setSelectedPlayerTeam(team);
    setSelectedRivalTeam(getDefaultRivalTeam(team.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleChangePlayerTeam() {
    setSelectedPlayerTeam(null);
    setSelectedRivalTeam(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRandomRival() {
    if (!selectedPlayerTeam) {
      return;
    }

    setSelectedRivalTeam(getRandomRivalTeam(selectedPlayerTeam.id));
  }

  const matchHref =
    selectedPlayerTeam && selectedRivalTeam
      ? `/match?team=${selectedPlayerTeam.id}&rival=${selectedRivalTeam.id}`
      : "/teams";

  return (
    <main className="min-h-screen bg-[#050607] text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-bold text-emerald-400">La Mejenga</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              {selectedPlayerTeam ? "Elegí el rival" : "Elegí tu equipo"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              {selectedPlayerTeam
                ? "Seleccioná contra quién querés jugar este partido rápido."
                : "Cada equipo tiene un estilo distinto. Primero escogé tu equipo y luego definí el rival."}
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </header>

        {!selectedPlayerTeam && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TEAMS.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                actionLabel={`Elegir a ${team.shortName}`}
                onClick={() => handleSelectPlayerTeam(team)}
              />
            ))}
          </div>
        )}

        {selectedPlayerTeam && (
          <div className="space-y-8">
            <section className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                    Tu equipo
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-zinc-50">
                    {selectedPlayerTeam.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {selectedPlayerTeam.city} ·{" "}
                    {getTeamStyleLabel(selectedPlayerTeam.style)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleChangePlayerTeam}
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-zinc-100 transition hover:bg-white/10"
                  >
                    Cambiar mi equipo
                  </button>

                  <button
                    type="button"
                    onClick={handleRandomRival}
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-zinc-100 transition hover:bg-white/10"
                  >
                    Rival aleatorio
                  </button>

                  <Link
                    href={matchHref}
                    className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
                  >
                    Ir a la previa
                  </Link>
                </div>
              </div>

              {selectedRivalTeam && (
                <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                    Enfrentamiento seleccionado
                  </p>
                  <p className="mt-2 text-lg font-black text-zinc-50">
                    {selectedPlayerTeam.name} vs {selectedRivalTeam.name}
                  </p>
                </div>
              )}
            </section>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {rivalOptions.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  selected={selectedRivalTeam?.id === team.id}
                  actionLabel={
                    selectedRivalTeam?.id === team.id
                      ? "Rival seleccionado"
                      : `Elegir a ${team.shortName}`
                  }
                  onClick={() => setSelectedRivalTeam(team)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function TeamCard({
  team,
  selected = false,
  actionLabel,
  onClick,
}: {
  team: Team;
  selected?: boolean;
  actionLabel: string;
  onClick: () => void;
}) {
  return (
    <article
      className={`rounded-2xl border p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 ${
        selected
          ? "border-emerald-400/70 bg-emerald-400/10"
          : "border-white/10 bg-[#151619] hover:border-emerald-400/50"
      }`}
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

      <button
        type="button"
        onClick={onClick}
        className={`block w-full rounded-xl px-4 py-3 text-center text-sm font-black transition ${
          selected
            ? "bg-emerald-300 text-black"
            : "bg-emerald-400 text-black hover:bg-emerald-300"
        }`}
      >
        {actionLabel}
      </button>
    </article>
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