import React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import ClientOnly from "@/components/layouts/client-only"
import ThemeProvider from "@/components/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <SidebarProvider>
      <ClientOnly>{children}</ClientOnly>
    </SidebarProvider>
  </ThemeProvider>
)

export default Providers
