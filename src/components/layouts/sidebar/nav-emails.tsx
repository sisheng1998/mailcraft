"use client"

import React from "react"
import { ChevronRight, Plus } from "lucide-react"

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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// TODO: Display list of emails + redirect to email page
const NavEmails = () => {
  const emails = []

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel>
          Emails
          <div className="-mr-1 ml-auto flex items-center gap-0.5">
            {emails.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="size-6">
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">New Email</TooltipContent>
              </Tooltip>
            )}

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
              {emails.length === 0 && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Plus />
                    <span>New Email</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

export default NavEmails
