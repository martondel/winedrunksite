"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./contexts/language-context"

export default function NotFound() {
  const { language } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcf5db]">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
            404
          </h1>
          <h2 className="text-3xl font-bold">{language === "hu" ? "Az oldal nem található" : "Page Not Found"}</h2>
          <p className="text-muted-foreground">
            {language === "hu"
              ? "Sajnáljuk, a keresett oldal nem található."
              : "Sorry, we couldn't find the page you're looking for."}
          </p>
        </div>
        <Link href="/">
          <Button>{language === "hu" ? "Vissza a főoldalra" : "Go back home"}</Button>
        </Link>
      </div>
    </div>
  )
}
