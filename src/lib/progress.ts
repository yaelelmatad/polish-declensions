import type { Attempt, ProgressBucket } from "../types";
import type { CaseKey, Gender, NumberKey } from "../types";

const STORAGE_KEY = "polish-declension-attempts";

export function loadAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Attempt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearAttempts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function saveAttempt(attempt: Attempt): void {
  const attempts = loadAttempts();
  attempts.push(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

export function aggregateProgress(attempts: Attempt[]): ProgressBucket[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    const key = `${a.case}|${a.gender}|${a.number}|${a.virile}`;
    const cur = map.get(key) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    map.set(key, cur);
  }
  const buckets: ProgressBucket[] = [];
  for (const [key, { correct, total }] of map) {
    const [caseKey, gender, number, virileStr] = key.split("|") as [
      CaseKey,
      Gender,
      NumberKey,
      string,
    ];
    buckets.push({
      case: caseKey,
      gender,
      number: number as NumberKey,
      virile: virileStr === "true",
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    });
  }
  return buckets.sort((a, b) => a.accuracy - b.accuracy);
}

const NEED_PRACTICE_THRESHOLD = 0.7;
const MIN_ATTEMPTS = 5;

export function getNeedsPracticeBuckets(
  buckets: ProgressBucket[]
): ProgressBucket[] {
  return buckets.filter(
    (b) => b.total >= MIN_ATTEMPTS && b.accuracy < NEED_PRACTICE_THRESHOLD
  );
}

export function getWorstBuckets(
  buckets: ProgressBucket[],
  count: number
): ProgressBucket[] {
  return buckets.slice(0, count);
}
