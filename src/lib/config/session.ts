const DEFAULT_MAX_SESSION_TURNS = 5;

function parsePositiveInteger(value: string | undefined) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return parsed;
}

export function getMaxSessionTurns() {
  return parsePositiveInteger(process.env.MAX_SESSION_TURNS) ?? DEFAULT_MAX_SESSION_TURNS;
}

export { DEFAULT_MAX_SESSION_TURNS };
