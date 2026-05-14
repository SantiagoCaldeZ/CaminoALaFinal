"use client";

import { useEffect, useMemo, useState } from "react";
import {
  clearProgressionProfile,
  getXpRequiredForNextLevel,
  loadProgressionProfile,
  type PlayerProgress,
  type ProgressionProfile,
  type TeamProgress,
} from "@/lib/game/progression";
import { TEAMS, getTeamById, getTeamStyleLabel, type Team } from "@/lib/game/teams";

type TeamPlayer = Team["players"][number];

function createEmptyPlayerProgress(player: TeamPlayer): PlayerProgress {
  return {
    playerId: player.id,
    playerName: player.name,
    level: 1,
    xp: 0,
    totalXp: 0,
  };
}

function createEmptyTeamProgress(team: Team): TeamProgress {
  return {
    teamId: team.id,
    reputation: 0,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    trophies: 0,
    players: Object.fromEntries(
      team.players.map((player) => [
        player.id,
        createEmptyPlayerProgress(player),
      ]),
    ),
  };
}

function getTeamProgress(profile: ProgressionProfile, team: Team): TeamProgress {
  return profile.teams[team.id] ?? createEmptyTeamProgress(team);
}

function getPlayerProgress(
  teamProgress: TeamProgress,
  player: TeamPlayer,
): PlayerProgress {
  return teamProgress.players[player.id] ?? createEmptyPlayerProgress(player);
}

function getRoleLabel(role: TeamPlayer["role"]): string {
  const labels: Record<TeamPlayer["role"], string> = {
    goalkeeper: "Portero",
    defender: "Defensa",
    midfielder: "Medio",
    forward: "Delantero",
    utility: "Comodín",
  };

  return labels[role];
}

function getRecordText(teamProgress: TeamProgress): string {
  return `${teamProgress.wins}V / ${teamProgress.draws}E / ${teamProgress.losses}D`;
}

export function ProgressionScreen() {
  const [profile, setProfile] = useState<ProgressionProfile | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    TEAMS[0]?.id ?? "",
  );

  useEffect(() => {
    const loadedProfile = loadProgressionProfile();
    const firstTeamWithProgress = TEAMS.find(
      (team) => loadedProfile.teams[team.id]?.matchesPlayed > 0,
    );

    setProfile(loadedProfile);
    setSelectedTeamId(firstTeamWithProgress?.id ?? TEAMS[0]?.id ?? "");
  }, []);

  const selectedTeam = useMemo(
    () => getTeamById(selectedTeamId),
    [selectedTeamId],
  );

  const selectedTeamProgress = useMemo(() => {
    if (!profile) {
      return null;
    }

    return getTeamProgress(profile, selectedTeam);
  }, [profile, selectedTeam]);

  const hasAnyProgress = useMemo(() => {
    if (!profile) {
      return false;
    }

    return Object.values(profile.teams).some(
      (teamProgress) => teamProgress.matchesPlayed > 0,
    );
  }, [profile]);

  function handleClearProgress() {
    const confirmed = window.confirm(
      "¿Seguro que querés borrar todo el progreso guardado?",
    );

    if (!confirmed) {
      return;
    }

    clearProgressionProfile();

    const emptyProfile = loadProgressionProfile();
    setProfile(emptyProfile);
  }

  if (!profile || !selectedTeamProgress) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
        <section className="mx-auto max-w-6xl">
          <p className="text-sm font-bold text-zinc-400">
            Cargando progreso...
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto max-w-6xl space-y-7">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-zinc-800 pb-7">
          <div>
            <p className="text-sm font-black text-emerald-300">La Mejenga</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Progreso del equipo
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Revisá reputación, récord, niveles y experiencia acumulada de tus
              jugadores.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:bg-zinc-900"
            >
              Volver al inicio
            </a>

            <button
              type="button"
              onClick={handleClearProgress}
              className="rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-bold text-rose-200 transition hover:bg-rose-400/10"
            >
              Borrar progreso
            </button>
          </div>
        </header>

        {!hasAnyProgress && (
          <section className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-amber-300">
              Sin progreso todavía
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Jugá un partido para empezar a crecer
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Cuando terminés un partido, tus jugadores podrán ganar XP y tu
              equipo sumará reputación.
            </p>
          </section>
        )}

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <TeamSelector
            profile={profile}
            selectedTeamId={selectedTeam.id}
            onSelectTeam={setSelectedTeamId}
          />

          <TeamProgressDetail
            team={selectedTeam}
            teamProgress={selectedTeamProgress}
          />
        </section>
      </section>
    </main>
  );
}

function TeamSelector({
  profile,
  selectedTeamId,
  onSelectTeam,
}: {
  profile: ProgressionProfile;
  selectedTeamId: string;
  onSelectTeam: (teamId: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        Equipos
      </p>

      <div className="mt-4 grid gap-3">
        {TEAMS.map((team) => {
          const progress = getTeamProgress(profile, team);
          const isSelected = selectedTeamId === team.id;

          return (
            <button
              key={team.id}
              type="button"
              onClick={() => onSelectTeam(team.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-emerald-400/50 bg-emerald-400/10"
                  : "border-zinc-800 bg-black/25 hover:border-zinc-700 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-zinc-50">
                    {team.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    {getTeamStyleLabel(team.style)}
                  </p>
                </div>

                <div className="flex gap-1">
                  <span
                    className="h-4 w-4 rounded-full border border-white/10"
                    style={{ backgroundColor: team.colors.primary }}
                  />
                  <span
                    className="h-4 w-4 rounded-full border border-white/10"
                    style={{ backgroundColor: team.colors.secondary }}
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-zinc-950/70 p-2">
                  <p className="text-zinc-500">Reputación</p>
                  <p className="mt-1 font-black text-emerald-300">
                    {progress.reputation}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-950/70 p-2">
                  <p className="text-zinc-500">Récord</p>
                  <p className="mt-1 font-black text-zinc-100">
                    {getRecordText(progress)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function TeamProgressDetail({
  team,
  teamProgress,
}: {
  team: Team;
  teamProgress: TeamProgress;
}) {
  return (
    <section className="space-y-5">
      <article className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
              {team.city}
            </p>
            <h2 className="mt-2 text-3xl font-black">{team.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {team.description}
            </p>
          </div>

          <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-black text-zinc-300">
            {getTeamStyleLabel(team.style)}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressStat label="Reputación" value={teamProgress.reputation} />
          <ProgressStat label="Partidos" value={teamProgress.matchesPlayed} />
          <ProgressStat label="Récord" value={getRecordText(teamProgress)} />
          <ProgressStat label="Trofeos" value={teamProgress.trophies} />
        </div>
      </article>

      <article className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Plantilla
        </p>

        <div className="mt-4 grid gap-3">
          {team.players.map((player) => {
            const playerProgress = getPlayerProgress(teamProgress, player);

            return (
              <PlayerProgressRow
                key={player.id}
                player={player}
                progress={playerProgress}
              />
            );
          })}
        </div>
      </article>
    </section>
  );
}

function ProgressStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-black/30 p-4">
      <p className="text-xs font-bold text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-zinc-50">{value}</p>
    </div>
  );
}

function PlayerProgressRow({
  player,
  progress,
}: {
  player: TeamPlayer;
  progress: PlayerProgress;
}) {
  const xpRequired = getXpRequiredForNextLevel(progress.level);
  const progressPercent = Math.min(
    100,
    Math.round((progress.xp / xpRequired) * 100),
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/25 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-lg font-black text-zinc-50">{player.name}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-500">
            {getRoleLabel(player.role)}
          </p>
          <p className="mt-2 text-sm text-zinc-400">{player.trait}</p>
        </div>

        <div className="text-right">
          <p className="text-xs font-bold text-zinc-500">Nivel</p>
          <p className="mt-1 text-3xl font-black text-emerald-300">
            {progress.level}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3 text-xs font-bold text-zinc-500">
          <span>
            XP {progress.xp} / {xpRequired}
          </span>
          <span>Total XP: {progress.totalXp}</span>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}