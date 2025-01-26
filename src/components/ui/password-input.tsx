"use client"

import React, { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...props }, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        ref={ref}
        className="pr-10"
      />

      <div className="absolute inset-y-0 right-1.5 flex cursor-pointer items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={(event) => {
                event.preventDefault()
                toggleVisibility()
              }}
            >
              {isVisible ? <Eye /> : <EyeOff />}
            </Button>
          </TooltipTrigger>

          <TooltipContent
            side="top"
            onPointerDownOutside={(event) => event.preventDefault()}
          >
            {isVisible ? "Hide" : "Show"}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
