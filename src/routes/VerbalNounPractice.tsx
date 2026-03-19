import { useState, useCallback, useEffect, useRef } from "react";
import {
  verbalNounVerbs,
  verbalNounSentences,
} from "../data/verbalNounData";
import type {
  VerbalNounVerb,
  VerbalNounSentence,
} from "../data/verbalNounData";
import { normalizedEquals, findMissedDiacritics } from "../lib/diacritics";
import { saveVerbalNounAttempt } from "../lib/progress";
import { pickNextDue, updateCard } from "../lib/srs";
import ReportMistake from "../components/ReportMistake";

const verbMap = new Map(verbalNounVerbs.map((v) => [v.id, v]));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Question {
  sentence: VerbalNounSentence;
  verb: VerbalNounVerb;
  hasNoun: boolean;
}

function buildQuestion(s: VerbalNounSentence): Question | null {
  const verb = verbMap.get(s.verbId);
  if (!verb) return null;
  return { sentence: s, verb, hasNoun: s.expectedNoun != null };
}

function matchesAny(answer: string, primary: string, alternates?: string[]): boolean {
  if (normalizedEquals(answer, primary)) return true;
  if (alternates) {
    for (const alt of alternates) {
      if (normalizedEquals(answer, alt)) return true;
    }
  }
  return false;
}

interface VNResult {
  verbCorrect: boolean;
  nounCorrect: boolean;
  verbMissedDiacritics: { char: string; position: number }[];
  nounMissedDiacritics: { char: string; position: number }[];
}

function renderTemplate(template: string): string {
  return template
    .replace("{v}", "_____")
    .replace("{n}", "_____");
}

function RulesReference() {
  const [open, setOpen] = useState(false);
  return (
    <div className="vn-rules-collapsible">
      <button
        type="button"
        className="vn-rules-toggle"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "▼" : "▶"} Formation rules
      </button>
      {open && (
        <div className="vn-rules-body">
          <table className="vn-rules-table">
            <thead>
              <tr><th>Verb ending</th><th>Suffix</th><th>Example</th></tr>
            </thead>
            <tbody>
              <tr><td>-ać</td><td>-anie</td><td>czytać → czytanie</td></tr>
              <tr><td>-ować</td><td>-owanie</td><td>gotować → gotowanie</td></tr>
              <tr><td>-ić / -yć</td><td>-enie</td><td>mówić → mówienie</td></tr>
              <tr><td>-eć</td><td>-enie</td><td>myśleć → myślenie</td></tr>
              <tr><td>short verbs</td><td>-cie</td><td>pić → picie, myć → mycie</td></tr>
            </tbody>
          </table>
          <p className="vn-case-rule">
            <strong>Key rule:</strong> Accusative objects → <strong>genitive</strong> with verbal nouns.<br />
            <em>Czytam książk<strong>ę</strong></em> (acc) → <em>Czytanie książk<strong>i</strong></em> (gen)
          </p>
        </div>
      )}
    </div>
  );
}

export default function VerbalNounPractice() {
  const [queue, setQueue] = useState<VerbalNounSentence[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [verbAnswer, setVerbAnswer] = useState("");
  const [nounAnswer, setNounAnswer] = useState("");
  const [result, setResult] = useState<VNResult | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const verbInputRef = useRef<HTMLInputElement>(null);
  const nounInputRef = useRef<HTMLInputElement>(null);

  const allIds = verbalNounSentences.map((s) => s.id);
  const sentenceMap = new Map(verbalNounSentences.map((s) => [s.id, s]));

  const pickNext = useCallback(() => {
    const dueId = pickNextDue("verbal-noun", allIds);
    let s: VerbalNounSentence | undefined;

    if (dueId) {
      s = sentenceMap.get(dueId);
    }

    if (!s) {
      let q = queue;
      let idx = qIdx;
      if (q.length === 0 || idx >= q.length) {
        q = shuffle(verbalNounSentences);
        setQueue(q);
        idx = 0;
      }
      s = q[idx];
      setQIdx(idx + 1);
    }

    setQuestion(buildQuestion(s));
    setVerbAnswer("");
    setNounAnswer("");
    setResult(null);
    setHintShown(false);
    setTimeout(() => verbInputRef.current?.focus(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, qIdx]);

  const handleSubmit = () => {
    if (!question || !verbAnswer.trim()) return;
    const { sentence, hasNoun } = question;

    const verbOk = matchesAny(verbAnswer, sentence.expectedVerb, sentence.verbAlternates);
    const verbMissed = findMissedDiacritics(sentence.expectedVerb, verbAnswer);

    let nounOk = true;
    let nounMissed: { char: string; position: number }[] = [];
    if (hasNoun && sentence.expectedNoun) {
      nounOk = matchesAny(nounAnswer, sentence.expectedNoun, sentence.nounAlternates);
      nounMissed = findMissedDiacritics(sentence.expectedNoun, nounAnswer);
    }

    const r: VNResult = {
      verbCorrect: verbOk,
      nounCorrect: nounOk,
      verbMissedDiacritics: verbMissed,
      nounMissedDiacritics: nounMissed,
    };
    setResult(r);

    const correct = verbOk && nounOk;
    saveVerbalNounAttempt({
      verbId: question.verb.id,
      hasObject: hasNoun,
      correct,
      timestamp: Date.now(),
    });
    updateCard("verbal-noun", sentence.id, correct);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (result) return;
      handleSubmit();
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        result &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        pickNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [result, pickNext]);

  const rulesRef = (
    <RulesReference />
  );

  if (!question) {
    return (
      <div>
        <h1>Verbal Noun Practice</h1>
        <p>
          Practice forming Polish verbal nouns (rzeczowniki odczasownikowe).
          Convert verbs like <em>czytać</em> → <em>czytanie</em>, and remember:
          accusative objects become <strong>genitive</strong> with verbal nouns
          (e.g. <em>czytać książkę</em> → <em>czytanie książki</em>).
        </p>
        <p className="vn-note">
          <strong>Note:</strong> This section focuses on <strong>forming</strong> verbal
          nouns and changing the object's case — not on declining the verbal noun
          itself through all cases. For full declension practice, use
          the <a href="/practice">Declension</a> tab.
        </p>
        {rulesRef}
        <button type="button" onClick={pickNext}>
          Start practice
        </button>
      </div>
    );
  }

  const { sentence, verb, hasNoun } = question;
  const allVerbForms = [sentence.expectedVerb, ...(sentence.verbAlternates ?? [])];
  const allNounForms = sentence.expectedNoun
    ? [sentence.expectedNoun, ...(sentence.nounAlternates ?? [])]
    : [];
  const bothCorrect = result ? result.verbCorrect && result.nounCorrect : false;

  return (
    <div>
      <h1>Verbal Noun Practice</h1>
      {rulesRef}
      <div className="question-card">
        <div className="nominative">
          <strong>Verb:</strong> {verb.infinitive}{" "}
          <span className="nominative-english">({verb.english})</span>
        </div>
        <div className="number-hint">
          <strong>Convert:</strong>{" "}
          <span className="vn-original">{sentence.originalPhrase}</span>
        </div>
        <p className="sentence">{renderTemplate(sentence.template)}</p>
        <p className="number-hint" style={{ fontStyle: "italic", marginTop: 0 }}>
          {sentence.english}
        </p>

        {result === null ? (
          <>
            <div className="vn-inputs">
              <div className="vn-input-group">
                <input
                  ref={verbInputRef}
                  type="text"
                  value={verbAnswer}
                  onChange={(e) => setVerbAnswer(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="verbal noun…"
                  autoFocus
                />
                <span className="vn-input-label">verb</span>
              </div>
              {hasNoun && (
                <div className="vn-input-group">
                  <input
                    ref={nounInputRef}
                    type="text"
                    value={nounAnswer}
                    onChange={(e) => setNounAnswer(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder="noun / phrase…"
                  />
                  <span className="vn-input-label">noun</span>
                </div>
              )}
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {!hintShown && (
              <button
                type="button"
                className="hint-btn"
                onClick={() => setHintShown(true)}
              >
                Show hint
              </button>
            )}
            {hintShown && (
              <div className="hint-box">
                <p>{sentence.hint}</p>
              </div>
            )}
          </>
        ) : (
          <div className="feedback">
            {bothCorrect ? (
              <p className="correct">
                <strong>Correct!</strong>{" "}
                {allVerbForms.length > 1 && (
                  <>Verb form(s): {allVerbForms.join(", ")}. </>
                )}
                {allNounForms.length > 1 && (
                  <>Noun form(s): {allNounForms.join(", ")}.</>
                )}
              </p>
            ) : (
              <>
                <p className="incorrect">
                  <strong>Incorrect.</strong>{" "}
                  Your answer: <em>{verbAnswer}{hasNoun ? ` ${nounAnswer}` : ""}</em>
                </p>
                <p className="incorrect">
                  {!result.verbCorrect && (
                    <>Correct verb: <strong>{allVerbForms.join(" / ")}</strong>. </>
                  )}
                  {!result.nounCorrect && hasNoun && (
                    <>Correct noun: <strong>{allNounForms.join(" / ")}</strong>. </>
                  )}
                  {result.verbCorrect && !result.nounCorrect && (
                    <>Your verb form was correct. </>
                  )}
                  {!result.verbCorrect && result.nounCorrect && hasNoun && (
                    <>Your noun form was correct. </>
                  )}
                </p>
              </>
            )}
            {result.verbMissedDiacritics.length > 0 && (
              <p className="diacritics-feedback">
                Verb — watch your diacritics:{" "}
                {result.verbMissedDiacritics.map((d) => d.char).join(", ")}
              </p>
            )}
            {result.nounMissedDiacritics.length > 0 && (
              <p className="diacritics-feedback">
                Noun — watch your diacritics:{" "}
                {result.nounMissedDiacritics.map((d) => d.char).join(", ")}
              </p>
            )}
            <div className="hint-box">
              <p>{sentence.hint}</p>
              <p className="hint-morphology">
                {verb.infinitive} → <strong>{verb.verbalNoun}</strong>{" "}
                ({verb.rule})
              </p>
            </div>
            <div className="feedback-actions">
              <button type="button" onClick={pickNext}>
                Next question
              </button>
              <span className="next-hint">(or press Enter)</span>
              <ReportMistake
                questionText={`${verb.infinitive} (${verb.english}): ${renderTemplate(sentence.template)} — convert: ${sentence.originalPhrase}`}
                expectedAnswer={`${sentence.expectedVerb}${sentence.expectedNoun ? " " + sentence.expectedNoun : ""}`}
                subjectPrefix="Polish app: verbal noun mistake report"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
