"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../../contexts/language-context"
import { LanguageSwitcher } from "../../components/language-switcher"
import { useParams } from "next/navigation"

export default function PasswordPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const gameId = params.gameId as string

  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.toLowerCase() === "winedrunk") {
      router.push(`/jatekok/${gameId}/game`)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fcf5db]">
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

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Freckle Face', cursive" }}>
              Winedrunk
            </h1>

            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#fcf5db]">
              <Lock className="h-8 w-8" />
            </div>

            <p className="text-lg">
              {language === "hu" ? "Add meg a kódot a játék eléréséhez" : "Enter the code to access the game"}
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder={language === "hu" ? "Kód" : "Code"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`text-center text-lg ${error ? "border-red-500" : ""}`}
                />
                {error && (
                  <p className="text-red-500 text-sm">{language === "hu" ? "Helytelen kód" : "Incorrect code"}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {language === "hu" ? "Belépés" : "Enter"}
              </Button>
            </form>

            <div className="text-sm text-muted-foreground">
              {language === "hu"
                ? "A kód a termék csomagolásán található"
                : "The code can be found on the product packaging"}
            </div>
          </div>
        </div>
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
