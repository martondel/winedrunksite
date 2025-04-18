"use client"

import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/language-context"
import { LanguageSwitcher } from "../components/language-switcher"

export default function ContactPage() {
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
            <Link href="/jellemzok" className="text-sm font-medium hover:underline underline-offset-4">
              {t("nav.features")}
            </Link>
            <Link href="/kapcsolat" className="text-sm font-medium underline underline-offset-4">
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
                {t("contact.title")}
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">{t("contact.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2
                className="text-2xl md:text-3xl font-bold mb-8 text-center"
                style={{ fontFamily: "'Freckle Face', cursive" }}
              >
                {t("contact.founders")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-[#fcf5db] rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">L</span>
                    </div>
                    <h3 className="text-xl font-bold">V. Laura</h3>
                    <p className="text-muted-foreground mb-4">{t("contact.cofounder")}</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:vanky@winedrunkgame.com" className="text-primary hover:underline">
                        vanky@winedrunkgame.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-[#fcf5db] rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">M</span>
                    </div>
                    <h3 className="text-xl font-bold">D. Marton</h3>
                    <p className="text-muted-foreground mb-4">{t("contact.cofounder")}</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:delea@winedrunkgame.com" className="text-primary hover:underline">
                        delea@winedrunkgame.com
                      </a>
                    </div>
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
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
            Winedrunk
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Winedrunk. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  )
}
