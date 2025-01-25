"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useQueryState } from "nuqs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants, LoaderButton } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import { emailFormSchema } from "@/components/layouts/sidebar/new-email-button"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"

const NavEmailItem = ({ index, email }: { index: number; email: Email }) => {
  const isMobile = useIsMobile()
  const createQueryString = useCreateQueryString()

  const triggerEditRef = useRef<HTMLDivElement>(null)
  const triggerDeleteRef = useRef<HTMLDivElement>(null)

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))

  const isActive = emailId === email.id

  return (
    <SidebarMenuItem className="flex flex-col">
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
          <DropdownMenuItem onSelect={() => triggerEditRef.current?.click()}>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
            onSelect={() => triggerDeleteRef.current?.click()}
          >
            <Trash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDialog triggerRef={triggerEditRef} email={email} />

      <DeleteAlertDialog
        triggerRef={triggerDeleteRef}
        email={email}
        isActive={isActive}
      />
    </SidebarMenuItem>
  )
}

export default NavEmailItem

const EditDialog = ({
  triggerRef,
  email,
}: {
  triggerRef: React.RefObject<HTMLDivElement>
  email: Email
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const defaultValues = {
    name: email.name,
  }

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues,
  })

  const onSubmit = (values: z.infer<typeof emailFormSchema>) => {
    const name = values.name.trim()

    localStorage.setItem(
      `email-${email.id}`,
      JSON.stringify({
        ...email,
        name,
      })
    )

    window.dispatchEvent(
      new StorageEvent("local-storage", { key: `email-${email.id}` })
    )

    setOpen(false)
    toast.success(`"${name}" updated!`)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          form.reset(defaultValues)
          setTimeout(() => inputRef.current?.focus(), 0)
        }

        setOpen(open)
      }}
    >
      <DialogTrigger>
        <div ref={triggerRef} className="hidden" />
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Edit Email</DialogTitle>

              <DialogDescription>
                The email will be updated locally in your browser.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mailcraft Welcome Email"
                      {...field}
                      ref={inputRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mt-2 sm:mt-0">
                  Cancel
                </Button>
              </DialogClose>

              <LoaderButton
                type="submit"
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
              >
                Update
              </LoaderButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const DeleteAlertDialog = ({
  triggerRef,
  email,
  isActive,
}: {
  triggerRef: React.RefObject<HTMLDivElement>
  email: Email
  isActive: boolean
}) => {
  const { push } = useRouter()
  const createQueryString = useCreateQueryString()
  const queryString = createQueryString(EMAIL_ID_KEY, null)

  const handleDelete = () => {
    localStorage.removeItem(`email-${email.id}`)
    window.dispatchEvent(
      new StorageEvent("local-storage", { key: `email-${email.id}` })
    )

    toast.success(`"${email.name}" deleted!`)

    if (isActive) {
      push(queryString ? `/?${queryString}` : "/")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div ref={triggerRef} className="hidden" />
      </AlertDialogTrigger>

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
  )
}
