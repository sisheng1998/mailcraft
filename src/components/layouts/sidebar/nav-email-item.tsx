"use client"

import React from "react"
import Link from "next/link"
import { FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useQueryState } from "nuqs"

import { Email } from "@/types/email"
import { cn } from "@/lib/utils"
import useCreateQueryString from "@/hooks/use-create-query-string"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"

// TODO: Add edit and delete actions

const NavEmailItem = ({ index, email }: { index: number; email: Email }) => {
  const isMobile = useIsMobile()
  const createQueryString = useCreateQueryString()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))

  const isActive = emailId === email.id

  return (
    <SidebarMenuItem key={email.id}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(isActive && "pointer-events-none")}
      >
        <Link href={`/?${createQueryString(EMAIL_ID_KEY, email.id)}`}>
          <FileText />
          <span>{email.name || `Email #${index + 1}`}</span>
        </Link>
      </SidebarMenuButton>

      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <SidebarMenuAction
                className="mr-0.5 !text-muted-foreground hover:!text-foreground"
                showOnHover
              >
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </TooltipTrigger>
          </DropdownMenuTrigger>

          <TooltipContent side="right">Options</TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          side={isMobile ? "bottom" : "bottom"}
          align={isMobile ? "end" : "start"}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenuItem>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive hover:!bg-destructive hover:!text-destructive-foreground">
            <Trash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

export default NavEmailItem
