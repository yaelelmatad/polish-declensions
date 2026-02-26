import type { Sentence, Word, FilterSettings, AdjectivalItem, Gender } from "../types";
import { loadAttempts, aggregateProgress, getWorstBuckets } from "./progress";
import { expandSentenceVariants } from "./sentenceVariants";
import { ANIMATE_WORD_IDS } from "../data/words";

function getItemType(s: Sentence): "noun" | "adjective" | "pronoun" | "cardinal" | "ordinal" {
  return s.itemType ?? "noun";
}

function getItemId(s: Sentence): string {
  return s.itemId ?? s.wordId!;
}

export interface Question {
  sentence: Sentence;
  word?: Word;
  adjectivalItem?: AdjectivalItem;
  gender: Gender;
  virile: boolean;
}

export function getExpectedForm(q: Question): string {
  const { sentence, word, adjectivalItem, gender, virile } = q;
  const caseKey = sentence.case;
  const number = sentence.number;

  if (word) {
    return word.forms[number][caseKey];
  }
  if (adjectivalItem) {
    if (number === "singular") {
      return adjectivalItem.forms.singular[gender][caseKey];
    }
    return adjectivalItem.forms.plural[virile ? "virile" : "nonVirile"][caseKey];
  }
  return "";
}

function sentenceMatchesFilters(
  sentence: Sentence,
  gender: Gender,
  virile: boolean,
  settings: FilterSettings
): boolean {
  if (settings.cases.length > 0 && !settings.cases.includes(sentence.case))
    return false;
  if (settings.genders.length > 0 && !settings.genders.includes(gender))
    return false;
  if (settings.number !== "both") {
    if (sentence.number !== settings.number) return false;
  }
  if (sentence.number === "plural" && gender === "m") {
    if (settings.virile === "virile" && !virile) return false;
    if (settings.virile === "non-virile" && virile) return false;
  }
  return true;
}

export function getEligibleQuestions(
  sentences: Sentence[],
  wordMap: Map<string, Word>,
  adjectivalMap: Map<string, AdjectivalItem>,
  settings: FilterSettings
): Question[] {
  const questions: Question[] = [];
  const wordTypes = settings.wordTypes.length > 0 ? settings.wordTypes : (["noun", "adjective", "pronoun", "cardinal", "ordinal"] as const);

  for (const sentence of sentences) {
    const itemType = getItemType(sentence);
    if (!wordTypes.includes(itemType)) continue;

    const itemId = getItemId(sentence);

    if (itemType === "noun") {
      const word = wordMap.get(itemId);
      if (!word) continue;
      // All stem types selected = no filter; otherwise filter to selected stems only
      const stemFilterActive =
        settings.stemTypes.length > 0 && settings.stemTypes.length < 3;
      if (
        stemFilterActive &&
        (!word.stemType || !settings.stemTypes.includes(word.stemType))
      )
        continue;
      if (settings.animate !== "both") {
        const isAnimate = ANIMATE_WORD_IDS.has(word.id);
        if (settings.animate === "animate" && !isAnimate) continue;
        if (settings.animate === "inanimate" && isAnimate) continue;
      }
      if (sentenceMatchesFilters(sentence, word.gender, word.virile, settings)) {
        const sentenceVariants = expandSentenceVariants(sentence);
        for (const sVar of sentenceVariants) {
          questions.push({
            sentence: sVar,
            word,
            gender: word.gender,
            virile: word.virile,
          });
        }
      }
      continue;
    }

    const item = adjectivalMap.get(itemId);
    if (!item) continue;
    const gender = sentence.gender!;
    const virile = sentence.virile ?? false;
    if (sentenceMatchesFilters(sentence, gender, virile, settings)) {
      const sentenceVariants = expandSentenceVariants(sentence);
      for (const sVar of sentenceVariants) {
        questions.push({
          sentence: sVar,
          adjectivalItem: item,
          gender,
          virile,
        });
      }
    }
  }
  return questions;
}

/** One question's bucket key (case|gender|number|virile) for variety logic. */
export function getQuestionBucketKey(q: Question): string {
  return `${q.sentence.case}|${q.gender}|${q.sentence.number}|${q.virile}`;
}

/** Fisher–Yates shuffle in place. */
function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Pick next question: mostly random from full pool for variety; sometimes bias
 * toward worst-performing buckets. Full eligible list is shuffled first so
 * order is never tied to data order.
 */
export function pickQuestion(
  sentences: Sentence[],
  wordMap: Map<string, Word>,
  adjectivalMap: Map<string, AdjectivalItem>,
  settings: FilterSettings,
  lastBucketKey?: string | null
): Question | null {
  const eligible = getEligibleQuestions(
    sentences,
    wordMap,
    adjectivalMap,
    settings
  );
  if (eligible.length === 0) return null;

  // Shuffle the full list first so question order is never predictable
  const shuffled = [...eligible];
  shuffle(shuffled);

  const attempts = loadAttempts();
  const buckets = aggregateProgress(attempts);
  const worst = getWorstBuckets(buckets, 4);
  const worstKeys = new Set(
    worst.map((b) => `${b.case}|${b.gender}|${b.number}|${b.virile}`)
  );
  const fromWorst = shuffled.filter((q) =>
    worstKeys.has(getQuestionBucketKey(q))
  );

  // 35% from worst buckets (for practice), 65% from full shuffled pool
  const useWeighted = fromWorst.length > 0 && Math.random() < 0.35;
  let pool = useWeighted ? [...fromWorst] : shuffled;

  // Sometimes prefer a different bucket than last (50%) to break runs without forcing a pattern
  if (
    lastBucketKey &&
    pool.length > 1 &&
    Math.random() < 0.5
  ) {
    const other = pool.filter((q) => getQuestionBucketKey(q) !== lastBucketKey);
    if (other.length > 0) pool = other;
  }

  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx] ?? shuffled[0];
}
