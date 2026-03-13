/**
 * Polish conjugation types (based on present tense endings):
 *
 *  -am, -asz        czytam/czytasz, słucham/słuchasz, dam/dasz
 *  -ę, -esz         piszę/piszesz, kupuję/kupujesz, jadę/jedziesz
 *  -ę, -isz/-ysz    mówię/mówisz, robię/robisz, patrzę/patrzysz
 *  -em, -esz        jem/jesz, powiem/powiesz
 *  irregular         jestem/jesteś (być)
 */
export type ConjugationType =
  | "-am, -asz"
  | "-ę, -esz"
  | "-ę, -isz/-ysz"
  | "-em, -esz"
  | "irregular";

export interface ImperativeVerb {
  id: string;
  infinitive: string;
  english: string;
  conjugation: ConjugationType;
  /** 1st & 2nd person singular present for display, e.g. "czytam, czytasz" */
  presentForms: string;
  imperative: {
    ty: string;
    my: string;
    wy: string;
  };
}

export const imperativeVerbs: ImperativeVerb[] = [
  // === -am, -asz (Conjugation III) ===
  // Imperative rule: stem + -j (ty), -jmy (my), -jcie (wy)
  { id: "czytac", infinitive: "czytać", english: "to read", conjugation: "-am, -asz", presentForms: "czytam, czytasz", imperative: { ty: "czytaj", my: "czytajmy", wy: "czytajcie" } },
  { id: "sluchac", infinitive: "słuchać", english: "to listen", conjugation: "-am, -asz", presentForms: "słucham, słuchasz", imperative: { ty: "słuchaj", my: "słuchajmy", wy: "słuchajcie" } },
  { id: "czekac", infinitive: "czekać", english: "to wait", conjugation: "-am, -asz", presentForms: "czekam, czekasz", imperative: { ty: "czekaj", my: "czekajmy", wy: "czekajcie" } },
  { id: "dac", infinitive: "dać", english: "to give", conjugation: "-am, -asz", presentForms: "dam, dasz", imperative: { ty: "daj", my: "dajmy", wy: "dajcie" } },
  { id: "poczekac", infinitive: "poczekać", english: "to wait (a bit)", conjugation: "-am, -asz", presentForms: "poczekam, poczekasz", imperative: { ty: "poczekaj", my: "poczekajmy", wy: "poczekajcie" } },
  { id: "uwazac", infinitive: "uważać", english: "to be careful / pay attention", conjugation: "-am, -asz", presentForms: "uważam, uważasz", imperative: { ty: "uważaj", my: "uważajmy", wy: "uważajcie" } },

  // === -ę, -esz (Conjugation I) ===
  // Imperative rule: bare stem from 3rd pers. pl. (drop -ą); if stem ends in
  // consonant cluster, sometimes add -ij
  { id: "pisac", infinitive: "pisać", english: "to write", conjugation: "-ę, -esz", presentForms: "piszę, piszesz", imperative: { ty: "pisz", my: "piszmy", wy: "piszcie" } },
  { id: "napisac", infinitive: "napisać", english: "to write (perf.)", conjugation: "-ę, -esz", presentForms: "napiszę, napiszesz", imperative: { ty: "napisz", my: "napiszmy", wy: "napiszcie" } },
  { id: "kupowac", infinitive: "kupować", english: "to buy", conjugation: "-ę, -esz", presentForms: "kupuję, kupujesz", imperative: { ty: "kupuj", my: "kupujmy", wy: "kupujcie" } },
  { id: "pracowac", infinitive: "pracować", english: "to work", conjugation: "-ę, -esz", presentForms: "pracuję, pracujesz", imperative: { ty: "pracuj", my: "pracujmy", wy: "pracujcie" } },
  { id: "sprobowac", infinitive: "spróbować", english: "to try", conjugation: "-ę, -esz", presentForms: "spróbuję, spróbujesz", imperative: { ty: "spróbuj", my: "spróbujmy", wy: "spróbujcie" } },
  { id: "pokazac", infinitive: "pokazać", english: "to show", conjugation: "-ę, -esz", presentForms: "pokażę, pokażesz", imperative: { ty: "pokaż", my: "pokażmy", wy: "pokażcie" } },
  { id: "wstac", infinitive: "wstać", english: "to get up", conjugation: "-ę, -esz", presentForms: "wstanę, wstaniesz", imperative: { ty: "wstań", my: "wstańmy", wy: "wstańcie" } },
  { id: "zamknac", infinitive: "zamknąć", english: "to close", conjugation: "-ę, -esz", presentForms: "zamknę, zamkniesz", imperative: { ty: "zamknij", my: "zamknijmy", wy: "zamknijcie" } },
  { id: "isc", infinitive: "iść", english: "to go (on foot)", conjugation: "-ę, -esz", presentForms: "idę, idziesz", imperative: { ty: "idź", my: "idźmy", wy: "idźcie" } },
  { id: "jechac", infinitive: "jechać", english: "to go (by vehicle)", conjugation: "-ę, -esz", presentForms: "jadę, jedziesz", imperative: { ty: "jedź", my: "jedźmy", wy: "jedźcie" } },
  { id: "pic", infinitive: "pić", english: "to drink", conjugation: "-ę, -esz", presentForms: "piję, pijesz", imperative: { ty: "pij", my: "pijmy", wy: "pijcie" } },
  { id: "wziac", infinitive: "wziąć", english: "to take", conjugation: "-ę, -esz", presentForms: "wezmę, weźmiesz", imperative: { ty: "weź", my: "weźmy", wy: "weźcie" } },
  { id: "pomoc", infinitive: "pomóc", english: "to help", conjugation: "-ę, -esz", presentForms: "pomogę, pomożesz", imperative: { ty: "pomóż", my: "pomóżmy", wy: "pomóżcie" } },
  { id: "przyjsc", infinitive: "przyjść", english: "to come", conjugation: "-ę, -esz", presentForms: "przyjdę, przyjdziesz", imperative: { ty: "przyjdź", my: "przyjdźmy", wy: "przyjdźcie" } },
  { id: "usiasc", infinitive: "usiąść", english: "to sit down", conjugation: "-ę, -esz", presentForms: "usiądę, usiądziesz", imperative: { ty: "usiądź", my: "usiądźmy", wy: "usiądźcie" } },

  // === -ę, -isz/-ysz (Conjugation II) ===
  // Imperative rule: drop the -isz/-ysz ending from 2nd pers. sg. → bare stem
  { id: "mowic", infinitive: "mówić", english: "to speak / say", conjugation: "-ę, -isz/-ysz", presentForms: "mówię, mówisz", imperative: { ty: "mów", my: "mówmy", wy: "mówcie" } },
  { id: "robic", infinitive: "robić", english: "to do / make", conjugation: "-ę, -isz/-ysz", presentForms: "robię, robisz", imperative: { ty: "rób", my: "róbmy", wy: "róbcie" } },
  { id: "zrobic", infinitive: "zrobić", english: "to do / make (perf.)", conjugation: "-ę, -isz/-ysz", presentForms: "zrobię, zrobisz", imperative: { ty: "zrób", my: "zróbmy", wy: "zróbcie" } },
  { id: "kupic", infinitive: "kupić", english: "to buy (perf.)", conjugation: "-ę, -isz/-ysz", presentForms: "kupię, kupisz", imperative: { ty: "kup", my: "kupmy", wy: "kupcie" } },
  { id: "otworzyc", infinitive: "otworzyć", english: "to open", conjugation: "-ę, -isz/-ysz", presentForms: "otworzę, otworzysz", imperative: { ty: "otwórz", my: "otwórzmy", wy: "otwórzcie" } },
  { id: "zadzwonic", infinitive: "zadzwonić", english: "to call (phone)", conjugation: "-ę, -isz/-ysz", presentForms: "zadzwonię, zadzwonisz", imperative: { ty: "zadzwoń", my: "zadzwońmy", wy: "zadzwońcie" } },
  { id: "patrzec", infinitive: "patrzeć", english: "to look", conjugation: "-ę, -isz/-ysz", presentForms: "patrzę, patrzysz", imperative: { ty: "patrz", my: "patrzmy", wy: "patrzcie" } },

  // === -em, -esz (Conjugation IV) ===
  // Imperative rule: bare stem from present
  { id: "jesc", infinitive: "jeść", english: "to eat", conjugation: "-em, -esz", presentForms: "jem, jesz", imperative: { ty: "jedz", my: "jedzmy", wy: "jedzcie" } },
  { id: "powiedziec", infinitive: "powiedzieć", english: "to say / tell", conjugation: "-em, -esz", presentForms: "powiem, powiesz", imperative: { ty: "powiedz", my: "powiedzmy", wy: "powiedzcie" } },

  // === Irregular ===
  { id: "byc", infinitive: "być", english: "to be", conjugation: "irregular", presentForms: "jestem, jesteś", imperative: { ty: "bądź", my: "bądźmy", wy: "bądźcie" } },
];
