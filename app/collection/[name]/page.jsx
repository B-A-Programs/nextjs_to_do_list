'use client'

import { useParams } from "next/navigation"

export default function Home() {
  const params = useParams()
  const name = params.name

  return (
    <h1 className="head_text">{ name }</h1>
  )
}