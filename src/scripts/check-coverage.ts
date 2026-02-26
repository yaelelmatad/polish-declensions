/**
 * One-off script: ensure at least 10 examples per (wordType, case, gender, number, virile).
 * Run: npx tsx src/scripts/check-coverage.ts
 */
import { words } from "../data/words";
import { sentences } from "../data/sentences";
import { sentencesAdjectival } from "../data/sentencesAdjectival";
import type { Sentence } from "../types";

const CASES = ["nom", "gen", "dat", "acc", "inst", "loc", "voc"] as const;
const GENDERS = ["m", "f", "n"] as const;
const MIN_PER_BUCKET = 10;

type CaseKey = (typeof CASES)[number];
type Gender = (typeof GENDERS)[number];

const wordMap = new Map(words.map((w) => [w.id, { gender: w.gender, virile: w.virile }]));

function bucketKey(
  wordType: string,
  caseKey: CaseKey,
  gender: Gender,
  number: "singular" | "plural",
  virile: boolean
): string {
  const v = number === "plural" && gender === "m" ? (virile ? "V" : "N") : "";
  return `${wordType}|${caseKey}|${gender}|${number}${v}`;
}

const counts: Record<string, number> = {};

// Noun sentences
for (const s of sentences as Sentence[]) {
  const word = wordMap.get(s.wordId!);
  if (!word) continue;
  const virile = s.number === "plural" ? word.virile : false;
  const key = bucketKey("noun", s.case as CaseKey, word.gender, s.number, virile);
  counts[key] = (counts[key] ?? 0) + 1;
}

// Adjectival sentences
for (const s of sentencesAdjectival) {
  const type = s.itemType ?? "adjective";
  const gender = (s.gender ?? "m") as Gender;
  const virile = s.virile ?? false;
  const key = bucketKey(type, s.case as CaseKey, gender, s.number, virile);
  counts[key] = (counts[key] ?? 0) + 1;
}

// Report short buckets
const short: { key: string; count: number; need: number }[] = [];
for (const wordType of ["noun", "adjective", "pronoun", "cardinal", "ordinal"]) {
  for (const c of CASES) {
    for (const g of GENDERS) {
      for (const num of ["singular", "plural"] as const) {
        if (num === "singular") {
          const key = bucketKey(wordType, c, g, num, false);
          const count = counts[key] ?? 0;
          if (count < MIN_PER_BUCKET) short.push({ key, count, need: MIN_PER_BUCKET - count });
        } else {
          if (g === "m") {
            for (const virile of [true, false]) {
              const key = bucketKey(wordType, c, g, num, virile);
              const count = counts[key] ?? 0;
              if (count < MIN_PER_BUCKET)
                short.push({ key, count, need: MIN_PER_BUCKET - count });
            }
          } else {
            const key = bucketKey(wordType, c, g, num, false);
            const count = counts[key] ?? 0;
            if (count < MIN_PER_BUCKET) short.push({ key, count, need: MIN_PER_BUCKET - count });
          }
        }
      }
    }
  }
}

short.sort((a, b) => a.need - b.need);
console.log("Buckets with <", MIN_PER_BUCKET, "examples (need to add):\n");
for (const { key, count, need } of short) {
  if (need <= 0) continue;
  console.log(key, " current:", count, " add:", need);
}
console.log("\nTotal buckets short:", short.filter((s) => s.need > 0).length);
console.log(
  "Total sentences to add:",
  short.filter((s) => s.need > 0).reduce((sum, s) => sum + s.need, 0)
);
