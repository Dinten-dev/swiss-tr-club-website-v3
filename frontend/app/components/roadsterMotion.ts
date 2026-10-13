/** Follow the scroll position with a short settling time, not a timed spin. */
export function advanceRoadsterTurn(current: number, target: number, elapsedMs: number): number {
  const remaining = Math.max(0, Math.min(1, target) - current);
  const seconds = Math.min(32, Math.max(0, elapsedMs)) / 1000;
  if (!seconds || !remaining) return current;
  const step = remaining * (1 - Math.exp(-seconds / 0.09));
  return remaining < 0.00001 ? Math.min(1, target) : current + step;
}

export function roadsterCamera(progress: number): { azimuth: number; elevation: number; radius: number } {
  const p = Math.max(0, Math.min(1, progress));
  // One complete orbit, returning to the same right-facing three-quarter view.
  // Increasing azimuth presents a rightward turn; all three curves are continuous.
  const travel = p * p * (3 - 2 * p);
  const rise = Math.sin(Math.PI * p) ** 2;
  return {
    azimuth: -35 + 360 * travel,
    elevation: 76 - 48 * rise,
    radius: 100 + 10 * rise,
  };
}
