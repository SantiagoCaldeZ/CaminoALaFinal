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