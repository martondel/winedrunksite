"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/language-context"
import { LanguageSwitcher } from "../components/language-switcher"

export default function PalinkadrunkGamePage() {
  const { t, language } = useLanguage()

  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  const minSwipeDistance = 50
  const cardRef = useRef<HTMLDivElement>(null)

  const initialCards = [
    { id: 1, text: "Card 1" },
    { id: 2, text: "Card 2" },
    { id: 3, text: "Card 3" },
    { id: 4, text: "Card 4" },
    { id: 5, text: "Card 5" },
  ]

  const [remainingCards, setRemainingCards] = useState([...initialCards])

  // Function to draw a card
  const drawCard = () => {
    if (remainingCards.length > 0) {
      setIsExiting(true)

      // After the exit animation, update the card
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * remainingCards.length)
        const drawnCard = remainingCards[randomIndex]

        setCurrentCardIndex(drawnCard.id)
        setRemainingCards(remainingCards.filter((card, index) => index !== randomIndex))
        setDragOffset(0)
        setSwipeDirection(null)
        setIsExiting(false)
        setFlipped(false) // Reset flipped state when drawing a new card
      }, 300) // Duration should match the CSS transition
    } else {
      setCurrentCardIndex(null)
    }
  }

  // Function to reset the deck
  const resetDeck = () => {
    setCurrentCardIndex(null)
    setRemainingCards([...initialCards])
  }

  // Flip the current card
  const flipCard = () => {
    if (currentCardIndex !== null) {
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

    return language === "hu" ? "Koppints a felfedéshez" : "Tap to reveal"
  }

  const getSubInstructionText = () => {
    if (currentCardIndex === null) {
      return language === "hu" ? "Egy új kártya húzásához" : " "
    }

    return language === "hu" ? "Húzd el a kártyát a következőhöz" : "Swipe to get a new card"
  }

  // Predefined game rules
  const gameRules =
    language === "hu"
      ? "Válassz egy párt és húzz egy kártyát, akivel eljátszod amit a kártya mond. Az első aki becringel iszik. Ha nem teljesítitek, mindkettőtöknek innia kell. A játék addig folytatódik, amíg a pakli el nem fogy vagy a játékosok már nem tudnak játszani."
      : "Choose a partner and draw a card. Act out the situation you've got, the first to cringe out has to drink. If you fail to complete it, you both must drink. The game continues until the deck is empty or the players can no longer play."

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

      <main className="flex-1 bg-[#3F1651] text-white">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-8 text-center">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                PÁLINKADRUNK
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
                    <div className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-8 backface-hidden text-black">
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
                    <div className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-8 backface-hidden rotate-y-180 text-black">
                      {currentCardIndex !== null && (
                        <p className="text-xl font-medium text-center">
                          {language === "hu" ? "Üres kártya" : "Blank card"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={resetDeck}
                    variant="outline"
                    size="lg"
                    className="bg-white text-[#3F1651] hover:bg-gray-100"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {language === "hu" ? "Pakli újrakeverése" : "Reshuffle Deck"}
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-white/70">
                    {language === "hu"
                      ? `Még ${remainingCards.length} kártya van a pakliban`
                      : `${remainingCards.length} cards remaining in the deck`}
                  </p>
                </div>
              </div>

              <div className="w-full max-w-2xl mx-auto mt-8 bg-white/10 rounded-lg p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
                    {language === "hu" ? "Act It Out Játékszabályok" : "Act It Out Game Rules"}
                  </h2>
                </div>

                <div className="min-h-[100px] text-white/90">
                  <p>{gameRules}</p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/jatekok">
                  <Button variant="outline" className="gap-2 bg-white text-[#3F1651] hover:bg-gray-100">
                    <ArrowLeft className="h-4 w-4" />
                    {t("backToHome")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-white">
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
