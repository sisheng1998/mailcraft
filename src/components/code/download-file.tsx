"use client"

import React, { useState } from "react"
import { Check, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { downloadFile, FileMimeType } from "@/utils/download-file"

const DownloadFile = ({
  content,
  filename,
  mimeType,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
  content: string
  filename: string
  mimeType: FileMimeType
}) => {
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()

    if (isDownloaded) return

    downloadFile(content, filename, mimeType)

    setIsDownloaded(true)
    setTimeout(() => setIsDownloaded(false), 2000)
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
          {isDownloaded ? <Check /> : <Download />}
        </Button>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        {isDownloaded ? "Downloaded" : "Download"}
      </TooltipContent>
    </Tooltip>
  )
}

export default DownloadFile
