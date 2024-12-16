"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"

import { HOME_PAGE_CODE } from "@/components/email/constants"

interface EmailContextType {
  value: string
  setValue: (value: string) => void
}

const EmailContext = createContext<EmailContextType | undefined>(undefined)

interface EmailProviderProps {
  children: ReactNode
}

const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string>(HOME_PAGE_CODE)

  return (
    <EmailContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </EmailContext.Provider>
  )
}

const useEmail = (): EmailContextType => {
  const context = useContext(EmailContext)

  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider")
  }

  return context
}

export { EmailProvider, useEmail }
