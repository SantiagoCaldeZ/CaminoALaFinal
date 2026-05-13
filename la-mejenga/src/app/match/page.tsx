"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAvailableCardsForSituation, getCurrentSituation, getMatchWinner, playMoment, startMatch } from "@/lib/game/match-engine";
import { getDefaultRivalTeam, TEAMS } from "@/lib/game/teams";
import type { MatchState, TacticalCard } from "@/lib/game/types";

export default function MatchPage() {
  const playerTeam = TEAMS[0];
  const rivalTeam = getDefaultRivalTeam(playerTeam.id);

  const [matchState, setMatchState] = useState<MatchState>(() =>
    startMatch(playerTeam, rivalTeam),
  );

  const situation = useMemo(() => getCurrentSituation(matchState), [matchState]);
  const availableCards = useMemo(
    () => getAvailableCardsForSituation(situation),
    [situation],
  );

  function handlePlayCard(card: TacticalCard) {
    const nextState = playMoment({ matchState, playerCard: card });
    setMatchState(nextState);
  }

  function handleRestart() {
    setMatchState(startMatch(playerTeam, rivalTeam));
  }

  const lastEvent = matchState.history.at(-1);
  const winner = getMatchWinner(matchState);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-emerald-300">Sprint 2</p>
            <h1 className="text-3xl font-black">Motor del partido</h1>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            Volver
          </Link>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-zinc-400">Marcador</p>
              <h2 className="mt-1 text-3xl font-black">
                {matchState.playerTeam.name} {matchState.playerScore} - {matchState.rivalScore} {matchState.rivalTeam.name}
              </h2>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-zinc-400">Momento</p>
              <p className="text-xl font-bold">
                {matchState.status === "finished"
                  ? "Finalizado"
                  : `${matchState.currentMomentIndex + 1}/${matchState.totalMoments}`}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Energía usuario</p>
              <p className="text-2xl font-black text-emerald-300">{matchState.playerEnergy}</p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Momentum usuario</p>
              <p className="text-2xl font-black text-emerald-300">{matchState.playerMomentum}</p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Energía rival</p>
              <p className="text-2xl font-black text-red-300">{matchState.rivalEnergy}</p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Momentum rival</p>
              <p className="text-2xl font-black text-red-300">{matchState.rivalMomentum}</p>
            </div>
          </div>
        </section>

        {matchState.status === "finished" ? (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="text-2xl font-black">Partido finalizado</h2>
            <p className="mt-2 text-zinc-300">
              {winner === "player" && `Ganó ${matchState.playerTeam.name}.`}
              {winner === "rival" && `Ganó ${matchState.rivalTeam.name}.`}
              {winner === "draw" && "El partido terminó empatado."}
            </p>

            <button
              onClick={handleRestart}
              className="mt-5 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-zinc-950 hover:bg-emerald-300"
            >
              Jugar de nuevo
            </button>
          </section>
        ) : (
          <>
            <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
              <p className="text-sm text-emerald-300">Minuto {situation.minute}</p>
              <h2 className="mt-1 text-2xl font-black">{situation.title}</h2>
              <p className="mt-2 text-zinc-300">{situation.description}</p>
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-bold">Elegí una carta</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                {availableCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handlePlayCard(card)}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-zinc-800"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                      {card.type}
                    </p>
                    <h3 className="mt-2 text-lg font-black">{card.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{card.description}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <span className="rounded-lg bg-zinc-950 p-2">Poder {card.basePower}</span>
                      <span className="rounded-lg bg-zinc-950 p-2">Riesgo {card.risk}</span>
                      <span className="rounded-lg bg-zinc-950 p-2">Energía {card.energyCost}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {lastEvent && (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
            <p className="text-sm text-zinc-400">Última jugada</p>
            <h2 className="mt-1 text-xl font-black capitalize">{lastEvent.outcome.replaceAll("_", " ")}</h2>
            <p className="mt-3 leading-7 text-zinc-300">{lastEvent.narration}</p>
            <div className="mt-4 text-sm text-zinc-400">
              Puntaje interno de jugada: {lastEvent.scoreValue}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}