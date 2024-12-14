import React from "react"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layouts/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppSidebar />

    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-sidebar px-4">
        <SidebarTrigger />
      </header>

      <main className="flex-1">{children}</main>
    </SidebarInset>
  </>
)

export default Layout
