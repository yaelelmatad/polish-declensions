/**
 * Polish diacritic mapping to ASCII for normalization.
 * Used for correctness check (treat l/ł etc. as same).
 */
const DIACRITIC_MAP: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
  Ą: "a",
  Ć: "c",
  Ę: "e",
  Ł: "l",
  Ń: "n",
  Ó: "o",
  Ś: "s",
  Ź: "z",
  Ż: "z",
};

const DIACRITIC_CHARS = new Set<string>(Object.keys(DIACRITIC_MAP));

/**
 * Normalize string for comparison: lowercase, trim, replace diacritics with ASCII.
 */
export function normalize(str: string): string {
  let s = str.trim().toLowerCase();
  for (const [dia, ascii] of Object.entries(DIACRITIC_MAP)) {
    s = s.split(dia).join(ascii);
  }
  return s;
}

/**
 * Check if two strings are equal when normalized (diacritic-insensitive).
 */
export function normalizedEquals(a: string, b: string): boolean {
  return normalize(a) === normalize(b);
}

/**
 * Find which diacritic characters in the expected string were missing
 * (user wrote ASCII or different char at that position).
 * Returns list of { char, position } for each missed diacritic.
 */
export function findMissedDiacritics(
  expected: string,
  actual: string
): { char: string; position: number }[] {
  const missed: { char: string; position: number }[] = [];
  const exp = expected.toLowerCase();
  const act = actual.toLowerCase();
  const maxLen = Math.max(exp.length, act.length);
  for (let i = 0; i < maxLen; i++) {
    const e = exp[i];
    if (e && DIACRITIC_CHARS.has(e)) {
      const a = act[i];
      if (a !== e) {
        missed.push({ char: e, position: i });
      }
    }
  }
  return missed;
}

export interface CheckResult {
  correct: boolean;
  missedDiacritics: { char: string; position: number }[];
}

/**
 * Check user answer against expected form.
 * Correct if normalized strings match; always compute missed diacritics for feedback.
 */
export function checkAnswer(expected: string, actual: string): CheckResult {
  const normalizedMatch = normalizedEquals(expected, actual);
  const missedDiacritics = findMissedDiacritics(expected, actual);
  return {
    correct: normalizedMatch,
    missedDiacritics,
  };
}
