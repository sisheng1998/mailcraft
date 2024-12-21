"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { sendTestEmail } from "@/lib/email"
import { useEmail } from "@/hooks/use-email"
import { Button, LoaderButton } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
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

const formSchema = z.object({
  recipient: z.string().min(1, "Required").email("Invalid email"),
  subject: z.string().min(1, "Required"),
})

const SendEmailButton = () => {
  const { emailHtml, error } = useEmail()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      subject: "Testing React Email",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendTestEmail({
        to: values.recipient,
        subject: values.subject,
        html: emailHtml,
      })

      toast.success("Email sent! Check your inbox.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <DropdownMenu onOpenChange={(open) => open && form.clearErrors()}>
      <DropdownMenuTrigger asChild>
        <Button>Send</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-80 p-3" align="end">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="My Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoaderButton
              type="submit"
              className="mt-1 self-start"
              icon={Mail}
              disabled={
                !!error ||
                !form.formState.isValid ||
                form.formState.isSubmitting
              }
              isLoading={form.formState.isSubmitting}
            >
              Send
            </LoaderButton>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SendEmailButton
