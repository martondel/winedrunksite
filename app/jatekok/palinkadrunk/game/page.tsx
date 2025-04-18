"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectToNewPalinkadrunk() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/palinkadrunk")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcf5db]">
      <p>Redirecting to PÁLINKADRUNK game...</p>
    </div>
  )
}
