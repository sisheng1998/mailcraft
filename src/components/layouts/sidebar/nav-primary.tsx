"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  ChevronRight,
  Home,
  LayoutTemplate,
  SquareArrowOutUpRight,
} from "lucide-react"
import { useQueryState } from "nuqs"

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
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"
import GitHub from "@/icons/GitHub"

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

const NavPrimary = () => {
  const pathname = usePathname()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))

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
                const isActive = pathname === item.url && !emailId

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

export default NavPrimary
