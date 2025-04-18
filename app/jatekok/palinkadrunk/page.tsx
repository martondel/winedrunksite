"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PalinkadrunkRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/jatekok/palinkadrunk/game")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to game...</p>
    </div>
  )
}
