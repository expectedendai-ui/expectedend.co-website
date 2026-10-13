// Which golden eggs this visitor has found, shared by the canvas (where the eggs
// hide on photos) and the hunt overlay (counter, burst, finale).
const STORE_KEY = "ee-egg-hunt-found";

type Listener = () => void;
const listeners = new Set<Listener>();
let found: string[] = read();
let lastClaim: { x: number; y: number; at: number } | null = null;

function read(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function subscribeEggs(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export const foundEggs = () => found;
export const lastEggClaim = () => lastClaim;
export const isEggFound = (url: string) => found.includes(url);

export function claimEgg(url: string, x: number, y: number) {
  if (found.includes(url)) return;
  found = [...found, url];
  lastClaim = { x, y, at: found.length };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(found));
  } catch {
    // Private mode: the hunt still works for this visit.
  }
  for (const fn of listeners) fn();
}

/** Test helper. */
export function resetEggs() {
  found = [];
  lastClaim = null;
  for (const fn of listeners) fn();
}
