import { useState } from "react";
import {
  loadAttempts,
  aggregateProgress,
  getNeedsPracticeBuckets,
  clearAttempts,
  loadImperativeAttempts,
  aggregateImperativeProgress,
  clearImperativeAttempts,
  loadMotionAttempts,
  aggregateMotionProgress,
  clearMotionAttempts,
} from "../lib/progress";
import { getDeckStats, clearDeck } from "../lib/srs";
import type { SRSStats } from "../lib/srs";
import { getCaseDisplayName, GENDER_NAMES } from "../types";
import { sentences } from "../data/sentences";
import { sentencesAdjectival } from "../data/sentencesAdjectival";
import { imperativeSentences } from "../data/imperativeSentences";
import { motionSentences } from "../data/motionSentences";

const CONTEXT_LABELS: Record<string, string> = {
  habitual: "Habitual",
  in_progress: "In progress",
  completed: "Completed",
  future_plan: "Future plan",
};

const declIds = [...sentences, ...sentencesAdjectival].map((s) => s.id);
const impIds = imperativeSentences.map((s) => s.id);
const motIds = motionSentences.map((s) => s.id);

function SRSStatsBar({ stats }: { stats: SRSStats }) {
  return (
    <div className="srs-stats-bar">
      <span className="srs-stat">
        <strong>{stats.dueNow}</strong> due now
      </span>
      <span className="srs-stat">
        <strong>{stats.dueTodayRemaining}</strong> due later today
      </span>
      <span className="srs-stat">
        <strong>{stats.unseen}</strong> new / unseen
      </span>
      <span className="srs-stat">
        <strong>{stats.mature}</strong> mature (21+ days)
      </span>
    </div>
  );
}

export default function Progress() {
  const [declAttempts, setDeclAttempts] = useState(loadAttempts());
  const [impAttempts, setImpAttempts] = useState(loadImperativeAttempts());
  const [motAttempts, setMotAttempts] = useState(loadMotionAttempts());
  const [srsKey, setSrsKey] = useState(0);

  const declBuckets = aggregateProgress(declAttempts);
  const declNeeds = getNeedsPracticeBuckets(declBuckets);
  const impBuckets = aggregateImperativeProgress(impAttempts);
  const motBuckets = aggregateMotionProgress(motAttempts);

  const declSrs = getDeckStats("declension", declIds);
  const impSrs = getDeckStats("imperative", impIds);
  const motSrs = getDeckStats("motion", motIds);
  void srsKey; // trigger re-read when decks are cleared

  const totalAll = declAttempts.length + impAttempts.length + motAttempts.length;

  const handleClearAll = () => {
    if (
      window.confirm(
        "Clear ALL progress and spaced repetition data? This cannot be undone."
      )
    ) {
      clearAttempts();
      clearImperativeAttempts();
      clearMotionAttempts();
      clearDeck("declension");
      clearDeck("imperative");
      clearDeck("motion");
      setDeclAttempts([]);
      setImpAttempts([]);
      setMotAttempts([]);
      setSrsKey((k) => k + 1);
    }
  };

  return (
    <div>
      <h1>Progress</h1>
      <p>
        Total attempts across all sections: <strong>{totalAll}</strong>
        {totalAll > 0 && (
          <>
            {" "}
            <button
              type="button"
              className="clear-progress-btn"
              onClick={handleClearAll}
            >
              Clear all progress
            </button>
          </>
        )}
      </p>

      {totalAll === 0 && (
        <p>No attempts yet. Start practicing to see your progress here.</p>
      )}

      {/* ================================================================ */}
      {/* DECLENSION */}
      {/* ================================================================ */}
      <section>
        <h2>
          Declension{" "}
          <span className="progress-count">({declAttempts.length} attempts)</span>
        </h2>
        <SRSStatsBar stats={declSrs} />
        {declAttempts.length === 0 ? (
          <p className="progress-empty">No declension attempts yet.</p>
        ) : (
          <>
            {declNeeds.length > 0 && (
              <div className="needs-practice">
                <h3>Needs practice</h3>
                <p>Under 70% accuracy, at least 5 attempts:</p>
                <ul>
                  {declNeeds.map((b) => (
                    <li
                      key={`${b.case}-${b.gender}-${b.number}-${b.virile}`}
                    >
                      {getCaseDisplayName(b.case)} – {GENDER_NAMES[b.gender]} –{" "}
                      {b.number} {b.virile ? "(virile)" : ""}:{" "}
                      <strong>{Math.round(b.accuracy * 100)}%</strong> ({b.correct}/
                      {b.total})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <table className="progress-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Gender</th>
                  <th>Number</th>
                  <th>Virile</th>
                  <th>Accuracy</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {declBuckets.map((b) => (
                  <tr
                    key={`${b.case}-${b.gender}-${b.number}-${b.virile}`}
                    className={
                      declNeeds.some(
                        (n) =>
                          n.case === b.case &&
                          n.gender === b.gender &&
                          n.number === b.number &&
                          n.virile === b.virile
                      )
                        ? "need-practice-row"
                        : ""
                    }
                  >
                    <td>{getCaseDisplayName(b.case)}</td>
                    <td>{GENDER_NAMES[b.gender]}</td>
                    <td>{b.number}</td>
                    <td>{b.virile ? "yes" : "no"}</td>
                    <td>{Math.round(b.accuracy * 100)}%</td>
                    <td>
                      {b.correct}/{b.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>

      {/* ================================================================ */}
      {/* IMPERATIVES */}
      {/* ================================================================ */}
      <section>
        <h2>
          Imperatives{" "}
          <span className="progress-count">({impAttempts.length} attempts)</span>
        </h2>
        <SRSStatsBar stats={impSrs} />
        {impAttempts.length === 0 ? (
          <p className="progress-empty">No imperative attempts yet.</p>
        ) : (
          <table className="progress-table">
            <thead>
              <tr>
                <th>Conjugation</th>
                <th>Person</th>
                <th>Accuracy</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {impBuckets.map((b) => (
                <tr
                  key={`${b.conjugation}-${b.person}`}
                  className={
                    b.total >= 5 && b.accuracy < 0.7
                      ? "need-practice-row"
                      : ""
                  }
                >
                  <td>{b.conjugation}</td>
                  <td>{b.person}</td>
                  <td>{Math.round(b.accuracy * 100)}%</td>
                  <td>
                    {b.correct}/{b.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ================================================================ */}
      {/* MOTION VERBS */}
      {/* ================================================================ */}
      <section>
        <h2>
          Motion Verbs{" "}
          <span className="progress-count">({motAttempts.length} attempts)</span>
        </h2>
        <SRSStatsBar stats={motSrs} />
        {motAttempts.length === 0 ? (
          <p className="progress-empty">No motion verb attempts yet.</p>
        ) : (
          <table className="progress-table">
            <thead>
              <tr>
                <th>Context</th>
                <th>Transport</th>
                <th>Tense</th>
                <th>Accuracy</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {motBuckets.map((b) => (
                <tr
                  key={`${b.context}-${b.transport}-${b.tense}`}
                  className={
                    b.total >= 5 && b.accuracy < 0.7
                      ? "need-practice-row"
                      : ""
                  }
                >
                  <td>{CONTEXT_LABELS[b.context] ?? b.context}</td>
                  <td>{b.transport}</td>
                  <td>{b.tense}</td>
                  <td>{Math.round(b.accuracy * 100)}%</td>
                  <td>
                    {b.correct}/{b.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
