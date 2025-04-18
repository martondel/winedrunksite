"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcf5db]">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold" style={{ fontFamily: "'Freckle Face', cursive" }}>
            Oops!
          </h1>
          <h2 className="text-3xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">An error occurred. Please try again or go back to the home page.</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={reset}>Try again</Button>
          <Link href="/">
            <Button variant="outline">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
