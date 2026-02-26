import type { FilterSettings as FS, CaseKey, Gender, WordType, StemType } from "../types";
import { getCaseDisplayName, GENDER_NAMES, WORD_TYPE_NAMES, STEM_TYPE_NAMES } from "../types";

const CASES: CaseKey[] = ["nom", "gen", "dat", "acc", "inst", "loc", "voc"];
const GENDERS: Gender[] = ["m", "f", "n"];
const WORD_TYPES: WordType[] = ["noun", "adjective", "pronoun", "cardinal", "ordinal"];
const STEM_TYPES: StemType[] = ["hard", "soft", "softened"];

interface Props {
  settings: FS;
  onChange: (s: FS) => void;
}

export default function FilterSettings({ settings, onChange }: Props) {
  const toggleWordType = (t: WordType) => {
    const next = settings.wordTypes.includes(t)
      ? settings.wordTypes.filter((x) => x !== t)
      : [...settings.wordTypes, t];
    onChange({ ...settings, wordTypes: next });
  };

  const toggleCase = (c: CaseKey) => {
    const next = settings.cases.includes(c)
      ? settings.cases.filter((x) => x !== c)
      : [...settings.cases, c];
    onChange({ ...settings, cases: next });
  };

  const toggleGender = (g: Gender) => {
    const next = settings.genders.includes(g)
      ? settings.genders.filter((x) => x !== g)
      : [...settings.genders, g];
    onChange({ ...settings, genders: next });
  };

  const toggleStemType = (t: StemType) => {
    const next = settings.stemTypes.includes(t)
      ? settings.stemTypes.filter((x) => x !== t)
      : [...settings.stemTypes, t];
    onChange({ ...settings, stemTypes: next });
  };

  return (
    <div className="filter-settings">
      <h3>Practice filters</h3>
      <div className="filter-group">
        <span className="filter-label">Include (parts of speech):</span>
        <div className="filter-chips">
          {WORD_TYPES.map((t) => (
            <label key={t} className="chip">
              <input
                type="checkbox"
                checked={settings.wordTypes.includes(t)}
                onChange={() => toggleWordType(t)}
              />
              {WORD_TYPE_NAMES[t]}
            </label>
          ))}
        </div>
      </div>
      {settings.wordTypes.includes("noun") && (
        <div className="filter-group">
          <span className="filter-label">Noun stem type (consonant endings):</span>
          <div className="filter-chips">
            {STEM_TYPES.map((t) => (
              <label key={t} className="chip">
                <input
                  type="checkbox"
                  checked={settings.stemTypes.includes(t)}
                  onChange={() => toggleStemType(t)}
                />
                {STEM_TYPE_NAMES[t]}
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="filter-group">
        <span className="filter-label">Cases:</span>
        <div className="filter-chips">
          {CASES.map((c) => (
            <label key={c} className="chip">
              <input
                type="checkbox"
                checked={settings.cases.includes(c)}
                onChange={() => toggleCase(c)}
              />
              {getCaseDisplayName(c)}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Genders:</span>
        <div className="filter-chips">
          {GENDERS.map((g) => (
            <label key={g} className="chip">
              <input
                type="checkbox"
                checked={settings.genders.includes(g)}
                onChange={() => toggleGender(g)}
              />
              {GENDER_NAMES[g]}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Number:</span>
        <div className="filter-chips">
          <label className="chip">
            <input
              type="checkbox"
              checked={settings.number === "singular" || settings.number === "both"}
              onChange={() => {
                const singular = settings.number !== "plural";
                const plural = settings.number !== "singular";
                const nextSingular = !singular;
                const next = nextSingular && plural ? "both" : nextSingular ? "singular" : plural ? "plural" : "both";
                onChange({ ...settings, number: next });
              }}
            />
            Singular
          </label>
          <label className="chip">
            <input
              type="checkbox"
              checked={settings.number === "plural" || settings.number === "both"}
              onChange={() => {
                const singular = settings.number !== "plural";
                const plural = settings.number !== "singular";
                const nextPlural = !plural;
                const next = singular && nextPlural ? "both" : nextPlural ? "plural" : singular ? "singular" : "both";
                onChange({ ...settings, number: next });
              }}
            />
            Plural
          </label>
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Plural masculine (virile / non-virile):</span>
        <div className="filter-chips">
          <label className="chip">
            <input
              type="checkbox"
              checked={settings.virile === "virile" || settings.virile === "both"}
              onChange={() => {
                const virile = settings.virile !== "non-virile";
                const nonVirile = settings.virile !== "virile";
                const nextVirile = !virile;
                const next = nextVirile && nonVirile ? "both" : nextVirile ? "non-virile" : nonVirile ? "virile" : "both";
                onChange({ ...settings, virile: next });
              }}
            />
            Virile
          </label>
          <label className="chip">
            <input
              type="checkbox"
              checked={settings.virile === "non-virile" || settings.virile === "both"}
              onChange={() => {
                const virile = settings.virile !== "non-virile";
                const nonVirile = settings.virile !== "virile";
                const nextNonVirile = !nonVirile;
                const next = virile && nextNonVirile ? "both" : nextNonVirile ? "non-virile" : virile ? "virile" : "both";
                onChange({ ...settings, virile: next });
              }}
            />
            Non-virile
          </label>
        </div>
      </div>
      {settings.wordTypes.includes("noun") && (
        <div className="filter-group">
          <span className="filter-label">Singular masculine (animate / inanimate):</span>
          <div className="filter-chips">
            <label className="chip">
              <input
                type="checkbox"
                checked={settings.animate === "animate" || settings.animate === "both"}
                onChange={() => {
                  const animate = settings.animate !== "inanimate";
                  const inanimate = settings.animate !== "animate";
                  const nextAnimate = !animate;
                  const next = nextAnimate && inanimate ? "both" : nextAnimate ? "inanimate" : inanimate ? "animate" : "both";
                  onChange({ ...settings, animate: next });
                }}
              />
              Animate
            </label>
            <label className="chip">
              <input
                type="checkbox"
                checked={settings.animate === "inanimate" || settings.animate === "both"}
                onChange={() => {
                  const animate = settings.animate !== "inanimate";
                  const inanimate = settings.animate !== "animate";
                  const nextInanimate = !inanimate;
                  const next = animate && nextInanimate ? "both" : nextInanimate ? "inanimate" : animate ? "animate" : "both";
                  onChange({ ...settings, animate: next });
                }}
              />
              Inanimate
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
