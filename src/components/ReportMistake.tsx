import { useState } from "react";

interface ReportMistakeProps {
  questionText: string;
  expectedAnswer: string;
  /** Email subject prefix, defaults to "Polish app: mistake report" */
  subjectPrefix?: string;
}

export default function ReportMistake({
  questionText,
  expectedAnswer,
  subjectPrefix = "Polish app: mistake report",
}: ReportMistakeProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setPassword("");
    setExplanation("");
    setError(null);
  };

  const handleSend = () => {
    if (password !== "qa") {
      setError("Incorrect password.");
      return;
    }
    if (!explanation.trim()) {
      setError("Please describe the nature of the mistake.");
      return;
    }

    const subject = encodeURIComponent(subjectPrefix);
    const bodyLines = [
      "Question:",
      questionText,
      "",
      "Expected answer:",
      expectedAnswer,
      "",
      "User explanation:",
      explanation.trim(),
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:Yael.elmatad@gmail.com?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="secondary-btn" onClick={handleOpen}>
        Report a mistake
      </button>

      {open && (
        <div className="report-modal-backdrop">
          <div className="report-modal">
            <h3>Report a mistake</h3>
            <p>
              To prevent spam, enter the QA password and describe the issue.
            </p>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Describe the nature of the mistake
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
            </label>
            {error && <p className="report-error">{error}</p>}
            <div className="report-actions">
              <button type="button" onClick={handleSend}>
                Send email
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
            <p className="report-note">
              The email will include this question and the expected answer.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
