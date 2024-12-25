"use client"

import React from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import NewEmailButton from "@/components/layouts/sidebar/new-email-button"

const NavEmails = () => {
  const emails = []

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel>
          Emails
          <div className="-mr-1 ml-auto flex items-center gap-0.5">
            {emails.length > 0 && <NewEmailButton isIcon />}

            <CollapsibleTrigger asChild>
              <Button size="icon" variant="ghost" className="size-6">
                <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </Button>
            </CollapsibleTrigger>
          </div>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {emails.length === 0 && <NewEmailButton />}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

export default NavEmails
