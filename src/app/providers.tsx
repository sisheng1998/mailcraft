"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"

import {
  SIDEBAR_LOCAL_STORAGE_DEFAULT_VALUE,
  SIDEBAR_LOCAL_STORAGE_NAME,
  SidebarProvider,
} from "@/components/ui/sidebar"
import ThemeProvider from "@/components/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [sidebarState] = useLocalStorage(
    SIDEBAR_LOCAL_STORAGE_NAME,
    SIDEBAR_LOCAL_STORAGE_DEFAULT_VALUE
  )

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <SidebarProvider defaultOpen={sidebarState === "expanded"}>
        {isClient ? children : null}
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default Providers
