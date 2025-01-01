"use client"

import React, { useRef } from "react"
import { useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { useEmail } from "@/hooks/use-email"
import { useIsMobile } from "@/hooks/use-mobile"
import ScreenSizeIndicator from "@/components/email/screen-size-indicator"
import PreviewContainer from "@/components/preview-container"
import { parseAsView, VIEW_KEY, VIEWS } from "@/constants/views"

const EmailPreview = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isMobile = useIsMobile()

  const [view] = useQueryState(
    VIEW_KEY,
    parseAsView.withDefault(VIEWS[0].value)
  )

  const { previewHtml } = useEmail()

  return (
    <PreviewContainer>
      <ScreenSizeIndicator iframeRef={iframeRef} />

      <iframe
        ref={iframeRef}
        srcDoc={previewHtml}
        title="Email Preview"
        className={cn(
          "h-full w-full border-0 bg-white",
          !isMobile && view === "mobile" && "mx-auto max-w-[360px]"
        )}
        sandbox="allow-popups"
      />
    </PreviewContainer>
  )
}

export default EmailPreview
