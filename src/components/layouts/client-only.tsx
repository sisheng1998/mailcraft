"use client"

import React, { useEffect, useState } from "react"

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? children : null
}

export default ClientOnly
