"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import GitHub from "@/icons/GitHub"
import {
  BookOpen,
  ChevronRight,
  Home,
  LayoutTemplate,
  Moon,
  Plus,
  SquareArrowOutUpRight,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
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
    title: "Templates",
    url: "https://react.email/templates",
    icon: LayoutTemplate,
    isExternal: true,
  },
  {
    title: "GitHub",
    url: "https://github.com/sisheng1998/mailcraft",
    icon: GitHub,
    isExternal: true,
  },
]

export const NavPrimary = () => {
  const pathname = usePathname()

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel>
          Application
          <CollapsibleTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="-mr-1 ml-auto size-6"
            >
              <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </Button>
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => {
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.title} className="group-menu-item">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(isActive && "pointer-events-none")}
                    >
                      <Link
                        href={item.url}
                        target={item.isExternal ? "_blank" : "_self"}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        {item.isExternal && (
                          <SquareArrowOutUpRight className="ml-auto !size-3.5 text-muted-foreground opacity-0 group-hover/menu-item:opacity-100" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

// TODO: Display list of emails + redirect to email page
export const NavEmails = () => {
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

export const NavSecondary = (
  props: React.ComponentPropsWithoutRef<typeof SidebarGroup>
) => {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="capitalize"
              onClick={() =>
                setTheme(resolvedTheme === "light" ? "dark" : "light")
              }
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              {resolvedTheme} Mode
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
