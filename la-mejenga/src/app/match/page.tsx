import Link from "next/link";
import { MatchScreen } from "@/components/match/MatchScreen";

export default function MatchPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold text-emerald-300">La Mejenga</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">Partido rápido</h1>
          </div>

          <Link
            href="/"
            className="w-fit rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-900"
          >
            Volver al inicio
          </Link>
        </header>

        <MatchScreen />
      </div>
    </main>
  );
}