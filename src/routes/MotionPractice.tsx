import { useState, useCallback, useEffect, useRef } from "react";
import { motionSentences } from "../data/motionSentences";
import type { MotionSentence, MotionContext } from "../data/motionSentences";
import { normalizedEquals, findMissedDiacritics } from "../lib/diacritics";
import { saveMotionAttempt } from "../lib/progress";
import { pickNextDue, updateCard } from "../lib/srs";
import ReportMistake from "../components/ReportMistake";

const CONTEXT_LABELS: Record<MotionContext, string> = {
  habitual: "Habitual / repeated",
  in_progress: "Right now / in progress",
  completed: "Completed (past)",
  future_plan: "Future plan",
};

const CONTEXT_COLORS: Record<MotionContext, string> = {
  habitual: "#2563eb",
  in_progress: "#d97706",
  completed: "#059669",
  future_plan: "#7c3aed",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface CheckResult {
  correct: boolean;
  missedDiacritics: { char: string; position: number }[];
  matchedForm: string;
}

function checkMotionAnswer(
  sentence: MotionSentence,
  userAnswer: string
): CheckResult {
  const allForms = [sentence.expected, ...(sentence.alternates ?? [])];
  for (const form of allForms) {
    if (normalizedEquals(form, userAnswer)) {
      return {
        correct: true,
        missedDiacritics: findMissedDiacritics(form, userAnswer),
        matchedForm: form,
      };
    }
  }
  return {
    correct: false,
    missedDiacritics: [],
    matchedForm: sentence.expected,
  };
}

export default function MotionPractice() {
  const [queue, setQueue] = useState<MotionSentence[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [sentence, setSentence] = useState<MotionSentence | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [refOpen, setRefOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allIds = motionSentences.map((s) => s.id);
  const sentMap = new Map(motionSentences.map((s) => [s.id, s]));

  const pickNext = useCallback(() => {
    const dueId = pickNextDue("motion", allIds);
    let picked: MotionSentence | undefined;

    if (dueId) {
      picked = sentMap.get(dueId);
    }

    if (!picked) {
      let q = queue;
      let idx = qIdx;
      if (q.length === 0 || idx >= q.length) {
        q = shuffle(motionSentences);
        setQueue(q);
        idx = 0;
      }
      picked = q[idx];
      setQIdx(idx + 1);
    }

    setSentence(picked);
    setAnswer("");
    setResult(null);
    setHintShown(false);
    setTimeout(() => inputRef.current?.focus(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, qIdx]);

  const handleSubmit = () => {
    if (!sentence || !answer.trim()) return;
    const r = checkMotionAnswer(sentence, answer);
    setResult(r);
    saveMotionAttempt({
      context: sentence.context,
      transport: sentence.transport,
      tense: sentence.tense,
      correct: r.correct,
      timestamp: Date.now(),
    });
    updateCard("motion", sentence.id, r.correct);
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

  return (
    <div>
      <h1>Verbs of Motion</h1>

      {/* Collapsible reference */}
      <div className="options-tray" style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          className="options-tray-header"
          onClick={() => setRefOpen((o) => !o)}
        >
          <span className="options-tray-caret">{refOpen ? "▼" : "▶"}</span>
          Quick reference — which verb to use
        </button>
        {refOpen && (
          <div className="options-tray-content">
            <table className="motion-ref-table">
              <thead>
                <tr>
                  <th></th>
                  <th>On foot (pieszo)</th>
                  <th>By vehicle (pojazdem)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Habitual / repeated</strong>
                    <br />
                    <em>
                      codziennie, zawsze, często, co tydzień, nigdy,
                      regularnie…
                    </em>
                  </td>
                  <td>
                    <strong>chodzić</strong>
                    <br />
                    chodzę, chodzisz, chodzi…
                  </td>
                  <td>
                    <strong>jeździć</strong>
                    <br />
                    jeżdżę, jeździsz, jeździ…
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Right now / one direction</strong>
                    <br />
                    <em>teraz, właśnie, w tej chwili, dokąd…</em>
                  </td>
                  <td>
                    <strong>iść</strong>
                    <br />
                    idę, idziesz, idzie…
                    <br />
                    <small>past: szedłem/szłam, szedł/szła</small>
                  </td>
                  <td>
                    <strong>jechać</strong>
                    <br />
                    jadę, jedziesz, jedzie…
                    <br />
                    <small>past: jechałem/jechałam</small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Completed / future plan</strong>
                    <br />
                    <em>
                      wczoraj, jutro, w zeszłym roku, za tydzień…
                    </em>
                  </td>
                  <td>
                    <strong>pójść</strong>
                    <br />
                    pójdę, pójdziesz, pójdzie…
                    <br />
                    <small>past: poszedłem/poszłam</small>
                  </td>
                  <td>
                    <strong>pojechać</strong>
                    <br />
                    pojadę, pojedziesz, pojedzie…
                    <br />
                    <small>past: pojechałem/pojechałam</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!sentence ? (
        <div>
          <p>
            Practice choosing the correct Polish verb of motion. There are six
            key verbs organized by <strong>habitual vs. in-progress vs.
            completed</strong> and <strong>on foot vs. by vehicle</strong>.
            Fill in the correct conjugated form.
          </p>
          <button type="button" onClick={pickNext}>
            Start practice
          </button>
        </div>
      ) : (
        <div className="question-card">
          <div className="motion-context-tag" style={{ color: CONTEXT_COLORS[sentence.context] }}>
            {CONTEXT_LABELS[sentence.context]} — {sentence.tense} tense
            {sentence.transport === "vehicle" ? " (vehicle)" : " (on foot)"}
          </div>
          <p className="sentence">
            {sentence.template.replace(/_____/g, "_____ ")}
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
                  placeholder="Type the correct verb form…"
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
                  {sentence.alternates && sentence.alternates.length > 0 && (
                    <>
                      {" "}Accepted form(s):{" "}
                      <strong>
                        {[sentence.expected, ...sentence.alternates].join(", ")}
                      </strong>
                    </>
                  )}
                </p>
              ) : (
                <p className="incorrect">
                  <strong>Incorrect.</strong> Correct form:{" "}
                  <strong>{sentence.expected}</strong>
                  {sentence.alternates && sentence.alternates.length > 0 && (
                    <>
                      {" "}(also accepted:{" "}
                      {sentence.alternates.join(", ")})
                    </>
                  )}
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
              </div>
              <div className="feedback-actions">
                <button type="button" onClick={pickNext}>
                  Next question
                </button>
                <span className="next-hint">(or press Enter)</span>
                <ReportMistake
                  questionText={sentence.template}
                  expectedAnswer={
                    [sentence.expected, ...(sentence.alternates ?? [])].join(", ")
                  }
                  subjectPrefix="Polish app: motion verb mistake report"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
