# AGENTS.md — Context for AI assistants

This file summarizes the project and past user requests so future agents can work effectively without full chat history.

## Project overview

**Polish Declension** is a practice app for Polish grammar: users see a sentence with a blank (e.g. “Kocham _____”), type the declined form (noun, adjective, or pronoun), and get immediate feedback. The app supports:

- **Nouns** (by case, gender, number, virile; optional stem type: hard / soft / softened)
- **Adjectives** and **pronouns** (which/this, personal pronouns, possessives: mój, twój, nasz, wasz, swój)
- **Filters:** include types (nouns, adjectives, pronouns), cases, gender, number, virile, stem types
- **Hints:** case name, short rule, verb/preposition triggers, sentence-specific explanation; shown after every submit (correct or incorrect)
- **Progress:** stored in `localStorage`; “needs practice” based on recent attempts
- **Rules page:** quick case triggers (verbs + prepositions per case), reference tables

**Tech:** React 19, TypeScript, Vite 7, React Router. Data lives in `src/data/` (words, sentences, adjectivalItems, sentencesAdjectival). Question picking and filters in `src/lib/pickQuestion.ts` and `src/types.ts`.

## Key paths

| Purpose | Paths |
|--------|--------|
| Data | `src/data/words.ts`, `sentences.ts`, `adjectivalItems.ts`, `sentencesAdjectival.ts` |
| Types & filtering | `src/types.ts`, `src/lib/pickQuestion.ts` |
| Practice UI | `src/routes/Practice.tsx`, `src/components/FilterSettings.tsx`, `src/components/QuestionCard.tsx` |
| Rules | `src/routes/Rules.tsx` |
| Styling | `src/App.css` |
| Deploy | `package.json` scripts `build:gh`, `deploy:gh`; router basename in `src/App.tsx` |

## User requests (summary)

1. **More Mianownik adjectives** — Enough nominative adjective examples when filtering Adjectives + Mianownik.
2. **More examples** — At least ~10 examples per (type, case, gender, number, virile) where relevant.
3. **Show hint when wrong** — In feedback, show hint (case, rule, verbs, explanation) when the answer is incorrect.
4. **Quick case triggers** — In Rules, list common verbs and prepositions per case.
5. **Stem types** — Support hard/soft/softened consonant stems for nouns, with filter and enough examples (no “utwarde”; “zmiękczone” = softened).
6. **Always show hint after submit** — Show the same hint after every submit (correct or incorrect).
7. **Singular/plural when ambiguous** — For nouns, show “Noun (singular)” or “Noun (plural)” in the question; not for adjectives/pronouns where there’s only one form.
8. **Full pronoun coverage** — One example per personal pronoun (ja, ty, on, ona, ono, oni, one) in every case; plus possessives (mój, twój, nasz, wasz, swój) with full declension and example sentences.
9. **Accept “cię” for ty (acc sg)** — Accept both “ciebie” and “cię” (and “cie” as missing-diacritic variant) for *ty* in accusative singular.
10. **GitHub Pages** — Easy way to run the app; deploy via `npm run deploy:gh`, base path for repo name (e.g. `/Polish-Declension/`).
11. **Report mistakes by email** — Button “Report a mistake” opens a modal; user enters password `qa`, describes the mistake; email goes to Yael.elmatad@gmail.com and includes the question sentence, expected answer, and user explanation (mailto; password only in front end).

## Conventions

- **Nouns:** `words.ts` has `stemType`: `"hard"` | `"soft"` | `"softened"`. Sentences in `sentences.ts` reference `wordId` (e.g. `rok`, `kobieta`).
- **Adjectival:** Sentences in `sentencesAdjectival.ts`; items (adjectives/pronouns) in `adjectivalItems.ts` with full declension tables.
- **Sentence template:** Blank is `_____`; replaced for display only; expected form comes from word/adjectivalItem + sentence case/gender/number/virile.

Use this file to stay aligned with project goals and prior decisions when implementing new features or fixing bugs.
