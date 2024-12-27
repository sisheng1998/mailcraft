"use client"

import { useEffect, useState } from "react"

import { Email } from "@/types/email"
import { getAllEmails } from "@/lib/email"

const useAllEmails = (): Email[] => {
  const [emails, setEmails] = useState<Email[]>([])

  useEffect(() => {
    setEmails(getAllEmails())

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage) {
        setEmails(getAllEmails())
      }
    }

    window.addEventListener("storage", handleStorageChange)

    const originalSetItem = localStorage.setItem

    localStorage.setItem = (key: string, value: string) => {
      originalSetItem.apply(localStorage, [key, value])

      if (key.startsWith("email-")) {
        setEmails(getAllEmails())
      }
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      localStorage.setItem = originalSetItem
    }
  }, [])

  return emails
}

export default useAllEmails
