"use client"

import React from "react"
import { useLocalStorage } from "usehooks-ts"

import {
  SIDEBAR_LOCAL_STORAGE_DEFAULT_VALUE,
  SIDEBAR_LOCAL_STORAGE_NAME,
  SidebarProvider,
} from "@/components/ui/sidebar"
import ClientOnly from "@/components/layouts/client-only"
import ThemeProvider from "@/components/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [sidebarState] = useLocalStorage(
    SIDEBAR_LOCAL_STORAGE_NAME,
    SIDEBAR_LOCAL_STORAGE_DEFAULT_VALUE
  )
  const defaultOpen = sidebarState === "expanded"

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <SidebarProvider defaultOpen={defaultOpen}>
        <ClientOnly>{children}</ClientOnly>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default Providers
