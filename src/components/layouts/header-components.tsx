"use client"

import { usePathname } from "next/navigation"
import { CodeXml, Monitor, Smartphone } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// TODO: Display name for the email page
export const PageBreadcrumb = (
  props: React.ComponentPropsWithoutRef<typeof Breadcrumb>
) => {
  const pathname = usePathname()

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{pathname === "/" ? "Home" : "Email"}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

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
export const PreviewMode = () => {
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

// TODO: Handle send email
export const SendButton = () => {
  return <Button>Send</Button>
}
