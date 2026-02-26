export type CaseKey =
  | "nom"
  | "gen"
  | "dat"
  | "acc"
  | "inst"
  | "loc"
  | "voc";

export type Gender = "m" | "f" | "n";

export type NumberKey = "singular" | "plural";

/** Noun stem / consonant type for declension patterns (hard, soft, softened) */
export type StemType = "hard" | "soft" | "softened";

/** What kind of lexical item is being practiced */
export type WordType =
  | "noun"
  | "adjective"
  | "pronoun"
  | "cardinal"
  | "ordinal";

export interface CaseForms {
  nom: string;
  gen: string;
  dat: string;
  acc: string;
  inst: string;
  loc: string;
  voc: string;
}

/** Forms for singular m/f/n and plural virile/non-virile (adjectives, pronouns, ordinals, cardinals) */
export interface AdjectivalForms {
  singular: { m: CaseForms; f: CaseForms; n: CaseForms };
  plural: { virile: CaseForms; nonVirile: CaseForms };
}

export interface Word {
  id: string;
  nominative: string;
  /** English translation of the nominative form */
  english?: string;
  gender: Gender;
  virile: boolean; // only relevant for masculine plural
  /** Singular masculine: animate (people, animals) vs inanimate. Affects accusative (acc = gen vs nom). Only set for masculine nouns. */
  animate?: boolean;
  /** Stem/consonant type: affects endings (e.g. loc -u vs -e, gen -a vs -y). Used for filtering practice. */
  stemType?: StemType;
  forms: {
    singular: CaseForms;
    plural: CaseForms;
  };
}

/** Adjective, pronoun (który etc.), cardinal or ordinal – declined by gender and virile in plural */
export interface AdjectivalItem {
  id: string;
  type: WordType; // 'adjective' | 'pronoun' | 'cardinal' | 'ordinal'
  label: string; // e.g. "dobry", "który", "jeden", "pierwszy"
  /** English translation of the nominative / base form */
  english?: string;
  forms: AdjectivalForms;
}

export interface Sentence {
  id: string;
  wordId?: string;
  itemType?: WordType;
  itemId?: string;
  case: CaseKey;
  number: NumberKey;
  gender?: Gender;
  virile?: boolean;
  template: string;
  hintExplanation: string;
}

export interface FilterSettings {
  /** Which parts of speech to include */
  wordTypes: WordType[];
  /** Noun stem types to include (empty = all). Only applies to nouns. */
  stemTypes: StemType[];
  cases: CaseKey[];
  genders: Gender[];
  number: NumberKey | "both";
  /** Plural masculine: virile (personal) vs non-virile. */
  virile: "virile" | "non-virile" | "both";
  /** Singular masculine nouns: animate (people, animals) vs inanimate. Only applies to nouns. */
  animate: "animate" | "inanimate" | "both";
}

export interface Attempt {
  case: CaseKey;
  gender: Gender;
  number: NumberKey;
  virile: boolean;
  correct: boolean;
  timestamp: number;
}

export interface ProgressBucket {
  case: CaseKey;
  gender: Gender;
  number: NumberKey;
  virile: boolean;
  correct: number;
  total: number;
  accuracy: number;
}

export const CASE_NAMES: Record<CaseKey, string> = {
  nom: "Nominative",
  gen: "Genitive",
  dat: "Dative",
  acc: "Accusative",
  inst: "Instrumental",
  loc: "Locative",
  voc: "Vocative",
};

/** Polish names for cases (Mianownik, Dopełniacz, etc.) */
export const CASE_NAMES_PL: Record<CaseKey, string> = {
  nom: "Mianownik",
  gen: "Dopełniacz",
  dat: "Celownik",
  acc: "Biernik",
  inst: "Narzędnik",
  loc: "Miejscownik",
  voc: "Wołacz",
};

/** English and Polish case label for UI: "Nominative (Mianownik)" */
export function getCaseDisplayName(caseKey: CaseKey): string {
  return `${CASE_NAMES[caseKey]} (${CASE_NAMES_PL[caseKey]})`;
}

/** Short rule reminder per case (for hint box). */
export const CASE_RULE_SHORT: Record<CaseKey, string> = {
  nom: "Subject of the sentence; dictionary form.",
  gen: "After: nie ma, bez, do, od, z (from), u, dla; negation (Nie mam…); quantity (dużo).",
  dat: "Recipient: dziękować, pomagać, dzięki, przeciw, wbrew.",
  acc: "Direct object; direction with na, w, nad (na ulicę, w las).",
  inst: "With: z; place: nad, pod, przed, za, między; identity (Jestem kim?).",
  loc: "Location only: w, na, o, po, przy (w domu, na stole, o tobie).",
  voc: "Direct address: Mamo! Panie!",
};

/** Verbs (and prepositions) that commonly trigger this case – shown in hint. */
export const CASE_VERB_HINTS: Record<CaseKey, string[]> = {
  nom: ["Subject of the verb (who/what does the action)."],
  gen: [
    "nie ma (there is no), mieć (negated: Nie mam…), brak (lack of)",
    "słuchać (listen to), potrzebować (need), szukać (look for)",
    "Prepositions: bez, do, od, z (from), u, podczas, wśród",
  ],
  dat: [
    "dziękować (thank), pomagać (help), dawać (give to), wierzyć (believe)",
    "Prepositions: dzięki (thanks to), przeciw (against), wbrew (despite)",
  ],
  acc: [
    "Direct object: widzieć (see), znać (know), kochać (love), czytać (read), mieć (have)",
    "Direction: na (onto), w (into), nad (to, over)",
  ],
  inst: [
    "być (to be) + instrumental for identity: Jestem nauczycielem (I am a teacher). Być + instrumental!",
    "z (with): Idę z mamą. Prepositions: nad, pod, przed, za, między",
  ],
  loc: [
    "Only for location (not direction): w (in), na (on), o (about), po (after/around), przy (at)",
  ],
  voc: ["Direct address: calling someone – Mamo! Panie! (no verb required)."],
};

export const GENDER_NAMES: Record<Gender, string> = {
  m: "Masculine",
  f: "Feminine",
  n: "Neuter",
};

export const WORD_TYPE_NAMES: Record<WordType, string> = {
  noun: "Nouns",
  adjective: "Adjectives",
  pronoun: "Pronouns (który, ten, ja, ty, mnie, mi, on, ona, etc.)",
  cardinal: "Cardinal numbers",
  ordinal: "Ordinal numbers",
};

export const STEM_TYPE_NAMES: Record<StemType, string> = {
  hard: "Hard stems (twarde: dom, stół, rok, kot)",
  soft: "Soft stems (miękkie: koń, noc, ulica, rzecz)",
  softened: "Softened stems (zmiękczone: człowiek, język, Bóg)",
};
