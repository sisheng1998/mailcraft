import React from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layouts/app-sidebar"
import Header from "@/components/layouts/header"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppSidebar />

    <SidebarInset>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </SidebarInset>
  </>
)

export default Layout
