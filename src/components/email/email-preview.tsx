"use client"

import React from "react"

import { useEmail } from "@/hooks/use-email"
import ErrorMessage from "@/components/email/error-message"
import LoadingIndicator from "@/components/loading-indicator"

const EmailPreview = () => {
  const { previewHtml, initialized, error } = useEmail()

  return (
    <div className="relative flex h-full flex-col bg-white">
      {!initialized && <LoadingIndicator />}

      {previewHtml && (
        <iframe
          srcDoc={previewHtml}
          title="Email Preview"
          className="h-full w-full border-0 bg-white"
          sandbox="allow-popups"
        />
      )}

      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default EmailPreview
