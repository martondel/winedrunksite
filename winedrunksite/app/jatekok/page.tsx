"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/language-context"
import { LanguageSwitcher } from "../components/language-switcher"

export default function GamesPage() {
  const { t } = useLanguage()

  const games = [
    {
      id: "winedrunk",
      title: t("games.wine.title"),
      description: t("games.wine.description"),
      longDescription: t("games.wine.longDescription"),
      difficulty: t("games.difficulty.easy"),
      players: "min. 2",
      time: "∞",
      image: "/images/wine.jpeg",
    },
    {
      id: "tequiladrunk",
      title: t("games.tequila.title"),
      description: t("games.tequila.description"),
      longDescription: t("games.tequila.longDescription"),
      difficulty: t("games.difficulty.medium"),
      players: "min. 2",
      time: "∞",
      image: "/images/tequila.webp",
    },
    {
      id: "palinkadrunk",
      title: t("games.palinka.title"),
      description: t("games.palinka.description"),
      longDescription: t("games.palinka.longDescription"),
      difficulty: t("games.difficulty.hard"),
      players: "min. 2",
      time: "∞",
      image: "/images/hazibuli.jpeg",
    },
  ]

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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-[#fcf5db]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                {t("games.pageTitle")}
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">{t("games.pageDescription")}</p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-16">
              {games.map((game, index) => (
                <div key={game.id} className="flex flex-col gap-8 md:flex-row">
                  <div className="aspect-video w-full md:w-1/3 rounded-lg overflow-hidden relative">
                    <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
                      {game.title}
                    </h2>
                    <p className="text-muted-foreground">{game.longDescription}</p>

                    <div className="grid grid-cols-3 gap-4 py-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">{t("games.difficulty.label")}</div>
                        <div className="font-medium">{game.difficulty}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">{t("games.players")}</div>
                        <div className="font-medium">{game.players}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">{t("games.time")}</div>
                        <div className="font-medium">{game.time}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button>{t("games.play")}</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("backToHome")}
                </Button>
              </Link>
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

