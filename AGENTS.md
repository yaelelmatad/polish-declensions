# AGENTS.md — Context for AI assistants

This file summarizes the project and past user requests so future agents can work effectively without full chat history.

## Project overview

**Polish Declension** is a practice app for Polish grammar: users see a sentence with a blank (e.g. “Kocham _____”), type the declined form (noun, adjective, or pronoun), and get immediate feedback. The app supports:

- **Nouns** (by case, gender, number, virile; optional stem type: hard / soft / softened)
- **Adjectives** and **pronouns** (which/this, personal pronouns, possessives: mój, twój, nasz, wasz, swój)
- **Filters:** all in a collapsible “Options” tray (caret to expand); include types, cases, gender, number, virile, stem types, animate; “Show English translation” inside the same tray. Default filters = all selected (all cases including nominative, all stem types).
- **Hints:** case name, short rule, verb/preposition triggers, and a morphology line (actual change + “why” this ending); no per-sentence `hintExplanation` line. Shown after every submit (correct or incorrect).
- **Progress:** stored in `localStorage`; “needs practice” based on recent attempts
- **Rules page:** quick case triggers (verbs + prepositions per case), reference tables

**Tech:** React 19, TypeScript, Vite 7, React Router. Data lives in `src/data/` (words, sentences, adjectivalItems, sentencesAdjectival). Question picking and filters in `src/lib/pickQuestion.ts` and `src/types.ts`.

## Key paths

| Purpose | Paths |
|--------|--------|
| Data (declension) | `src/data/words.ts`, `sentences.ts`, `adjectivalItems.ts`, `sentencesAdjectival.ts` |
| Data (imperatives) | `src/data/imperativeVerbs.ts`, `src/data/imperativeSentences.ts` |
| Data (motion verbs) | `src/data/motionSentences.ts` |
| Data (verbal nouns) | `src/data/verbalNounData.ts` |
| Types & filtering | `src/types.ts`, `src/lib/pickQuestion.ts` |
| Declension practice | `src/routes/Practice.tsx`, `src/components/FilterSettings.tsx`, `src/components/QuestionCard.tsx` |
| Imperative practice | `src/routes/ImperativePractice.tsx` |
| Motion verb practice | `src/routes/MotionPractice.tsx` |
| Verbal noun practice | `src/routes/VerbalNounPractice.tsx` |
| Progress tracking | `src/lib/progress.ts` (declension/imperative/motion/verbal-noun buckets), `src/routes/Progress.tsx` |
| Spaced repetition | `src/lib/srs.ts` (SM-2 engine, per-question scheduling, deck stats) |
| Report mistake | `src/components/ReportMistake.tsx` (shared modal, password `qa`, mailto) |
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

12. **Lots more examples** — Add many more noun and adjectival sentences; “double it” = add another large batch so practice feels varied. Only use `wordId` / `itemId` that exist in `words.ts` / `adjectivalItems.ts` (no tata, krzesło, drzwi if not in data).

13. **nad + case** — “Nad” takes accusative for direction (Jadę nad morze) and instrumental for location (Jestem nad morzem). Hints should mention both when relevant.

14. **Restart app after changes** — When making code or config changes, run the dev server and give the user the new URL (e.g. `npm run dev`; port may be 5173, 5174, …). User prefers to always have the app restarted and the link provided.

15. **Correct/incorrect feedback must show** — After Submit, the user must see “Correct!” or “Incorrect.” with the correct form(s) until they press Next. Use a stable key for `QuestionCard` (e.g. `key="practice-card"`) and reset state (answer, result, hintShown) when the question prop changes. Prevent the same Enter key from both submitting and advancing: in the input’s onKeyDown, call `preventDefault()` and `stopPropagation()` on Enter; in the global “next on Enter” handler, ignore events whose target is INPUT or TEXTAREA.

16. **Animate in the dictionary** — Every masculine noun in `words.ts` must have `animate: true` or `animate: false`. `ANIMATE_WORD_IDS` is derived in `words.ts` from `words.filter(w => w.gender === "m" && w.animate === true)`; do not maintain a separate hardcoded list. Filter “Singular masculine (animate / inanimate)” uses this.

17. **Filters and options in a tray** — Put all filters and “Show English translation” inside one collapsible “Options” tray (caret ▶/▼), not a checkbox or separate box. Default: tray closed. Click the header to expand/collapse.

18. **Default filters = everything selected** — Defaults: Nouns, all cases (including Nominative), all genders, both numbers, both virile, both animate, all three stem types (hard, soft, softened). “All selected” means no filter (e.g. all stem types selected = all stems). Do not show extra hint text under filters (e.g. “All selected = all stems” or “Animate = people, animals”).

19. **No redundant hint line** — Do not show `sentence.hintExplanation` in the hint box (it duplicated the case name). Hint box shows: case name, short rule, verbs/triggers, and the morphology hint only.

20. **Feedback: number and all correct answers** — In the feedback paragraph, always show Singular or Plural. Show all accepted forms (e.g. “ciebie” and “cię” for ty acc); use “Accepted form(s): X, Y” when correct and “Correct form(s): X, Y” when incorrect.

21. **Clear progress** — Progress page has a “Clear progress” button (only when there are attempts). On click, confirm (“Clear all progress and attempt history? This cannot be undone.”); then call `clearAttempts()` and reset local state so the table updates.

22. **Header line format** — First line of the question card is always “Noun (nom): woda, singular” (or the appropriate type). The case in the header is always **(nom)** because the word is given in nominative; singular/plural is lowercase after the comma.

23. **Question order / shuffle** — Shuffle the full eligible list first (Fisher–Yates), then apply any “worst bucket” bias (e.g. 35% from worst buckets, 65% from full shuffled pool). Only sometimes (e.g. 50%) avoid repeating the same bucket as the last question, so the order feels random, not cyclical.

24. **Morphology hints with “why”** — In the hint (and feedback hint box), show a morphology line when possible that (1) describes the actual change (e.g. “Replace -a with -ę”, “Stem vowel a→e and add -ie”, “Add -ami to the stem”) and (2) explains why that ending is used (which case role: object, ‘of’, ‘with’, location, etc.). Cover all case/number/gender combinations; use a `CASE_WHY`-style fallback so every question gets a “why” for that case. Prefer concrete rules (e.g. las→lesie = stem vowel a→e + -ie; stół→stole = ó→o + -e; gość→goście = soft stem + -ie for nom pl) over generic “stem + -X” when the change is different.

25. **GitHub repo** — Remote: `git@github.com:yaelelmatad/polish-declensions.git`. Push to `main` after meaningful updates.

26. **Spatial prepositions (to / at / from)** — Rules page has a "Spatial Prepositions" section with a table showing which preposition + case is used for direction TO (Dokąd?), location AT (Gdzie?), and coming FROM (Skąd?). Patterns: do+gen → w+loc → z+gen; na+acc → na+loc → z+gen; do+gen → u+gen → od+gen (people); nad+acc → nad+inst → znad+gen. New words added: stadion, koncert, film, poczta, dworzec, lotnisko. Spatial practice sentences (sp1–sp78) cover all patterns. Hint explanations say "Direction TO:", "Location AT:", or "Coming FROM:" to clarify the spatial role.

27. **Imperative practice page** — `/imperatives` route: practice the imperative mood (tryb rozkazujący). Data in `src/data/imperativeVerbs.ts` (31 verbs with ty/my/wy imperative forms, classified by present-tense conjugation: -am/-asz, -ę/-esz, -ę/-isz/-ysz, -em/-esz, irregular) and `src/data/imperativeSentences.ts` (81 sentence templates). Route: `src/routes/ImperativePractice.tsx`. Question card shows conjugation type and present-tense forms (e.g. "-ę, -isz/-ysz (mówię, mówisz)"). Hints reference the conjugation pattern, not the infinitive ending.

28. **Motion verbs practice page** — `/motion` route: practice choosing the right verb of motion (chodzić/jeździć/iść/jechać/pójść/pojechać) based on context (habitual, in-progress, completed/future) and transport (foot vs. vehicle) in present/past/future tense. Data in `src/data/motionSentences.ts` (50 sentences). Route: `src/routes/MotionPractice.tsx`. Collapsible reference table showing all six verbs. Color-coded context tags. Accepts alternate forms (e.g. masculine/feminine past).

29. **Report mistake (shared component)** — `src/components/ReportMistake.tsx` is a shared modal used on all four practice pages (declension, imperatives, motion verbs, verbal nouns). Password `qa`, mailto to `Yael.elmatad@gmail.com`. Takes `questionText`, `expectedAnswer`, and `subjectPrefix` as props. The old inline report code in `QuestionCard.tsx` was replaced with this component.

30. **Spaced repetition (SRS)** — All four practice pages use an SM-2-based spaced repetition system (`src/lib/srs.ts`). Each question is a "card" with its own scheduling: easeFactor (starts 2.5, min 1.3), interval (minutes), nextReview (timestamp), repetitions (consecutive correct, resets on wrong). Learning steps: 1 min → 10 min → 1 day → 3 days, then interval *= easeFactor. Wrong answers reset to step 1 and decrease easeFactor by 0.2. Question picking priority: (1) most overdue cards, (2) new/unseen cards, (3) random fallback. Four separate decks in localStorage: `srs-declension`, `srs-imperative`, `srs-motion`, `srs-verbal-noun`. Progress page shows SRS stats per section: due now, due later today, new/unseen, mature (21+ day interval). "Clear all progress" also clears SRS decks.

31. **Progress page has four sections** — Declension (by case/gender/number/virile), Imperatives (by conjugation type and person), Motion Verbs (by context/transport/tense), Verbal Nouns (by verb and type). Each section has an SRS stats bar and a bucket accuracy table. Rows under 70% with 5+ attempts are highlighted. Single "Clear all progress" button clears all four plus SRS data.

32. **Verbal noun practice page** — `/verbal-nouns` route: practice forming verbal nouns (rzeczowniki odczasownikowe) from verbs and converting accusative objects to genitive. Data in `src/data/verbalNounData.ts` (36 verbs with formation rules + 41 sentences). Route: `src/routes/VerbalNounPractice.tsx`. Shows verb infinitive, formation rule, and the phrase to convert. Two types of questions: (a) verbal noun only ("biegać → bieganie"), (b) verbal noun + object case change ("czytać książkę → czytanie książki"). Formation rules: -ać → -anie, -ować → -owanie, -ić/-yć → -enie, -eć → -enie, short verbs → -cie. Key grammar: acc objects become genitive with verbal nouns. Includes SRS, report mistake, progress tracking.

## Conventions

- **Nouns:** `words.ts` has `stemType`: `"hard"` | `"soft"` | `"softened"` and `animate: true | false` (only for masculine; used for singular acc and filter). Sentences in `sentences.ts` reference `wordId` (e.g. `rok`, `kobieta`). Only use wordIds that exist in `words.ts`.
- **Adjectival:** Sentences in `sentencesAdjectival.ts`; items (adjectives/pronouns) in `adjectivalItems.ts` with full declension tables.
- **Sentence template:** Blank is `_____`; replaced for display only; expected form comes from word/adjectivalItem + sentence case/gender/number/virile.
- **Morphology hints:** In `QuestionCard.tsx`, `morphologyHint` describes the nominative→target change and a one-line “Rule:” that explains why that ending (case role). Prefer specific patterns (feminine -a⇒-ę, las⇒lesie, gość⇒goście, stół⇒stole, etc.) over a generic fallback; use `CASE_WHY` only when no specific pattern matches.
- **Imperative verbs:** Classified by present-tense conjugation pattern (`-am, -asz` | `-ę, -esz` | `-ę, -isz/-ysz` | `-em, -esz` | `irregular`). Each verb has `presentForms` (e.g. "czytam, czytasz") and imperative forms for ty/my/wy. Only use verbIds that exist in `imperativeVerbs.ts`.
- **Motion verbs:** Sentences specify `context` (habitual | in-progress | completed | future), `transport` (foot | vehicle), `tense` (present | past | future), and `expected` form. `alternates` array for acceptable variants (e.g. masculine/feminine past).
- **Verbal nouns:** Verbs in `verbalNounData.ts` have `verbalNoun` and `rule` fields. Sentences have `expected` (full phrase like "czytanie książki"), `originalPhrase` (what the user converts from), and optional `alternates`. Only use verbIds that exist in `verbalNounData.ts`.
- **Progress:** Four independent tracking systems in `progress.ts`: declension (`polish-attempts`), imperative (`polish-imperative-attempts`), motion (`polish-motion-attempts`), verbal-noun (`polish-verbal-noun-attempts`). Each stores an array of attempt objects in localStorage.
- **SRS:** Four decks in `srs.ts`: `srs-declension`, `srs-imperative`, `srs-motion`, `srs-verbal-noun`. Each deck is a `Record<string, SRSCard>` stored in localStorage. Cards are updated after every submit via `updateCard()`. Question picking via `pickNextDue()` returns the most overdue card, or a new card, or null.
- **Report mistake:** All practice pages use `<ReportMistake>` from `src/components/ReportMistake.tsx`. Pass `questionText`, `expectedAnswer`, and `subjectPrefix` (e.g. "Declension", "Imperative", "Motion Verb").

Use this file to stay aligned with project goals and prior decisions when implementing new features or fixing bugs.
