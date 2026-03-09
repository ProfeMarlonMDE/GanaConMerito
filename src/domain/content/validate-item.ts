export function validateOptions(options: { key: string; text: string }[]) {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (options.length !== 4) {
    errors.push("El item debe tener exactamente 4 opciones.");
  }

  const validKeys = ["A", "B", "C", "D"];
  const keys = options.map((o) => o.key);

  for (const key of keys) {
    if (!validKeys.includes(key)) {
      errors.push(`Opción inválida: ${key}`);
    }
  }

  const uniqueKeys = new Set(keys);
  if (uniqueKeys.size !== keys.length) {
    errors.push("Hay claves de opción duplicadas.");
  }

  const normalizedTexts = options.map((o) => o.text.trim().toLowerCase());
  const uniqueTexts = new Set(normalizedTexts);
  if (uniqueTexts.size !== normalizedTexts.length) {
    warnings.push("Hay textos de opciones duplicados o muy similares.");
  }

  return { errors, warnings };
}
