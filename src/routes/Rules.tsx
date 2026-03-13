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
        <h2>Spatial prepositions (Przyimki miejsca)</h2>
        <p>
          Polish uses <strong>different prepositions and cases</strong> depending
          on whether you're talking about going <strong>to</strong> a place,
          being <strong>at</strong> a place, or coming <strong>from</strong> a
          place. The same preposition (e.g. <em>na</em>, <em>w</em>,{" "}
          <em>nad</em>) can take different cases for direction vs. location.
        </p>

        <table className="spatial-table">
          <thead>
            <tr>
              <th></th>
              <th>
                Dokąd idziesz?
                <br />
                <span className="spatial-subhead">Where to? (direction)</span>
              </th>
              <th>
                Gdzie jesteś?
                <br />
                <span className="spatial-subhead">Where? (location)</span>
              </th>
              <th>
                Skąd wracasz?
                <br />
                <span className="spatial-subhead">Where from? (origin)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="spatial-icon">🏫</td>
              <td>
                <strong>do</strong> + dopełniacz (gen)
                <br />
                <em>Idę do szkoły</em>
              </td>
              <td>
                <strong>w</strong> + miejscownik (loc)
                <br />
                <em>Jestem w szkole</em>
              </td>
              <td>
                <strong>z / ze</strong> + dopełniacz (gen)
                <br />
                <em>Wracam ze szkoły</em>
              </td>
            </tr>
            <tr>
              <td className="spatial-icon">🏟️</td>
              <td>
                <strong>na</strong> + biernik (acc)
                <br />
                <em>Idę na stadion</em>
              </td>
              <td>
                <strong>na</strong> + miejscownik (loc)
                <br />
                <em>Jestem na stadionie</em>
              </td>
              <td>
                <strong>z / ze</strong> + dopełniacz (gen)
                <br />
                <em>Wracam ze stadionu</em>
              </td>
            </tr>
            <tr>
              <td className="spatial-icon">🎬</td>
              <td>
                <strong>na</strong> + biernik (acc)
                <br />
                <em>Idę na film / koncert / obiad</em>
              </td>
              <td>
                <strong>na</strong> + miejscownik (loc)
                <br />
                <em>Jestem na filmie / koncercie / obiedzie</em>
              </td>
              <td>
                <strong>z</strong> + dopełniacz (gen)
                <br />
                <em>Wracam z filmu / koncertu / obiadu</em>
              </td>
            </tr>
            <tr className="spatial-exception-row">
              <td className="spatial-icon">⚠️</td>
              <td colSpan={3} className="spatial-exceptions">
                <strong>Exceptions (wyjątki):</strong> Many common places don't
                follow the standard pattern. You just have to memorize which
                preposition each place takes.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Exceptions in detail</h3>

        <table className="spatial-table exceptions-detail-table">
          <thead>
            <tr>
              <th>Place</th>
              <th>Dokąd? (to)</th>
              <th>Gdzie? (at)</th>
              <th>Skąd? (from)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>ogród</strong>
                <br />
                garden
              </td>
              <td>
                <em>
                  <strong>do</strong> ogrodu
                </em>{" "}
                (gen)
              </td>
              <td>
                <em>
                  <strong>w</strong> ogrodzie
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> ogrodu
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>park</strong>
                <br />
                park
              </td>
              <td>
                <em>
                  <strong>do</strong> parku
                </em>{" "}
                (gen)
              </td>
              <td>
                <em>
                  <strong>w</strong> parku
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> parku
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>poczta</strong>
                <br />
                post office
              </td>
              <td>
                <em>
                  <strong>na</strong> pocztę
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> poczcie
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> poczty
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>dworzec</strong>
                <br />
                train station
              </td>
              <td>
                <em>
                  <strong>na</strong> dworzec
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> dworcu
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> dworca
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>lotnisko</strong>
                <br />
                airport
              </td>
              <td>
                <em>
                  <strong>na</strong> lotnisko
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> lotnisku
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> lotniska
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>uniwersytet</strong>
                <br />
                university
              </td>
              <td>
                <em>
                  <strong>na</strong> uniwersytet
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> uniwersytecie
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> uniwersytetu
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>basen</strong>
                <br />
                swimming pool
              </td>
              <td>
                <em>
                  <strong>na</strong> basen
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> basenie
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> basenu
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>plaża</strong>
                <br />
                beach
              </td>
              <td>
                <em>
                  <strong>na</strong> plażę
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> plaży
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> plaży
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>wieś</strong>
                <br />
                countryside
              </td>
              <td>
                <em>
                  <strong>na</strong> wieś
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> wsi
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>ze</strong> wsi
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>rynek</strong>
                <br />
                market square
              </td>
              <td>
                <em>
                  <strong>na</strong> rynek
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> rynku
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> rynku
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>policja</strong>
                <br />
                police station
              </td>
              <td>
                <em>
                  <strong>na</strong> policję
                </em>{" "}
                (acc)
              </td>
              <td>
                <em>
                  <strong>na</strong> policji
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> policji
                </em>{" "}
                (gen)
              </td>
            </tr>
            <tr>
              <td>
                <strong>kościół</strong>
                <br />
                church
              </td>
              <td>
                <em>
                  <strong>do</strong> kościoła
                </em>{" "}
                (gen)
              </td>
              <td>
                <em>
                  <strong>w</strong> kościele
                </em>{" "}
                (loc)
              </td>
              <td>
                <em>
                  <strong>z</strong> kościoła
                </em>{" "}
                (gen)
              </td>
            </tr>
          </tbody>
        </table>

        <p className="spatial-tip">
          <strong>Tip:</strong> Open outdoor areas, surfaces, events, and
          institutions often use <strong>na</strong> (poczta, dworzec, lotnisko,
          uniwersytet, basen, plaża, wieś, rynek, policja, stadion, koncert).
          Enclosed buildings and natural spaces usually use{" "}
          <strong>w</strong> / <strong>do</strong> (dom, szkoła, biuro, kościół,
          ogród, park, las).
        </p>

        <h3>People, water, and mountains</h3>
        <table className="spatial-table">
          <thead>
            <tr>
              <th></th>
              <th>
                Dokąd? <span className="spatial-subhead">(to)</span>
              </th>
              <th>
                Gdzie? <span className="spatial-subhead">(at)</span>
              </th>
              <th>
                Skąd? <span className="spatial-subhead">(from)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="spatial-icon">👨‍⚕️</td>
              <td>
                <strong>do</strong> + dopełniacz (gen)
                <br />
                <em>Idę do lekarza</em>
              </td>
              <td>
                <strong>u</strong> + dopełniacz (gen)
                <br />
                <em>Jestem u lekarza</em>
              </td>
              <td>
                <strong>od</strong> + dopełniacz (gen)
                <br />
                <em>Wracam od lekarza</em>
              </td>
            </tr>
            <tr>
              <td className="spatial-icon">🌊</td>
              <td>
                <strong>nad</strong> + biernik (acc)
                <br />
                <em>Jadę nad morze</em>
              </td>
              <td>
                <strong>nad</strong> + narzędnik (inst)
                <br />
                <em>Jestem nad morzem</em>
              </td>
              <td>
                <strong>znad</strong> + dopełniacz (gen)
                <br />
                <em>Wracam znad morza</em>
              </td>
            </tr>
            <tr>
              <td className="spatial-icon">⛰️</td>
              <td>
                <strong>w</strong> + biernik (acc)
                <br />
                <em>Idę w góry</em>
              </td>
              <td>
                <strong>w</strong> + miejscownik (loc)
                <br />
                <em>Jestem w górach</em>
              </td>
              <td>
                <strong>z</strong> + dopełniacz (gen)
                <br />
                <em>Wracam z gór</em>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Key insight: same preposition, different case</h3>
        <ul>
          <li>
            <strong>na</strong> + accusative = <em>direction</em> (going onto/to
            something) — <strong>na</strong> + locative = <em>location</em>{" "}
            (being on/at something)
          </li>
          <li>
            <strong>w</strong> + accusative = <em>direction</em> (going into
            something) — <strong>w</strong> + locative = <em>location</em>{" "}
            (being in something)
          </li>
          <li>
            <strong>nad</strong> + accusative = <em>direction</em> (going
            to/over) — <strong>nad</strong> + instrumental = <em>location</em>{" "}
            (being by/over)
          </li>
        </ul>

        <h3>&quot;From&quot; prepositions</h3>
        <ul>
          <li>
            <strong>z / ze</strong> + genitive = from inside/off (ze szkoły, ze
            stadionu, z filmu)
          </li>
          <li>
            <strong>od</strong> + genitive = from a person (od lekarza, od mamy)
          </li>
          <li>
            <strong>znad</strong> + genitive = from over/by water (znad morza)
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
