import React from "react"
import Link from "next/link"
import { Heart, Mail } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  NavEmails,
  NavPrimary,
  NavSecondary,
} from "@/components/layouts/sidebar-components"

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => (
  <Sidebar {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-start px-2 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center">
              <Mail className="size-6" />
            </div>
            <span className="text-sm font-bold">React Email Editor</span>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent className="[&>[data-sidebar=group]:first-of-type]:pt-0">
      <NavPrimary />
      <NavEmails />
      <NavSecondary className="mt-auto" />
    </SidebarContent>

    <SidebarFooter>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="gap-2.5">
            <SidebarMenuItem className="text-xs">
              Made with
              <Heart className="mx-1 mb-1 inline size-3.5" />
              by{" "}
              <Link
                href="https://sisheng.my"
                target="_blank"
                className="underline"
              >
                Sheng
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem className="text-xs">
              © {new Date().getFullYear()} - All Rights Reserved
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
)

export default AppSidebar
