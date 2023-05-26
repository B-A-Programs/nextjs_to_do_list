'use client'

import Tasks from "@components/Tasks"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const params = useParams()
  const name = params.name

  return (
    <div className="mt-6 px-12">
      <h1 className="head_title text-center">Manage your <span className="text-orange-500">{name}</span> tasks</h1>

      <Tasks name={name} />
    </div>
  )
}

