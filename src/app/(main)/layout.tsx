import React from "react"

import AppSidebar from "@/components/layouts/app-sidebar"
import Header from "@/components/layouts/header"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppSidebar />

    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  </>
)

export default Layout
