import { CASE_NAMES, CASE_NAMES_PL } from "../types";
import type { CaseKey } from "../types";

const CASES: CaseKey[] = ["nom", "gen", "dat", "acc", "inst", "loc", "voc"];

export default function Rules() {
  return (
    <div className="rules-page">
      <h1>Grammar rules</h1>

      <section>
        <h2>Cases – English and Polish</h2>
        <p>
          Polish has seven cases. The case is often triggered by a preposition
          or by the verb. Names in Polish (used in grammar books) are given in
          parentheses.
        </p>
        <table className="rules-table">
          <thead>
            <tr>
              <th>English</th>
              <th>Polish (Polski)</th>
            </tr>
          </thead>
          <tbody>
            {CASES.map((c) => (
              <tr key={c}>
<td>{CASE_NAMES[c]}</td>
                <td>{CASE_NAMES_PL[c]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Consonant types (Spółgłoski)</h2>
        <p>
          Endings and vowel shifts depend on whether the stem ends in a{" "}
          <strong>hard</strong>, <strong>soft</strong>, or{" "}
          <strong>softened (historical) consonant</strong>. This affects -e vs -y,
          -u vs -a, and consonant alternations.
        </p>

        <h3>Hard consonants – Twarde (spółgłoski twarde)</h3>
        <p>
          These do not soften before <strong>-e</strong> or <strong>-i</strong>.
          Typical hard consonants:
        </p>
        <ul>
          <li>
            <strong>p, b, f, w, m, t, d, s, z, n, r, ł, k, g, ch</strong>
          </li>
          <li>Examples: <em>dom</em>, <em>stół</em>, <em>rok</em>, <em>las</em></li>
        </ul>
        <p>
          After hard consonants you often see endings like <strong>-y</strong> (not -i),
          <strong>-u</strong> in locative (dom → w dom<strong>u</strong>), and
          <strong>-e</strong> in locative only after certain consonants (stół → na stole).
        </p>

        <h3>Soft consonants – Miękkie (spółgłoski miękkie)</h3>
        <p>
          These are already “soft” or palatalized. They take <strong>-i</strong> or
          <strong>-e</strong> where hard consonants take -y.
        </p>
        <ul>
          <li>
            <strong>ć, dź, ś, ź, ń, j</strong>, and sometimes <strong>l</strong>,{" "}
            <strong>rz</strong>
          </li>
          <li>Examples: <em>noc</em> (noć-), <em>koń</em> (kon’-), <em>ulica</em></li>
        </ul>
        <p>
          After soft (and historically soft) stems: genitive <strong>-i/-y</strong> (noc
          → noc<strong>y</strong>), locative <strong>-e</strong> or <strong>-i</strong>,
          and nominative plural often <strong>-e</strong> (konie) or <strong>-i</strong>.
        </p>

        <h3>Softened hard – Zmiękczone (spółgłoski zmiękczone)</h3>
        <p>
          Some consonants are “hard” in spelling but <strong>soften before -e/-i</strong> or
          in certain forms. The stem then shows an <strong>alternation (oboczność)</strong>:
        </p>
        <ul>
          <li>
            <strong>k → c</strong> (człowiek → człowiecze; rok → roc<strong>ie</strong> in
            locative is “roku” – so k stays in some words)
          </li>
          <li>
            <strong>g → dz</strong> (Bóg → Boże; dług → dłuże)
          </li>
          <li>
            <strong>ch → sz</strong> (duch → dusze; mnich → mnisi)
          </li>
          <li>
            <strong>r → rz</strong> (alternation in some stems)
          </li>
          <li>
            <strong>ł → l</strong> (był → byli in plural; szkoła → szkoło in vocative)
          </li>
          <li>
            <strong>n → ń</strong> (before -i/-e in some forms)
          </li>
        </ul>
        <p>
          So the “rule” is: before endings with <strong>-e</strong> or <strong>-i</strong>,
          a hard consonant may <strong>shift</strong> to its soft counterpart (k→c, g→dz,
          ch→sz, etc.). That’s why you see different stem shapes in different cases.
        </p>
      </section>

      <section>
        <h2>Typical vowel and stem shifts</h2>
        <p>
          Some nouns change the stem vowel or the whole stem in certain cases (especially
          plural or locative). These are common exceptions to learn by heart.
        </p>
        <ul>
          <li>
            <strong>pies → psa</strong> (gen/acc singular), <strong>psy</strong> (nom/acc
            plural) – vowel change and consonant in plural
          </li>
          <li>
            <strong>rok → roku</strong> (gen/loc), <strong>lata, lat</strong> (plural) –
            suppletion (different root in plural)
          </li>
          <li>
            <strong>dzień → dnia, dni</strong> – stem dzień/dni/dniu
          </li>
          <li>
            <strong>brat → bracia, braci, braćmi</strong> – irregular plural stem
          </li>
          <li>
            <strong>człowiek → człowieka</strong> (gen/acc), <strong>ludzie, ludzi</strong>{" "}
            (plural) – suppletion
          </li>
          <li>
            <strong>dziecko → dzieci</strong> (plural) – same form for nom/acc/gen
          </li>
          <li>
            <strong>oko → oka</strong> (gen), <strong>oczy, oczu, oczyma/oczami</strong>{" "}
            (plural) – irregular plural
          </li>
          <li>
            <strong>ucho → ucha</strong> (gen), <strong>uszy, uszu</strong> (plural)
          </li>
          <li>
            <strong>ręka → ręce</strong> (dat/loc/nom pl), <strong>rąk</strong> (gen
            plural) – vowel ę→ą in gen pl
          </li>
        </ul>
      </section>

      <section>
        <h2>Quick case triggers</h2>
        <ul>
          <li>
            <strong>Genitive (Dopełniacz):</strong> nie ma / Nie mam…, brak, słuchać,
            potrzebować, szukać; prepositions bez, do, od, z (from), u (at someone’s),
            podczas, wśród, obok
          </li>
          <li>
            <strong>Dative (Celownik):</strong> dziękować, pomagać, dać/dawać, wierzyć;
            prepositions dzięki, przeciw, wbrew
          </li>
          <li>
            <strong>Accusative (Biernik):</strong> direct object (widzieć, znać, kochać,
            lubić, czytać, mieć); direction with na, w, nad (na ulicę, w las)
          </li>
          <li>
            <strong>Instrumental (Narzędnik):</strong> z (with), nad, pod, przed, za,
            między; być + zawód/tożsamość (Jestem nauczycielem)
          </li>
          <li>
            <strong>Locative (Miejscownik):</strong> w, na, o (about), po, przy (only
            with location, not direction)
          </li>
          <li>
            <strong>Vocative (Wołacz):</strong> direct address (Mamo! Panie!)
          </li>
        </ul>
      </section>
    </div>
  );
}
