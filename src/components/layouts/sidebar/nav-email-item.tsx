"use client"

import React, { useState } from "react"
import Link from "next/link"
import { FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useQueryState } from "nuqs"

import { Email } from "@/types/email"
import { cn } from "@/lib/utils"
import useCreateQueryString from "@/hooks/use-create-query-string"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
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

// TODO: Add edit actions

const NavEmailItem = ({ index, email }: { index: number; email: Email }) => {
  const { push } = useRouter()

  const isMobile = useIsMobile()
  const createQueryString = useCreateQueryString()

  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] =
    useState<boolean>(false)

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))

  const isActive = emailId === email.id

  const handleDelete = () => {
    localStorage.removeItem(`email-${email.id}`)

    if (isActive) {
      push(`/?${createQueryString(EMAIL_ID_KEY, null)}`)
    }
  }

  return (
    <SidebarMenuItem>
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

          <DropdownMenuItem
            className="text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
            onSelect={() => setOpenDeleteAlertDialog(true)}
          >
            <Trash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={openDeleteAlertDialog}
        onOpenChange={setOpenDeleteAlertDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Email?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="break-all font-bold text-foreground">{`"${email.name}"`}</span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarMenuItem>
  )
}

export default NavEmailItem
