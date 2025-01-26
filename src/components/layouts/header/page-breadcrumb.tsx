"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useQueryState } from "nuqs"
import { useReadLocalStorage } from "usehooks-ts"

import { Email } from "@/types/email"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"

const PATHS = {
  "/": "Home",
}

const PageBreadcrumb = (
  props: React.ComponentPropsWithoutRef<typeof Breadcrumb>
) => {
  const pathname = usePathname()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))
  const currentEmail: Email | null = useReadLocalStorage(`email-${emailId}`)

  useEffect(() => {
    document.title = `${currentEmail ? `${currentEmail.name} | ` : ""}Mailcraft`
  }, [currentEmail])

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 break-all">
            {pathname === "/" && emailId
              ? currentEmail?.name || "Email"
              : PATHS[pathname as keyof typeof PATHS]}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default PageBreadcrumb
