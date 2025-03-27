"use client"

import Link from "next/link"
import { GlassWater, Users, Shuffle, ArrowRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { useLanguage } from "./contexts/language-context"
import { LanguageSwitcher } from "./components/language-switcher"

export default function Home() {
  const { t } = useLanguage()

  const games = [
    {
      title: t("games.wine.title"),
      description: t("games.wine.description"),
      image: "/images/wine.jpeg",
    },
    {
      title: t("games.tequila.title"),
      description: t("games.tequila.description"),
      image: "/images/tequila.webp",
    },
    {
      title: t("games.palinka.title"),
      description: t("games.palinka.description"),
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
            <Link href="/jatekok" className="text-sm font-medium hover:underline underline-offset-4">
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
        <section className="w-full py-24 md:py-32 bg-[#fcf5db]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1
                className="text-5xl md:text-6xl font-bold tracking-tight"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                {t("hero.title")}
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">{t("hero.description")}</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/jatekok">
                  <Button size="lg">
                    {t("hero.play")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/jellemzok">
                  <Button size="lg" variant="outline">
                    {t("hero.learn")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2
                className="text-3xl font-bold tracking-tight md:text-4xl"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                {t("features.title")}
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("features.subtitle")}</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 mt-12">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fcf5db]">
                  <GlassWater className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{t("features.easy.title")}</h3>
                <p className="text-muted-foreground">{t("features.easy.description")}</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fcf5db]">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{t("features.social.title")}</h3>
                <p className="text-muted-foreground">{t("features.social.description")}</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fcf5db]">
                  <Shuffle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{t("features.variety.title")}</h3>
                <p className="text-muted-foreground">{t("features.variety.description")}</p>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Link href="/jellemzok">
                <Button variant="outline">{t("features.how")}</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="games" className="w-full py-16 md:py-24 bg-[#fcf5db]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2
                className="text-3xl font-bold tracking-tight md:text-4xl"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                {t("games.title")}
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("games.subtitle")}</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="aspect-video w-full relative">
                    <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <p className="mt-2 text-muted-foreground">{game.description}</p>
                    <Button className="mt-4" variant="outline">
                      {t("games.play")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link href="/jatekok">
                <Button size="lg" variant="outline">
                  {t("games.viewAll")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2
                className="text-3xl font-bold tracking-tight md:text-4xl"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                {t("cta.title")}
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("cta.description")}</p>
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

