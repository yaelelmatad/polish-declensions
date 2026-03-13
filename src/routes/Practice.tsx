import { useState } from "react";
import FilterSettings from "../components/FilterSettings";
import QuestionCard from "../components/QuestionCard";
import type { FilterSettings as FS } from "../types";
import { words } from "../data/words";
import { sentences } from "../data/sentences";
import { sentencesAdjectival } from "../data/sentencesAdjectival";
import { adjectivalItems } from "../data/adjectivalItems";
import { getEligibleQuestions, getQuestionBucketKey } from "../lib/pickQuestion";
import type { Question } from "../lib/pickQuestion";
import { pickNextDue } from "../lib/srs";

const allSentences = [...sentences, ...sentencesAdjectival];

const SHOW_ENGLISH_KEY = "polish-declension-show-english";

function getInitialShowEnglish(): boolean {
  try {
    const v = localStorage.getItem(SHOW_ENGLISH_KEY);
    return v === "true";
  } catch {
    return false;
  }
}

const defaultFilters: FS = {
  wordTypes: ["noun"],
  stemTypes: ["hard", "soft", "softened"],
  cases: ["nom", "gen", "dat", "acc", "inst", "loc", "voc"],
  genders: ["m", "f", "n"],
  number: "both",
  virile: "both",
  animate: "both",
};

const wordMap = new Map(words.map((w) => [w.id, w]));
const adjectivalMap = new Map(adjectivalItems.map((a) => [a.id, a]));

export default function Practice() {
  const [settings, setSettings] = useState<FS>(defaultFilters);
  const [showEnglish, setShowEnglish] = useState(getInitialShowEnglish);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [noEligible, setNoEligible] = useState(false);

  const toggleShowEnglish = () => {
    const next = !showEnglish;
    setShowEnglish(next);
    try {
      localStorage.setItem(SHOW_ENGLISH_KEY, String(next));
    } catch {}
  };

  const getNext = () => {
    setNoEligible(false);
    const eligible = getEligibleQuestions(
      allSentences,
      wordMap,
      adjectivalMap,
      settings
    );
    if (eligible.length === 0) {
      setQuestion(null);
      setNoEligible(true);
      return;
    }

    const idMap = new Map<string, Question>();
    for (const q of eligible) idMap.set(q.sentence.id, q);

    const dueId = pickNextDue("declension", [...idMap.keys()]);
    let picked: Question | null = null;

    if (dueId) {
      picked = idMap.get(dueId) ?? null;
    }

    if (!picked) {
      const arr = [...eligible];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      const lastKey = question ? getQuestionBucketKey(question) : null;
      if (lastKey && arr.length > 1) {
        const diff = arr.filter((q) => getQuestionBucketKey(q) !== lastKey);
        picked = diff.length > 0 ? diff[0] : arr[0];
      } else {
        picked = arr[0];
      }
    }

    setQuestion(picked);
  };

  return (
    <div>
      <h1>Practice</h1>
      <div className="options-tray">
        <button
          type="button"
          className="options-tray-header"
          onClick={() => setOptionsOpen((o) => !o)}
          aria-expanded={optionsOpen}
        >
          <span className="options-tray-caret" aria-hidden>
            {optionsOpen ? "▼" : "▶"}
          </span>
          Options
        </button>
        {optionsOpen && (
          <div className="options-tray-content">
            <FilterSettings settings={settings} onChange={setSettings} />
            <label className="chip toggle-show-english">
              <input
                type="checkbox"
                checked={showEnglish}
                onChange={toggleShowEnglish}
              />
              Show English translation (nominative)
            </label>
          </div>
        )}
      </div>
      {question ? (
        <QuestionCard
          key="practice-card"
          question={question}
          onNext={getNext}
          showEnglish={showEnglish}
        />
      ) : (
        <p>
          <button type="button" onClick={getNext}>
            Start / Next question
          </button>
          {noEligible && (
            <span className="no-eligible-msg">
              {" "}
              No questions match your filters. Try changing them.
            </span>
          )}
        </p>
      )}
    </div>
  );
}
