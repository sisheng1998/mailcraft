"use client"

import {
  CheckCircle,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="font-sans"
      gap={10}
      icons={{
        info: <Info />,
        success: <CheckCircle />,
        warning: <TriangleAlert />,
        error: <OctagonX />,
        loading: <Loader2 className="size-[1.125rem] animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          info: cn("shadow-[var(--info-border)] dark:shadow-[var(--info-bg)]"),
          success: cn(
            "shadow-[var(--success-border)] dark:shadow-[var(--success-bg)]"
          ),
          warning: cn(
            "shadow-[var(--warning-border)] dark:shadow-[var(--warning-bg)]"
          ),
          error: cn(
            "shadow-[var(--error-border)] dark:shadow-[var(--error-bg)]"
          ),
          toast: cn(
            "group gap-2.5 border-border bg-background text-foreground shadow transition-[transform,opacity,height] duration-300"
          ),
          icon: cn("mx-0 size-5 [&>svg]:size-5"),
          title: cn("text-sm"),
          content: cn("gap-1"),
          description: cn("text-xs opacity-65"),
          closeButton: cn(
            "left-auto right-0 top-3 !border-transparent !bg-transparent opacity-0 transition-opacity hover:!opacity-100 group-hover:opacity-75 group-data-[type=loading]:hidden"
          ),
          actionButton: cn(
            "!bg-primary font-medium !text-primary-foreground transition hover:!bg-primary/90"
          ),
          cancelButton: cn(
            "!bg-muted font-medium !text-muted-foreground transition hover:!bg-muted/90"
          ),
        },
      }}
      pauseWhenPageIsHidden
      richColors
      closeButton
      {...props}
    />
  )
}

export { Toaster }
