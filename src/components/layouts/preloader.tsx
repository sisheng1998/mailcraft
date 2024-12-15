"use client"

import React, { useEffect, useState } from "react"
import { Mail } from "lucide-react"

import { cn } from "@/lib/utils"

const Preloader = () => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background opacity-100 transition-opacity duration-500",
        isAnimated && "pointer-events-none opacity-0"
      )}
    >
      <Mail className="animate-logo size-24" />
    </div>
  )
}

export default Preloader
