import React from "react"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/layouts/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-sidebar px-4">
        <SidebarTrigger className="-ml-1" />
      </header>

      <main className="flex-1">{children}</main>
    </SidebarInset>
  </SidebarProvider>
)

export default Layout
