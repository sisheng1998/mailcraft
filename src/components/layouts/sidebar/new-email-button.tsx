"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { v4 as uuid } from "uuid"
import { z } from "zod"

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

const formSchema = z.object({
  name: z.string().min(1, "Required"),
})

const NewEmailButton = ({ isIcon = false }: { isIcon?: boolean }) => {
  const { push } = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const id = uuid()

      window.localStorage.setItem(
        `email-${id}`,
        JSON.stringify({
          name: values.name,
          code: NEW_EMAIL_CODE,
        })
      )

      setOpen(false)
      toast.success("Email created!")

      push(`/email/${id}`)
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

      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>New Email</DialogTitle>

              <DialogDescription>
                The email will be saved locally in your browser
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
                <Button variant="ghost">Cancel</Button>
              </DialogClose>

              <LoaderButton
                type="submit"
                icon={Plus}
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
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
