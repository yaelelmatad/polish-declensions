import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Polish Grammar Practice</h1>
      <p>
        Practice Polish grammar with interactive exercises. Choose a topic below
        to get started. We don't require perfect diacritics (e.g. ł vs l) to
        count as correct, but we'll show you which accents you missed.
      </p>

      <div className="home-cards">
        <div className="home-card">
          <h2>Declension</h2>
          <p>
            Practice noun, adjective, and pronoun declension. See a word in
            nominative and a sentence with a blank — fill in the correct form
            for the right case.
          </p>
          <Link to="/practice">
            <button type="button">Practice declension</button>
          </Link>
        </div>

        <div className="home-card">
          <h2>Imperatives</h2>
          <p>
            Practice the imperative mood (tryb rozkazujący). Given a verb and a
            person (ty / my / wy), fill in the correct command form.
          </p>
          <Link to="/imperatives">
            <button type="button">Practice imperatives</button>
          </Link>
        </div>

        <div className="home-card">
          <h2>Verbs of Motion</h2>
          <p>
            Choose the right verb of motion (chodzić / jeździć / iść / jechać /
            pójść / pojechać) and conjugate it correctly based on context:
            habitual, in-progress, or completed.
          </p>
          <Link to="/motion">
            <button type="button">Practice motion verbs</button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/progress">
          <button type="button">View progress</button>
        </Link>{" "}
        <Link to="/rules">
          <button type="button">Grammar rules</button>
        </Link>
      </div>
    </div>
  );
}
