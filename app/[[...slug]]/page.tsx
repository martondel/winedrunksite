import { notFound } from "next/navigation"

export default function CatchAllRoute() {
  // This will trigger the 404 page
  notFound()
}
