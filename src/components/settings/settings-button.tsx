"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Settings } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useLocalStorage } from "usehooks-ts"

import {
  settingsFormSchema,
  Settings as SettingsType,
  testConnection,
} from "@/lib/settings"
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
import { decrypt, encrypt } from "@/utils/crypto"

const SettingsButton = () => {
  const [settings, setSettings] = useLocalStorage<SettingsType>(
    "settings",
    {
      modelName: "",
      baseURL: "",
      apiKey: "",
    },
    {
      deserializer: (value) => {
        const settings = JSON.parse(value)

        return {
          ...settings,
          apiKey: decrypt(settings.apiKey),
        }
      },
    }
  )

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<SettingsType>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: settings,
  })

  const onSubmit = async (values: SettingsType) => {
    try {
      const modelName = values.modelName.trim()
      const baseURL = values.baseURL.trim()
      const apiKey = values.apiKey.trim()

      const settings: SettingsType = {
        modelName,
        baseURL,
        apiKey,
      }

      await testConnection(settings)

      setSettings({
        ...settings,
        apiKey: encrypt(apiKey),
      })
      setOpen(false)

      toast.success("Settings saved!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        open && form.reset(settings)
        setOpen(open)
      }}
    >
      <SidebarMenuItem>
        <DialogTrigger asChild>
          <SidebarMenuButton>
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </DialogTrigger>
      </SidebarMenuItem>

      <DialogContent onCloseAutoFocus={(event) => event.preventDefault()}>
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>

              <DialogDescription>
                The settings will be saved locally in your browser.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="modelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="gpt-4o" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baseURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://models.inference.ai.azure.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="ghp_1234" type="password" {...field} />
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
                Save
              </LoaderButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsButton
