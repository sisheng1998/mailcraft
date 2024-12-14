"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Component,
  Home,
  LayoutTemplate,
  Plus,
  SquareArrowOutUpRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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

const ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    isExternal: false,
  },
  {
    title: "Documentation",
    url: "https://react.email/docs/introduction",
    icon: BookOpen,
    isExternal: true,
  },
  {
    title: "Components",
    url: "https://react.email/components",
    icon: Component,
    isExternal: true,
  },
  {
    title: "Templates",
    url: "https://react.email/templates",
    icon: LayoutTemplate,
    isExternal: true,
  },
]

export const ApplicationMenu = () => {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {ITEMS.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link
                  href={item.url}
                  target={item.isExternal ? "_blank" : "_self"}
                >
                  <item.icon />
                  <span>{item.title}</span>
                  {item.isExternal && (
                    <SquareArrowOutUpRight className="ml-auto !size-3.5 text-muted-foreground" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export const EmailSelectionMenu = () => {
  const emails = []

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Emails
        {emails.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="-mr-1 ml-auto size-6"
              >
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">New Email</TooltipContent>
          </Tooltip>
        )}
      </SidebarGroupLabel>

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
    </SidebarGroup>
  )
}
