import { useState, useEffect, useMemo } from "react";
import type { Question } from "../lib/pickQuestion";
import { getExpectedForm } from "../lib/pickQuestion";
import { getCaseDisplayName, CASE_RULE_SHORT, CASE_VERB_HINTS, WORD_TYPE_NAMES } from "../types";
import { checkAnswer } from "../lib/diacritics";
import { saveAttempt } from "../lib/progress";

const BLANK = "_____";

interface Props {
  question: Question;
  onNext: () => void;
  showEnglish?: boolean;
}

export default function QuestionCard({ question, onNext, showEnglish }: Props) {
  const { sentence, word, adjectivalItem, gender, virile } = question;
  const expected = getExpectedForm(question);
  const label = word ? word.nominative : adjectivalItem!.label;
  const english = word?.english ?? adjectivalItem?.english;
  const typeLabel = word ? "Noun" : WORD_TYPE_NAMES[adjectivalItem!.type];
  const numberLabelLower = sentence.number === "singular" ? "singular" : "plural";
  const numberLabel = sentence.number === "singular" ? "Singular" : "Plural";
  const [answer, setAnswer] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof checkAnswer> | null>(
    null
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [reportPassword, setReportPassword] = useState("");
  const [reportExplanation, setReportExplanation] = useState("");
  const [reportError, setReportError] = useState<string | null>(null);

  const displayTemplate = sentence.template.replace(BLANK, "_____");
  const showInput = result === null;

  // All accepted forms (canonical + alternates like "ciebie"/"cię") for feedback
  const acceptedForms = useMemo(() => {
    const main = getExpectedForm(question);
    const alts: string[] = [];
    if (
      adjectivalItem &&
      adjectivalItem.type === "pronoun" &&
      adjectivalItem.id === "ty" &&
      sentence.case === "acc" &&
      sentence.number === "singular"
    ) {
      alts.push("cię");
    }
    return [...new Set([main, ...alts])];
  }, [question, sentence.case, sentence.number, adjectivalItem]);


  // Why this case uses this ending (per-case explanations for fallback)
  const CASE_WHY: Record<string, string> = {
    nom: "Nominative is the dictionary form (subject); no change needed.",
    gen: "Genitive marks ‘of’, absence (nie ma), or quantity; Polish changes the ending to show this role.",
    dat: "Dative marks ‘to/for’ (recipient); Polish uses a specific ending so the noun is clearly the indirect object.",
    acc: "Accusative marks the direct object (or direction); Polish uses a specific ending so it’s clear what is acted on.",
    inst: "Instrumental marks ‘with’ (z) or identity (Jestem…); Polish uses a specific ending for this role.",
    loc: "Locative marks location only (w, na, o); Polish uses a specific ending so it’s clear we mean ‘where’, not ‘where to’.",
    voc: "Vocative is for direct address (calling someone); Polish uses a special form so it’s clear you’re addressing them.",
  };

  // Stem/ending change hint for nouns: show transformation + the rule (why this ending)
  const morphologyHint = useMemo(() => {
    if (!word) return null;
    const forms = word.forms[sentence.number];
    const nomForm = forms?.nom;
    const target = expected;
    if (!nomForm || !target || nomForm === target) return null;

    const caseName = getCaseDisplayName(sentence.case);
    const num = sentence.number === "singular" ? "singular" : "plural";
    const caseWhy = CASE_WHY[sentence.case] ?? "This case has its own ending in Polish.";

    // —— Singular ——

    // Feminine -a (singular): replace -a with the case ending
    if (sentence.number === "singular" && word.gender === "f" && nomForm.endsWith("a")) {
      if (sentence.case === "acc" && target.endsWith("ę")) {
        return "Replace -a with -ę. Rule: accusative (direct object) has its own ending for feminine singular; -ę marks the object (kobieta → kobietę).";
      }
      if (sentence.case === "gen" && (target.endsWith("y") || target.endsWith("i"))) {
        return "Replace -a with -y or -i. Rule: genitive (‘of’, nie ma, bez) uses -y or -i depending on the stem (kobieta → kobiety, mama → mamy).";
      }
      if (sentence.case === "inst" && target.endsWith("ą")) {
        return "Replace -a with -ą. Rule: instrumental (‘with’ z, or identity) uses -ą for feminine singular (kobieta → kobietą).";
      }
      if (sentence.case === "loc" && (target.endsWith("e") || target.endsWith("y") || target.endsWith("i"))) {
        return "Replace -a with -e (or -y/-i). Rule: locative (location: w, na, o) uses -e for feminine -a nouns (kobieta → kobiecie, ulica → ulicy).";
      }
      if (sentence.case === "voc" && target.endsWith("o")) {
        return "Replace -a with -o. Rule: vocative (direct address) for feminine -a nouns uses -o (mama → mamo!, kobieta → kobieto!).";
      }
      if (sentence.case === "dat" && (target.endsWith("ie") || target.endsWith("e"))) {
        return "Replace -a with -ie or -e. Rule: dative (‘to/for’) for feminine -a uses -ie after consonants (mama → mamie, kobieta → kobiecie).";
      }
    }

    // Neuter -o (singular): replace -o with case ending
    if (sentence.number === "singular" && word.gender === "n" && nomForm.endsWith("o")) {
      if (sentence.case === "gen" && target.endsWith("a")) {
        return "Replace -o with -a. Rule: genitive (‘of’/absence) for neuter -o nouns uses -a (mieszkanie → mieszkania).";
      }
      if (sentence.case === "loc" && target.endsWith("e")) {
        return "Replace -o with -e. Rule: locative (location) for neuter -o uses -e (mieszkanie → mieszkaniu would be different stem; -o nouns often -e).";
      }
    }

    // Masculine / neuter singular (consonant or other stems)
    if (sentence.number === "singular" && (word.gender === "m" || word.gender === "n")) {
      if ((sentence.case === "dat" || sentence.case === "loc") && target.endsWith("u") && !nomForm.endsWith("u")) {
        return "Add -u to the stem. Rule: dative and locative singular for many masculine/neuter consonant stems use -u (dom → domu, rok → roku, w domu).";
      }
      if (sentence.case === "inst" && target.endsWith("em")) {
        return "Add -em to the stem. Rule: instrumental (‘with’ z, identity) singular uses -em for masculine/neuter (student → studentem, dom → domem).";
      }
      if (sentence.case === "gen" && target.endsWith("a") && word.animate) {
        return "Stem (sometimes with change) + -a. Rule: genitive and accusative singular for masculine animate use -a (student → studenta, chłopiec → chłopca); marks ‘of’ or direct object.";
      }
      if (sentence.case === "dat" && target.endsWith("owi")) {
        return "Add -owi to the stem. Rule: dative (‘to/for’) singular for masculine uses -owi (student → studentowi, dom → domowi).";
      }
      // Loc/voc -ie/-e: distinguish vowel-change (las→lesie) vs soft/stół (student→studencie, stół→stole)
      if ((sentence.case === "loc" || sentence.case === "voc") && (target.endsWith("ie") || target.endsWith("e"))) {
        if (nomForm.includes("a") && target.includes("e") && !nomForm.endsWith("a")) {
          return "Stem vowel a→e and add -ie. Rule: locative/vocative for some masc. nouns with -a- in the stem: -a- becomes -e- and ending is -ie (las → lesie, w lesie).";
        }
        if (nomForm.includes("ó") && target.endsWith("e") && !target.endsWith("ie")) {
          return "Replace -ó with -o and add -e. Rule: locative/vocative for stems with -ó-: -ó- becomes -o- and ending -e (stół → stole, na stole).";
        }
        if (target.endsWith("zie") || target.endsWith("dzie")) {
          return "Stem consonant may soften and add -ie/-zie. Rule: locative/vocative for some consonant stems: add -ie (samochód → samochodzie, w samochodzie).";
        }
        return "Stem (with possible change) + -ie or -e. Rule: locative/vocative singular for soft or certain stems (student → studencie, o studencie).";
      }
      if (sentence.case === "voc" && target.endsWith("u")) {
        return "Same as locative: stem + -u. Rule: vocative for some masculine nouns uses the same form as locative (dom → domu!, syn → synu!).";
      }
      if (sentence.case === "acc" && nomForm === target) {
        return "No change: nominative = accusative here. Rule: inanimate masculine singular keeps the same form as subject (widzę dom); only animate masc. gets -a.";
      }
    }

    // —— Plural (all genders) ——

    if (sentence.number === "plural") {
      if (sentence.case === "inst" && (target.endsWith("ami") || target.endsWith("ńmi"))) {
        return "Add -ami to the stem (or -ńmi for a few nouns). Rule: instrumental plural always uses -ami for ‘with’ (student → studentami); koń → konie → końmi is the main -ńmi exception.";
      }
      if (sentence.case === "gen" && target.endsWith("ów")) {
        return "Add -ów to the stem. Rule: genitive plural for masculine/neuter uses -ów to mark ‘of’/absence (student → studentów, dom → domów).";
      }
      if (sentence.case === "gen" && word.gender === "f" && !target.endsWith("ów")) {
        return "Drop -a and use stem (sometimes with change). Rule: feminine plural genitive does not use -ów; the -a drops and the stem appears (kobieta → kobiet, mama → mam, książka → książek).";
      }
      if (sentence.case === "dat" && target.endsWith("om")) {
        return "Add -om to the stem. Rule: dative plural (‘to/for’) uses -om for all genders (student → studentom, kobieta → kobietom).";
      }
      if (sentence.case === "loc" && target.endsWith("ach")) {
        return "Add -ach to the stem. Rule: locative plural (location) uses -ach for all nouns (student → studentach, kobieta → kobietach).";
      }
      if (sentence.case === "acc" && word.virile && (target.endsWith("ów") || target.endsWith("y") || target.endsWith("i"))) {
        return "Use the genitive plural form. Rule: animate masculine plural accusative (object) takes the same form as genitive plural (widzę studentów, not studenty).";
      }
      if (sentence.case === "acc" && !word.virile && (target.endsWith("y") || target.endsWith("e") || target.endsWith("i"))) {
        return "Same form as nominative plural. Rule: inanimate/feminine/neuter plural accusative usually matches nominative plural (domy, kobiety) as the object.";
      }
      if (sentence.case === "nom") {
        if (target.endsWith("ie") && !nomForm.endsWith("e") && !nomForm.endsWith("a") && !nomForm.endsWith("o")) {
          return "Stem + -ie (or -ść/-ć → -ście/-cie). Rule: nominative plural for masculine nouns with soft stems (e.g. gość, ending in -ść/-ć) uses -ie (gość → goście); this is the subject form so the verb agrees (goście przyszli).";
        }
        return "Nominative plural has its own ending. Rule: subject in the plural gets -y/-e/-i/-owie etc. so the verb agrees (studenci są, domy stoją).";
      }
    }

    // Fallback: show change + why this case
    const baseLast = nomForm.slice(-1);
    const targetLast = target.slice(-1);
    const nounLabel = word.gender === "f" ? "Feminine" : word.gender === "m" ? "Masculine" : "Neuter";
    if (baseLast !== targetLast || nomForm !== target) {
      return `${nounLabel} noun: ${nomForm} ⇒ ${target} (${caseName}, ${num}). Rule: ${caseWhy}`;
    }
    return `${caseName} (${num}): form is ‘${target}’. Rule: ${caseWhy}`;
  }, [word, sentence.number, sentence.case, expected]);

  // When the question changes (e.g. user clicked Next), reset so we show input for the new question
  // instead of stale feedback from the previous one.
  useEffect(() => {
    setAnswer("");
    setResult(null);
    setHintShown(false);
  }, [question.sentence.id, question.sentence.template]);

  // Enter to go to next question when feedback is shown (and report modal is closed).
  // Ignore Enter if it came from an input/textarea so the same keypress never does submit+next.
  useEffect(() => {
    if (showInput || reportOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const tag = (e.target as Element)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showInput, reportOpen, onNext]);

  const handleSubmit = () => {
    // Base expected form from the data
    const expectedMain = expected;
    const alternateExpected: string[] = [];

    // Special-case: accept both "ciebie" and "cię" for "ty" accusative singular
    if (
      adjectivalItem &&
      adjectivalItem.type === "pronoun" &&
      adjectivalItem.id === "ty" &&
      sentence.case === "acc" &&
      sentence.number === "singular"
    ) {
      alternateExpected.push("cię");
    }

    // Try canonical first, then any alternates
    let r = checkAnswer(expectedMain, answer);
    if (!r.correct) {
      for (const alt of alternateExpected) {
        const altResult = checkAnswer(alt, answer);
        if (altResult.correct) {
          r = altResult;
          break;
        }
      }
    }
    setResult(r);
    saveAttempt({
      case: sentence.case,
      gender,
      number: sentence.number,
      virile,
      correct: r.correct,
      timestamp: Date.now(),
    });
  };

  const handleOpenReport = () => {
    setReportOpen(true);
    setReportPassword("");
    setReportExplanation("");
    setReportError(null);
  };

  const handleSendReport = () => {
    if (reportPassword !== "qa") {
      setReportError("Incorrect password.");
      return;
    }
    if (!reportExplanation.trim()) {
      setReportError("Please describe the nature of the mistake.");
      return;
    }

    const subject = encodeURIComponent(
      "Polish Declension app: mistake report"
    );
    const bodyLines = [
      "Question:",
      displayTemplate,
      "",
      "Expected answer:",
      expected,
      "",
      "User explanation:",
      reportExplanation.trim(),
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:Yael.elmatad@gmail.com?subject=${subject}&body=${body}`;
    setReportOpen(false);
  };

  return (
    <div className="question-card">
      <p className="nominative">
        <strong>{typeLabel} (nom):</strong> {label}, {numberLabelLower}
        {showEnglish && english != null && (
          <span className="nominative-english"> — {english}</span>
        )}
      </p>
      <p className="sentence">{displayTemplate}</p>
      {showInput ? (
        <>
          <div className="answer-row">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type the declined form"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit();
                }
              }}
              autoFocus
            />
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <button
            type="button"
            className="hint-btn"
            onClick={() => setHintShown(true)}
          >
            Hint
          </button>
          {hintShown && (
            <div className="hint-box">
              <strong>{getCaseDisplayName(sentence.case)}</strong>
              <p className="hint-rule">{CASE_RULE_SHORT[sentence.case]}</p>
              {CASE_VERB_HINTS[sentence.case].length > 0 && (
                <div className="hint-verbs">
                  <strong>Verbs / triggers:</strong>
                  <ul>
                    {CASE_VERB_HINTS[sentence.case].map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
              {morphologyHint && (
                <p className="hint-morphology">{morphologyHint}</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="feedback">
          <p className={result!.correct ? "correct" : "incorrect"}>
            {result!.correct ? "Correct!" : "Incorrect."}
            <span className="feedback-number"> {numberLabel}.</span>
            {acceptedForms.length > 1 ? (
              <span> {result!.correct ? "Accepted" : "Correct"} form(s): <strong>{acceptedForms.join(", ")}</strong></span>
            ) : acceptedForms.length === 1 ? (
              <span> {result!.correct ? "Accepted" : "Correct"} form: <strong>{acceptedForms[0]}</strong></span>
            ) : null}
          </p>
          {result!.missedDiacritics.length > 0 && (
            <p className="diacritics-feedback">
              You missed these diacritics:{" "}
              {result!.missedDiacritics
                .map((d) => d.char)
                .filter((c, i, a) => a.indexOf(c) === i)
                .join(", ")}
            </p>
          )}
          <div className="hint-box">
            <strong>{getCaseDisplayName(sentence.case)}</strong>
            <p className="hint-rule">{CASE_RULE_SHORT[sentence.case]}</p>
            {CASE_VERB_HINTS[sentence.case].length > 0 && (
              <div className="hint-verbs">
                <strong>Verbs / triggers:</strong>
                <ul>
                  {CASE_VERB_HINTS[sentence.case].map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {morphologyHint && (
              <p className="hint-morphology">{morphologyHint}</p>
            )}
          </div>
          <div className="feedback-actions">
            <button type="button" onClick={onNext}>
              Next question
            </button>
            <span className="next-hint">(or press Enter)</span>
            <button
              type="button"
              className="secondary-btn"
              onClick={handleOpenReport}
            >
              Report a mistake
            </button>
          </div>
        </div>
      )}
      {reportOpen && (
        <div className="report-modal-backdrop">
          <div className="report-modal">
            <h3>Report a mistake</h3>
            <p>To prevent spam, enter the QA password and describe the issue.</p>
            <label>
              Password
              <input
                type="password"
                value={reportPassword}
                onChange={(e) => setReportPassword(e.target.value)}
              />
            </label>
            <label>
              Describe the nature of the mistake
              <textarea
                value={reportExplanation}
                onChange={(e) => setReportExplanation(e.target.value)}
              />
            </label>
            {reportError && <p className="report-error">{reportError}</p>}
            <div className="report-actions">
              <button type="button" onClick={handleSendReport}>
                Send email
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setReportOpen(false)}
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
    </div>
  );
}
