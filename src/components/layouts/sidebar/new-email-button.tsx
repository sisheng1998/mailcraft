"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { v4 as uuid } from "uuid"
import { z } from "zod"

import { Email } from "@/types/email"
import useCreateQueryString from "@/hooks/use-create-query-string"
import { Button, LoaderButton } from "@/components/ui/button"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NEW_EMAIL_CODE } from "@/components/email/constants"
import { EMAIL_ID_KEY } from "@/constants/email"

export const emailFormSchema = z.object({
  name: z.string().min(1, "Required"),
})

const NewEmailButton = ({ isIcon = false }: { isIcon?: boolean }) => {
  const { push } = useRouter()
  const createQueryString = useCreateQueryString()

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: z.infer<typeof emailFormSchema>) => {
    try {
      const id = uuid()
      const name = values.name.trim()

      const email: Email = {
        id,
        name,
        code: NEW_EMAIL_CODE,
        recipient: "",
        subject: "",
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(`email-${id}`, JSON.stringify(email))
      window.dispatchEvent(
        new StorageEvent("local-storage", { key: `email-${id}` })
      )

      setOpen(false)
      push(`/?${createQueryString(EMAIL_ID_KEY, id)}`)

      toast.success(`Email "${name}" created!`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        open && form.reset()
        setOpen(open)
      }}
    >
      {isIcon ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="size-6">
                <Plus />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent side="right">New Email</TooltipContent>
        </Tooltip>
      ) : (
        <SidebarMenuItem>
          <DialogTrigger asChild>
            <SidebarMenuButton>
              <Plus />
              <span>New Email</span>
            </SidebarMenuButton>
          </DialogTrigger>
        </SidebarMenuItem>
      )}

      <DialogContent onCloseAutoFocus={(event) => event.preventDefault()}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>New Email</DialogTitle>

              <DialogDescription>
                The email will be saved locally in your browser.
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
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <LoaderButton
                type="submit"
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
              >
                Create
              </LoaderButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewEmailButton
