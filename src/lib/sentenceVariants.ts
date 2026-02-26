import type { CaseKey, Sentence } from "../types";
import { ANIMATE_WORD_IDS } from "../data/words";

const BLANK = "_____";

// Nominative needs different templates for singular vs plural
// to keep verb agreement correct (e.g. "jest" vs "są").
const NOM_SINGULAR_TEMPLATES: string[] = [
  `${BLANK} stoi na ulicy.`,
  `${BLANK} stoi przed domem.`,
  `${BLANK} siedzi przy stole.`,
  `${BLANK} mieszka w tym domu.`,
  `${BLANK} mieszka w tym mieście.`,
  `${BLANK} leży na stole.`,
  `${BLANK} często tu bywa.`,
  `${BLANK} czeka na autobus.`,
];

const NOM_PLURAL_TEMPLATES: string[] = [
  `${BLANK} stoją na ulicy.`,
  `${BLANK} stoją przed domem.`,
  `${BLANK} siedzą przy stole.`,
  `${BLANK} mieszkają w tym domu.`,
  `${BLANK} mieszkają w tym mieście.`,
  `${BLANK} leżą na podłodze.`,
  `${BLANK} często tu bywają.`,
  `${BLANK} czekają na autobus.`,
];

const CASE_VARIANT_TEMPLATES: Record<CaseKey, string[]> = {
  // Nominative handled separately via NOM_SINGULAR_TEMPLATES / NOM_PLURAL_TEMPLATES
  nom: [],
  gen: [
    `Nie ma ${BLANK}.`,
    `W tym sklepie nie ma ${BLANK}.`,
    `Dzisiaj nie mam ${BLANK}.`,
    `Szukam ${BLANK}.`,
    `Potrzebuję ${BLANK}.`,
    `Brakuje mi ${BLANK}.`,
    `Dużo ${BLANK}.`,
    `W szafie nie ma ${BLANK}.`,
  ],
  // Dative: recipient templates only for animate nouns (people, animals).
  dat: [
    `Daję prezent ${BLANK}.`,
    `Dziękuję ${BLANK}.`,
    `Pomagam ${BLANK}.`,
    `Piszę list ${BLANK}.`,
    `Kupuję kawę ${BLANK}.`,
    `Opowiadam historię ${BLANK}.`,
    `Wysyłam wiadomość ${BLANK}.`,
    `Czytam książkę ${BLANK}.`,
  ],
  acc: [
    `Widzę ${BLANK}.`,
    `Lubię ${BLANK}.`,
    `Kocham ${BLANK}.`,
    `Czytam ${BLANK}.`,
    `Piszę ${BLANK}.`,
    `Mam ${BLANK}.`,
    `Jem ${BLANK}.`,
    `Piję ${BLANK}.`,
  ],
  inst: [
    `Idę z ${BLANK}.`,
    `Mieszkam z ${BLANK}.`,
    `Rozmawiam z ${BLANK}.`,
    `Spotykam się z ${BLANK}.`,
    `Spaceruję z ${BLANK}.`,
    `Dzwonię z ${BLANK}.`,
    `Stoję przed ${BLANK}.`,
    `Czekam za ${BLANK}.`,
  ],
  // Locative handled above (place-only vs any-noun templates by wordId).
  loc: [],
  voc: [
    `${BLANK}, gdzie jesteś?`,
    `${BLANK}, chodź tutaj!`,
    `${BLANK}, pomóż mi!`,
    `${BLANK}, proszę!`,
    `${BLANK}, poczekaj chwilę!`,
    `${BLANK}, słyszysz mnie?`,
    `${BLANK}, zobacz!`,
    `${BLANK}, dziękuję!`,
  ],
};

/** Nouns that make sense in "Mieszkam w _____", "Jestem w _____", etc. (locations). */
const PLACE_WORD_IDS = new Set([
  "dom", "miasto", "szkola", "las", "ulica", "praca", "biuro", "park", "ogrod",
  "mieszkanie", "pole", "morze",
]);

/** Locative templates that only make sense with place nouns (w + location). */
const LOC_PLACE_ONLY: string[] = [
  `Mieszkam w ${BLANK}.`,
  `Jestem w ${BLANK}.`,
  `Uczę się w ${BLANK}.`,
  `Pracuję w ${BLANK}.`,
  `Spaceruję w ${BLANK}.`,
  `Biegam w ${BLANK}.`,
  `Dzieci bawią się w ${BLANK}.`,
];

/** Locative templates that work with any noun (o, przy, etc.). */
const LOC_ANY: string[] = [
  `Myślę o ${BLANK}.`,
  `Mówię o ${BLANK}.`,
  `Siedzę przy ${BLANK}.`,
];

/**
 * Given a base sentence, create multiple variant sentences with different
 * natural templates for the same case. Returns only [base] for adjectival
 * items (adjectives, pronouns, ordinals) so we never get e.g. "Mieszkam w pierwszym."
 * For nouns, only adds location templates (Mieszkam w _____) when the noun
 * is a place, so we never get "Mieszkam w obiedzie."
 */
export function expandSentenceVariants(base: Sentence): Sentence[] {
  // Adjectival items: no generic variants; only hand‑authored templates make sense.
  if (base.itemId != null) {
    return [base];
  }

  let variantsForCase: string[];
  if (base.case === "nom") {
    variantsForCase =
      base.number === "singular"
        ? NOM_SINGULAR_TEMPLATES
        : NOM_PLURAL_TEMPLATES;
  } else if (base.case === "loc") {
    const isPlace = base.wordId != null && PLACE_WORD_IDS.has(base.wordId);
    variantsForCase = isPlace ? [...LOC_PLACE_ONLY, ...LOC_ANY] : LOC_ANY;
  } else if (base.case === "dat" || base.case === "inst" || base.case === "voc") {
    const isAnimate = base.wordId != null && ANIMATE_WORD_IDS.has(base.wordId);
    variantsForCase = isAnimate ? (CASE_VARIANT_TEMPLATES[base.case] ?? []) : [];
  } else {
    variantsForCase = CASE_VARIANT_TEMPLATES[base.case] ?? [];
  }

  const templates = new Set<string>();
  templates.add(base.template);
  for (const t of variantsForCase) {
    templates.add(t);
  }

  const allTemplates = Array.from(templates);

  return allTemplates.map((template, index) => {
    if (index === 0) {
      return { ...base, template };
    }
    return {
      ...base,
      id: `${base.id}#v${index}`,
      template,
    };
  });
}

