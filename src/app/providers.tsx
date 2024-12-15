import React from "react"

import { CodeEditorProvider } from "@/hooks/use-code-editor"
import { SidebarProvider } from "@/components/ui/sidebar"
import ClientOnly from "@/components/layouts/client-only"
import Preloader from "@/components/layouts/preloader"
import TopLoader from "@/components/layouts/top-loader"
import ThemeProvider from "@/components/theme-provider"

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <Preloader />

    <SidebarProvider>
      <TopLoader />
      <CodeEditorProvider>
        <ClientOnly>{children}</ClientOnly>
      </CodeEditorProvider>
    </SidebarProvider>
  </ThemeProvider>
)

export default Providers
