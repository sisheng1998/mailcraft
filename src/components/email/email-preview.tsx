"use client"

import React from "react"
import { useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { useEmail } from "@/hooks/use-email"
import { useIsMobile } from "@/hooks/use-mobile"
import PreviewContainer from "@/components/preview-container"
import { parseAsView, VIEW_KEY, VIEWS } from "@/constants/views"

const EmailPreview = () => {
  const isMobile = useIsMobile()

  const [view] = useQueryState(
    VIEW_KEY,
    parseAsView.withDefault(VIEWS[0].value)
  )

  const { previewHtml } = useEmail()

  return (
    <PreviewContainer>
      {previewHtml && (
        <iframe
          srcDoc={previewHtml}
          title="Email Preview"
          className={cn(
            "h-full w-full border-0 bg-white",
            !isMobile && view === "mobile" && "mx-auto max-w-[360px]"
          )}
          sandbox="allow-popups"
        />
      )}
    </PreviewContainer>
  )
}

export default EmailPreview
