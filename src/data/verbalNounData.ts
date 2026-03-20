// ---------------------------------------------------------------------------
// Verbal noun (rzeczownik odczasownikowy) data
// ---------------------------------------------------------------------------

export interface VerbalNounVerb {
  id: string;
  infinitive: string;
  english: string;
  verbalNoun: string;
  rule: string; // e.g. "-ać → -anie"
}

export const verbalNounVerbs: VerbalNounVerb[] = [
  // -ać → -anie
  { id: "czytac", infinitive: "czytać", english: "to read", verbalNoun: "czytanie", rule: "-ać → -anie" },
  { id: "pisac", infinitive: "pisać", english: "to write", verbalNoun: "pisanie", rule: "-ać → -anie" },
  { id: "biegac", infinitive: "biegać", english: "to run", verbalNoun: "bieganie", rule: "-ać → -anie" },
  { id: "plywac", infinitive: "pływać", english: "to swim", verbalNoun: "pływanie", rule: "-ać → -anie" },
  { id: "gotowac", infinitive: "gotować", english: "to cook", verbalNoun: "gotowanie", rule: "-ować → -owanie" },
  { id: "malowac", infinitive: "malować", english: "to paint", verbalNoun: "malowanie", rule: "-ować → -owanie" },
  { id: "spiewac", infinitive: "śpiewać", english: "to sing", verbalNoun: "śpiewanie", rule: "-ać → -anie" },
  { id: "grac", infinitive: "grać", english: "to play", verbalNoun: "granie", rule: "-ać → -anie" },
  { id: "sluchac", infinitive: "słuchać", english: "to listen", verbalNoun: "słuchanie", rule: "-ać → -anie" },
  { id: "ogladac", infinitive: "oglądać", english: "to watch", verbalNoun: "oglądanie", rule: "-ać → -anie" },
  { id: "sprzatac", infinitive: "sprzątać", english: "to clean", verbalNoun: "sprzątanie", rule: "-ać → -anie" },
  { id: "kupowac", infinitive: "kupować", english: "to buy", verbalNoun: "kupowanie", rule: "-ować → -owanie" },
  { id: "podrozowac", infinitive: "podróżować", english: "to travel", verbalNoun: "podróżowanie", rule: "-ować → -owanie" },
  { id: "kochac", infinitive: "kochać", english: "to love", verbalNoun: "kochanie", rule: "-ać → -anie" },
  { id: "spac", infinitive: "spać", english: "to sleep", verbalNoun: "spanie", rule: "-ać → -anie" },
  { id: "zwiedzac", infinitive: "zwiedzać", english: "to sightsee / visit", verbalNoun: "zwiedzanie", rule: "-ać → -anie" },
  { id: "rysowac", infinitive: "rysować", english: "to draw", verbalNoun: "rysowanie", rule: "-ować → -owanie" },
  { id: "prasowac", infinitive: "prasować", english: "to iron", verbalNoun: "prasowanie", rule: "-ować → -owanie" },
  { id: "fotografowac", infinitive: "fotografować", english: "to photograph", verbalNoun: "fotografowanie", rule: "-ować → -owanie" },

  // -ić / -yć → -enie
  { id: "mowic", infinitive: "mówić", english: "to speak", verbalNoun: "mówienie", rule: "-ić → -ienie" },
  { id: "robic", infinitive: "robić", english: "to do / make", verbalNoun: "robienie", rule: "-ić → -ienie" },
  { id: "uczyc_sie", infinitive: "uczyć się", english: "to learn", verbalNoun: "uczenie się", rule: "-yć → -enie" },
  { id: "palic", infinitive: "palić", english: "to smoke", verbalNoun: "palenie", rule: "-ić → -enie" },
  { id: "tanczyc", infinitive: "tańczyć", english: "to dance", verbalNoun: "tańczenie", rule: "-yć → -enie" },
  { id: "chodzic", infinitive: "chodzić", english: "to walk", verbalNoun: "chodzenie", rule: "-ić → -enie" },
  { id: "prosic", infinitive: "prosić", english: "to ask / request", verbalNoun: "proszenie", rule: "-ić → -enie (s→sz)" },
  { id: "nosic", infinitive: "nosić", english: "to carry / wear", verbalNoun: "noszenie", rule: "-ić → -enie (s→sz)" },

  // -eć → -enie
  { id: "widziec", infinitive: "widzieć", english: "to see", verbalNoun: "widzenie", rule: "-eć → -enie" },
  { id: "siedziec", infinitive: "siedzieć", english: "to sit", verbalNoun: "siedzenie", rule: "-eć → -enie" },
  { id: "myslec", infinitive: "myśleć", english: "to think", verbalNoun: "myślenie", rule: "-eć → -enie" },

  // short / -ąć → -cie
  { id: "pic", infinitive: "pić", english: "to drink", verbalNoun: "picie", rule: "-ić (short) → -cie" },
  { id: "myc", infinitive: "myć", english: "to wash", verbalNoun: "mycie", rule: "-yć (short) → -cie" },
  { id: "zyc", infinitive: "żyć", english: "to live", verbalNoun: "życie", rule: "-yć (short) → -cie" },
  { id: "brac", infinitive: "brać", english: "to take", verbalNoun: "branie", rule: "-ać → -anie" },

  // additional verbs for "do + gen" patterns
  { id: "prac", infinitive: "prać", english: "to wash (laundry)", verbalNoun: "pranie", rule: "-ać → -anie" },
  { id: "golic_sie", infinitive: "golić się", english: "to shave", verbalNoun: "golenie się", rule: "-ić → -enie" },
  { id: "piec", infinitive: "piec", english: "to bake", verbalNoun: "pieczenie", rule: "piec → pieczenie" },
  { id: "szyc", infinitive: "szyć", english: "to sew", verbalNoun: "szycie", rule: "-yć (short) → -cie" },
  { id: "zmywac", infinitive: "zmywać", english: "to wash (dishes)", verbalNoun: "zmywanie", rule: "-ać → -anie" },
  { id: "kapac_sie", infinitive: "kąpać się", english: "to bathe", verbalNoun: "kąpanie się", rule: "-ać → -anie" },

  // -ąć → -ęcie (irregular vowel change)
  { id: "wziac", infinitive: "wziąć", english: "to take", verbalNoun: "wzięcie", rule: "-ąć → -ęcie (ą→ę)" },
  { id: "zdjac", infinitive: "zdjąć", english: "to take off / remove", verbalNoun: "zdjęcie", rule: "-ąć → -ęcie (ą→ę)" },
  { id: "przyjac", infinitive: "przyjąć", english: "to accept / receive", verbalNoun: "przyjęcie", rule: "-ąć → -ęcie (ą→ę)" },
  { id: "pojac", infinitive: "pojąć", english: "to grasp / comprehend", verbalNoun: "pojęcie", rule: "-ąć → -ęcie (ą→ę)" },
  { id: "zaczac", infinitive: "zacząć", english: "to begin", verbalNoun: "zaczęcie", rule: "-ąć → -ęcie (ą→ę)" },
  { id: "ciac", infinitive: "ciąć", english: "to cut", verbalNoun: "cięcie", rule: "-ąć → -ęcie (ą→ę)" },

  // common verbal nouns that double as everyday words
  { id: "mieszkac", infinitive: "mieszkać", english: "to live (reside)", verbalNoun: "mieszkanie", rule: "-ać → -anie" },
  { id: "spotkac", infinitive: "spotkać", english: "to meet", verbalNoun: "spotkanie", rule: "-ać → -anie" },
  { id: "pytac", infinitive: "pytać", english: "to ask", verbalNoun: "pytanie", rule: "-ać → -anie" },
  { id: "cwiczic", infinitive: "ćwiczyć", english: "to exercise / practice", verbalNoun: "ćwiczenie", rule: "-yć → -enie" },
  { id: "marzyc", infinitive: "marzyć", english: "to dream", verbalNoun: "marzenie", rule: "-yć → -enie" },
  { id: "znaczyc", infinitive: "znaczyć", english: "to mean", verbalNoun: "znaczenie", rule: "-yć → -enie" },
  { id: "tlumaczyc", infinitive: "tłumaczyć", english: "to translate / explain", verbalNoun: "tłumaczenie", rule: "-yć → -enie" },
  { id: "opowiadac", infinitive: "opowiadać", english: "to tell (a story)", verbalNoun: "opowiadanie", rule: "-ać → -anie" },
  { id: "cierpiec", infinitive: "cierpieć", english: "to suffer", verbalNoun: "cierpienie", rule: "-eć → -enie" },
  { id: "parkowac", infinitive: "parkować", english: "to park", verbalNoun: "parkowanie", rule: "-ować → -owanie" },
  { id: "latac", infinitive: "latać", english: "to fly", verbalNoun: "latanie", rule: "-ać → -anie" },
  { id: "badac", infinitive: "badać", english: "to research / examine", verbalNoun: "badanie", rule: "-ać → -anie" },
  { id: "zachowac", infinitive: "zachować", english: "to behave / preserve", verbalNoun: "zachowanie", rule: "-ować → -owanie" },
  { id: "wozic", infinitive: "wozić", english: "to transport / drive", verbalNoun: "wożenie", rule: "-ić → -enie (z→ż)" },

  // irregular / special
  { id: "jesc", infinitive: "jeść", english: "to eat", verbalNoun: "jedzenie", rule: "jeść → jedzenie (irregular stem)" },
];

const V = "{v}";
const N = "{n}";

export interface VerbalNounSentence {
  id: string;
  verbId: string;
  template: string;           // uses {v} and optionally {n} as placeholders
  english: string;
  expectedVerb: string;       // verbal noun form
  expectedNoun?: string;      // object in correct case (undefined = no noun blank)
  verbAlternates?: string[];
  nounAlternates?: string[];
  originalPhrase: string;
  hint: string;
}

export const verbalNounSentences: VerbalNounSentence[] = [
  // -----------------------------------------------------------------------
  // VERBAL NOUN ONLY (no object to change)
  // -----------------------------------------------------------------------
  { id: "vn1", verbId: "biegac", template: `${V} jest zdrowe.`, english: "Running is healthy.", expectedVerb: "bieganie", originalPhrase: "biegać", hint: "Form the verbal noun: biegać → bieganie (-ać → -anie)." },
  { id: "vn2", verbId: "plywac", template: `Lubię ${V}.`, english: "I like swimming.", expectedVerb: "pływanie", originalPhrase: "pływać", hint: "Form the verbal noun: pływać → pływanie (-ać → -anie)." },
  { id: "vn3", verbId: "gotowac", template: `${V} to moja pasja.`, english: "Cooking is my passion.", expectedVerb: "gotowanie", originalPhrase: "gotować", hint: "Form the verbal noun: gotować → gotowanie (-ować → -owanie)." },
  { id: "vn4", verbId: "tanczyc", template: `${V} sprawia mi radość.`, english: "Dancing brings me joy.", expectedVerb: "tańczenie", originalPhrase: "tańczyć", hint: "Form the verbal noun: tańczyć → tańczenie (-yć → -enie)." },
  { id: "vn5", verbId: "spac", template: `${V} jest ważne dla zdrowia.`, english: "Sleeping is important for health.", expectedVerb: "spanie", originalPhrase: "spać", hint: "Form the verbal noun: spać → spanie (-ać → -anie)." },
  { id: "vn6", verbId: "chodzic", template: `${V} po górach jest wspaniałe.`, english: "Walking in the mountains is wonderful.", expectedVerb: "chodzenie", originalPhrase: "chodzić", hint: "Form the verbal noun: chodzić → chodzenie (-ić → -enie)." },
  { id: "vn7", verbId: "podrozowac", template: `${V} poszerza horyzonty.`, english: "Traveling broadens horizons.", expectedVerb: "podróżowanie", originalPhrase: "podróżować", hint: "Form the verbal noun: podróżować → podróżowanie (-ować → -owanie)." },
  { id: "vn8", verbId: "myslec", template: `${V} pozytywne pomaga w życiu.`, english: "Positive thinking helps in life.", expectedVerb: "myślenie", originalPhrase: "myśleć", hint: "Form the verbal noun: myśleć → myślenie (-eć → -enie)." },
  { id: "vn9", verbId: "palic", template: `${V} szkodzi zdrowiu.`, english: "Smoking is harmful to health.", expectedVerb: "palenie", originalPhrase: "palić", hint: "Form the verbal noun: palić → palenie (-ić → -enie)." },
  { id: "vn10", verbId: "zyc", template: `${V} w mieście jest drogie.`, english: "Living in a city is expensive.", expectedVerb: "życie", originalPhrase: "żyć", hint: "Form the verbal noun: żyć → życie (short verb → -cie)." },
  { id: "vn11", verbId: "rysowac", template: `Lubię ${V}.`, english: "I like drawing.", expectedVerb: "rysowanie", originalPhrase: "rysować", hint: "Form the verbal noun: rysować → rysowanie (-ować → -owanie)." },
  { id: "vn12", verbId: "prasowac", template: `${V} zajmuje mi godzinę.`, english: "Ironing takes me an hour.", expectedVerb: "prasowanie", originalPhrase: "prasować", hint: "Form the verbal noun: prasować → prasowanie (-ować → -owanie)." },
  { id: "vn13", verbId: "sprzatac", template: `${V} zajmuje dużo czasu.`, english: "Cleaning takes a lot of time.", expectedVerb: "sprzątanie", originalPhrase: "sprzątać", hint: "Form the verbal noun: sprzątać → sprzątanie (-ać → -anie)." },
  { id: "vn14", verbId: "mowic", template: `${V} po polsku jest trudne.`, english: "Speaking Polish is difficult.", expectedVerb: "mówienie", originalPhrase: "mówić po polsku", hint: "mówić → mówienie; 'po polsku' is an adverbial phrase, so just the verbal noun." },
  { id: "vn15", verbId: "siedziec", template: `Długie ${V} szkodzi kręgosłupowi.`, english: "Long sitting harms the spine.", expectedVerb: "siedzenie", originalPhrase: "siedzieć", hint: "siedzieć → siedzenie (-eć → -enie)." },
  { id: "vn16", verbId: "widziec", template: `Do ${V}!`, english: "See you! (lit. 'Until seeing!')", expectedVerb: "widzenia", originalPhrase: "widzieć", hint: "widzieć → widzenie; 'Do' requires genitive, so widzenie → widzenia." },

  // -----------------------------------------------------------------------
  // VERBAL NOUN + OBJECT (accusative → genitive)
  // -----------------------------------------------------------------------

  // czytać
  { id: "vn20", verbId: "czytac", template: `Lubię ${V} ${N}.`, english: "I like reading books.", expectedVerb: "czytanie", expectedNoun: "książek", originalPhrase: "czytać książki (acc pl)", hint: "czytać → czytanie; książki (acc pl) → książek (gen pl). Acc → Gen with verbal nouns." },
  { id: "vn21", verbId: "czytac", template: `${V} ${N} jest moim hobby.`, english: "Reading a newspaper is my hobby.", expectedVerb: "czytanie", expectedNoun: "gazety", originalPhrase: "czytać gazetę (acc sg)", hint: "czytać → czytanie; gazetę (acc) → gazety (gen)." },
  { id: "vn22", verbId: "czytac", template: `${V} ${N} rozwija wyobraźnię.`, english: "Reading books develops imagination.", expectedVerb: "czytanie", expectedNoun: "książek", originalPhrase: "czytać książki (acc pl)", hint: "czytać → czytanie; książki (acc pl) → książek (gen pl)." },

  // pisać
  { id: "vn23", verbId: "pisac", template: `${V} ${N} sprawia mi trudność.`, english: "Writing letters is difficult for me.", expectedVerb: "pisanie", expectedNoun: "listów", originalPhrase: "pisać listy (acc pl)", hint: "pisać → pisanie; listy (acc pl) → listów (gen pl)." },
  { id: "vn24", verbId: "pisac", template: `${V} ${N} nudzi mnie.`, english: "Writing essays bores me.", expectedVerb: "pisanie", expectedNoun: "wypracowań", originalPhrase: "pisać wypracowania (acc pl)", hint: "pisać → pisanie; wypracowania (acc pl) → wypracowań (gen pl)." },
  { id: "vn25", verbId: "pisac", template: `${V} ${N} to dobry sposób na relaks.`, english: "Writing a journal is a good way to relax.", expectedVerb: "pisanie", expectedNoun: "dziennika", originalPhrase: "pisać dziennik (acc sg)", hint: "pisać → pisanie; dziennik (acc, inanimate masc) → dziennika (gen)." },

  // pić
  { id: "vn26", verbId: "pic", template: `${V} ${N} jest niezdrowe.`, english: "Drinking cola is unhealthy.", expectedVerb: "picie", expectedNoun: "coli", originalPhrase: "pić colę (acc sg)", hint: "pić → picie (short verb → -cie); colę (acc) → coli (gen)." },
  { id: "vn27", verbId: "pic", template: `${V} ${N} pomaga rano.`, english: "Drinking coffee helps in the morning.", expectedVerb: "picie", expectedNoun: "kawy", originalPhrase: "pić kawę (acc sg)", hint: "pić → picie; kawę (acc) → kawy (gen). Feminine -ę → -y." },
  { id: "vn28", verbId: "pic", template: `${V} ${N} jest ważne w upale.`, english: "Drinking water is important in the heat.", expectedVerb: "picie", expectedNoun: "wody", originalPhrase: "pić wodę (acc sg)", hint: "pić → picie; wodę (acc) → wody (gen). Feminine -ę → -y." },

  // jeść
  { id: "vn29", verbId: "jesc", template: `${V} ${N} tuczy.`, english: "Eating sweets makes you fat.", expectedVerb: "jedzenie", expectedNoun: "słodyczy", originalPhrase: "jeść słodycze (acc pl)", hint: "jeść → jedzenie (irregular stem); słodycze (acc pl) → słodyczy (gen pl)." },
  { id: "vn30", verbId: "jesc", template: `${V} ${N} jest zdrowe.`, english: "Eating vegetables is healthy.", expectedVerb: "jedzenie", expectedNoun: "warzyw", originalPhrase: "jeść warzywa (acc pl)", hint: "jeść → jedzenie; warzywa (acc pl) → warzyw (gen pl)." },
  { id: "vn31", verbId: "jesc", template: `${V} ${N} jest niezdrowe.`, english: "Eating meat is unhealthy.", expectedVerb: "jedzenie", expectedNoun: "mięsa", originalPhrase: "jeść mięso (acc sg)", hint: "jeść → jedzenie; mięso (acc) → mięsa (gen)." },

  // oglądać
  { id: "vn32", verbId: "ogladac", template: `${V} ${N} to strata czasu.`, english: "Watching TV is a waste of time.", expectedVerb: "oglądanie", expectedNoun: "telewizji", originalPhrase: "oglądać telewizję (acc sg)", hint: "oglądać → oglądanie; telewizję (acc) → telewizji (gen)." },
  { id: "vn33", verbId: "ogladac", template: `Lubię ${V} ${N}.`, english: "I like watching films.", expectedVerb: "oglądanie", expectedNoun: "filmów", originalPhrase: "oglądać filmy (acc pl)", hint: "oglądać → oglądanie; filmy (acc pl) → filmów (gen pl)." },

  // słuchać (already genitive — stays)
  { id: "vn34", verbId: "sluchac", template: `${V} ${N} relaksuje.`, english: "Listening to music relaxes.", expectedVerb: "słuchanie", expectedNoun: "muzyki", originalPhrase: "słuchać muzyki (gen — stays!)", hint: "słuchać → słuchanie; słuchać already takes genitive, so muzyki stays." },
  { id: "vn35", verbId: "sluchac", template: `Lubię ${V} ${N}.`, english: "I like listening to podcasts.", expectedVerb: "słuchanie", expectedNoun: "podcastów", originalPhrase: "słuchać podcastów (gen)", hint: "słuchać → słuchanie; słuchać takes genitive, so podcastów stays." },

  // gotować
  { id: "vn36", verbId: "gotowac", template: `${V} ${N} to przyjemność.`, english: "Cooking dinner is a pleasure.", expectedVerb: "gotowanie", expectedNoun: "obiadu", originalPhrase: "gotować obiad (acc sg)", hint: "gotować → gotowanie; obiad (acc, inanimate masc) → obiadu (gen)." },
  { id: "vn37", verbId: "gotowac", template: `${V} ${N} trwa długo.`, english: "Cooking soup takes a long time.", expectedVerb: "gotowanie", expectedNoun: "zupy", originalPhrase: "gotować zupę (acc sg)", hint: "gotować → gotowanie; zupę (acc) → zupy (gen)." },

  // kupować
  { id: "vn38", verbId: "kupowac", template: `${V} ${N} sprawia mi radość.`, english: "Buying presents brings me joy.", expectedVerb: "kupowanie", expectedNoun: "prezentów", originalPhrase: "kupować prezenty (acc pl)", hint: "kupować → kupowanie; prezenty (acc pl) → prezentów (gen pl)." },
  { id: "vn39", verbId: "kupowac", template: `${V} ${N} to strata pieniędzy.`, english: "Buying unnecessary things is a waste of money.", expectedVerb: "kupowanie", expectedNoun: "niepotrzebnych rzeczy", originalPhrase: "kupować niepotrzebne rzeczy (acc pl)", hint: "kupować → kupowanie; rzeczy stays in gen pl (same form)." },

  // mówić + object
  { id: "vn40", verbId: "mowic", template: `${V} ${N} jest ważne.`, english: "Speaking the truth is important.", expectedVerb: "mówienie", expectedNoun: "prawdy", originalPhrase: "mówić prawdę (acc sg)", hint: "mówić → mówienie; prawdę (acc) → prawdy (gen)." },

  // robić
  { id: "vn42", verbId: "robic", template: `${V} ${N} zajmuje dużo czasu.`, english: "Doing homework takes a lot of time.", expectedVerb: "robienie", expectedNoun: "zadań domowych", nounAlternates: ["zadania domowego"], originalPhrase: "robić zadania domowe (acc pl)", hint: "robić → robienie; zadania domowe (acc pl) → zadań domowych (gen pl)." },

  // uczyć się (się is part of the verbal noun)
  { id: "vn43", verbId: "uczyc_sie", template: `${V} ${N} wymaga cierpliwości.`, english: "Learning languages requires patience.", expectedVerb: "uczenie się", expectedNoun: "języków", originalPhrase: "uczyć się języków (gen — stays!)", hint: "uczyć się → uczenie się; uczyć się takes genitive, so języków stays." },
  { id: "vn44", verbId: "uczyc_sie", template: `Lubię ${V} ${N}.`, english: "I like learning new things.", expectedVerb: "uczenie się", expectedNoun: "nowych rzeczy", originalPhrase: "uczyć się nowych rzeczy (gen)", hint: "uczyć się → uczenie się; uczyć się takes genitive, so 'nowych rzeczy' stays." },

  // malować
  { id: "vn45", verbId: "malowac", template: `${V} ${N} to moje hobby.`, english: "Painting landscapes is my hobby.", expectedVerb: "malowanie", expectedNoun: "krajobrazów", originalPhrase: "malować krajobrazy (acc pl)", hint: "malować → malowanie; krajobrazy (acc pl) → krajobrazów (gen pl)." },

  // śpiewać
  { id: "vn46", verbId: "spiewac", template: `${V} ${N} poprawia humor.`, english: "Singing songs improves mood.", expectedVerb: "śpiewanie", expectedNoun: "piosenek", originalPhrase: "śpiewać piosenki (acc pl)", hint: "śpiewać → śpiewanie; piosenki (acc pl) → piosenek (gen pl)." },

  // grać (prepositional — stays)
  { id: "vn47", verbId: "grac", template: `${V} ${N} jest fajne.`, english: "Playing games is fun.", expectedVerb: "granie", expectedNoun: "w gry", originalPhrase: "grać w gry", hint: "grać → granie; 'w gry' stays — the preposition governs its own case." },
  { id: "vn48", verbId: "grac", template: `Lubię ${V} ${N}.`, english: "I like playing the guitar.", expectedVerb: "granie", expectedNoun: "na gitarze", originalPhrase: "grać na gitarze (loc)", hint: "grać → granie; 'na gitarze' is locative and stays unchanged." },

  // nosić
  { id: "vn49", verbId: "nosic", template: `${V} ${N} jest niewygodne.`, english: "Wearing glasses is uncomfortable.", expectedVerb: "noszenie", expectedNoun: "okularów", originalPhrase: "nosić okulary (acc pl)", hint: "nosić → noszenie (s→sz); okulary (acc pl) → okularów (gen pl)." },

  // prosić (prepositional — stays)
  { id: "vn50", verbId: "prosic", template: `${V} ${N} nie jest łatwe.`, english: "Asking for help is not easy.", expectedVerb: "proszenie", expectedNoun: "o pomoc", originalPhrase: "prosić o pomoc", hint: "prosić → proszenie (s→sz); 'o pomoc' stays — preposition governs acc." },

  // brać
  { id: "vn51", verbId: "brac", template: `${V} ${N} jest konieczne.`, english: "Taking medicine is necessary.", expectedVerb: "branie", expectedNoun: "leków", originalPhrase: "brać leki (acc pl)", hint: "brać → branie; leki (acc pl) → leków (gen pl)." },

  // myć
  { id: "vn52", verbId: "myc", template: `${V} ${N} chroni przed chorobami.`, english: "Washing hands protects against diseases.", expectedVerb: "mycie", expectedNoun: "rąk", originalPhrase: "myć ręce (acc pl)", hint: "myć → mycie (short verb → -cie); ręce (acc pl) → rąk (gen pl)." },

  // zwiedzać
  { id: "vn54", verbId: "zwiedzac", template: `${V} ${N} to najlepsza część podróży.`, english: "Visiting museums is the best part of the trip.", expectedVerb: "zwiedzanie", expectedNoun: "muzeów", originalPhrase: "zwiedzać muzea (acc pl)", hint: "zwiedzać → zwiedzanie; muzea (acc pl) → muzeów (gen pl)." },

  // fotografować
  { id: "vn55", verbId: "fotografowac", template: `${V} ${N} to moja pasja.`, english: "Photographing animals is my passion.", expectedVerb: "fotografowanie", expectedNoun: "zwierząt", originalPhrase: "fotografować zwierzęta (acc pl)", hint: "fotografować → fotografowanie; zwierzęta (acc pl) → zwierząt (gen pl)." },

  // kochać
  { id: "vn56", verbId: "kochac", template: `${V} ${N} może być trudne.`, english: "Loving someone can be difficult.", expectedVerb: "kochanie", expectedNoun: "kogoś", originalPhrase: "kochać kogoś (acc)", hint: "kochać → kochanie; kogoś (acc) → kogoś (gen — same form)." },

  // sprzątać + object
  { id: "vn58", verbId: "sprzatac", template: `${V} ${N} zajmuje dużo czasu.`, english: "Cleaning the kitchen takes a lot of time.", expectedVerb: "sprzątanie", expectedNoun: "kuchni", originalPhrase: "sprzątać kuchnię (acc sg)", hint: "sprzątać → sprzątanie; kuchnię (acc) → kuchni (gen)." },

  // podróżować (instrumental — stays)
  { id: "vn59", verbId: "podrozowac", template: `${V} ${N} jest męczące.`, english: "Traveling by bus is tiring.", expectedVerb: "podróżowanie", expectedNoun: "autobusem", originalPhrase: "podróżować autobusem (inst)", hint: "podróżować → podróżowanie; 'autobusem' is instrumental and stays unchanged." },

  // rysować
  { id: "vn60", verbId: "rysowac", template: `${V} ${N} to jej talent.`, english: "Drawing portraits is her talent.", expectedVerb: "rysowanie", expectedNoun: "portretów", originalPhrase: "rysować portrety (acc pl)", hint: "rysować → rysowanie; portrety (acc pl) → portretów (gen pl)." },

  // -----------------------------------------------------------------------
  // IRREGULAR: -ąć → -ęcie
  // -----------------------------------------------------------------------
  { id: "vn90", verbId: "wziac", template: `${V} ${N} było trudne.`, english: "Taking a loan was difficult.", expectedVerb: "wzięcie", expectedNoun: "kredytu", originalPhrase: "wziąć kredyt (acc sg)", hint: "wziąć → wzięcie (-ąć → -ęcie, vowel change ą→ę); kredyt (acc) → kredytu (gen)." },
  { id: "vn91", verbId: "zdjac", template: `${V} to moje hobby.`, english: "Photography (taking photos) is my hobby.", expectedVerb: "zdjęcie", originalPhrase: "zdjąć", hint: "zdjąć → zdjęcie (-ąć → -ęcie). 'Zdjęcie' also means 'photograph' in everyday Polish!" },
  { id: "vn92", verbId: "przyjac", template: `${V} ${N} odbyło się w sobotę.`, english: "Accepting the award took place on Saturday.", expectedVerb: "przyjęcie", expectedNoun: "nagrody", originalPhrase: "przyjąć nagrodę (acc sg)", hint: "przyjąć → przyjęcie (-ąć → -ęcie); nagrodę (acc) → nagrody (gen). 'Przyjęcie' also means 'party/reception'!" },
  { id: "vn93", verbId: "pojac", template: `${V} ${N} zajęło mi chwilę.`, english: "Grasping the concept took me a moment.", expectedVerb: "pojęcie", expectedNoun: "tematu", originalPhrase: "pojąć temat (acc sg)", hint: "pojąć → pojęcie (-ąć → -ęcie); temat (acc) → tematu (gen). 'Pojęcie' also means 'concept/notion'!" },
  { id: "vn94", verbId: "zaczac", template: `${V} ${N} jest najtrudniejsze.`, english: "Starting a new job is the hardest.", expectedVerb: "zaczęcie", expectedNoun: "nowej pracy", originalPhrase: "zacząć nową pracę (acc sg)", hint: "zacząć → zaczęcie (-ąć → -ęcie); nową pracę (acc) → nowej pracy (gen)." },
  { id: "vn95", verbId: "ciac", template: `${V} ${N} wymaga precyzji.`, english: "Cutting paper requires precision.", expectedVerb: "cięcie", expectedNoun: "papieru", originalPhrase: "ciąć papier (acc sg)", hint: "ciąć → cięcie (-ąć → -ęcie); papier (acc) → papieru (gen)." },

  // -----------------------------------------------------------------------
  // COMMON VERBAL NOUNS (that double as everyday words)
  // -----------------------------------------------------------------------
  { id: "vn100", verbId: "mieszkac", template: `${V} w Warszawie jest drogie.`, english: "Living in Warsaw is expensive.", expectedVerb: "mieszkanie", originalPhrase: "mieszkać", hint: "mieszkać → mieszkanie (-ać → -anie). 'Mieszkanie' also means 'apartment'!" },
  { id: "vn101", verbId: "spotkac", template: `${V} z przyjaciółmi było miłe.`, english: "Meeting with friends was nice.", expectedVerb: "spotkanie", originalPhrase: "spotkać", hint: "spotkać → spotkanie (-ać → -anie). 'Spotkanie' also means 'meeting/appointment'." },
  { id: "vn102", verbId: "pytac", template: `${V} o drogę nie jest trudne.`, english: "Asking for directions is not difficult.", expectedVerb: "pytanie", originalPhrase: "pytać", hint: "pytać → pytanie (-ać → -anie). 'Pytanie' also means 'question'." },
  { id: "vn103", verbId: "cwiczic", template: `Codzienne ${V} jest zdrowe.`, english: "Daily exercising is healthy.", expectedVerb: "ćwiczenie", originalPhrase: "ćwiczyć", hint: "ćwiczyć → ćwiczenie (-yć → -enie). 'Ćwiczenie' also means 'exercise'." },
  { id: "vn104", verbId: "marzyc", template: `${V} o podróży jest przyjemne.`, english: "Dreaming about a trip is pleasant.", expectedVerb: "marzenie", originalPhrase: "marzyć", hint: "marzyć → marzenie (-yć → -enie). 'Marzenie' also means 'dream/wish'." },
  { id: "vn105", verbId: "znaczyc", template: `${V} ${N} zależy od kontekstu.`, english: "The meaning of a word depends on context.", expectedVerb: "znaczenie", expectedNoun: "słowa", originalPhrase: "znaczyć słowo (acc sg)", hint: "znaczyć → znaczenie (-yć → -enie); słowo (acc) → słowa (gen). 'Znaczenie' also means 'meaning'." },
  { id: "vn106", verbId: "tlumaczyc", template: `${V} ${N} trwa długo.`, english: "Translating books takes a long time.", expectedVerb: "tłumaczenie", expectedNoun: "książek", originalPhrase: "tłumaczyć książki (acc pl)", hint: "tłumaczyć → tłumaczenie (-yć → -enie); książki (acc pl) → książek (gen pl). 'Tłumaczenie' also means 'translation'." },
  { id: "vn107", verbId: "opowiadac", template: `${V} ${N} to sztuka.`, english: "Telling stories is an art.", expectedVerb: "opowiadanie", expectedNoun: "historii", originalPhrase: "opowiadać historie (acc pl)", hint: "opowiadać → opowiadanie (-ać → -anie); historie (acc pl) → historii (gen pl). 'Opowiadanie' also means 'short story'." },
  { id: "vn108", verbId: "cierpiec", template: `${V} uczy cierpliwości.`, english: "Suffering teaches patience.", expectedVerb: "cierpienie", originalPhrase: "cierpieć", hint: "cierpieć → cierpienie (-eć → -enie). 'Cierpienie' also means 'suffering' as a noun." },
  { id: "vn109", verbId: "parkowac", template: `${V} w centrum jest trudne.`, english: "Parking downtown is difficult.", expectedVerb: "parkowanie", originalPhrase: "parkować", hint: "parkować → parkowanie (-ować → -owanie). 'Parkowanie' = parking." },
  { id: "vn110", verbId: "latac", template: `${V} ${N} jest moim marzeniem.`, english: "Flying planes is my dream.", expectedVerb: "latanie", expectedNoun: "samolotami", originalPhrase: "latać samolotami (inst pl)", hint: "latać → latanie (-ać → -anie); 'samolotami' is instrumental and stays unchanged." },
  { id: "vn111", verbId: "badac", template: `${V} ${N} jest fascynujące.`, english: "Researching history is fascinating.", expectedVerb: "badanie", expectedNoun: "historii", originalPhrase: "badać historię (acc sg)", hint: "badać → badanie (-ać → -anie); historię (acc) → historii (gen). 'Badanie' also means 'research/examination'." },
  { id: "vn112", verbId: "zachowac", template: `Dobre ${V} jest ważne w szkole.`, english: "Good behavior is important in school.", expectedVerb: "zachowanie", originalPhrase: "zachować", hint: "zachować → zachowanie (-ować → -owanie). 'Zachowanie' also means 'behavior'." },
  { id: "vn113", verbId: "wozic", template: `${V} ${N} wymaga cierpliwości.`, english: "Driving children requires patience.", expectedVerb: "wożenie", expectedNoun: "dzieci", originalPhrase: "wozić dzieci (acc pl)", hint: "wozić → wożenie (-ić → -enie, consonant z→ż); dzieci (acc pl) → dzieci (gen pl — same form)." },

  // more -ąć → -ęcie sentences (verb only)
  { id: "vn114", verbId: "wziac", template: `${V} prysznica trwa pięć minut.`, english: "Taking a shower takes five minutes.", expectedVerb: "wzięcie", originalPhrase: "wziąć", hint: "wziąć → wzięcie (-ąć → -ęcie). Vowel change: ą → ę." },
  { id: "vn115", verbId: "przyjac", template: `${V} gości wymaga przygotowań.`, english: "Receiving guests requires preparations.", expectedVerb: "przyjęcie", originalPhrase: "przyjąć", hint: "przyjąć → przyjęcie (-ąć → -ęcie). 'Przyjęcie' also means 'party'!" },
  { id: "vn116", verbId: "zaczac", template: `${V} jest najtrudniejsze.`, english: "Starting is the hardest part.", expectedVerb: "zaczęcie", originalPhrase: "zacząć", hint: "zacząć → zaczęcie (-ąć → -ęcie). Vowel change: ą → ę." },

  // -----------------------------------------------------------------------
  // "do + GENITIVE" — verbal noun in genitive after "do" (purpose)
  // -----------------------------------------------------------------------
  { id: "vn70", verbId: "pisac", template: `Maszyna do ${V} jest stara.`, english: "The typewriter is old.", expectedVerb: "pisania", originalPhrase: "pisać", hint: "'Do' requires genitive. pisanie → pisania. Maszyna do pisania = typewriter (machine for writing)." },
  { id: "vn71", verbId: "prac", template: `Kupiłem proszek do ${V}.`, english: "I bought laundry detergent.", expectedVerb: "prania", originalPhrase: "prać", hint: "'Do' requires genitive. pranie → prania. Proszek do prania = laundry detergent (powder for washing)." },
  { id: "vn72", verbId: "prasowac", template: `Potrzebuję deski do ${V}.`, english: "I need an ironing board.", expectedVerb: "prasowania", originalPhrase: "prasować", hint: "'Do' requires genitive. prasowanie → prasowania. Deska do prasowania = ironing board." },
  { id: "vn73", verbId: "golic_sie", template: `Gdzie jest krem do ${V}?`, english: "Where is the shaving cream?", expectedVerb: "golenia", originalPhrase: "golić się", hint: "'Do' requires genitive. golenie → golenia. 'Się' drops in this fixed expression. Krem do golenia = shaving cream." },
  { id: "vn74", verbId: "piec", template: `Daj mi proszek do ${V}.`, english: "Give me baking powder.", expectedVerb: "pieczenia", originalPhrase: "piec", hint: "'Do' requires genitive. pieczenie → pieczenia. Proszek do pieczenia = baking powder." },
  { id: "vn75", verbId: "kapac_sie", template: `Kupiłam płyn do ${V}.`, english: "I bought bath liquid.", expectedVerb: "kąpieli", originalPhrase: "kąpać się", hint: "'Do' requires genitive. This is a fixed expression: płyn do kąpieli (not kąpania). kąpiel (f) = bath." },
  { id: "vn76", verbId: "szyc", template: `Masz maszynę do ${V}?`, english: "Do you have a sewing machine?", expectedVerb: "szycia", originalPhrase: "szyć", hint: "'Do' requires genitive. szycie → szycia. Maszyna do szycia = sewing machine." },
  { id: "vn77", verbId: "zmywac", template: `Potrzebuję płynu do ${V} naczyń.`, english: "I need dishwashing liquid.", expectedVerb: "zmywania", originalPhrase: "zmywać", hint: "'Do' requires genitive. zmywanie → zmywania. Płyn do zmywania naczyń = dishwashing liquid." },
  { id: "vn78", verbId: "czytac", template: `Masz coś do ${V}?`, english: "Do you have something to read?", expectedVerb: "czytania", originalPhrase: "czytać", hint: "'Do' requires genitive. czytanie → czytania. 'Coś do czytania' = something to read." },
  { id: "vn79", verbId: "jesc", template: `Jest coś do ${V}?`, english: "Is there something to eat?", expectedVerb: "jedzenia", originalPhrase: "jeść", hint: "'Do' requires genitive. jedzenie → jedzenia. 'Coś do jedzenia' = something to eat." },
  { id: "vn80", verbId: "pic", template: `Chcesz coś do ${V}?`, english: "Do you want something to drink?", expectedVerb: "picia", originalPhrase: "pić", hint: "'Do' requires genitive. picie → picia. 'Coś do picia' = something to drink." },
  { id: "vn81", verbId: "robic", template: `Nie mam nic do ${V}.`, english: "I have nothing to do.", expectedVerb: "robienia", originalPhrase: "robić", hint: "'Do' requires genitive. robienie → robienia. 'Nic do robienia' = nothing to do." },
];
