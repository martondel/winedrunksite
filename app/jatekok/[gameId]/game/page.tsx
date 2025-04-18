"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../../../contexts/language-context"
import { LanguageSwitcher } from "../../../components/language-switcher"
import { useParams } from "next/navigation"

// Conversation starter questions for the cards
const conversationStarters = [
  "Mikor nevettél utoljára őszintén?",
  "Mitől félsz a legjobban?",
  "Mi az a mondat, amit ha meghallasz, görcsbe rándul a gyomrod?",
  "Egy titok, amit másnak őrzöl, de nyomja a lelked. Itt az idő, hogy kiadd.",
  "Ha egy napra legális lenne ölni, kivel kezdenéd?",
  "Meghal egy hozzád nagyon közel álló személy és összetörsz. Kit hívsz fel először?",
  "Fizetve van egy utad Hawaiira, kit viszel magaddal?",
  "Ha össze kéne költöznöd valakivel, aki nem a párod, ki lenne az?",
  "Mikor tettél utoljára jót önzetlenül valaki másnak? Mi volt az?",
  "Ha egy embert felejthetnél el örökre, ki lenne az?",
  "Hiszel az igaz szerelemben?",
  "Ha hirtelen sok pénzre tennél szert, kinek mondanád el?",
  "Ki a komfortembered?",
  "Mi volt az elmúlt pár hónap legnagyobb kudarca számodra?",
  "Vagy mindent kimondasz amit gondolsz, vagy soha nem oszthatod meg a véleményed senkivel. Melyiket választod?",
  "Miben kellene leginkább fejlődnöd?",
  "Kiért tennéd tűzbe a kezed?",
  "A szüleid helyében mit csinálnál másképp?",
  "Ha választanod kéne a családod és a barátaid között, kire esne a választásod?",
  "Kinek az ölelése esne most a legjobban?",
  "Mikor érezted magad a leginkább földbe döngölve?",
  "Mikor érezted magad a legszabadabbnak?",
  "Mi volt életed legkellemetlenebb helyzete?",
  "Ha kiválaszthatnád most a korodat, változtatnál a jelenlegin?",
  "Minden naiv gyereknek van valami, ami azt hiszi, nagyon máshogy működik, mint valójában. Neked mi volt az?",
  "Mi a legjobb tanács, amit valaha hallottál?",
  "Miben érzed úgy, hogy a legjobban kilógsz a többiek közül?",
  "Fel tudnád adni a karrieredet a párod sikeréért anélkül, hogy később megbánd? Miért?",
  "Miért nem lennél jó partner?",
  "Mi az, amit a legjobban utálsz a világban?",
  "Hogy képzeled el az álomrandit?",
  "Mit irigyelsz a társaság egyik tagjától? Miért?",
  "Mi a titkos célod, amit még senkinek nem említettél?",
  "Ki motivál a környezetedben? Miért?",
  "Kit tekintesz példaképnek a társaságból? Milyen tekintetben?",
  "Kipróbálnád milyen meghalni, ha utána biztosan újraéledsz?",
  "Mi az a gesztus, ami mindig jólesik?",
  "Miért szeretsz magyar lenni?",
  "Mit szeretsz a legjobban magadban?",
  "Mi a legszebb dolog vagy hely, amit valaha láttál?",
  "Életed melyik napját várod a legjobban?",
  "Mi az a dolog, amit a legjobban megbántál az életedben?",
  "Mi az, amit soha nem bocsátanál meg annak, akit szeretsz?",
  "Volt már, hogy szerelmet hazudtál? Kinek?",
  "Ha visszamehetnél az időben, mit tennél másképp?",
  "Ha most azonnal választhatnál, kinek a testében ébrednél fel holnap?",
  "Kit bántottál meg legutóbb, és miért?",
  "Mi az a szívesség, amit sosem kérnél senkitől?",
  "Voltál már féltékeny valakire úgy, hogy nem merted kimutatni? Kire?",
  "Mi az, amit most is titokban csinálsz, de senki nem tud róla?",
  "Ha csak egy ember maradhatna életben a társaságból, kit választanál?",
  "Mikor voltál utoljára igazán egyedül a problémáiddal?",
  "Mi az, amit ha valaki megtenne veled, örökre kiírnád az életedből?",
  "Kinek nem mondtál még el valamit, pedig kellene? Mi az?",
  "Mi az a dolog, ami miatt legutóbb szégyellted magad?",
  "Ha most meghalnál, mit bánnál a legjobban, hogy nem tettél meg?",
  "Voltál már úgy szerelmes, hogy belebetegedtél? Kibe?",
  "Melyik volt az a döntésed, ami tönkretett egy barátságot?",
  "Mi a legnagyobb függőséged?",
  "Mi az a kérdés, amitől félsz, hogy egyszer valaki felteszi neked?",
  "Mi az, amit most is sajnálsz, hogy valaha kimondtál valakinek?",
  "Mi az, amiért most azonnal otthagynál mindent és mindenkit?",
  "Ha egy napra bárkinek a párja lehetnél, ki lenne az?",
  "Mi az a legrosszabb dolog, amit valaha kívántál valakinek?",
  "Melyik barátodat hagynád ott egy millió forintért?",
  "Mi volt a legnagyobb árulás, amit elkövettél valaki ellen?",
  "Volt olyan, hogy valaki más párjára hajtottál? Ki volt az?",
  "Ha most azonnal el kéne hagynod az országot, kit vinnél magaddal?",
  "Ki az, akivel jelenleg megjátszod magad, de valójában utálod?",
  "Ki az, akinek ha holnap baja esne, nem tudnád sajnálni?",
  "Mi az, ami még mindig kísért a múltadból?",
  "Mi az, amitől a legjobban félsz, hogy egyszer megtörténik veled?",
  "Lennél poligám kapcsolatban?",
  "Ha el kéne tusolnod egy gyilkosságot, kit hívnál elsőként?",
  "Melyik érzékedet veszítenéd el, ha az egyiket muszáj lenne?",
  "Ha választanod kéne két barátod között, milyen szempontot néznél először?",
  "Mi az amit szégyellsz, de örömet okoz neked?",
  "Mi a leggusztustalanabb dolog, amit gyerekként megkóstoltál?",
  "Ha csak egy ember öltöztethetne életed végéig, kit választanál?",
  "Mi az a pénzösszeg, amivel már beérnéd havi szinten?",
]

// English translations
const conversationStartersEn = [
  "When was the last time you laughed genuinely?",
  "What are you most afraid of?",
  "What sentence makes your stomach knot when you hear it?",
  "A secret you're keeping for someone else but it weighs on you. It's time to let it out.",
  "If killing was legal for one day, who would you start with?",
  "Someone very close to you dies and you break down. Who do you call first?",
  "You have a paid trip to Hawaii, who do you take with you?",
  "If you had to move in with someone who's not your partner, who would it be?",
  "When was the last time you did something good for someone selflessly? What was it?",
  "If you could forget one person forever, who would it be?",
  "Do you believe in true love?",
  "If you suddenly came into a lot of money, who would you tell first?",
  "Who is your comfort person?",
  "What was your biggest failure in the past few months?",
  "Either you say everything you think, or you can never share your opinion with anyone. Which do you choose?",
  "What do you need to improve most about yourself?",
  "Who would you vouch for without hesitation?",
  "What would you do differently in your parents' place?",
  "If you had to choose between your family and your friends, who would you choose?",
  "Whose hug would feel best right now?",
  "When did you feel most defeated?",
  "When did you feel most free?",
  "What was the most uncomfortable situation in your life?",
  "If you could choose your age now, would you change your current one?",
  "Every naive child has something they think works very differently than it actually does. What was yours?",
  "What's the best advice you've ever heard?",
  "In what way do you feel you stand out most from others?",
  "Could you give up your career for your partner's success without regretting it later? Why?",
  "Why wouldn't you be a good partner?",
  "What do you hate most in the world?",
  "How do you imagine your dream date?",
  "What do you envy about someone in this group? Why?",
  "What's your secret goal that you haven't mentioned to anyone?",
  "Who motivates you in your environment? Why?",
  "Who do you consider a role model in this group? In what respect?",
  "Would you try what it's like to die if you were guaranteed to come back to life afterward?",
  "What gesture always feels good to you?",
  "Why do you like being Hungarian?",
  "What do you like best about yourself?",
  "What's the most beautiful thing or place you've ever seen?",
  "Which day of your life are you looking forward to the most?",
  "What's the thing you regret most in your life?",
  "What would you never forgive someone you love for?",
  "Have you ever lied about being in love? To whom?",
  "If you could go back in time, what would you do differently?",
  "If you could choose right now, whose body would you wake up in tomorrow?",
  "Who did you hurt most recently, and why?",
  "What favor would you never ask of anyone?",
  "Have you ever been jealous of someone but didn't dare show it? Who?",
  "What are you doing in secret now that no one knows about?",
  "If only one person from this group could stay alive, who would you choose?",
  "When was the last time you were truly alone with your problems?",
  "What is something that, if someone did it to you, you would cut them out of your life forever?",
  "Who haven't you told something to yet, even though you should? What is it?",
  "What's something that recently made you feel ashamed?",
  "If you died now, what would you regret not having done the most?",
  "Have you ever been so in love that you got sick? With whom?",
  "Which decision of yours ruined a friendship?",
  "What's your biggest addiction?",
  "What question are you afraid someone will ask you someday?",
  "What do you still regret saying to someone?",
  "What would make you leave everything and everyone right now?",
  "If you could be anyone's partner for a day, who would it be?",
  "What's the worst thing you've ever wished upon someone?",
  "Which friend would you abandon for a million forints?",
  "What was the biggest betrayal you committed against someone?",
  "Have you ever pursued someone else's partner? Who was it?",
  "If you had to leave the country immediately, who would you take with you?",
  "Who are you pretending to like right now, but actually hate?",
  "Who wouldn't you be able to feel sorry for if something bad happened to them tomorrow?",
  "What still haunts you from your past?",
  "What are you most afraid will happen to you someday?",
  "Would you be in a polygamous relationship?",
  "If you had to cover up a murder, who would you call first?",
  "Which of your senses would you lose if you had to choose one?",
  "If you had to choose between two friends, what aspect would you consider first?",
  "What's something you're ashamed of but brings you joy?",
  "What's the most disgusting thing you tasted as a child?",
  "If only one person could dress you for the rest of your life, who would you choose?",
  "What's the amount of money you'd be satisfied with monthly?",
]

export default function GamePage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const gameId = params.gameId as string

  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [remainingCards, setRemainingCards] = useState<number[]>([])
  const [isFirstCard, setIsFirstCard] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const [isExiting, setIsExiting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Initialize the deck
  useEffect(() => {
    resetDeck()
  }, [])

  // Reset the deck with all cards
  const resetDeck = () => {
    const indices = Array.from({ length: conversationStarters.length }, (_, i) => i)
    setRemainingCards(indices)
    setCurrentCardIndex(null)
    setFlipped(false)
    setIsFirstCard(true)
    setDragOffset(0)
    setSwipeDirection(null)
    setIsExiting(false)
  }

  // Draw a random card from the remaining cards
  const drawCard = () => {
    if (remainingCards.length === 0) {
      resetDeck()
      return
    }

    setIsExiting(true)

    // After the exit animation, update the card
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * remainingCards.length)
      const cardIndex = remainingCards[randomIndex]

      setCurrentCardIndex(cardIndex)
      // Only flip automatically if it's not the first card
      setFlipped(!isFirstCard)
      if (isFirstCard) {
        setIsFirstCard(false)
      }
      setRemainingCards(remainingCards.filter((_, i) => i !== randomIndex))
      setDragOffset(0)
      setSwipeDirection(null)
      setIsExiting(false)
    }, 300) // Duration should match the CSS transition
  }

  // Flip the current card
  const flipCard = () => {
    if (isFirstCard) {
      setFlipped(!flipped)
    }
  }

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
  }

  // Handle touch move event
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentTouch = e.targetTouches[0].clientX
    const diff = currentTouch - (touchStart || 0)

    // Limit the drag distance
    const maxDrag = 150
    const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)

    setDragOffset(limitedDiff)
    setTouchEnd(currentTouch)

    // Set swipe direction for rotation effect
    if (diff > 0) {
      setSwipeDirection("right")
    } else if (diff < 0) {
      setSwipeDirection("left")
    }
  }

  // Handle touch end event
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchEnd - touchStart
    const isLeftSwipe = distance < -minSwipeDistance
    const isRightSwipe = distance > minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      // Keep the swipe direction for exit animation
      drawCard()
    } else {
      // Reset position if not swiped enough
      setDragOffset(0)
      setSwipeDirection(null)
    }

    setIsDragging(false)
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Handle mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStart === null) return

    const diff = e.clientX - touchStart

    // Limit the drag distance
    const maxDrag = 150
    const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)

    setDragOffset(limitedDiff)
    setTouchEnd(e.clientX)

    // Set swipe direction for rotation effect
    if (diff > 0) {
      setSwipeDirection("right")
    } else if (diff < 0) {
      setSwipeDirection("left")
    }
  }

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchEnd - touchStart
    const isLeftSwipe = distance < -minSwipeDistance
    const isRightSwipe = distance > minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      drawCard()
    } else {
      // Reset position if not swiped enough
      setDragOffset(0)
      setSwipeDirection(null)
    }

    setIsDragging(false)
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Get the appropriate question based on language
  const getQuestion = (index: number | null) => {
    if (index === null) return ""
    return language === "hu" ? conversationStarters[index] : conversationStartersEn[index]
  }

  // Card style with drag offset and rotation
  const cardStyle = {
    transform: `
    rotateY(${flipped ? 180 : 0}deg) 
    translateX(${dragOffset}px) 
    rotate(${dragOffset * 0.1}deg)
  `,
    opacity: isExiting ? 0 : 1,
    transition: isDragging ? "transform 0.05s ease-out" : "transform 0.3s ease-out, opacity 0.3s ease-out",
  }

  // Instructions text based on current state
  const getInstructionText = () => {
    if (currentCardIndex === null) {
      return language === "hu" ? "Húzd el a kártyát jobbra vagy balra" : "Swipe right or left to draw a card"
    }

    if (isFirstCard && !flipped) {
      return language === "hu" ? "Kattints a kártyára" : "Click the card"
    }

    return language === "hu" ? "Húzd el a kártyát a következőhöz" : "Swipe the card for the next one"
  }

  const getSubInstructionText = () => {
    if (currentCardIndex === null) {
      return language === "hu" ? "Egy új kártya húzásához" : "Tap to reveal"
    }

    if (isFirstCard && !flipped) {
      return language === "hu" ? "Fordítsd meg a kártyát" : "Flip the card to see the question"
    }

    return language === "hu" ? "Húzd el jobbra vagy balra" : "Swipe right or left"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-4xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
              Winedrunk
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/jatekok" className="text-sm font-medium underline underline-offset-4">
              {t("nav.games")}
            </Link>
            <Link href="/jellemzok" className="text-sm font-medium hover:underline underline-offset-4">
              {t("nav.features")}
            </Link>
            <Link href="/kapcsolat" className="text-sm font-medium hover:underline underline-offset-4">
              {t("nav.contact")}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 bg-[#fcf5db]">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-8 text-center">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                Winedrunk
              </h1>

              <div className="w-full max-w-md mx-auto">
                <div
                  className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
                  onClick={flipCard}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  ref={cardRef}
                >
                  <div className={`absolute inset-0 w-full h-full transform-style-3d`} style={cardStyle}>
                    {/* Card Front */}
                    <div className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-8 backface-hidden">
                      {currentCardIndex !== null ? (
                        <div className="text-center">
                          <p className="text-xl font-bold mb-2">{getInstructionText()}</p>
                          <p className="text-sm text-muted-foreground">{getSubInstructionText()}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-xl font-bold mb-2">{getInstructionText()}</p>
                          <p className="text-sm text-muted-foreground">{getSubInstructionText()}</p>
                        </div>
                      )}
                    </div>

                    {/* Card Back */}
                    <div className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-8 backface-hidden rotate-y-180">
                      {currentCardIndex !== null && (
                        <p className="text-xl font-medium text-center">{getQuestion(currentCardIndex)}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button onClick={resetDeck} variant="outline" size="lg">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {language === "hu" ? "Pakli újrakeverése" : "Reshuffle Deck"}
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {language === "hu"
                      ? `Még ${remainingCards.length} kártya van a pakliban`
                      : `${remainingCards.length} cards remaining in the deck`}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/jatekok">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    {t("backToHome")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
            Winedrunk
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Winedrunk. {t("footer.rights")}
            </p>
            <Link href="/kapcsolat" className="md:ml-4">
              <Button variant="link" size="sm" className="h-auto p-0">
                {t("footer.contact")}
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
