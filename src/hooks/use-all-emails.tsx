"use client"

import { useState } from "react"
import { useEventListener } from "usehooks-ts"

import { Email } from "@/types/email"
import { getAllEmails } from "@/lib/email"

const useAllEmails = (): Email[] => {
  const [emails, setEmails] = useState<Email[]>(() => getAllEmails())

  const handleStorageChange = (event: StorageEvent | CustomEvent) => {
    if (!(event as StorageEvent).key?.startsWith("email-")) return
    setEmails(getAllEmails())
  }

  useEventListener("storage", handleStorageChange)
  useEventListener("local-storage", handleStorageChange)

  return emails
}

export default useAllEmails
