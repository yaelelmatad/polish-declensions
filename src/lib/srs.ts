/**
 * Spaced Repetition System (SM-2 inspired).
 *
 * Each question is a "card" with:
 *  - easeFactor: multiplier for interval growth (starts 2.5, min 1.3)
 *  - interval:   minutes until next review
 *  - nextReview:  timestamp (ms) when card is due
 *  - repetitions: consecutive correct answers (resets on wrong)
 *
 * Learning steps (first few correct answers use fixed intervals):
 *   rep 0 → 1 min,  rep 1 → 10 min,  rep 2 → 1 day,  rep 3 → 3 days
 * After that: interval *= easeFactor
 *
 * Wrong answer: repetitions = 0, interval = 1 min, easeFactor -= 0.2 (min 1.3)
 */

export interface SRSCard {
  questionId: string;
  easeFactor: number;
  interval: number;
  nextReview: number;
  repetitions: number;
  lastReview: number;
}

export type SRSDeck = Record<string, SRSCard>;

const LEARNING_STEPS_MIN = [1, 10, 1440, 4320]; // 1m, 10m, 1 day, 3 days
const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;

function deckKey(deckName: string): string {
  return `srs-${deckName}`;
}

export function loadDeck(deckName: string): SRSDeck {
  try {
    const raw = localStorage.getItem(deckKey(deckName));
    if (!raw) return {};
    return JSON.parse(raw) as SRSDeck;
  } catch {
    return {};
  }
}

export function saveDeck(deckName: string, deck: SRSDeck): void {
  localStorage.setItem(deckKey(deckName), JSON.stringify(deck));
}

export function clearDeck(deckName: string): void {
  try { localStorage.removeItem(deckKey(deckName)); } catch {}
}

export function updateCard(
  deckName: string,
  questionId: string,
  correct: boolean
): SRSCard {
  const deck = loadDeck(deckName);
  const existing = deck[questionId];
  const now = Date.now();

  let card: SRSCard;

  if (!existing) {
    card = {
      questionId,
      easeFactor: DEFAULT_EASE,
      interval: 0,
      nextReview: now,
      repetitions: 0,
      lastReview: now,
    };
  } else {
    card = { ...existing };
  }

  if (correct) {
    if (card.repetitions < LEARNING_STEPS_MIN.length) {
      card.interval = LEARNING_STEPS_MIN[card.repetitions];
    } else {
      card.interval = Math.round(card.interval * card.easeFactor);
    }
    card.repetitions += 1;
    card.easeFactor = Math.max(MIN_EASE, card.easeFactor + 0.05);
  } else {
    card.repetitions = 0;
    card.interval = LEARNING_STEPS_MIN[0];
    card.easeFactor = Math.max(MIN_EASE, card.easeFactor - 0.2);
  }

  card.lastReview = now;
  card.nextReview = now + card.interval * 60_000;

  deck[questionId] = card;
  saveDeck(deckName, deck);
  return card;
}

/**
 * Pick the best question ID to review from a list of eligible IDs.
 *
 * Priority:
 *  1. Most overdue cards (nextReview < now, sorted oldest first)
 *  2. New cards (never seen) — shuffled
 *  3. If nothing is due, null (caller can decide to show "all caught up" or pick randomly)
 *
 * Returns the questionId or null.
 */
export function pickNextDue(
  deckName: string,
  eligibleIds: string[]
): string | null {
  const deck = loadDeck(deckName);
  const now = Date.now();

  const overdue: { id: string; due: number }[] = [];
  const unseen: string[] = [];

  for (const id of eligibleIds) {
    const card = deck[id];
    if (!card) {
      unseen.push(id);
    } else if (card.nextReview <= now) {
      overdue.push({ id, due: card.nextReview });
    }
  }

  // Most overdue first
  overdue.sort((a, b) => a.due - b.due);

  if (overdue.length > 0) {
    // Pick from top ~3 overdue with some randomness to avoid pure predictability
    const topN = Math.min(3, overdue.length);
    const idx = Math.floor(Math.random() * topN);
    return overdue[idx].id;
  }

  if (unseen.length > 0) {
    const idx = Math.floor(Math.random() * unseen.length);
    return unseen[idx];
  }

  return null;
}

/** Summary stats for a deck. */
export interface SRSStats {
  total: number;
  seen: number;
  unseen: number;
  dueNow: number;
  dueTodayRemaining: number;
  avgEase: number;
  mature: number;
}

export function getDeckStats(
  deckName: string,
  eligibleIds: string[]
): SRSStats {
  const deck = loadDeck(deckName);
  const now = Date.now();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const eod = endOfDay.getTime();

  let seen = 0;
  let dueNow = 0;
  let dueTodayRemaining = 0;
  let easeSum = 0;
  let mature = 0;

  for (const id of eligibleIds) {
    const card = deck[id];
    if (!card) continue;
    seen++;
    easeSum += card.easeFactor;
    if (card.nextReview <= now) dueNow++;
    else if (card.nextReview <= eod) dueTodayRemaining++;
    if (card.interval >= 1440 * 21) mature++; // 21+ day interval = "mature"
  }

  return {
    total: eligibleIds.length,
    seen,
    unseen: eligibleIds.length - seen,
    dueNow,
    dueTodayRemaining,
    avgEase: seen > 0 ? easeSum / seen : DEFAULT_EASE,
    mature,
  };
}
