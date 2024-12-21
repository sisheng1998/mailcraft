import React from "react"

import AppHeader from "@/components/layouts/header/app-header"
import AppSidebar from "@/components/layouts/sidebar/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppSidebar />

    <div className="flex flex-1 flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  </>
)

export default Layout
