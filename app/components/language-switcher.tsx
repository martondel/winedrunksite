"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "../contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "hu" ? "en" : "hu")
  }

  return (
    <Button onClick={toggleLanguage} variant="outline">
      {t("nav.language")}
    </Button>
  )
}
