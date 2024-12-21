"use client"

import { CodeXml, Monitor, Smartphone } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ITEMS = [
  {
    title: "Desktop",
    icon: Monitor,
  },
  {
    title: "Mobile",
    icon: Smartphone,
  },
  {
    title: "Code",
    icon: CodeXml,
  },
]

// TODO: Link to email page
// TODO: Handle mobile view
const PreviewMode = () => {
  return (
    <Tabs defaultValue={ITEMS[0].title}>
      <TabsList>
        {ITEMS.map((item) => (
          <Tooltip key={item.title}>
            <TabsTrigger value={item.title} className="px-2.5 py-1.5" asChild>
              <TooltipTrigger>
                <item.icon className="size-4" />
              </TooltipTrigger>
            </TabsTrigger>

            <TooltipContent side="bottom">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default PreviewMode
