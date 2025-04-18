"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "hu" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  hu: {
    // Navigation
    "nav.games": "Játékok",
    "nav.features": "Jellemzők",
    "nav.contact": "Kapcsolat",
    "nav.language": "English",

    // Hero section
    "hero.title": "Ivós Játékok Online",
    "hero.description":
      "Kapcsolódj barátaiddal és élvezd szórakoztató, interaktív ivós játékaink gyűjteményét bárhonnan.",
    "hero.play": "Játssz Most",
    "hero.learn": "Tudj Meg Többet",

    // Features section
    "features.title": "Jellemzők",
    "features.subtitle": "Miért a Winedrunk a tökéletes választás a virtuális boldog órádhoz?",
    "features.easy.title": "Könnyen Játszható",
    "features.easy.description":
      "Az egyszerű szabályok és az intuitív felület mindenki számára elérhetővé teszi játékainkat.",
    "features.social.title": "Összehoz",
    "features.social.description": "Mélyítsétek el a barátságotokat a legőszintébben.",
    "features.variety.title": "Változatos",
    "features.variety.description":
      "Egy kérdésre nincs két ugyanolyan válasz, így akárhányszor használatba vehetitek bármelyik paklit.",
    "features.how": "Hogyan működik?",

    // Games section
    "games.title": "Játékaink",
    "games.subtitle": "Fedezd fel szórakoztató ivós játékaink gyűjteményét",
    "games.pageTitle": "Játékaink",
    "games.pageDescription": "Fedezd fel szórakoztató ivós játékaink teljes gyűjteményét",
    "games.wine.title": "WINEDRUNK",
    "games.wine.description": "Játssz a márkáink boraival és válaszolj őszintén a kérdésekre",
    "games.wine.longDescription":
      "A WINEDRUNK egy könnyed, szórakoztató ivós játék, amely tökéletes a baráti összejövetelekhez. Játssz a márkáink boraival és válaszolj őszintén a kérdésekre, vagy igyál egy kortyot. Fedezd fel barátaid titkait és derüljön ki, ki a legőszintébb a társaságban.",
    "games.tequila.title": "TEQUILADRUNK",
    "games.tequila.description": "Ha valami ütősebbre vágysz, válaszd a partnereink tequiláit komolyabb kérdésekkel",
    "games.tequila.longDescription":
      "A TEQUILADRUNK egy intenzívebb ivós játék, amely mélyebb kérdésekkel és erősebb italokkal dolgozik. Ha valami ütősebbre vágysz, válaszd a partnereink tequiláit komolyabb kérdésekkel. Csak azoknak ajánljuk, akik készen állnak az őszinte válaszokra.",
    "games.palinka.title": "PÁLINKADRUNK",
    "games.palinka.description": "Házibulin lendítenéd fel a hangulatot? Keverd a piákat az Act It Out kártyákkal",
    "games.palinka.longDescription":
      "A PÁLINKADRUNK a legjobb választás, ha igazán fel akarsz pörgetni egy házibulit. Ehhez a játékhoz nincs szükséged kódra! Keverd a különböző italokat a barátias, de kihívást jelentő act it out kártyákkal. Ez a játék garantáltan felejthetetlen estét biztosít minden résztvevő számára.",
    "games.play": "Játssz Most",
    "games.viewAll": "Összes Játék Megtekintése",
    "games.howToPlay": "Játékszabályok",
    "games.difficulty.label": "Nehézség",
    "games.difficulty.easy": "Könnyű",
    "games.difficulty.medium": "Közepes",
    "games.difficulty.hard": "Nehéz",
    "games.players": "Játékosok",
    "games.time": "Játékidő",

    // CTA section
    "cta.title": "Készen állsz egy felejthetetlen estére?",
    "cta.description": "Csatlakozz a több ezer felhasználóhoz, akik már élvezik a Winedrunk játékokat barátaikkal",
    "cta.button": "Mit kell tennem?",

    // Footer
    "footer.rights": "Minden jog fenntartva.",
    "footer.contact": "Kapcsolat",

    // Features page
    "howItWorks.title": "Hogyan működik?",
    "howItWorks.subtitle": "Egyszerű lépések a felejthetetlen estékhez",
    "step1.title": "Vedd meg a kedvenc WINEDRUNK jelzéssel ellátott italodat",
    "step1.description":
      "Keresd a WINEDRUNK logóval ellátott termékeket a boltokban. Minden csomagolás tartalmaz egy egyedi kódot, amely hozzáférést biztosít a játékhoz.",
    "step2.title": "Add meg a kupakban található kódot a kezdéshez",
    "step2.description":
      "Látogass el a weboldalunkra, és írd be a kupakban található egyedi kódot. Ez feloldja a játékot, és hozzáférést biztosít az összes kérdéshez és funkcióhoz.",
    "step3.title": "Játszatok egy jót a barátaiddal, derüljön ki, ki a legőszintébb a társaságból",
    "step3.description":
      "Gyűjtsd össze barátaidat, és kezdjétek el a játékot! Válaszoljatok őszintén a kérdésekre, vagy igyatok egy kortyot. Fedezzétek fel egymás titkait, és derüljön ki, ki a legőszintébb a társaságban.",
    backToHome: "Vissza a főoldalra",
    "whyChoose.title": "Miért válaszd a Winedrunk játékokat?",
    "whyChoose.subtitle": "Egyedi élmény, amit csak a Winedrunk kínál",
    feature1: "Minőségi italok és szórakoztató kérdések kombinációja",
    feature2: "Egyedi kódok minden csomagolásban",
    feature3: "Folyamatosan frissülő kérdések",
    feature4: "Különböző nehézségi szintek minden társaságnak",
    feature5: "Személyre szabható játékélmény",
    feature6: "Barátságos és intuitív felhasználói felület",
    exploreGames: "Fedezd fel játékainkat",

    // Contact page
    "contact.title": "Kapcsolat",
    "contact.subtitle": "Kérdésed van? Vedd fel velünk a kapcsolatot!",
    "contact.founders": "Alapítók",
    "contact.cofounder": "Társalapító",
  },
  en: {
    // Navigation
    "nav.games": "Games",
    "nav.features": "Features",
    "nav.contact": "Contact",
    "nav.language": "Magyar",

    // Hero section
    "hero.title": "Drinking Games Online",
    "hero.description":
      "Connect with your friends and enjoy our collection of fun, interactive drinking games from anywhere.",
    "hero.play": "Play Now",
    "hero.learn": "Learn More",

    // Features section
    "features.title": "Features",
    "features.subtitle": "Why Winedrunk is the perfect choice for your virtual happy hour?",
    "features.easy.title": "Easy to Play",
    "features.easy.description": "Simple rules and intuitive interface make our games accessible to everyone.",
    "features.social.title": "Brings People Together",
    "features.social.description": "Deepen your friendships in the most honest way.",
    "features.variety.title": "Variety",
    "features.variety.description":
      "No two answers to a question are the same, so you can use any deck multiple times.",
    "features.how": "How Does It Work?",

    // Games section
    "games.title": "Our Games",
    "games.subtitle": "Discover our collection of entertaining drinking games",
    "games.pageTitle": "Our Games",
    "games.pageDescription": "Discover our complete collection of entertaining drinking games",
    "games.wine.title": "WINEDRUNK",
    "games.wine.description": "Play with our partner brands' wines and answer questions honestly",
    "games.wine.longDescription":
      "WINEDRUNK is a light-hearted, fun drinking game perfect for social gatherings. Play with our partners' wines and answer questions honestly or take a sip. Discover your friends' secrets and find out who's the most honest in the group.",
    "games.tequila.title": "TEQUILADRUNK",
    "games.tequila.description":
      "If you want something stronger, choose our partners' tequilas with more serious questions",
    "games.tequila.longDescription":
      "TEQUILADRUNK is a more intense drinking game that works with deeper questions and stronger drinks. If you want something with more kick, choose one of our partners' tequila with more serious questions. Only recommended for those ready for honest answers.",
    "games.palinka.title": "PÁLINKADRUNK",
    "games.palinka.description": "Want to boost up your house party? Mix drinks with our Act It Out cards",
    "games.palinka.longDescription":
      "PÁLINKADRUNK is the best choice if you really want to energize your house party. Mix different drinks with friendly but challenging Act It out cards. This game guarantees an unforgettable evening for all participants.",
    "games.play": "Play Now",
    "games.viewAll": "View All Games",
    "games.howToPlay": "How to Play",
    "games.difficulty.label": "Difficulty",
    "games.difficulty.easy": "Easy",
    "games.difficulty.medium": "Medium",
    "games.difficulty.hard": "Hard",
    "games.players": "Players",
    "games.time": "Game Time",

    // CTA section
    "cta.title": "Ready for an unforgettable evening?",
    "cta.description": "Join thousands of users already enjoying Winedrunk games with their friends",
    "cta.button": "What do I need to do?",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.contact": "Contact",

    // Features page
    "howItWorks.title": "How Does It Work?",
    "howItWorks.subtitle": "Simple steps to unforgettable evenings",
    "step1.title": "Buy your favorite drink with the WINEDRUNK label",
    "step1.description":
      "Look for products with the WINEDRUNK logo in stores. Each package contains a unique code that provides access to the game.",
    "step2.title": "Enter the code found in the cap to start",
    "step2.description":
      "Visit our website and enter the unique code found in the cap. This unlocks the game and provides access to all questions and features.",
    "step3.title": "Play with your friends and find out who's the most honest in the group",
    "step3.description":
      "Gather your friends and start the game! Answer the questions honestly or take a sip. Discover each other's secrets and find out who's the most honest in the group.",
    backToHome: "Back to Home",
    "whyChoose.title": "Why Choose Winedrunk Games?",
    "whyChoose.subtitle": "A unique experience only Winedrunk offers",
    feature1: "Combination of quality drinks and entertaining questions",
    feature2: "Unique codes in every package",
    feature3: "Continuously updated questions",
    feature4: "Different difficulty levels for every group",
    feature5: "Customizable gaming experience",
    feature6: "Friendly and intuitive user interface",
    exploreGames: "Explore Our Games",

    // Contact page
    "contact.title": "Contact",
    "contact.subtitle": "Have questions? Get in touch with us!",
    "contact.founders": "Founders",
    "contact.cofounder": "Co-Founder",
  },
}

// Create a default context value to avoid the "undefined" error
const defaultContextValue: LanguageContextType = {
  language: "hu",
  setLanguage: () => {},
  t: (key: string) => key,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("hu")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
