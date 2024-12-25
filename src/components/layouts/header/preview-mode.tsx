"use client"

import React from "react"
import { useQueryState } from "nuqs"

import { useIsMobile } from "@/hooks/use-mobile"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { parseAsView, VIEW_KEY, VIEWS } from "@/constants/views"

const PreviewMode = () => {
  const isMobile = useIsMobile()

  const [view, setView] = useQueryState(
    VIEW_KEY,
    parseAsView.withDefault(VIEWS[0].value)
  )

  if (isMobile) return null

  return (
    <Tabs value={view} onValueChange={setView}>
      <TabsList>
        {VIEWS.map((view) => (
          <Tooltip key={view.value}>
            <TabsTrigger value={view.value} className="px-2.5 py-1.5" asChild>
              <TooltipTrigger>
                <view.icon className="size-4" />
              </TooltipTrigger>
            </TabsTrigger>

            <TooltipContent side="bottom">{view.title}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default PreviewMode
