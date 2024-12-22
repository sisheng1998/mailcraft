"use client"

import React, { useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { editor } from "monaco-editor"

import { useEmail } from "@/hooks/use-email"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const FormatCode = ({
  editor,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
  editor: editor.IStandaloneCodeEditor
}) => {
  const { code } = useEmail()

  const [isFormatted, setIsFormatted] = useState<boolean>(false)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()

    if (isFormatted) return

    editor.getAction("editor.action.formatDocument")?.run()

    setIsFormatted(true)
    setTimeout(() => setIsFormatted(false), 2000)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          disabled={code.trim() === ""}
          {...props}
        >
          {isFormatted ? <Check /> : <Sparkles />}
        </Button>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        {isFormatted ? "Formatted" : "Format Code"}
      </TooltipContent>
    </Tooltip>
  )
}

export default FormatCode
