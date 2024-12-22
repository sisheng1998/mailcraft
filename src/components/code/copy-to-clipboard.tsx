"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CopyToClipboard = ({
  content,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & { content: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()

    if (isCopied) return

    await navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          disabled={content.trim() === ""}
          {...props}
        >
          {isCopied ? <Check /> : <Copy />}
        </Button>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        {isCopied ? "Copied to Clipboard" : "Copy"}
      </TooltipContent>
    </Tooltip>
  )
}

export default CopyToClipboard
