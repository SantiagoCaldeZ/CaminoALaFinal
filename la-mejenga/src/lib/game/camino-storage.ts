import type { CaminoRun } from "./camino";

const CAMINO_STORAGE_KEY = "la-mejenga-camino-run";

export function saveCaminoRun(camino: CaminoRun): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CAMINO_STORAGE_KEY, JSON.stringify(camino));
}

export function loadCaminoRun(): CaminoRun | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawCamino = window.localStorage.getItem(CAMINO_STORAGE_KEY);

  if (!rawCamino) {
    return null;
  }

  try {
    return JSON.parse(rawCamino) as CaminoRun;
  } catch {
    window.localStorage.removeItem(CAMINO_STORAGE_KEY);
    return null;
  }
}

export function clearCaminoRun(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CAMINO_STORAGE_KEY);
}