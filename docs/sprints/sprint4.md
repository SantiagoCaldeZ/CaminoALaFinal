# Implementación Sprint 4

# Pulido visual, claridad y balance inicial — La Mejenga

## Objetivo del Sprint 4

El Sprint 4 busca convertir la demo funcional del Sprint 3 en una experiencia más clara, atractiva y disfrutable.

Hasta este punto, el juego ya debería permitir:

* elegir equipo;
* iniciar partido;
* seleccionar cartas;
* resolver jugadas;
* ver marcador, energía y momentum;
* avanzar hasta el resumen final.

Ahora el foco cambia hacia:

* mejorar la sensación visual del partido;
* agregar animaciones simples;
* hacer más claras las decisiones;
* mejorar el feedback de resultados;
* ajustar la frecuencia de goles;
* ajustar energía, momentum y riesgo;
* hacer que las cartas tengan mejores indicaciones tácticas;
* preparar el MVP para probarlo con otras personas.

Este sprint no agrega progresión, login, Supabase ni multijugador. Su función es fortalecer el MVP 1.

---

# 1. Alcance del Sprint 4

## Incluye

* Mejoras visuales en cartas.
* Indicadores de riesgo, costo y recomendación.
* Animación simple de selección de carta.
* Revelación más clara de carta rival.
* Feedback visual para goles, errores, atajadas y ocasiones.
* Mejoras en narraciones.
* Mejor historial de jugadas.
* Ajustes en balance.
* Mejoras responsive.
* Pequeñas mejoras de experiencia de usuario.

## No incluye

* Progresión.
* Recompensas.
* Torneo.
* Carrera.
* LocalStorage.
* Login.
* Supabase.
* Amigos.
* Mensajes.
* Multijugador.
* Ranking.
* App móvil nativa.

---

# 2. Archivos que se actualizarán

Principalmente:

```txt
src/components/match/TacticalCardView.tsx
src/components/match/CardHand.tsx
src/components/match/PlayResolutionPanel.tsx
src/components/match/MatchHistory.tsx
src/components/match/FinalSummary.tsx
src/components/match/MatchScreen.tsx
src/components/ui/StatBar.tsx

src/lib/game/balance.ts
src/lib/game/resolver.ts
src/lib/game/narration.ts
src/lib/game/match-engine.ts
```

Opcionalmente se pueden crear:

```txt
src/lib/game/card-advice.ts
src/lib/game/outcome-meta.ts
```

Para mantener lógica visual y explicativa separada.

---

# 3. Mejora 1 — Metadata visual de outcomes

Crear un archivo para centralizar cómo se muestran los resultados.

## `src/lib/game/outcome-meta.ts`

```ts
import type { PlayOutcome } from "./types";

export type OutcomeTone = "success" | "danger" | "warning" | "info" | "neutral";

export type OutcomeMeta = {
  label: string;
  tone: OutcomeTone;
  headline: string;
  description: string;
};

export const OUTCOME_META: Record<PlayOutcome, OutcomeMeta> = {
  goal: {
    label: "Gol",
    tone: "success",
    headline: "¡Gol!",
    description: "La jugada terminó en anotación.",
  },
  shot_saved: {
    label: "Atajada",
    tone: "info",
    headline: "Atajada importante",
    description: "El ataque fue peligroso, pero el rival evitó el gol.",
  },
  shot_missed: {
    label: "Tiro desviado",
    tone: "danger",
    headline: "Se fue la oportunidad",
    description: "La jugada generó peligro, pero la definición falló.",
  },
  blocked: {
    label: "Bloqueo",
    tone: "info",
    headline: "La defensa respondió",
    description: "El rival bloqueó el intento antes de que llegara al arco.",
  },
  corner: {
    label: "Córner",
    tone: "info",
    headline: "Sigue el peligro",
    description: "La jugada no terminó en gol, pero dejó una pelota parada.",
  },
  foul: {
    label: "Falta",
    tone: "warning",
    headline: "Falta en la jugada",
    description: "El rival cortó la acción con contacto.",
  },
  yellow_card: {
    label: "Amarilla",
    tone: "warning",
    headline: "Entrada fuerte",
    description: "La jugada terminó con tarjeta amarilla.",
  },
  penalty: {
    label: "Penal",
    tone: "success",
    headline: "¡Penal señalado!",
    description: "La jugada provocó una falta dentro del área.",
  },
  offside: {
    label: "Fuera de juego",
    tone: "danger",
    headline: "Jugada anulada",
    description: "El rival tiró bien la línea defensiva.",
  },
  turnover: {
    label: "Pérdida",
    tone: "danger",
    headline: "Se perdió la pelota",
    description: "La decisión no salió bien y el rival recuperó.",
  },
  interception: {
    label: "Intercepción",
    tone: "danger",
    headline: "El rival leyó la jugada",
    description: "La defensa anticipó la intención y cortó el avance.",
  },
  possession_kept: {
    label: "Posesión mantenida",
    tone: "neutral",
    headline: "La jugada sigue viva",
    description: "No hubo daño directo, pero el equipo conservó la pelota.",
  },
  chance_created: {
    label: "Ocasión clara",
    tone: "info",
    headline: "Buena oportunidad",
    description: "La carta generó una situación peligrosa.",
  },
  neutral: {
    label: "Neutral",
    tone: "neutral",
    headline: "Sin ventaja clara",
    description: "La jugada no inclinó el partido para ningún lado.",
  },
};

export function getOutcomeMeta(outcome: PlayOutcome): OutcomeMeta {
  return OUTCOME_META[outcome];
}
```

---

# 4. Mejora 2 — Consejos tácticos para cartas

Crear un archivo que ayude a mostrar si una carta parece buena, arriesgada o poco ideal para una situación.

## `src/lib/game/card-advice.ts`

```ts
import type { MatchSituation, TacticalCard } from "./types";

export type CardAdviceTone = "recommended" | "risky" | "neutral" | "expensive";

export type CardAdvice = {
  tone: CardAdviceTone;
  label: string;
  description: string;
};

export function getCardAdvice(
  card: TacticalCard,
  situation: MatchSituation,
  currentEnergy: number,
): CardAdvice {
  if (card.energyCost > currentEnergy) {
    return {
      tone: "expensive",
      label: "Sin energía",
      description: "No tenés suficiente energía para usar esta carta.",
    };
  }

  if (card.preferredSituations.includes(situation.id)) {
    return {
      tone: "recommended",
      label: "Recomendada",
      description: "Esta carta encaja muy bien con la situación actual.",
    };
  }

  if (situation.preferredCardTypes.includes(card.type)) {
    return {
      tone: "recommended",
      label: "Buena opción",
      description: "El tipo de carta es adecuado para este momento.",
    };
  }

  if (card.risk >= 65) {
    return {
      tone: "risky",
      label: "Arriesgada",
      description: "Puede cambiar la jugada, pero fallar puede salir caro.",
    };
  }

  if (card.energyCost >= 15) {
    return {
      tone: "expensive",
      label: "Costosa",
      description: "Consume bastante energía. Usala si realmente vale la pena.",
    };
  }

  return {
    tone: "neutral",
    label: "Neutral",
    description: "Puede funcionar, pero no tiene ventaja especial en esta situación.",
  };
}
```

---

# 5. Mejora 3 — Actualizar `TacticalCardView`

Actualizar el componente para recibir situación y energía, y mostrar recomendación táctica.

## `src/components/match/TacticalCardView.tsx`

```tsx
import { getCardAdvice } from "@/lib/game/card-advice";
import type { MatchSituation, TacticalCard } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";

type TacticalCardViewProps = {
  card: TacticalCard;
  situation: MatchSituation;
  currentEnergy: number;
  disabled?: boolean;
  onSelect?: (card: TacticalCard) => void;
};

function getBadgeVariant(type: TacticalCard["type"]): "success" | "danger" | "info" | "warning" {
  if (type === "attack") return "danger";
  if (type === "defense") return "success";
  if (type === "midfield") return "info";
  return "warning";
}

function getAdviceClasses(tone: ReturnType<typeof getCardAdvice>["tone"]): string {
  if (tone === "recommended") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (tone === "risky") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  if (tone === "expensive") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  return "border-zinc-700 bg-zinc-800 text-zinc-300";
}

export function TacticalCardView({
  card,
  situation,
  currentEnergy,
  disabled = false,
  onSelect,
}: TacticalCardViewProps) {
  const advice = getCardAdvice(card, situation, currentEnergy);
  const isDisabled = disabled || card.energyCost > currentEnergy;

  return (
    <button
      disabled={isDisabled}
      onClick={() => onSelect?.(card)}
      className={`group flex min-h-[290px] w-full flex-col rounded-2xl border bg-zinc-900 p-5 text-left transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        advice.tone === "recommended"
          ? "border-emerald-400/40 hover:border-emerald-300"
          : "border-zinc-800 hover:border-emerald-400/60"
      } hover:-translate-y-1 hover:bg-zinc-800 disabled:hover:translate-y-0 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900`}
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant={getBadgeVariant(card.type)}>{card.type}</Badge>
        <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-emerald-300">
          {card.energyCost} EN
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black text-zinc-50">{card.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{card.description}</p>

      <div className={`mt-4 rounded-xl border px-3 py-2 text-xs font-bold ${getAdviceClasses(advice.tone)}`}>
        <p>{advice.label}</p>
        <p className="mt-1 font-medium opacity-80">{advice.description}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs font-bold text-zinc-200">
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Poder</p>
          <p className="mt-1 text-lg text-zinc-50">{card.basePower}</p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Riesgo</p>
          <p className="mt-1 text-lg text-zinc-50">{card.risk}</p>
        </div>
      </div>
    </button>
  );
}
```

---

# 6. Mejora 4 — Actualizar `CardHand`

Ahora debe pasar la situación actual a cada carta.

## `src/components/match/CardHand.tsx`

```tsx
import type { MatchSituation, TacticalCard } from "@/lib/game/types";
import { TacticalCardView } from "./TacticalCardView";

type CardHandProps = {
  cards: TacticalCard[];
  situation: MatchSituation;
  currentEnergy: number;
  onSelectCard: (card: TacticalCard) => void;
};

export function CardHand({ cards, situation, currentEnergy, onSelectCard }: CardHandProps) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-emerald-300">Elegí tu carta</p>
          <h2 className="text-2xl font-black text-zinc-50">Decisión táctica</h2>
        </div>
        <p className="text-sm text-zinc-400">Energía disponible: {currentEnergy}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <TacticalCardView
            key={card.id}
            card={card}
            situation={situation}
            currentEnergy={currentEnergy}
            disabled={card.energyCost > currentEnergy}
            onSelect={onSelectCard}
          />
        ))}
      </div>
    </section>
  );
}
```

---

# 7. Mejora 5 — Actualizar `MatchScreen`

En `MatchScreen`, actualizar la llamada a `CardHand` para enviar `situation`.

Buscar:

```tsx
<CardHand
  cards={availableCards}
  currentEnergy={matchState.playerEnergy}
  onSelectCard={handleSelectCard}
/>
```

Reemplazar por:

```tsx
<CardHand
  cards={availableCards}
  situation={currentSituation}
  currentEnergy={matchState.playerEnergy}
  onSelectCard={handleSelectCard}
/>
```

---

# 8. Mejora 6 — Mejorar `PlayResolutionPanel`

Actualizarlo para usar metadata de outcome y dar feedback visual más fuerte.

## `src/components/match/PlayResolutionPanel.tsx`

```tsx
import { getCardById } from "@/lib/game/cards";
import { getOutcomeMeta } from "@/lib/game/outcome-meta";
import type { MatchEvent } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";

type PlayResolutionPanelProps = {
  event: MatchEvent;
  onContinue: () => void;
  isLastMoment: boolean;
};

function getToneClasses(tone: ReturnType<typeof getOutcomeMeta>["tone"]): string {
  if (tone === "success") {
    return "border-emerald-400/60 bg-emerald-400/10";
  }

  if (tone === "danger") {
    return "border-red-400/50 bg-red-400/10";
  }

  if (tone === "warning") {
    return "border-amber-400/50 bg-amber-400/10";
  }

  if (tone === "info") {
    return "border-sky-400/50 bg-sky-400/10";
  }

  return "";
}

function getBadgeVariant(tone: ReturnType<typeof getOutcomeMeta>["tone"]): "success" | "danger" | "warning" | "info" | "default" {
  if (tone === "success") return "success";
  if (tone === "danger") return "danger";
  if (tone === "warning") return "warning";
  if (tone === "info") return "info";
  return "default";
}

export function PlayResolutionPanel({ event, onContinue, isLastMoment }: PlayResolutionPanelProps) {
  const playerCard = getCardById(event.playerCardId);
  const rivalCard = getCardById(event.rivalCardId);
  const meta = getOutcomeMeta(event.outcome);

  return (
    <Panel className={getToneClasses(meta.tone)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-300">Resolución de jugada</p>
          <h2 className="mt-1 text-3xl font-black text-zinc-50">{meta.headline}</h2>
          <p className="mt-2 text-sm text-zinc-400">{meta.description}</p>
        </div>

        <Badge variant={getBadgeVariant(meta.tone)}>{meta.label}</Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/20 bg-zinc-950 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Tu carta</p>
          <p className="mt-1 text-xl font-black text-zinc-50">{playerCard?.name ?? event.playerCardId}</p>
          <p className="mt-2 text-sm text-zinc-500">Protagonista: {event.protagonistName}</p>
        </div>

        <div className="rounded-2xl border border-red-400/20 bg-zinc-950 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-red-300">Carta rival revelada</p>
          <p className="mt-1 text-xl font-black text-zinc-50">{rivalCard?.name ?? event.rivalCardId}</p>
          <p className="mt-2 text-sm text-zinc-500">Rival: {event.rivalProtagonistName}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-zinc-950 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Narración</p>
        <p className="mt-2 text-base leading-8 text-zinc-200">{event.narration}</p>
      </div>

      <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Energía</p>
          <p className={event.playerEnergyChange < 0 ? "font-black text-red-300" : "font-black text-emerald-300"}>
            {event.playerEnergyChange}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Momentum</p>
          <p className={event.playerMomentumChange >= 0 ? "font-black text-emerald-300" : "font-black text-red-300"}>
            {event.playerMomentumChange >= 0 ? "+" : ""}{event.playerMomentumChange}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Marcador</p>
          <p className="font-black text-zinc-50">
            {event.playerScore} - {event.rivalScore}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Lectura interna</p>
          <p className="font-black text-zinc-50">{event.scoreValue}</p>
        </div>
      </div>

      <Button className="mt-6" onClick={onContinue}>
        {isLastMoment ? "Ver resumen final" : "Siguiente jugada"}
      </Button>
    </Panel>
  );
}
```

---

# 9. Mejora 7 — Ajustar `balance.ts`

El balance inicial del Sprint 2 puede generar resultados muy variables. Para un MVP más controlado, usar estos valores:

## `src/lib/game/balance.ts`

```ts
export const BALANCE = {
  initialEnergy: 100,
  initialMomentum: 50,
  totalMoments: 8,
  cardsPerHand: 4,

  randomMin: -6,
  randomMax: 6,

  goalThreshold: 92,
  shotThreshold: 80,
  chanceThreshold: 67,
  possessionThreshold: 52,
  neutralThreshold: 36,

  minValue: 0,
  maxValue: 100,

  recommendedCardBonus: 8,
  preferredTypeBonus: 6,
  specialCardEarlyPenalty: 5,

  strongCounterBonus: 10,
  weakCounterPenalty: -12,
  rivalStrongCounterPenalty: -10,
  rivalWeakCounterBonus: 8,
} as const;
```

### Razón del ajuste

* Se reduce el azar de `-8/+8` a `-6/+6`.
* Se sube levemente el umbral de gol para evitar marcadores exagerados.
* Se centralizan algunos valores que antes estaban quemados en el resolver.

---

# 10. Mejora 8 — Ajustar `resolver.ts`

En `resolver.ts`, reemplazar números quemados de counters y situación por constantes de `BALANCE`.

## Cambiar `getCounterModifier`

```ts
function getCounterModifier(playerCard: TacticalCard, rivalCard: TacticalCard): number {
  if (playerCard.weakAgainst.includes(rivalCard.id)) {
    return BALANCE.weakCounterPenalty;
  }

  if (playerCard.strongAgainst.includes(rivalCard.id)) {
    return BALANCE.strongCounterBonus;
  }

  if (rivalCard.strongAgainst.includes(playerCard.id)) {
    return BALANCE.rivalStrongCounterPenalty;
  }

  if (rivalCard.weakAgainst.includes(playerCard.id)) {
    return BALANCE.rivalWeakCounterBonus;
  }

  return 0;
}
```

## Cambiar `getSituationModifier`

```ts
function getSituationModifier(params: ResolvePlayParams): number {
  const { situation, playerCard } = params;

  let modifier = 0;

  if (situation.preferredCardTypes.includes(playerCard.type)) {
    modifier += BALANCE.preferredTypeBonus;
  }

  if (playerCard.preferredSituations.includes(situation.id)) {
    modifier += BALANCE.recommendedCardBonus;
  }

  if (playerCard.type === "special" && situation.id !== "ultima-jugada") {
    modifier -= BALANCE.specialCardEarlyPenalty;
  }

  return modifier;
}
```

---

# 11. Mejora 9 — Mejorar resultados especiales

En el Sprint 2, algunos outcomes como `corner`, `blocked`, `yellow_card` o `penalty` casi no aparecen.

Para dar más variedad, se puede ajustar `determineOutcome`.

## Reemplazar `determineOutcome` en `resolver.ts`

```ts
function determineOutcome(scoreValue: number, playerCard: TacticalCard, rivalCard: TacticalCard): PlayOutcome {
  if (scoreValue >= BALANCE.goalThreshold) {
    return "goal";
  }

  if (scoreValue >= BALANCE.shotThreshold) {
    if (rivalCard.id === "bloque-bajo" || rivalCard.id === "anticipacion") {
      return "blocked";
    }

    return playerCard.risk >= 55 ? "shot_missed" : "shot_saved";
  }

  if (scoreValue >= BALANCE.chanceThreshold) {
    if (playerCard.id === "centro-al-area") {
      return "corner";
    }

    return "chance_created";
  }

  if (scoreValue >= BALANCE.possessionThreshold) {
    return "possession_kept";
  }

  if (scoreValue >= BALANCE.neutralThreshold) {
    return "neutral";
  }

  if (rivalCard.id === "linea-adelantada" && playerCard.id === "pase-filtrado") {
    return "offside";
  }

  if (rivalCard.id === "barrida-fuerte" && playerCard.id === "regate-individual") {
    if (rivalCard.risk >= 65 && scoreValue <= 25) {
      return "yellow_card";
    }

    return "foul";
  }

  if (rivalCard.id === "marcar-al-hombre" && playerCard.type === "attack") {
    return "blocked";
  }

  if (rivalCard.type === "defense") {
    return "interception";
  }

  return "turnover";
}
```

---

# 12. Mejora 10 — Mejorar `MatchHistory`

Agregar metadata para que el historial sea más claro.

## `src/components/match/MatchHistory.tsx`

```tsx
import { getOutcomeMeta } from "@/lib/game/outcome-meta";
import type { MatchEvent } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";

type MatchHistoryProps = {
  history: MatchEvent[];
};

function getBadgeVariant(tone: ReturnType<typeof getOutcomeMeta>["tone"]): "success" | "danger" | "warning" | "info" | "default" {
  if (tone === "success") return "success";
  if (tone === "danger") return "danger";
  if (tone === "warning") return "warning";
  if (tone === "info") return "info";
  return "default";
}

export function MatchHistory({ history }: MatchHistoryProps) {
  const latest = history.slice(-5).reverse();

  return (
    <Panel>
      <h2 className="text-lg font-black text-zinc-50">Historial reciente</h2>

      {latest.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">Todavía no hay jugadas registradas.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {latest.map((event) => {
            const meta = getOutcomeMeta(event.outcome);

            return (
              <article key={event.id} className="rounded-xl bg-zinc-950 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-emerald-300">Min {event.minute}</p>
                    <p className="mt-1 text-sm font-black text-zinc-100">{meta.label}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
                      {event.narration}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge variant={getBadgeVariant(meta.tone)}>{meta.label}</Badge>
                    <p className="mt-2 text-sm font-black text-zinc-300">
                      {event.playerScore} - {event.rivalScore}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
```

---

# 13. Mejora 11 — Mejorar `FinalSummary`

Hacer que el resumen final muestre datos más útiles.

## `src/components/match/FinalSummary.tsx`

```tsx
import { getMatchWinner } from "@/lib/game/match-engine";
import type { MatchEvent, MatchState } from "@/lib/game/types";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { MatchHistory } from "./MatchHistory";

 type FinalSummaryProps = {
  matchState: MatchState;
  onRestart: () => void;
  onChangeTeam: () => void;
};

function getFeaturedEvent(history: MatchEvent[]): MatchEvent | null {
  const goal = history.find((event) => event.outcome === "goal");

  if (goal) {
    return goal;
  }

  const chance = history.find((event) => event.outcome === "chance_created" || event.outcome === "shot_saved");

  if (chance) {
    return chance;
  }

  return history.at(-1) ?? null;
}

export function FinalSummary({ matchState, onRestart, onChangeTeam }: FinalSummaryProps) {
  const winner = getMatchWinner(matchState);
  const featuredEvent = getFeaturedEvent(matchState.history);

  const title =
    winner === "player"
      ? `Ganó ${matchState.playerTeam.name}`
      : winner === "rival"
        ? `Ganó ${matchState.rivalTeam.name}`
        : "Empate cerrado";

  const subtitle =
    winner === "player"
      ? "Tu equipo cerró mejor los momentos clave."
      : winner === "rival"
        ? "El rival aprovechó mejor sus oportunidades."
        : "Nadie logró romper definitivamente el partido.";

  return (
    <div className="space-y-5">
      <Panel className="border-emerald-400/40 bg-emerald-400/10">
        <p className="text-sm font-bold text-emerald-300">Resumen final</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-50">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{subtitle}</p>

        <p className="mt-5 text-6xl font-black text-zinc-50">
          {matchState.playerScore} - {matchState.rivalScore}
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Energía final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerEnergy}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Momentum final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerMomentum}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Jugadas</p>
            <p className="text-xl font-black text-zinc-50">{matchState.history.length}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Goles</p>
            <p className="text-xl font-black text-zinc-50">
              {matchState.playerScore + matchState.rivalScore}
            </p>
          </div>
        </div>

        {featuredEvent && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
              Jugada destacada · Min {featuredEvent.minute}
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{featuredEvent.narration}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRestart}>Jugar de nuevo</Button>
          <Button variant="secondary" onClick={onChangeTeam}>
            Cambiar equipo
          </Button>
        </div>
      </Panel>

      <MatchHistory history={matchState.history} />
    </div>
  );
}
```

> Nota: revisar que no quede un espacio accidental antes de `type FinalSummaryProps`.

---

# 14. Mejora 12 — Ajustar narraciones repetidas

Agregar más variedad en `narration.ts`, especialmente en outcomes frecuentes:

* `neutral`
* `possession_kept`
* `turnover`
* `interception`
* `chance_created`

Ejemplo para `neutral`:

```ts
neutral: [
  `La jugada se trabó y ninguno logró sacar ventaja real. El partido sigue parejo.`,
  `${playerCard.name} contra ${rivalCard.name}: choque táctico sin ganador claro.`,
  `Mucho intento, poco espacio. La pelota sigue en disputa y el marcador no se mueve.`,
  `Los dos equipos leyeron bien el momento. Nadie regaló nada.`,
  `La jugada prometía más, pero terminó apagándose en media cancha.`,
],
```

Ejemplo para `turnover`:

```ts
turnover: [
  `${playerTeam.name} arriesgó y perdió la pelota. ${rivalTeam.name} recupera en una zona peligrosa.`,
  `${playerCard.name} no salió. Mala decisión o mala ejecución, pero el rival ya tiene la bola.`,
  `${player} intentó hacer una de más y terminó regalando la posesión.`,
  `La jugada pedía calma, pero salió apurada. Pérdida para ${playerTeam.name}.`,
  `El rival no perdonó la imprecisión y recuperó sin complicarse.`,
],
```

---

# 15. Mejora 13 — Pequeños ajustes responsive

Revisar especialmente:

* Las cartas en móvil.
* El panel lateral de estado.
* El historial.
* La pantalla de selección de equipo.
* El resumen final.

Recomendaciones:

## En `MatchScreen`

La estructura:

```tsx
<div className="grid gap-5 lg:grid-cols-[1fr_340px]">
```

Está bien para escritorio. En móvil, el `aside` cae abajo. Eso es aceptable.

## En `TacticalCardView`

Si las cartas se sienten muy altas en móvil, reducir:

```tsx
min-h-[290px]
```

a:

```tsx
min-h-[250px]
```

## En `PlayerList`

Si los stats se ven comprimidos, cambiar:

```tsx
grid-cols-3 sm:grid-cols-6
```

por:

```tsx
grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
```

---

# 16. Mejora 14 — Pruebas manuales de balance

Después de implementar los cambios, probar al menos 10 partidos manuales.

Registrar:

| Partido | Equipo usado   | Resultado | Goles totales | ¿Se sintió justo? | Observaciones |
| ------- | -------------- | --------: | ------------: | ----------------- | ------------- |
| 1       | Los del Parque |       1-0 |             1 | Sí/No             | ...           |
| 2       | Cemento FC     |       0-0 |             0 | Sí/No             | ...           |
| 3       | Los del Parque |       2-1 |             3 | Sí/No             | ...           |

## Criterios iniciales de balance

Para 8 momentos por partido:

* Marcadores ideales frecuentes: 0-0, 1-0, 1-1, 2-1.
* Marcadores aceptables ocasionales: 2-2, 3-1.
* Marcadores sospechosos: 4-3, 5-2, 0-4.
* Si casi todo termina 0-0, faltan goles.
* Si casi todo termina 3+ goles, hay demasiada facilidad ofensiva.

---

# 17. Mejora 15 — Checklist de experiencia

Después del Sprint 4, responder:

## Claridad

* ¿El usuario entiende qué está eligiendo?
* ¿Las cartas explican bien su riesgo y costo?
* ¿Se entiende por qué una carta era recomendada?
* ¿Se entiende qué pasó después de cada jugada?

## Emoción

* ¿Un gol se siente especial?
* ¿La última jugada genera tensión?
* ¿El momentum parece relevante?
* ¿El partido invita a jugar otro?

## Balance

* ¿Hay cartas que parecen siempre mejores?
* ¿La energía limita bien el abuso de cartas fuertes?
* ¿El azar se siente controlado?
* ¿Los resultados parecen razonables?

## Interfaz

* ¿La pantalla se ve ordenada?
* ¿Las cartas son legibles?
* ¿Funciona bien en móvil?
* ¿El historial ayuda o estorba?

---

# 18. Resultado esperado al terminar Sprint 4

Al finalizar este sprint, el MVP 1 debe sentirse como una demo jugable presentable.

Debe tener:

* selección de equipo clara;
* cartas más informativas;
* recomendaciones tácticas básicas;
* resolución visual más fuerte;
* mejor historial;
* mejor resumen final;
* balance inicial más razonable;
* narraciones menos repetitivas;
* mejor experiencia responsive.

Todavía no es una versión completa del juego, pero ya debería poder mostrarse a otra persona para obtener feedback.

---

# 19. Qué NO hacer en este sprint

Evitar agregar:

* progresión;
* XP;
* recompensas;
* torneo;
* login;
* amigos;
* mensajes;
* Supabase;
* multijugador;
* ranking;
* tienda;
* app móvil.

La tentación de agregar más sistemas es fuerte, pero este sprint debe cerrar bien el MVP 1.

---

# 20. Siguiente paso después del Sprint 4

Después de este sprint hay dos caminos posibles:

## Opción A — Probar y retroalimentar

Recomendado.

Antes de construir progresión, jugar varias partidas y anotar:

* qué cartas se sienten bien;
* qué cartas se sienten inútiles;
* si hay demasiados o pocos goles;
* si el usuario entiende el flujo;
* si el partido tiene emoción;
* si se quiere jugar otra vez.

## Opción B — Empezar Versión 0.1: Progresión simple

Agregar:

* recompensa postpartido;
* XP;
* mejora básica de jugadores;
* desbloqueo simple de cartas;
* progreso de sesión.

La recomendación es hacer primero la opción A, aunque sea brevemente, antes de avanzar a progresión.

---

# 21. Conclusión

El Sprint 4 es el cierre real del MVP 1.

Los sprints anteriores construyeron la base, el motor y la interfaz. Este sprint debe hacer que todo eso se sienta mejor para el jugador.

El objetivo final no es tener muchas funcionalidades, sino una experiencia corta pero sólida:

> Elegir equipo, jugar un partido por cartas, entender las consecuencias, emocionarse con los momentos clave y querer jugar otro.

Si el Sprint 4 logra eso, el proyecto ya está listo para evolucionar hacia progresión, torneo, carrera y más adelante funcionalidades sociales.