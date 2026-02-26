import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Polish Declension Practice</h1>
      <p>
        Practice Polish noun declension with sentences. Choose which cases, genders,
        and number (singular/plural) you want to practice, then get one question at a time.
      </p>
      <p>
        You’ll see the word in the <strong>nominative</strong> and a sentence with a blank.
        Fill in the correct form. Use the hint to see the case and a short explanation.
      </p>
      <p>
        We don’t require perfect diacritics (e.g. ł vs l) to count as correct, but we’ll show
        you which accents you missed so you can improve.
      </p>
      <Link to="/practice">
        <button type="button">Start practice</button>
      </Link>
      {" "}
      <Link to="/progress">
        <button type="button">View progress</button>
      </Link>
      {" "}
      <Link to="/rules">
        <button type="button">Grammar rules</button>
      </Link>
    </div>
  );
}
