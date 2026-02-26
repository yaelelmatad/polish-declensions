import { useState } from "react";
import {
  loadAttempts,
  aggregateProgress,
  getNeedsPracticeBuckets,
  clearAttempts,
} from "../lib/progress";
import { getCaseDisplayName, GENDER_NAMES } from "../types";

export default function Progress() {
  const [attempts, setAttempts] = useState(loadAttempts());

  const buckets = aggregateProgress(attempts);
  const needsPractice = getNeedsPracticeBuckets(buckets);

  const handleClearProgress = () => {
    if (window.confirm("Clear all progress and attempt history? This cannot be undone.")) {
      clearAttempts();
      setAttempts([]);
    }
  };

  return (
    <div>
      <h1>Progress</h1>
      <p>
        Total attempts: <strong>{attempts.length}</strong>
        {attempts.length > 0 && (
          <>
            {" "}
            <button
              type="button"
              className="clear-progress-btn"
              onClick={handleClearProgress}
            >
              Clear progress
            </button>
          </>
        )}
      </p>
      {needsPractice.length > 0 && (
        <section className="needs-practice">
          <h2>Need more practice</h2>
          <p>Focus on these (under 70% accuracy, at least 5 attempts):</p>
          <ul>
            {needsPractice.map((b) => (
              <li key={`${b.case}-${b.gender}-${b.number}-${b.virile}`}>
                {getCaseDisplayName(b.case)} – {GENDER_NAMES[b.gender]} –{" "}
                {b.number} {b.virile ? "(virile)" : ""}:{" "}
                <strong>
                  {Math.round(b.accuracy * 100)}%
                </strong>{" "}
                ({b.correct}/{b.total})
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h2>All buckets</h2>
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
            {buckets.map((b) => (
              <tr
                key={`${b.case}-${b.gender}-${b.number}-${b.virile}`}
                className={
                  needsPractice.some(
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
      </section>
      {buckets.length === 0 && (
        <p>No attempts yet. Start practicing to see your progress here.</p>
      )}
    </div>
  );
}
