"use client"

import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

// TODO: Display name for the email page
const PageBreadcrumb = (
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

export default PageBreadcrumb
