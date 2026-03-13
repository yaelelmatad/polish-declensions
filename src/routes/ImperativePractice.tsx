import { useState, useCallback, useEffect, useRef } from "react";
import { imperativeVerbs } from "../data/imperativeVerbs";
import type { ImperativeVerb } from "../data/imperativeVerbs";
import { imperativeSentences } from "../data/imperativeSentences";
import type { ImperativeSentence, ImperativePerson } from "../data/imperativeSentences";
import { checkAnswer } from "../lib/diacritics";
import type { CheckResult } from "../lib/diacritics";
import { saveImperativeAttempt } from "../lib/progress";
import { pickNextDue, updateCard } from "../lib/srs";
import ReportMistake from "../components/ReportMistake";

const verbMap = new Map(imperativeVerbs.map((v) => [v.id, v]));

const PERSON_LABELS: Record<ImperativePerson, string> = {
  ty: "ty (you, singular informal)",
  my: "my (we / let's)",
  wy: "wy (you, plural / formal)",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Question {
  sentence: ImperativeSentence;
  verb: ImperativeVerb;
  expected: string;
}

function buildQuestion(s: ImperativeSentence): Question | null {
  const verb = verbMap.get(s.verbId);
  if (!verb) return null;
  return { sentence: s, verb, expected: verb.imperative[s.person] };
}

export default function ImperativePractice() {
  const [queue, setQueue] = useState<ImperativeSentence[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allIds = imperativeSentences.map((s) => s.id);
  const sentenceMap = new Map(imperativeSentences.map((s) => [s.id, s]));

  const pickNext = useCallback(() => {
    const dueId = pickNextDue("imperative", allIds);
    let s: ImperativeSentence | undefined;

    if (dueId) {
      s = sentenceMap.get(dueId);
    }

    if (!s) {
      let q = queue;
      let idx = qIdx;
      if (q.length === 0 || idx >= q.length) {
        q = shuffle(imperativeSentences);
        setQueue(q);
        idx = 0;
      }
      s = q[idx];
      setQIdx(idx + 1);
    }

    setQuestion(buildQuestion(s));
    setAnswer("");
    setResult(null);
    setHintShown(false);
    setTimeout(() => inputRef.current?.focus(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, qIdx]);

  const handleSubmit = () => {
    if (!question || !answer.trim()) return;
    const r = checkAnswer(question.expected, answer);
    setResult(r);
    saveImperativeAttempt({
      conjugation: question.verb.conjugation,
      person: question.sentence.person,
      verbId: question.verb.id,
      correct: r.correct,
      timestamp: Date.now(),
    });
    updateCard("imperative", question.sentence.id, r.correct);
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

  if (!question) {
    return (
      <div>
        <h1>Imperative Practice</h1>
        <p>
          Practice the Polish imperative (tryb rozkazujący). You'll see a verb
          and a sentence — fill in the correct imperative form for the given
          person (ty / my / wy).
        </p>
        <button type="button" onClick={pickNext}>
          Start practice
        </button>
      </div>
    );
  }

  const { sentence, verb, expected } = question;

  return (
    <div>
      <h1>Imperative Practice</h1>
      <div className="question-card">
        <div className="nominative">
          <strong>Verb:</strong> {verb.infinitive}{" "}
          <span className="nominative-english">({verb.english})</span>
        </div>
        <div className="number-hint" style={{ marginBottom: "0.15rem" }}>
          <strong>Conjugation:</strong>{" "}
          <span className="conj-tag">{verb.conjugation}</span>{" "}
          <span className="nominative-english">({verb.presentForms})</span>
        </div>
        <div className="number-hint">
          <strong>Form:</strong> {PERSON_LABELS[sentence.person]}
        </div>
        <p className="sentence">
          {sentence.template.replace("_____", "_____ ")}
        </p>

        {result === null ? (
          <>
            <div className="answer-row">
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Type the imperative form…"
                autoFocus
              />
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
            {result.correct ? (
              <p className="correct">
                <strong>Correct!</strong>
              </p>
            ) : (
              <p className="incorrect">
                <strong>Incorrect.</strong> Correct form:{" "}
                <strong>{expected}</strong>
              </p>
            )}
            {result.missedDiacritics.length > 0 && result.correct && (
              <p className="diacritics-feedback">
                Watch your diacritics:{" "}
                {result.missedDiacritics.map((d) => d.char).join(", ")}
              </p>
            )}
            <div className="hint-box">
              <p>{sentence.hint}</p>
              <p className="hint-morphology">
                {verb.infinitive} → <strong>{expected}</strong> ({sentence.person})
              </p>
            </div>
            <div className="feedback-actions">
              <button type="button" onClick={pickNext}>
                Next question
              </button>
              <span className="next-hint">(or press Enter)</span>
              <ReportMistake
                questionText={`${verb.infinitive} (${verb.english}) — ${sentence.person}: ${sentence.template}`}
                expectedAnswer={expected}
                subjectPrefix="Polish app: imperative mistake report"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
