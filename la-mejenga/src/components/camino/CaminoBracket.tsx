import {
  getCaminoCurrentOpponent,
  getCaminoPlayerTeam,
  getCaminoRoundLabel,
  type CaminoResult,
  type CaminoRun,
} from "@/lib/game/camino";
import { getTeamById, getTeamStyleLabel, type Team } from "@/lib/game/teams";

type CaminoBracketProps = {
  camino: CaminoRun;
  onStartMatch: () => void;
  onReset: () => void;
};

export function CaminoBracket({
  camino,
  onStartMatch,
  onReset,
}: CaminoBracketProps) {
  const playerTeam = getCaminoPlayerTeam(camino);
  const currentOpponent = getCaminoCurrentOpponent(camino);

  const semifinalRival = getTeamById(camino.semifinalRivalTeamId);
  const otherA = getTeamById(camino.otherSemifinalTeamAId);
  const otherB = getTeamById(camino.otherSemifinalTeamBId);
  const otherWinner = getTeamById(camino.otherSemifinalWinnerTeamId);
  const finalRival = getTeamById(camino.finalRivalTeamId);

  const semifinalResult = camino.results.find(
    (result) => result.round === "semifinal",
  );

  const finalResult = camino.results.find((result) => result.round === "final");

  const isChampion = camino.status === "champion";
  const isEliminated = camino.status === "eliminated";
  const isPlaying = camino.status === "in_progress";

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto max-w-6xl space-y-7">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-zinc-800 pb-7">
          <div>
            <p className="text-sm font-black text-emerald-300">La Mejenga</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Camino a la Final
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Dos partidos separan a {playerTeam.name} de levantar el título.
              Cada jugada puede cambiar el destino del torneo.
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
              onClick={onReset}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:bg-zinc-900"
            >
              Reiniciar camino
            </button>
          </div>
        </header>

        <StatusHero
          camino={camino}
          playerTeam={playerTeam}
          currentOpponent={currentOpponent}
          onStartMatch={onStartMatch}
        />

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <TournamentPath
            playerTeam={playerTeam}
            semifinalRival={semifinalRival}
            otherA={otherA}
            otherB={otherB}
            otherWinner={otherWinner}
            finalRival={finalRival}
            semifinalResult={semifinalResult}
            finalResult={finalResult}
            isChampion={isChampion}
            isEliminated={isEliminated}
          />

          <SidePanel
            camino={camino}
            playerTeam={playerTeam}
            currentOpponent={currentOpponent}
            isPlaying={isPlaying}
          />
        </section>

        {camino.results.length > 0 && (
          <ResultsPanel camino={camino} playerTeam={playerTeam} />
        )}
      </section>
    </main>
  );
}

function StatusHero({
  camino,
  playerTeam,
  currentOpponent,
  onStartMatch,
}: {
  camino: CaminoRun;
  playerTeam: Team;
  currentOpponent: Team;
  onStartMatch: () => void;
}) {
  if (camino.status === "champion") {
    return (
      <section className="overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 via-emerald-400/10 to-zinc-950 p-8 text-center shadow-2xl shadow-emerald-950/40">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
          Campeón
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          {playerTeam.name} ganó el Camino a la Final
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
          El equipo sostuvo los momentos grandes, sobrevivió a la presión y
          cerró el torneo con carácter.
        </p>
      </section>
    );
  }

  if (camino.status === "eliminated") {
    return (
      <section className="overflow-hidden rounded-3xl border border-rose-400/40 bg-gradient-to-br from-rose-400/20 via-rose-400/10 to-zinc-950 p-8 text-center shadow-2xl shadow-rose-950/30">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-300">
          Eliminado
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          El camino terminó para {playerTeam.name}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
          El torneo se escapó por detalles. Tocará ajustar la estrategia y
          volver con más oficio.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/20">
      <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
        <TeamFaceoffCard label="Tu equipo" team={playerTeam} />

        <div className="rounded-2xl border border-zinc-800 bg-black/40 px-6 py-5 text-center">
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
            {getCaminoRoundLabel(camino.currentRound)}
          </p>
          <p className="mt-1 text-4xl font-black">VS</p>
        </div>

        <TeamFaceoffCard label="Rival" team={currentOpponent} alignRight />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
            Próximo reto
          </p>
          <h3 className="mt-1 text-2xl font-black">
            {playerTeam.name} vs {currentOpponent.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Ganar te acerca al título. Un empate se define por penales.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartMatch}
          className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
        >
          Jugar {getCaminoRoundLabel(camino.currentRound)}
        </button>
      </div>
    </section>
  );
}

function TeamFaceoffCard({
  label,
  team,
  alignRight = false,
}: {
  label: string;
  team: Team;
  alignRight?: boolean;
}) {
  return (
    <article className={alignRight ? "text-right" : ""}>
      <p
        className={`text-xs font-black uppercase tracking-wide ${
          alignRight ? "text-rose-300" : "text-emerald-300"
        }`}
      >
        {label}
      </p>
      <h3 className="mt-2 text-2xl font-black">{team.name}</h3>
      <p className="mt-1 text-sm text-zinc-500">{team.city}</p>

      <div
        className={`mt-3 flex gap-2 ${alignRight ? "justify-end" : ""}`}
      >
        <span
          className="h-6 w-6 rounded-full border border-white/10"
          style={{ backgroundColor: team.colors.primary }}
        />
        <span
          className="h-6 w-6 rounded-full border border-white/10"
          style={{ backgroundColor: team.colors.secondary }}
        />
      </div>
    </article>
  );
}

function TournamentPath({
  playerTeam,
  semifinalRival,
  otherA,
  otherB,
  otherWinner,
  finalRival,
  semifinalResult,
  finalResult,
  isChampion,
  isEliminated,
}: {
  playerTeam: Team;
  semifinalRival: Team;
  otherA: Team;
  otherB: Team;
  otherWinner: Team;
  finalRival: Team;
  semifinalResult?: CaminoResult;
  finalResult?: CaminoResult;
  isChampion: boolean;
  isEliminated: boolean;
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
            Bracket
          </p>
          <h2 className="mt-1 text-2xl font-black">Ruta del torneo</h2>
        </div>

        <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-black text-zinc-300">
          Semifinal → Final
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <RoundCard
          label="Tu semifinal"
          teamA={playerTeam}
          teamB={semifinalRival}
          result={semifinalResult}
          active={!semifinalResult && !isEliminated}
        />

        <RoundCard
          label="Otra semifinal"
          teamA={otherA}
          teamB={otherB}
          simulatedWinner={otherWinner}
        />

        <RoundCard
          label="Final"
          teamA={semifinalResult?.userAdvanced ? playerTeam : undefined}
          teamB={finalRival}
          result={finalResult}
          active={Boolean(semifinalResult?.userAdvanced && !finalResult)}
          locked={!semifinalResult}
          champion={isChampion}
        />
      </div>
    </section>
  );
}

function RoundCard({
  label,
  teamA,
  teamB,
  result,
  simulatedWinner,
  active = false,
  locked = false,
  champion = false,
}: {
  label: string;
  teamA?: Team;
  teamB?: Team;
  result?: CaminoResult;
  simulatedWinner?: Team;
  active?: boolean;
  locked?: boolean;
  champion?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border p-4 ${
        champion
          ? "border-emerald-400/40 bg-emerald-400/10"
          : active
            ? "border-amber-300/40 bg-amber-300/10"
            : "border-zinc-800 bg-black/25"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      {locked ? (
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-500">
          Se desbloquea al ganar la semifinal.
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            <TeamLine team={teamA} />
            <TeamLine team={teamB} />
          </div>

          <div className="mt-4 rounded-xl bg-zinc-950/80 p-3">
            {result ? (
              <>
                <p className="text-xs text-zinc-500">Resultado</p>
                <p className="mt-1 text-2xl font-black">
                  {result.playerScore} - {result.rivalScore}
                  {result.wentToPenalties ? (
                    <span className="ml-2 text-sm text-amber-300">PEN</span>
                  ) : null}
                </p>
              </>
            ) : simulatedWinner ? (
              <>
                <p className="text-xs text-zinc-500">Ganador simulado</p>
                <p className="mt-1 text-sm font-bold text-zinc-200">
                  {simulatedWinner.name}
                </p>
              </>
            ) : active ? (
              <p className="text-sm font-bold text-amber-200">
                Próximo partido
              </p>
            ) : (
              <p className="text-sm text-zinc-500">Pendiente</p>
            )}
          </div>
        </>
      )}
    </article>
  );
}

function TeamLine({ team }: { team?: Team }) {
  if (!team) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-500">
        Por definir
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
      <div>
        <p className="font-black text-zinc-100">{team.name}</p>
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
  );
}

function SidePanel({
  camino,
  playerTeam,
  currentOpponent,
  isPlaying,
}: {
  camino: CaminoRun;
  playerTeam: Team;
  currentOpponent: Team;
  isPlaying: boolean;
}) {
  return (
    <aside className="space-y-5">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Estado del camino
        </p>

        <div className="mt-4 grid gap-3">
          <InfoRow label="Equipo" value={playerTeam.name} />
          <InfoRow
            label="Ronda actual"
            value={
              camino.status === "in_progress"
                ? getCaminoRoundLabel(camino.currentRound)
                : camino.status === "champion"
                  ? "Campeón"
                  : "Eliminado"
            }
          />
          <InfoRow
            label="Rival actual"
            value={isPlaying ? currentOpponent.name : currentOpponent.name}
          />
          <InfoRow label="Partidos jugados" value={`${camino.results.length}`} />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Regla del torneo
        </p>
        <h3 className="mt-2 text-xl font-black">No hay margen</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Una victoria te mantiene vivo. Una derrota termina el camino. Si hay
          empate, el pase se define automáticamente por penales según
          mentalidad, energía, momentum y algo de suerte.
        </p>
      </section>
    </aside>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-black/30 px-4 py-3">
      <p className="text-xs font-bold text-zinc-500">{label}</p>
      <p className="text-sm font-black text-zinc-100">{value}</p>
    </div>
  );
}

function ResultsPanel({
  camino,
  playerTeam,
}: {
  camino: CaminoRun;
  playerTeam: Team;
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        Resultados del camino
      </p>

      <div className="mt-4 space-y-3">
        {camino.results.map((result) => {
          const rival = getTeamById(result.rivalTeamId);

          return (
            <article
              key={result.id}
              className="rounded-2xl border border-zinc-800 bg-black/30 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                    {getCaminoRoundLabel(result.round)}
                  </p>
                  <h3 className="mt-1 text-lg font-black">
                    {playerTeam.name} vs {rival.name}
                  </h3>
                </div>

                <div className="rounded-xl bg-zinc-950 px-5 py-3 text-2xl font-black">
                  {result.playerScore} - {result.rivalScore}
                  {result.wentToPenalties ? (
                    <span className="ml-2 text-sm text-amber-300">PEN</span>
                  ) : null}
                </div>
              </div>

              <p
                className={`mt-3 text-sm font-bold ${
                  result.userAdvanced ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {result.userAdvanced
                  ? `${playerTeam.name} avanzó.`
                  : `${playerTeam.name} quedó fuera.`}
              </p>

              {result.wentToPenalties && result.penaltySummary && (
                <p className="mt-2 text-sm leading-6 text-amber-200">
                  {result.penaltySummary}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}