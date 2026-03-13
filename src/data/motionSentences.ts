export type MotionContext =
  | "habitual"       // repeated/regular action (codziennie, zawsze, często)
  | "in_progress"    // happening right now, single direction (teraz, właśnie)
  | "completed"      // past completed action (wczoraj poszedłem)
  | "future_plan";   // future one-time plan (jutro pójdę)

export type MotionTransport = "foot" | "vehicle";

export interface MotionSentence {
  id: string;
  template: string;
  expected: string;
  alternates?: string[];
  context: MotionContext;
  transport: MotionTransport;
  tense: "present" | "past" | "future";
  hint: string;
}

const B = "_____";

/**
 * Motion verb overview:
 *
 * HABITUAL / REPEATED:
 *   chodzić (foot)  / jeździć (vehicle)  — imperfective indeterminate
 *   "Codziennie chodzę do szkoły." / "Zawsze jeżdżę autobusem."
 *
 * RIGHT NOW / ONE DIRECTION:
 *   iść (foot)  / jechać (vehicle)  — imperfective determinate
 *   "Teraz idę do sklepu." / "Właśnie jadę do pracy."
 *
 * COMPLETED or FUTURE PLAN (one-time):
 *   pójść (foot)  / pojechać (vehicle)  — perfective
 *   "Wczoraj poszedłem do kina." / "Jutro pojadę do Krakowa."
 */
export const motionSentences: MotionSentence[] = [

  // =========================================================================
  // PRESENT TENSE — habitual (chodzić / jeździć)
  // =========================================================================
  { id: "m1", template: `Codziennie ${B} do szkoły pieszo.`, expected: "chodzę", context: "habitual", transport: "foot", tense: "present", hint: "'Codziennie' (every day) = habitual. On foot → chodzić. Ja → chodzę." },
  { id: "m2", template: `Moja siostra ${B} na basen co tydzień.`, expected: "chodzi", context: "habitual", transport: "foot", tense: "present", hint: "'Co tydzień' (every week) = habitual. Ona → chodzi." },
  { id: "m3", template: `Zawsze ${B} do pracy autobusem.`, expected: "jeżdżę", context: "habitual", transport: "vehicle", tense: "present", hint: "'Zawsze' (always) = habitual. 'Autobusem' = by bus → jeździć. Ja → jeżdżę." },
  { id: "m4", template: `Czy często ${B} do kina?`, expected: "chodzisz", context: "habitual", transport: "foot", tense: "present", hint: "'Często' (often) = habitual. Ty → chodzisz." },
  { id: "m5", template: `Moi rodzice ${B} do kościoła w niedzielę.`, expected: "chodzą", context: "habitual", transport: "foot", tense: "present", hint: "'W niedzielę' (on Sundays) = habitual. Oni → chodzą." },
  { id: "m6", template: `Co lato ${B} nad morze samochodem.`, expected: "jeździmy", context: "habitual", transport: "vehicle", tense: "present", hint: "'Co lato' (every summer) = habitual. 'Samochodem' = by car → jeździć. My → jeździmy." },
  { id: "m7", template: `On nigdy nie ${B} tramwajem.`, expected: "jeździ", context: "habitual", transport: "vehicle", tense: "present", hint: "'Nigdy nie' (never) = habitual. 'Tramwajem' = by tram → jeździć. On → jeździ." },
  { id: "m8", template: `Dzieci ${B} do szkoły pieszo.`, expected: "chodzą", context: "habitual", transport: "foot", tense: "present", hint: "General habit. On foot → chodzić. Dzieci (they) → chodzą." },
  { id: "m9", template: `Zwykle ${B} na zakupy w sobotę.`, expected: "chodzę", context: "habitual", transport: "foot", tense: "present", hint: "'Zwykle' (usually) + 'w sobotę' = habitual. Ja → chodzę." },
  { id: "m10", template: `Czy ${B} do pracy rowerem?`, expected: "jeździsz", context: "habitual", transport: "vehicle", tense: "present", hint: "General question about habit. 'Rowerem' = by bike → jeździć. Ty → jeździsz." },

  // =========================================================================
  // PRESENT TENSE — in progress / right now (iść / jechać)
  // =========================================================================
  { id: "m11", template: `Teraz ${B} do sklepu.`, expected: "idę", context: "in_progress", transport: "foot", tense: "present", hint: "'Teraz' (right now) = in progress, single direction. On foot → iść. Ja → idę." },
  { id: "m12", template: `Dokąd ${B}?`, expected: "idziesz", context: "in_progress", transport: "foot", tense: "present", hint: "'Dokąd?' (where to?) implies right now, one direction. On foot → iść. Ty → idziesz." },
  { id: "m13", template: `Właśnie ${B} do pracy.`, expected: "jadę", context: "in_progress", transport: "vehicle", tense: "present", hint: "'Właśnie' (just now) = in progress. Implies distance/vehicle → jechać. Ja → jadę." },
  { id: "m14", template: `Spójrz, Marek ${B} ulicą!`, expected: "idzie", context: "in_progress", transport: "foot", tense: "present", hint: "'Spójrz' (look) = happening right now. Walking down the street → iść. On → idzie." },
  { id: "m15", template: `Pociąg ${B} do Krakowa.`, expected: "jedzie", context: "in_progress", transport: "vehicle", tense: "present", hint: "Single journey in progress. Train = vehicle → jechać. Pociąg (on) → jedzie." },
  { id: "m16", template: `Autobus ${B} bardzo wolno.`, expected: "jedzie", context: "in_progress", transport: "vehicle", tense: "present", hint: "Happening right now. Vehicle → jechać. Autobus (on) → jedzie." },
  { id: "m17", template: `Gdzie ${B}? Poczekaj na mnie!`, expected: "idziesz", context: "in_progress", transport: "foot", tense: "present", hint: "Asking about movement right now. On foot → iść. Ty → idziesz." },
  { id: "m18", template: `${B} na przystanek. Zaraz będzie autobus.`, expected: "idę", context: "in_progress", transport: "foot", tense: "present", hint: "Going to the stop right now (on foot). Iść. Ja → idę." },
  { id: "m19", template: `Widzę, że oni ${B} w naszą stronę.`, expected: "idą", context: "in_progress", transport: "foot", tense: "present", hint: "Observed right now. On foot → iść. Oni → idą." },
  { id: "m20", template: `Taksówka ${B} po ciebie.`, expected: "jedzie", context: "in_progress", transport: "vehicle", tense: "present", hint: "Taxi is on its way (in progress). Vehicle → jechać. Taksówka (ona) → jedzie." },

  // =========================================================================
  // PAST TENSE — habitual in the past (chodzić / jeździć)
  // =========================================================================
  { id: "m21", template: `W dzieciństwie ${B} do szkoły pieszo.`, expected: "chodziłem", alternates: ["chodziłam"], context: "habitual", transport: "foot", tense: "past", hint: "'W dzieciństwie' (in childhood) = past habitual. On foot → chodzić (past). Ja (m) → chodziłem, (f) → chodziłam." },
  { id: "m22", template: `Kiedyś często ${B} nad morze.`, expected: "jeździliśmy", alternates: ["jeździłyśmy"], context: "habitual", transport: "vehicle", tense: "past", hint: "'Kiedyś często' (we used to often) = past habitual. Distance → jeździć. My → jeździliśmy." },
  { id: "m23", template: `Babcia zawsze ${B} na targ pieszo.`, expected: "chodziła", context: "habitual", transport: "foot", tense: "past", hint: "'Zawsze' = habitual (in the past). On foot → chodzić (past). Babcia (ona) → chodziła." },
  { id: "m24", template: `Jako student, ${B} na wykłady rowerem.`, expected: "jeździłem", alternates: ["jeździłam"], context: "habitual", transport: "vehicle", tense: "past", hint: "'Jako student' = past habitual period. Bike = vehicle → jeździć (past). Ja → jeździłem/jeździłam." },
  { id: "m25", template: `Dzieci ${B} do parku każdego dnia.`, expected: "chodziły", context: "habitual", transport: "foot", tense: "past", hint: "'Każdego dnia' (every day) = past habitual. On foot → chodzić (past). Dzieci (one) → chodziły." },

  // =========================================================================
  // PAST TENSE — in progress at that moment (iść / jechać)
  // =========================================================================
  { id: "m26", template: `Kiedy ${B} do domu, zaczął padać deszcz.`, expected: "szedłem", alternates: ["szłam"], context: "in_progress", transport: "foot", tense: "past", hint: "'Kiedy…' (when I was going) = past in progress, interrupted. On foot → iść (past). Ja (m) → szedłem, (f) → szłam." },
  { id: "m27", template: `Spotkałem ją, kiedy ${B} do pracy.`, expected: "szedłem", alternates: ["szłam"], context: "in_progress", transport: "foot", tense: "past", hint: "'Kiedy…' = past in progress (background action). On foot → iść (past). Ja (m) → szedłem." },
  { id: "m28", template: `Anna ${B} ulicą i rozmawiała przez telefon.`, expected: "szła", context: "in_progress", transport: "foot", tense: "past", hint: "Two simultaneous past actions → imperfective (iść). Ona → szła." },
  { id: "m29", template: `Kiedy ${B} autobusem, zobaczyłem wypadek.`, expected: "jechałem", alternates: ["jechałam"], context: "in_progress", transport: "vehicle", tense: "past", hint: "'Kiedy…' = past in progress. Vehicle → jechać (past). Ja (m) → jechałem." },
  { id: "m30", template: `Oni ${B} pociągiem, kiedy się poznali.`, expected: "jechali", context: "in_progress", transport: "vehicle", tense: "past", hint: "Background past action. Vehicle → jechać (past). Oni → jechali." },

  // =========================================================================
  // PAST TENSE — completed (pójść / pojechać)
  // =========================================================================
  { id: "m31", template: `Wczoraj ${B} do kina.`, expected: "poszedłem", alternates: ["poszłam"], context: "completed", transport: "foot", tense: "past", hint: "'Wczoraj' (yesterday) = completed one-time action. Nearby → pójść (past). Ja (m) → poszedłem, (f) → poszłam." },
  { id: "m32", template: `W zeszłym tygodniu ${B} do Krakowa.`, expected: "pojechałem", alternates: ["pojechałam", "pojechaliśmy", "pojechałyśmy"], context: "completed", transport: "vehicle", tense: "past", hint: "'W zeszłym tygodniu' = completed. To a city (far) → pojechać. Ja → pojechałem/pojechałam." },
  { id: "m33", template: `Marek ${B} do lekarza rano.`, expected: "poszedł", context: "completed", transport: "foot", tense: "past", hint: "Completed one-time action. Nearby → pójść. On → poszedł." },
  { id: "m34", template: `Wczoraj wieczorem ona ${B} do restauracji.`, expected: "poszła", context: "completed", transport: "foot", tense: "past", hint: "'Wczoraj wieczorem' = completed. Nearby → pójść. Ona → poszła." },
  { id: "m35", template: `W zeszłym roku ${B} do Włoch.`, expected: "pojechaliśmy", alternates: ["pojechałyśmy", "pojechałem", "pojechałam"], context: "completed", transport: "vehicle", tense: "past", hint: "'W zeszłym roku' = completed. Far (to Italy) → pojechać. My → pojechaliśmy." },
  { id: "m36", template: `Dzieci ${B} do parku po obiedzie.`, expected: "poszły", context: "completed", transport: "foot", tense: "past", hint: "Completed. Nearby → pójść. Dzieci (one) → poszły." },
  { id: "m37", template: `Ojciec ${B} do biura samochodem.`, expected: "pojechał", context: "completed", transport: "vehicle", tense: "past", hint: "Completed. 'Samochodem' = by car → pojechać. On → pojechał." },

  // =========================================================================
  // FUTURE TENSE — plan (pójść / pojechać)
  // =========================================================================
  { id: "m38", template: `Jutro ${B} do lekarza.`, expected: "pójdę", context: "future_plan", transport: "foot", tense: "future", hint: "'Jutro' (tomorrow) = future plan. Nearby → pójść (future). Ja → pójdę." },
  { id: "m39", template: `W przyszłym tygodniu ${B} do Paryża.`, expected: "pojadę", alternates: ["pojedziemy"], context: "future_plan", transport: "vehicle", tense: "future", hint: "'W przyszłym tygodniu' = future plan. Far away → pojechać. Ja → pojadę." },
  { id: "m40", template: `Czy ${B} ze mną do kina?`, expected: "pójdziesz", context: "future_plan", transport: "foot", tense: "future", hint: "Future invitation. Nearby → pójść. Ty → pójdziesz." },
  { id: "m41", template: `W sobotę ${B} na zakupy.`, expected: "pójdę", alternates: ["pójdziemy"], context: "future_plan", transport: "foot", tense: "future", hint: "'W sobotę' = future plan. Nearby → pójść. Ja → pójdę." },
  { id: "m42", template: `Latem ${B} do Grecji.`, expected: "pojedziemy", alternates: ["pojadę"], context: "future_plan", transport: "vehicle", tense: "future", hint: "'Latem' (in summer) = future plan. Far → pojechać. My → pojedziemy." },
  { id: "m43", template: `Kiedy ${B} do dentysty?`, expected: "pójdziesz", context: "future_plan", transport: "foot", tense: "future", hint: "Future question. Nearby → pójść. Ty → pójdziesz." },
  { id: "m44", template: `Za miesiąc ${B} do Berlina pociągiem.`, expected: "pojadę", alternates: ["pojedziemy"], context: "future_plan", transport: "vehicle", tense: "future", hint: "'Za miesiąc' = future. 'Pociągiem' = train → pojechać. Ja → pojadę." },

  // =========================================================================
  // TRICKY CONTRASTS — sentences where context is the key differentiator
  // =========================================================================
  { id: "m45", template: `Codziennie ${B} do szkoły autobusem, ale dzisiaj ${B} pieszo.`, expected: "jeżdżę, idę", alternates: ["jeżdżę idę", "jezdze ide"], context: "habitual", transport: "foot", tense: "present", hint: "First blank: 'codziennie' = habitual + bus → jeżdżę. Second blank: 'dzisiaj' = right now + on foot → idę. Two different verbs in one sentence!" },
  { id: "m46", template: `Regularnie ${B} na siłownię.`, expected: "chodzę", context: "habitual", transport: "foot", tense: "present", hint: "'Regularnie' = habitual/repeated. On foot → chodzić. Ja → chodzę." },
  { id: "m47", template: `Przepraszam, muszę już ${B}.`, expected: "iść", context: "in_progress", transport: "foot", tense: "present", hint: "'Muszę już iść' = I must go now (single action, about to start). Infinitive form: iść." },
  { id: "m48", template: `Czy możemy ${B} nad jezioro w weekend?`, expected: "pojechać", context: "future_plan", transport: "vehicle", tense: "future", hint: "Future suggestion. To a lake (far) → pojechać. Infinitive after 'możemy'." },
  { id: "m49", template: `Muszę ${B} do sklepu po chleb.`, expected: "iść", alternates: ["pójść"], context: "in_progress", transport: "foot", tense: "present", hint: "'Muszę' + infinitive = about to go. Nearby on foot → iść or pójść." },
  { id: "m50", template: `Co weekend ${B} w góry.`, expected: "jeździmy", context: "habitual", transport: "vehicle", tense: "present", hint: "'Co weekend' = habitual. Mountains (far) → jeździć. My → jeździmy." },
];
