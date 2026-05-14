import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-bold text-emerald-200">
          MVP 1 · Partido táctico por cartas
        </p>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          La Mejenga: Camino a la Final
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          Un juego de fútbol de barrio donde cada partido se decide en momentos clave:
          cartas tácticas, energía, momentum y decisiones que pueden cambiarlo todo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/teams"
            className="rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300"
          >
            Jugar partido rápido
          </Link>
          <Link
            href="/camino"
            className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-black transition hover:bg-emerald-300"
          >
            Camino a la Final
          </Link>
          <a
            href="/progreso"
            className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-100 transition hover:bg-zinc-900"
          >
            Ver progreso
          </a>
        </div>
      </section>
    </main>
  );
}