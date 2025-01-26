"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info, Sparkles, TriangleAlert } from "lucide-react"
import { useQueryState } from "nuqs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts"
import { z } from "zod"

import { Email } from "@/types/email"
import { generateEmailTemplate } from "@/lib/ai"
import { useEmail } from "@/hooks/use-email"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Settings } from "@/components/settings/settings-button"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"
import { decrypt } from "@/utils/crypto"

const formSchema = z.object({
  prompt: z.string().min(1, "Required"),
})

const GenerateCode = () => {
  const { setCode } = useEmail()
  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))
  const [email, setEmail] = useLocalStorage<Email | null>(
    `email-${emailId}`,
    null
  )

  const settings = useReadLocalStorage<Settings>("settings", {
    deserializer: (value) => {
      const settings = JSON.parse(value)

      return {
        ...settings,
        apiKey: decrypt(settings.apiKey),
      }
    },
  })

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!settings) return

    try {
      const prompt = values.prompt.trim()

      const code = await generateEmailTemplate({
        prompt,
        ...settings,
      })

      email ? setEmail({ ...email, code }) : setCode(code)
      setOpen(false)

      toast.success("Code generated!")
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
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sparkles />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom">Generate Code with AI</TooltipContent>
      </Tooltip>

      <DialogContent onCloseAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Generate Code with AI</DialogTitle>

          <DialogDescription>
            Generate code based on the provided prompt.
          </DialogDescription>
        </DialogHeader>

        {!settings ? (
          <SetupRequired />
        ) : (
          <Form {...form}>
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Alert>
                <Info className="-mt-1 size-4" />
                <AlertTitle>Heads Up!</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  The existing code will be overwritten.
                </AlertDescription>
              </Alert>

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-24"
                        placeholder="Write a friendly welcome email to introduce new users to Mailcraft, an online email template editor."
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
                  <Button variant="outline" className="mt-2 sm:mt-0">
                    Cancel
                  </Button>
                </DialogClose>

                <LoaderButton
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                >
                  Generate
                </LoaderButton>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default GenerateCode

const SetupRequired = () => (
  <>
    <Alert>
      <TriangleAlert className="-mt-1 size-4" />
      <AlertTitle>Setup Required</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        To use this feature, kindly set up your AI configuration under{" "}
        <span className="font-medium text-foreground">
          Sidebar {`>`} Settings
        </span>
        .
      </AlertDescription>
    </Alert>

    <DialogFooter>
      <DialogClose asChild>
        <Button>Okay</Button>
      </DialogClose>
    </DialogFooter>
  </>
)
