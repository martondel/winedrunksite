import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { LanguageProvider } from "./contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Winedrunk - Online Ivós Játékok",
  description: "Kapcsolódj barátaiddal és élvezd szórakoztató, interaktív ivós játékaink gyűjteményét bárhonnan.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Freckle+Face&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'