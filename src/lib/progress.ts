import type { Attempt, ProgressBucket } from "../types";
import type { CaseKey, Gender, NumberKey } from "../types";
import type { ConjugationType } from "../data/imperativeVerbs";
import type { ImperativePerson } from "../data/imperativeSentences";
import type { MotionContext, MotionTransport } from "../data/motionSentences";

// ===========================================================================
// Declension progress
// ===========================================================================
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

// ===========================================================================
// Imperative progress
// ===========================================================================
export interface ImperativeAttempt {
  conjugation: ConjugationType;
  person: ImperativePerson;
  verbId: string;
  correct: boolean;
  timestamp: number;
}

export interface ImperativeBucket {
  conjugation: ConjugationType;
  person: ImperativePerson;
  correct: number;
  total: number;
  accuracy: number;
}

const IMP_STORAGE_KEY = "polish-imperative-attempts";

export function loadImperativeAttempts(): ImperativeAttempt[] {
  try {
    const raw = localStorage.getItem(IMP_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ImperativeAttempt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearImperativeAttempts(): void {
  try { localStorage.removeItem(IMP_STORAGE_KEY); } catch {}
}

export function saveImperativeAttempt(attempt: ImperativeAttempt): void {
  const attempts = loadImperativeAttempts();
  attempts.push(attempt);
  localStorage.setItem(IMP_STORAGE_KEY, JSON.stringify(attempts));
}

export function aggregateImperativeProgress(
  attempts: ImperativeAttempt[]
): ImperativeBucket[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    const key = `${a.conjugation}|${a.person}`;
    const cur = map.get(key) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    map.set(key, cur);
  }
  const buckets: ImperativeBucket[] = [];
  for (const [key, { correct, total }] of map) {
    const [conjugation, person] = key.split("|") as [ConjugationType, ImperativePerson];
    buckets.push({
      conjugation,
      person,
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    });
  }
  return buckets.sort((a, b) => a.accuracy - b.accuracy);
}

// ===========================================================================
// Verbal noun progress
// ===========================================================================
export interface VerbalNounAttempt {
  verbId: string;
  hasObject: boolean;
  correct: boolean;
  timestamp: number;
}

export interface VerbalNounBucket {
  verbId: string;
  hasObject: boolean;
  correct: number;
  total: number;
  accuracy: number;
}

const VN_STORAGE_KEY = "polish-verbal-noun-attempts";

export function loadVerbalNounAttempts(): VerbalNounAttempt[] {
  try {
    const raw = localStorage.getItem(VN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VerbalNounAttempt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearVerbalNounAttempts(): void {
  try { localStorage.removeItem(VN_STORAGE_KEY); } catch {}
}

export function saveVerbalNounAttempt(attempt: VerbalNounAttempt): void {
  const attempts = loadVerbalNounAttempts();
  attempts.push(attempt);
  localStorage.setItem(VN_STORAGE_KEY, JSON.stringify(attempts));
}

export function aggregateVerbalNounProgress(
  attempts: VerbalNounAttempt[]
): VerbalNounBucket[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    const key = `${a.verbId}|${a.hasObject}`;
    const cur = map.get(key) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    map.set(key, cur);
  }
  const buckets: VerbalNounBucket[] = [];
  for (const [key, { correct, total }] of map) {
    const [verbId, hasObjStr] = key.split("|");
    buckets.push({
      verbId,
      hasObject: hasObjStr === "true",
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    });
  }
  return buckets.sort((a, b) => a.accuracy - b.accuracy);
}

// ===========================================================================
// Motion verbs progress
// ===========================================================================
export interface MotionAttempt {
  context: MotionContext;
  transport: MotionTransport;
  tense: string;
  correct: boolean;
  timestamp: number;
}

export interface MotionBucket {
  context: MotionContext;
  transport: MotionTransport;
  tense: string;
  correct: number;
  total: number;
  accuracy: number;
}

const MOTION_STORAGE_KEY = "polish-motion-attempts";

export function loadMotionAttempts(): MotionAttempt[] {
  try {
    const raw = localStorage.getItem(MOTION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MotionAttempt[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearMotionAttempts(): void {
  try { localStorage.removeItem(MOTION_STORAGE_KEY); } catch {}
}

export function saveMotionAttempt(attempt: MotionAttempt): void {
  const attempts = loadMotionAttempts();
  attempts.push(attempt);
  localStorage.setItem(MOTION_STORAGE_KEY, JSON.stringify(attempts));
}

export function aggregateMotionProgress(
  attempts: MotionAttempt[]
): MotionBucket[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    const key = `${a.context}|${a.transport}|${a.tense}`;
    const cur = map.get(key) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    map.set(key, cur);
  }
  const buckets: MotionBucket[] = [];
  for (const [key, { correct, total }] of map) {
    const [context, transport, tense] = key.split("|") as [MotionContext, MotionTransport, string];
    buckets.push({
      context,
      transport,
      tense,
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    });
  }
  return buckets.sort((a, b) => a.accuracy - b.accuracy);
}
