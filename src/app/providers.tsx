import React from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import ThemeProvider from "@/components/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
  </ThemeProvider>
)

export default Providers
