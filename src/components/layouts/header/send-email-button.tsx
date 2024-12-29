"use client"

import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useQueryState } from "nuqs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useLocalStorage } from "usehooks-ts"
import { z } from "zod"

import { Email } from "@/types/email"
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
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"

const formSchema = z.object({
  recipient: z.string().min(1, "Required").email("Invalid email"),
  subject: z.string().min(1, "Required"),
})

const SendEmailButton = () => {
  const { emailHtml, error } = useEmail()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))
  const [email, setEmail] = useLocalStorage<Email | null>(
    `email-${emailId}`,
    null
  )

  const defaultValues = {
    recipient: email?.recipient || "",
    subject: email?.subject || "Testing Mailcraft Email",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const to = values.recipient.trim()
      const subject = values.subject.trim()

      await sendTestEmail({
        to,
        subject,
        html: emailHtml,
      })

      if (email) {
        setEmail({
          ...email,
          recipient: to,
          subject,
        })
      }

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
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoFocus
                      {...field}
                    />
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
              disabled={!!error || form.formState.isSubmitting}
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
