export type ImperativePerson = "ty" | "my" | "wy";

export interface ImperativeSentence {
  id: string;
  verbId: string;
  person: ImperativePerson;
  template: string;
  hint: string;
}

const B = "_____";

export const imperativeSentences: ImperativeSentence[] = [
  // =============================================
  // -am, -asz verbs → imperative: stem + -j
  // =============================================

  // czytać (czytam, czytasz)
  { id: "imp1", verbId: "czytac", person: "ty", template: `${B} tę książkę!`, hint: "-am, -asz verb: drop -m, add -j → czytaj." },
  { id: "imp2", verbId: "czytac", person: "my", template: `${B} razem!`, hint: "-am, -asz verb: stem + -jmy → czytajmy." },
  { id: "imp3", verbId: "czytac", person: "wy", template: `${B} głośno!`, hint: "-am, -asz verb: stem + -jcie → czytajcie." },

  // słuchać (słucham, słuchasz)
  { id: "imp4", verbId: "sluchac", person: "ty", template: `${B} uważnie!`, hint: "-am, -asz verb: słucham → słuchaj." },
  { id: "imp5", verbId: "sluchac", person: "my", template: `${B} muzyki!`, hint: "-am, -asz verb: stem + -jmy → słuchajmy." },
  { id: "imp6", verbId: "sluchac", person: "wy", template: `${B} nauczyciela!`, hint: "-am, -asz verb: stem + -jcie → słuchajcie." },

  // czekać (czekam, czekasz)
  { id: "imp7", verbId: "czekac", person: "ty", template: `${B} na mnie!`, hint: "-am, -asz verb: czekam → czekaj." },
  { id: "imp8", verbId: "czekac", person: "wy", template: `${B} tutaj!`, hint: "-am, -asz verb: stem + -jcie → czekajcie." },

  // dać (dam, dasz)
  { id: "imp9", verbId: "dac", person: "ty", template: `${B} mi to!`, hint: "-am, -asz verb: dam → daj." },
  { id: "imp10", verbId: "dac", person: "wy", template: `${B} mu szansę!`, hint: "-am, -asz verb: stem + -jcie → dajcie." },

  // poczekać (poczekam, poczekasz)
  { id: "imp20", verbId: "poczekac", person: "ty", template: `${B} chwilę!`, hint: "-am, -asz verb: poczekam → poczekaj." },
  { id: "imp21", verbId: "poczekac", person: "my", template: `${B} na autobus!`, hint: "-am, -asz verb: stem + -jmy → poczekajmy." },

  // uważać (uważam, uważasz)
  { id: "imp22", verbId: "uwazac", person: "ty", template: `${B}! Samochód jedzie!`, hint: "-am, -asz verb: uważam → uważaj." },
  { id: "imp23", verbId: "uwazac", person: "wy", template: `${B} na siebie!`, hint: "-am, -asz verb: stem + -jcie → uważajcie." },

  // =============================================
  // -ę, -esz verbs → imperative: bare stem
  // (from 3rd pers. pl., drop -ą; cluster → -ij)
  // =============================================

  // pisać (piszę, piszesz)
  { id: "imp47", verbId: "pisac", person: "ty", template: `${B} czytelnie!`, hint: "-ę, -esz verb: piszą → pisz- → pisz." },
  { id: "imp48", verbId: "pisac", person: "wy", template: `${B} po polsku!`, hint: "-ę, -esz verb: stem + -cie → piszcie." },

  // napisać (napiszę, napiszesz)
  { id: "imp44", verbId: "napisac", person: "ty", template: `${B} list!`, hint: "-ę, -esz verb: napiszą → napisz- → napisz." },
  { id: "imp45", verbId: "napisac", person: "my", template: `${B} razem e-mail!`, hint: "-ę, -esz verb: stem + -my → napiszmy." },
  { id: "imp46", verbId: "napisac", person: "wy", template: `${B} wypracowanie!`, hint: "-ę, -esz verb: stem + -cie → napiszcie." },

  // kupować (kupuję, kupujesz)
  { id: "imp11", verbId: "kupowac", person: "ty", template: `${B} mleko!`, hint: "-ę, -esz verb: kupują → kupuj- → kupuj." },
  { id: "imp12", verbId: "kupowac", person: "my", template: `${B} prezenty!`, hint: "-ę, -esz verb: stem + -my → kupujmy." },

  // pracować (pracuję, pracujesz)
  { id: "imp13", verbId: "pracowac", person: "ty", template: `${B} ciężko!`, hint: "-ę, -esz verb: pracują → pracuj- → pracuj." },
  { id: "imp14", verbId: "pracowac", person: "wy", template: `${B} w ciszy!`, hint: "-ę, -esz verb: stem + -cie → pracujcie." },

  // spróbować (spróbuję, spróbujesz)
  { id: "imp15", verbId: "sprobowac", person: "ty", template: `${B} tej zupy!`, hint: "-ę, -esz verb: spróbują → spróbuj- → spróbuj." },
  { id: "imp16", verbId: "sprobowac", person: "my", template: `${B} jeszcze raz!`, hint: "-ę, -esz verb: stem + -my → spróbujmy." },
  { id: "imp17", verbId: "sprobowac", person: "wy", template: `${B} tego ciasta!`, hint: "-ę, -esz verb: stem + -cie → spróbujcie." },

  // pokazać (pokażę, pokażesz)
  { id: "imp18", verbId: "pokazac", person: "ty", template: `${B} mi drogę!`, hint: "-ę, -esz verb: pokażą → pokaż- → pokaż." },
  { id: "imp19", verbId: "pokazac", person: "wy", template: `${B} paszporty!`, hint: "-ę, -esz verb: stem + -cie → pokażcie." },

  // wstać (wstanę, wstaniesz)
  { id: "imp24", verbId: "wstac", person: "ty", template: `${B}! Jest późno!`, hint: "-ę, -esz verb: wstaną → wstań (softening n → ń)." },
  { id: "imp25", verbId: "wstac", person: "wy", template: `${B}! Już pora!`, hint: "-ę, -esz verb: stem + -cie → wstańcie." },

  // zamknąć (zamknę, zamkniesz)
  { id: "imp39", verbId: "zamknac", person: "ty", template: `${B} drzwi!`, hint: "-ę, -esz verb: consonant cluster → add -ij: zamknij." },
  { id: "imp40", verbId: "zamknac", person: "my", template: `${B} okna!`, hint: "-ę, -esz verb: zamknij + -my → zamknijmy." },
  { id: "imp41", verbId: "zamknac", person: "wy", template: `${B} książki!`, hint: "-ę, -esz verb: zamknij + -cie → zamknijcie." },

  // iść (idę, idziesz)
  { id: "imp61", verbId: "isc", person: "ty", template: `${B} do domu!`, hint: "-ę, -esz verb: idą → idź (stem + softening)." },
  { id: "imp62", verbId: "isc", person: "my", template: `${B} na spacer!`, hint: "-ę, -esz verb: idź + -my → idźmy." },
  { id: "imp63", verbId: "isc", person: "wy", template: `${B} spać!`, hint: "-ę, -esz verb: idź + -cie → idźcie." },

  // jechać (jadę, jedziesz)
  { id: "imp64", verbId: "jechac", person: "ty", template: `${B} ostrożnie!`, hint: "-ę, -esz verb: jadą → jedź (stem alternation d→dź)." },
  { id: "imp65", verbId: "jechac", person: "my", template: `${B} nad morze!`, hint: "-ę, -esz verb: jedź + -my → jedźmy." },
  { id: "imp66", verbId: "jechac", person: "wy", template: `${B} szybciej!`, hint: "-ę, -esz verb: jedź + -cie → jedźcie." },

  // pić (piję, pijesz)
  { id: "imp58", verbId: "pic", person: "ty", template: `${B} wodę!`, hint: "-ę, -esz verb: piją → pij- → pij." },
  { id: "imp59", verbId: "pic", person: "my", template: `${B} herbatę!`, hint: "-ę, -esz verb: pij + -my → pijmy." },
  { id: "imp60", verbId: "pic", person: "wy", template: `${B} dużo wody!`, hint: "-ę, -esz verb: pij + -cie → pijcie." },

  // wziąć (wezmę, weźmiesz)
  { id: "imp67", verbId: "wziac", person: "ty", template: `${B} parasol!`, hint: "-ę, -esz verb: wezmą → weź (irregular stem change)." },
  { id: "imp68", verbId: "wziac", person: "my", template: `${B} taksówkę!`, hint: "-ę, -esz verb: weź + -my → weźmy." },
  { id: "imp69", verbId: "wziac", person: "wy", template: `${B} swoje rzeczy!`, hint: "-ę, -esz verb: weź + -cie → weźcie." },

  // pomóc (pomogę, pomożesz)
  { id: "imp70", verbId: "pomoc", person: "ty", template: `${B} mi!`, hint: "-ę, -esz verb: pomogą → pomóż (o→ó, g→ż)." },
  { id: "imp71", verbId: "pomoc", person: "my", template: `${B} sąsiadowi!`, hint: "-ę, -esz verb: pomóż + -my → pomóżmy." },
  { id: "imp72", verbId: "pomoc", person: "wy", template: `${B} mu!`, hint: "-ę, -esz verb: pomóż + -cie → pomóżcie." },

  // przyjść (przyjdę, przyjdziesz)
  { id: "imp73", verbId: "przyjsc", person: "ty", template: `${B} jutro!`, hint: "-ę, -esz verb: przyjdą → przyjdź." },
  { id: "imp74", verbId: "przyjsc", person: "my", template: `${B} wcześniej!`, hint: "-ę, -esz verb: przyjdź + -my → przyjdźmy." },
  { id: "imp75", verbId: "przyjsc", person: "wy", template: `${B} na imprezę!`, hint: "-ę, -esz verb: przyjdź + -cie → przyjdźcie." },

  // usiąść (usiądę, usiądziesz)
  { id: "imp79", verbId: "usiasc", person: "ty", template: `${B} proszę!`, hint: "-ę, -esz verb: usiądą → usiądź." },
  { id: "imp80", verbId: "usiasc", person: "my", template: `${B} przy stole!`, hint: "-ę, -esz verb: usiądź + -my → usiądźmy." },
  { id: "imp81", verbId: "usiasc", person: "wy", template: `${B} wygodnie!`, hint: "-ę, -esz verb: usiądź + -cie → usiądźcie." },

  // =============================================
  // -ę, -isz/-ysz verbs → imperative: drop -isz/-ysz
  // =============================================

  // mówić (mówię, mówisz)
  { id: "imp26", verbId: "mowic", person: "ty", template: `${B} po polsku!`, hint: "-ę, -isz verb: mówisz → drop -isz → mów." },
  { id: "imp27", verbId: "mowic", person: "my", template: `${B} ciszej!`, hint: "-ę, -isz verb: mów + -my → mówmy." },
  { id: "imp28", verbId: "mowic", person: "wy", template: `${B} prawdę!`, hint: "-ę, -isz verb: mów + -cie → mówcie." },

  // robić (robię, robisz)
  { id: "imp29", verbId: "robic", person: "ty", template: `${B} to teraz!`, hint: "-ę, -isz verb: robisz → drop -isz → rób (note o→ó)." },
  { id: "imp30", verbId: "robic", person: "my", template: `${B} porządek!`, hint: "-ę, -isz verb: rób + -my → róbmy." },
  { id: "imp31", verbId: "robic", person: "wy", template: `${B} zadania!`, hint: "-ę, -isz verb: rób + -cie → róbcie." },

  // zrobić (zrobię, zrobisz)
  { id: "imp32", verbId: "zrobic", person: "ty", template: `${B} mi herbatę!`, hint: "-ę, -isz verb: zrobisz → drop -isz → zrób." },
  { id: "imp33", verbId: "zrobic", person: "wy", template: `${B} to szybko!`, hint: "-ę, -isz verb: zrób + -cie → zróbcie." },

  // kupić (kupię, kupisz)
  { id: "imp34", verbId: "kupic", person: "ty", template: `${B} chleb!`, hint: "-ę, -isz verb: kupisz → drop -isz → kup." },
  { id: "imp35", verbId: "kupic", person: "my", template: `${B} kwiaty!`, hint: "-ę, -isz verb: kup + -my → kupmy." },
  { id: "imp36", verbId: "kupic", person: "wy", template: `${B} bilety!`, hint: "-ę, -isz verb: kup + -cie → kupcie." },

  // otworzyć (otworzę, otworzysz)
  { id: "imp37", verbId: "otworzyc", person: "ty", template: `${B} okno!`, hint: "-ę, -ysz verb: otworzysz → drop -ysz → otwórz (o→ó)." },
  { id: "imp38", verbId: "otworzyc", person: "wy", template: `${B} drzwi!`, hint: "-ę, -ysz verb: otwórz + -cie → otwórzcie." },

  // zadzwonić (zadzwonię, zadzwonisz)
  { id: "imp42", verbId: "zadzwonic", person: "ty", template: `${B} do mamy!`, hint: "-ę, -isz verb: zadzwonisz → drop -isz → zadzwoń (n→ń)." },
  { id: "imp43", verbId: "zadzwonic", person: "wy", template: `${B} po taksówkę!`, hint: "-ę, -isz verb: zadzwoń + -cie → zadzwońcie." },

  // patrzeć (patrzę, patrzysz)
  { id: "imp49", verbId: "patrzec", person: "ty", template: `${B}! Jaki piękny widok!`, hint: "-ę, -ysz verb: patrzysz → drop -ysz → patrz." },
  { id: "imp50", verbId: "patrzec", person: "my", template: `${B} na mapę!`, hint: "-ę, -ysz verb: patrz + -my → patrzmy." },
  { id: "imp51", verbId: "patrzec", person: "wy", template: `${B} na tablicę!`, hint: "-ę, -ysz verb: patrz + -cie → patrzcie." },

  // =============================================
  // -em, -esz verbs → imperative: stem from present
  // =============================================

  // jeść (jem, jesz)
  { id: "imp55", verbId: "jesc", person: "ty", template: `${B} śniadanie!`, hint: "-em, -esz verb: jedzą → jedz- → jedz." },
  { id: "imp56", verbId: "jesc", person: "my", template: `${B} obiad!`, hint: "-em, -esz verb: jedz + -my → jedzmy." },
  { id: "imp57", verbId: "jesc", person: "wy", template: `${B} więcej warzyw!`, hint: "-em, -esz verb: jedz + -cie → jedzcie." },

  // powiedzieć (powiem, powiesz)
  { id: "imp76", verbId: "powiedziec", person: "ty", template: `${B} prawdę!`, hint: "-em, -esz verb: powiedzą → powiedz- → powiedz." },
  { id: "imp77", verbId: "powiedziec", person: "my", template: `${B} mu o tym!`, hint: "-em, -esz verb: powiedz + -my → powiedzmy." },
  { id: "imp78", verbId: "powiedziec", person: "wy", template: `${B} coś!`, hint: "-em, -esz verb: powiedz + -cie → powiedzcie." },

  // =============================================
  // Irregular: być (jestem, jesteś) → bądź
  // =============================================
  { id: "imp52", verbId: "byc", person: "ty", template: `${B} cierpliwy!`, hint: "Irregular: być → bądź (ty). No pattern — memorize it." },
  { id: "imp53", verbId: "byc", person: "my", template: `${B} odważni!`, hint: "Irregular: być → bądźmy (my)." },
  { id: "imp54", verbId: "byc", person: "wy", template: `${B} gotowi!`, hint: "Irregular: być → bądźcie (wy)." },
];
