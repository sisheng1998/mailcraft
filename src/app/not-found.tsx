"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

const NotFound = () => {
  useEffect(() => {
    redirect("/")
  }, [])

  return null
}

export default NotFound
