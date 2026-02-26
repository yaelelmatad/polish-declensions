import { useState } from "react";
import FilterSettings from "../components/FilterSettings";
import QuestionCard from "../components/QuestionCard";
import type { FilterSettings as FS } from "../types";
import { words } from "../data/words";
import { sentences } from "../data/sentences";
import { sentencesAdjectival } from "../data/sentencesAdjectival";
import { adjectivalItems } from "../data/adjectivalItems";
import { pickQuestion, getEligibleQuestions, getQuestionBucketKey } from "../lib/pickQuestion";

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
  const [question, setQuestion] = useState<ReturnType<typeof pickQuestion>>(
    null
  );
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
    const lastKey = question ? getQuestionBucketKey(question) : null;
    const q = pickQuestion(allSentences, wordMap, adjectivalMap, settings, lastKey);
    setQuestion(q);
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
