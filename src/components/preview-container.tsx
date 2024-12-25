"use client"

import React from "react"

import { useEmail } from "@/hooks/use-email"
import ErrorMessage from "@/components/email/error-message"
import LoadingIndicator from "@/components/loading-indicator"

const PreviewContainer = ({ children }: { children: React.ReactNode }) => {
  const { initialized, error } = useEmail()

  return (
    <div className="relative flex h-full flex-col">
      {!initialized && <LoadingIndicator />}

      {children}

      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default PreviewContainer
