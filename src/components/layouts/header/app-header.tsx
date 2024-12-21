import React from "react"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import PageBreadcrumb from "@/components/layouts/header/page-breadcrumb"
import PreviewMode from "@/components/layouts/header/preview-mode"
import SendEmailButton from "@/components/layouts/header/send-email-button"

const AppHeader = () => (
  <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3.5 border-b bg-sidebar px-4">
    <SidebarTrigger className="-mx-1.5" />

    <Separator orientation="vertical" className="h-6" />

    <PageBreadcrumb className="flex-1" />

    <div className="flex items-center gap-3.5">
      <PreviewMode />
      <SendEmailButton />
    </div>
  </header>
)

export default AppHeader
