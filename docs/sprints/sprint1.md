# Implementación Sprint 1

# La Mejenga: Camino a la Final

## Objetivo del Sprint 1

Crear la base técnica inicial del proyecto y dejar listos los archivos principales de datos y tipos para poder construir el motor del partido en el Sprint 2.

Este sprint no busca que el juego ya sea completamente jugable. Busca dejar preparada la estructura para que el siguiente paso sea implementar el motor.

---

# 1. Crear el proyecto

## Opción recomendada

Crear un proyecto con Next.js, TypeScript y Tailwind.

```bash
npx create-next-app@latest la-mejenga --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Cuando termine:

```bash
cd la-mejenga
npm run dev
```

La app debería abrir en:

```txt
http://localhost:3000
```

---

# 2. Estructura de carpetas del Sprint 1

Crear esta estructura:

```txt
src/
  app/
    page.tsx
    match/
      page.tsx

  components/
    match/
    team/
    ui/

  lib/
    game/
      types.ts
      balance.ts
      teams.ts
      cards.ts
      situations.ts
      utils.ts
```

---

# 3. Archivos del Sprint 1

## 3.1 `src/lib/game/types.ts`

```ts
export type PlayerRole =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward"
  | "utility";

export type TeamStyle =
  | "balanced"
  | "physical"
  | "technical"
  | "fast"
  | "defensive"
  | "chaotic";

export type CardType = "attack" | "defense" | "midfield" | "special";

export type SituationType =
  | "attack"
  | "defense"
  | "midfield"
  | "set_piece"
  | "special";

export type MatchStatus = "not_started" | "in_progress" | "finished";

export type PlayOutcome =
  | "goal"
  | "shot_saved"
  | "shot_missed"
  | "blocked"
  | "corner"
  | "foul"
  | "yellow_card"
  | "penalty"
  | "offside"
  | "turnover"
  | "interception"
  | "possession_kept"
  | "chance_created"
  | "neutral";

export type Player = {
  id: string;
  name: string;
  nickname: string;
  role: PlayerRole;
  attack: number;
  defense: number;
  technique: number;
  physical: number;
  mentality: number;
  stamina: number;
  trait: string;
};

export type Team = {
  id: string;
  name: string;
  style: TeamStyle;
  description: string;
  strengths: string[];
  weaknesses: string[];
  players: Player[];
};

export type TacticalCard = {
  id: string;
  name: string;
  type: CardType;
  description: string;
  basePower: number;
  risk: number;
  energyCost: number;
  strongAgainst: string[];
  weakAgainst: string[];
  preferredSituations: string[];
};

export type MatchSituation = {
  id: string;
  minute: number;
  title: string;
  description: string;
  type: SituationType;
  preferredCardTypes: CardType[];
};

export type MatchState = {
  playerTeam: Team;
  rivalTeam: Team;
  playerScore: number;
  rivalScore: number;
  currentMomentIndex: number;
  totalMoments: number;
  playerEnergy: number;
  rivalEnergy: number;
  playerMomentum: number;
  rivalMomentum: number;
  history: MatchEvent[];
  status: MatchStatus;
};

export type MatchEvent = {
  id: string;
  minute: number;
  situationId: string;
  playerCardId: string;
  rivalCardId: string;
  outcome: PlayOutcome;
  narration: string;
  playerScore: number;
  rivalScore: number;
  playerEnergy: number;
  rivalEnergy: number;
  playerMomentum: number;
  rivalMomentum: number;
};
```

---

## 3.2 `src/lib/game/balance.ts`

```ts
export const BALANCE = {
  initialEnergy: 100,
  initialMomentum: 50,
  totalMoments: 8,
  cardsPerHand: 4,
  randomMin: -8,
  randomMax: 8,
  goalThreshold: 89,
  shotThreshold: 79,
  chanceThreshold: 66,
  possessionThreshold: 51,
  neutralThreshold: 36,
  minValue: 0,
  maxValue: 100,
} as const;
```

---

## 3.3 `src/lib/game/teams.ts`

```ts
import type { Team } from "./types";

export const TEAMS: Team[] = [
  {
    id: "los-del-parque",
    name: "Los del Parque",
    style: "balanced",
    description:
      "Un equipo equilibrado, ordenado y confiable. No domina en una sola área, pero puede competir bien en casi cualquier situación.",
    strengths: ["Juego colectivo", "Equilibrio", "Mentalidad estable"],
    weaknesses: ["No tiene una especialidad dominante", "Puede sufrir contra equipos muy físicos"],
    players: [
      {
        id: "nico-el-seguro",
        name: "Nico",
        nickname: "El Seguro",
        role: "goalkeeper",
        attack: 25,
        defense: 72,
        technique: 45,
        physical: 60,
        mentality: 70,
        stamina: 65,
        trait: "Ataja mejor en momentos de alta presión.",
      },
      {
        id: "mau-el-ordenado",
        name: "Mau",
        nickname: "El Ordenado",
        role: "defender",
        attack: 35,
        defense: 76,
        technique: 55,
        physical: 68,
        mentality: 64,
        stamina: 70,
        trait: "Reduce errores defensivos en jugadas cerradas.",
      },
      {
        id: "sebas-el-cerebro",
        name: "Sebas",
        nickname: "El Cerebro",
        role: "midfielder",
        attack: 58,
        defense: 55,
        technique: 78,
        physical: 55,
        mentality: 72,
        stamina: 68,
        trait: "Mejora cartas relacionadas con pase y control.",
      },
      {
        id: "leo-el-crack",
        name: "Leo",
        nickname: "El Crack",
        role: "forward",
        attack: 80,
        defense: 28,
        technique: 76,
        physical: 58,
        mentality: 63,
        stamina: 62,
        trait: "Mejora en jugadas decisivas, pero consume más energía.",
      },
      {
        id: "dani-comodin",
        name: "Dani",
        nickname: "Comodín",
        role: "utility",
        attack: 60,
        defense: 60,
        technique: 60,
        physical: 60,
        mentality: 60,
        stamina: 70,
        trait: "Se adapta bien a cualquier situación del partido.",
      },
    ],
  },
  {
    id: "cemento-fc",
    name: "Cemento FC",
    style: "physical",
    description:
      "Un equipo físico y defensivo. Es fuerte en choques, presión y partidos cerrados, pero puede sufrir contra rivales técnicos.",
    strengths: ["Defensa fuerte", "Juego físico", "Resistencia"],
    weaknesses: ["Poca creatividad", "Menor técnica ofensiva", "Riesgo de faltas"],
    players: [
      {
        id: "rolo-manos-duras",
        name: "Rolo",
        nickname: "Manos Duras",
        role: "goalkeeper",
        attack: 20,
        defense: 78,
        technique: 38,
        physical: 72,
        mentality: 62,
        stamina: 65,
        trait: "Mejor contra tiros potentes, peor contra tiros colocados.",
      },
      {
        id: "chino-el-muro",
        name: "Chino",
        nickname: "El Muro",
        role: "defender",
        attack: 28,
        defense: 84,
        technique: 42,
        physical: 82,
        mentality: 66,
        stamina: 74,
        trait: "Mejora bloqueos y marcas físicas.",
      },
      {
        id: "kevin-motorcito",
        name: "Kevin",
        nickname: "Motorcito",
        role: "midfielder",
        attack: 50,
        defense: 68,
        technique: 58,
        physical: 76,
        mentality: 64,
        stamina: 82,
        trait: "Gasta menos energía cuando el equipo presiona.",
      },
      {
        id: "bryan-tanque",
        name: "Bryan",
        nickname: "Tanque",
        role: "forward",
        attack: 72,
        defense: 40,
        technique: 48,
        physical: 84,
        mentality: 58,
        stamina: 68,
        trait: "Mejora en centros, choques y jugadas aéreas.",
      },
      {
        id: "ariel-el-lenero",
        name: "Ariel",
        nickname: "El Leñero",
        role: "utility",
        attack: 48,
        defense: 72,
        technique: 45,
        physical: 86,
        mentality: 52,
        stamina: 70,
        trait: "Roba más balones, pero aumenta el riesgo de falta.",
      },
    ],
  },
];

export function getTeamById(teamId: string): Team | undefined {
  return TEAMS.find((team) => team.id === teamId);
}

export function getDefaultRivalTeam(selectedTeamId: string): Team {
  const rival = TEAMS.find((team) => team.id !== selectedTeamId);

  if (!rival) {
    throw new Error("No hay equipo rival disponible.");
  }

  return rival;
}
```

---

## 3.4 `src/lib/game/cards.ts`

```ts
import type { TacticalCard } from "./types";

export const TACTICAL_CARDS: TacticalCard[] = [
  {
    id: "pase-filtrado",
    name: "Pase filtrado",
    type: "attack",
    description: "Busca romper la línea defensiva con un pase profundo.",
    basePower: 72,
    risk: 45,
    energyCost: 12,
    strongAgainst: ["bloque-bajo", "defensa-lenta"],
    weakAgainst: ["linea-adelantada", "anticipacion"],
    preferredSituations: ["ataque-centro", "contraataque", "ultima-jugada"],
  },
  {
    id: "regate-individual",
    name: "Regate individual",
    type: "attack",
    description: "El jugador intenta superar a su marcador en el uno contra uno.",
    basePower: 70,
    risk: 55,
    energyCost: 14,
    strongAgainst: ["bloque-bajo", "marca-pasiva"],
    weakAgainst: ["barrida-fuerte", "marcar-al-hombre"],
    preferredSituations: ["ataque-banda", "contraataque"],
  },
  {
    id: "centro-al-area",
    name: "Centro al área",
    type: "attack",
    description: "Manda la pelota al área buscando un remate peligroso.",
    basePower: 66,
    risk: 35,
    energyCost: 10,
    strongAgainst: ["bloque-bajo", "defensa-baja"],
    weakAgainst: ["marcar-al-hombre", "bloqueo-aereo"],
    preferredSituations: ["ataque-banda", "corner", "tiro-libre"],
  },
  {
    id: "tiro-lejano",
    name: "Tiro lejano",
    type: "attack",
    description: "Prueba desde fuera del área para sorprender al portero.",
    basePower: 62,
    risk: 60,
    energyCost: 9,
    strongAgainst: ["bloque-bajo", "defensa-encerrada"],
    weakAgainst: ["tapar-disparo", "portero-atento"],
    preferredSituations: ["ataque-centro", "posesion-media", "tiro-libre"],
  },
  {
    id: "pared-rapida",
    name: "Pared rápida",
    type: "attack",
    description: "Una combinación corta para romper la marca rival.",
    basePower: 68,
    risk: 40,
    energyCost: 11,
    strongAgainst: ["defensa-lenta", "presion-desordenada"],
    weakAgainst: ["anticipacion", "marcar-al-hombre"],
    preferredSituations: ["ataque-centro", "posesion-media"],
  },
  {
    id: "tiro-colocado",
    name: "Tiro colocado",
    type: "attack",
    description: "Busca precisión en vez de potencia para vencer al portero.",
    basePower: 65,
    risk: 38,
    energyCost: 10,
    strongAgainst: ["portero-fisico", "defensa-desordenada"],
    weakAgainst: ["portero-atento", "tapar-disparo"],
    preferredSituations: ["ataque-centro", "tiro-libre", "ultima-jugada"],
  },
  {
    id: "presion-alta",
    name: "Presión alta",
    type: "defense",
    description: "El equipo adelanta líneas para recuperar rápido.",
    basePower: 70,
    risk: 50,
    energyCost: 15,
    strongAgainst: ["toque-corto", "pausa-y-control"],
    weakAgainst: ["pelotazo", "pase-filtrado"],
    preferredSituations: ["presion-rival", "posesion-media"],
  },
  {
    id: "bloque-bajo",
    name: "Bloque bajo",
    type: "defense",
    description: "El equipo se junta atrás para cerrar espacios.",
    basePower: 68,
    risk: 25,
    energyCost: 8,
    strongAgainst: ["regate-individual", "tiro-colocado"],
    weakAgainst: ["tiro-lejano", "centro-al-area"],
    preferredSituations: ["ataque-centro", "ataque-banda", "ultima-jugada"],
  },
  {
    id: "barrida-fuerte",
    name: "Barrida fuerte",
    type: "defense",
    description: "Una entrada agresiva para cortar la jugada.",
    basePower: 74,
    risk: 65,
    energyCost: 12,
    strongAgainst: ["regate-individual", "contraataque"],
    weakAgainst: ["pared-rapida", "provocar-falta"],
    preferredSituations: ["contraataque", "ataque-banda"],
  },
  {
    id: "linea-adelantada",
    name: "Línea adelantada",
    type: "defense",
    description: "La defensa intenta dejar al rival en fuera de juego.",
    basePower: 66,
    risk: 52,
    energyCost: 10,
    strongAgainst: ["pase-filtrado", "ataque-directo"],
    weakAgainst: ["regate-individual", "tiro-lejano"],
    preferredSituations: ["contraataque", "ataque-centro"],
  },
  {
    id: "marcar-al-hombre",
    name: "Marcar al hombre",
    type: "defense",
    description: "Un jugador sigue de cerca al rival más peligroso.",
    basePower: 64,
    risk: 30,
    energyCost: 9,
    strongAgainst: ["pared-rapida", "tiro-colocado", "inspiracion-del-crack"],
    weakAgainst: ["cambio-de-banda", "toque-corto"],
    preferredSituations: ["ataque-centro", "ultima-jugada"],
  },
  {
    id: "anticipacion",
    name: "Anticipación",
    type: "defense",
    description: "Lee la jugada antes de que el rival pueda ejecutarla.",
    basePower: 67,
    risk: 42,
    energyCost: 10,
    strongAgainst: ["pase-filtrado", "pared-rapida", "toque-corto"],
    weakAgainst: ["regate-individual", "tiro-lejano"],
    preferredSituations: ["posesion-media", "ataque-centro"],
  },
  {
    id: "toque-corto",
    name: "Toque corto",
    type: "midfield",
    description: "El equipo mueve la pelota con pases cortos para controlar la jugada.",
    basePower: 63,
    risk: 28,
    energyCost: 7,
    strongAgainst: ["bloque-bajo", "defensa-desordenada"],
    weakAgainst: ["presion-alta", "anticipacion"],
    preferredSituations: ["posesion-media", "ataque-centro"],
  },
  {
    id: "cambio-de-banda",
    name: "Cambio de banda",
    type: "midfield",
    description: "Mueve el juego hacia el lado débil de la defensa rival.",
    basePower: 61,
    risk: 35,
    energyCost: 8,
    strongAgainst: ["marcar-al-hombre", "bloque-bajo"],
    weakAgainst: ["anticipacion", "presion-alta"],
    preferredSituations: ["ataque-banda", "posesion-media"],
  },
  {
    id: "pelotazo",
    name: "Pelotazo",
    type: "midfield",
    description: "Busca una pelota directa para saltarse la presión rival.",
    basePower: 58,
    risk: 48,
    energyCost: 6,
    strongAgainst: ["presion-alta", "linea-adelantada"],
    weakAgainst: ["bloque-bajo", "defensa-fisica"],
    preferredSituations: ["presion-rival", "contraataque"],
  },
  {
    id: "pausa-y-control",
    name: "Pausa y control",
    type: "midfield",
    description: "Baja el ritmo para ordenar al equipo y cuidar la pelota.",
    basePower: 60,
    risk: 25,
    energyCost: 6,
    strongAgainst: ["rival-cansado", "partido-caotico"],
    weakAgainst: ["presion-alta", "anticipacion"],
    preferredSituations: ["posesion-media", "presion-rival"],
  },
  {
    id: "ultima-jugada",
    name: "Última jugada",
    type: "special",
    description: "El equipo tira todo lo que le queda en una acción decisiva.",
    basePower: 72,
    risk: 45,
    energyCost: 12,
    strongAgainst: ["rival-nervioso", "momentum-alto"],
    weakAgainst: ["bloque-bajo", "marcar-al-hombre"],
    preferredSituations: ["ultima-jugada"],
  },
  {
    id: "la-hinchada-empuja",
    name: "La hinchada empuja",
    type: "special",
    description: "El ambiente levanta al equipo en un momento complicado.",
    basePower: 55,
    risk: 20,
    energyCost: 5,
    strongAgainst: ["momentum-bajo", "partido-cerrado"],
    weakAgainst: ["derrota-amplia"],
    preferredSituations: ["posesion-media", "ultima-jugada", "presion-rival"],
  },
  {
    id: "todo-o-nada",
    name: "Todo o nada",
    type: "special",
    description: "Una apuesta total por atacar, aunque el equipo quede expuesto.",
    basePower: 82,
    risk: 75,
    energyCost: 18,
    strongAgainst: ["rival-cansado", "necesidad-de-gol"],
    weakAgainst: ["bloque-bajo", "anticipacion"],
    preferredSituations: ["ultima-jugada", "contraataque"],
  },
  {
    id: "enfriar-el-partido",
    name: "Enfriar el partido",
    type: "special",
    description: "Reduce el ritmo del juego para proteger una ventaja.",
    basePower: 58,
    risk: 30,
    energyCost: 7,
    strongAgainst: ["rival-acelerado", "momentum-rival"],
    weakAgainst: ["necesidad-de-gol"],
    preferredSituations: ["posesion-media", "presion-rival", "ultima-jugada"],
  },
];

export function getCardById(cardId: string): TacticalCard | undefined {
  return TACTICAL_CARDS.find((card) => card.id === cardId);
}

export function getCardsByType(type: TacticalCard["type"]): TacticalCard[] {
  return TACTICAL_CARDS.filter((card) => card.type === type);
}
```

---

## 3.5 `src/lib/game/situations.ts`

```ts
import type { MatchSituation } from "./types";

export const MATCH_SITUATIONS: MatchSituation[] = [
  {
    id: "ataque-banda",
    minute: 8,
    title: "Ataque por banda",
    description:
      "Tu equipo encuentra espacio por un costado. Es una buena oportunidad para encarar, centrar o cambiar el ritmo.",
    type: "attack",
    preferredCardTypes: ["attack", "midfield"],
  },
  {
    id: "ataque-centro",
    minute: 17,
    title: "Ataque por el centro",
    description:
      "La pelota llega a una zona peligrosa frente al área. Hay opción de filtrar, combinar o rematar.",
    type: "attack",
    preferredCardTypes: ["attack", "midfield"],
  },
  {
    id: "contraataque",
    minute: 28,
    title: "Contraataque",
    description:
      "El rival quedó mal parado. Hay espacio para atacar rápido, pero una mala decisión puede desperdiciar la jugada.",
    type: "attack",
    preferredCardTypes: ["attack", "midfield"],
  },
  {
    id: "posesion-media",
    minute: 41,
    title: "Posesión en medio campo",
    description:
      "El partido se traba en la mitad. Podés controlar, cambiar de banda o intentar acelerar.",
    type: "midfield",
    preferredCardTypes: ["midfield", "attack"],
  },
  {
    id: "presion-rival",
    minute: 53,
    title: "El rival presiona",
    description:
      "El rival adelanta líneas y busca forzar un error. Hay que decidir si salir jugando o saltarse la presión.",
    type: "defense",
    preferredCardTypes: ["midfield", "defense"],
  },
  {
    id: "tiro-libre",
    minute: 66,
    title: "Tiro libre peligroso",
    description:
      "Tenés una pelota parada cerca del área. Puede ser centro, remate directo o jugada preparada.",
    type: "set_piece",
    preferredCardTypes: ["attack", "special"],
  },
  {
    id: "corner",
    minute: 78,
    title: "Córner",
    description:
      "La pelota va al área. Es momento de buscar fuerza, precisión o una segunda jugada.",
    type: "set_piece",
    preferredCardTypes: ["attack", "special"],
  },
  {
    id: "ultima-jugada",
    minute: 89,
    title: "Última jugada",
    description:
      "Queda una más. El partido puede definirse ahora mismo: asegurar, arriesgar o tirar todo al área.",
    type: "special",
    preferredCardTypes: ["attack", "special", "defense"],
  },
];

export const MATCH_MOMENTS = MATCH_SITUATIONS.map((situation) => situation.minute);

export function getSituationById(situationId: string): MatchSituation | undefined {
  return MATCH_SITUATIONS.find((situation) => situation.id === situationId);
}
```

---

## 3.6 `src/lib/game/utils.ts`

```ts
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("No se puede elegir un elemento de una lista vacía.");
  }

  return items[randomBetween(0, items.length - 1)];
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomBetween(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
}
```

---

# 4. Pantallas temporales del Sprint 1

Estas pantallas todavía no son el juego completo. Solo sirven para confirmar que el proyecto corre y que la ruta `/match` existe.

## 4.1 `src/app/page.tsx`

```tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-200">
          MVP 1 · Partido táctico por cartas
        </p>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          La Mejenga: Camino a la Final
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          Armá tu equipo de barrio, elegí cartas tácticas y resolvé momentos clave
          en partidos rápidos llenos de decisiones, energía y momentum.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/match"
            className="rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300"
          >
            Jugar partido rápido
          </Link>

          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-700 px-6 py-3 font-bold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Ver base técnica
          </a>
        </div>
      </section>
    </main>
  );
}
```

---

## 4.2 `src/app/match/page.tsx`

```tsx
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
```

---

# 5. Validación del Sprint 1

Después de crear los archivos, ejecutar:

```bash
npm run dev
```

Revisar:

```txt
http://localhost:3000
http://localhost:3000/match
```

La ruta `/match` debe mostrar:

* 2 equipos cargados.
* 20 cartas tácticas.
* 8 momentos clave.
* Lista de jugadores por equipo.

---

# 6. Resultado esperado al terminar Sprint 1

Al finalizar este sprint, el proyecto debe tener:

* Next.js funcionando.
* TypeScript funcionando.
* Tailwind funcionando.
* Estructura base creada.
* Tipos principales definidos.
* Dos equipos iniciales.
* Diez jugadores iniciales.
* Veinte cartas tácticas.
* Ocho situaciones de partido.
* Utilidades base.
* Pantallas temporales para validar que los datos cargan correctamente.

---

# 7. Qué NO hacemos todavía

Todavía no se implementa:

* Motor de partido.
* IA real.
* Resolución de jugadas.
* Pantalla jugable completa.
* Animaciones.
* Progresión.
* Login.
* Supabase.
* Amigos.
* Mensajes.
* Multijugador.

Eso corresponde a los siguientes sprints.

---

# 8. Próximo paso después de Sprint 1

El Sprint 2 debe crear estos archivos:

```txt
src/lib/game/ai.ts
src/lib/game/narration.ts
src/lib/game/resolver.ts
src/lib/game/match-engine.ts
```

Y debe implementar estas funciones:

```ts
startMatch()
getCurrentSituation()
getAvailableCardsForSituation()
selectProtagonist()
chooseAiCard()
generateNarration()
resolvePlay()
playMoment()
isMatchFinished()
```

Cuando eso esté listo, el juego todavía puede no verse bonito, pero ya tendrá corazón jugable.