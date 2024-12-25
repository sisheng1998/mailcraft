"use client"

import React from "react"
import { useIsClient } from "usehooks-ts"

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient()
  return isClient ? children : null
}

export default ClientOnly
