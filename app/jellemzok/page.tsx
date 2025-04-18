"use client"

import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/language-context"
import { LanguageSwitcher } from "../components/language-switcher"

export default function FeaturesPage() {
  const { t } = useLanguage()

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
            <Link href="/#games" className="text-sm font-medium hover:underline underline-offset-4">
              {t("nav.games")}
            </Link>
            <Link href="/jellemzok" className="text-sm font-medium underline underline-offset-4">
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
                {t("howItWorks.title")}
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">{t("howItWorks.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#fcf5db] text-4xl font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
                    {t("step1.title")}
                  </h2>
                  <p className="text-muted-foreground">{t("step1.description")}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#fcf5db] text-4xl font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
                    {t("step2.title")}
                  </h2>
                  <p className="text-muted-foreground">{t("step2.description")}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#fcf5db] text-4xl font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
                    {t("step3.title")}
                  </h2>
                  <p className="text-muted-foreground">{t("step3.description")}</p>
                </div>
              </div>
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

        <section className="w-full py-12 md:py-16 bg-[#fcf5db]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Freckle Face', cursive" }}>
                {t("whyChoose.title")}
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("whyChoose.subtitle")}</p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {[t("feature1"), t("feature2"), t("feature3"), t("feature4"), t("feature5"), t("feature6")].map(
                (feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <p>{feature}</p>
                  </div>
                ),
              )}
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/#games">
                <Button size="lg">{t("exploreGames")}</Button>
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
