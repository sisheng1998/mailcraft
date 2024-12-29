"use client"

import React, { useEffect } from "react"
import { useQueryState } from "nuqs"
import { useReadLocalStorage } from "usehooks-ts"

import { Email } from "@/types/email"
import { useEmail } from "@/hooks/use-email"
import { useIsMobile } from "@/hooks/use-mobile"
import { HOME_PAGE_CODE } from "@/components/email/constants"
import DesktopView from "@/components/home/desktop-view"
import MobileView from "@/components/home/mobile-view"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"

const Home = () => {
  const isMobile = useIsMobile()
  const { setCode } = useEmail()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))
  const email: Email | null = useReadLocalStorage(`email-${emailId}`)

  useEffect(() => {
    setCode(email?.code || HOME_PAGE_CODE)
  }, [email, setCode])

  return isMobile ? <MobileView /> : <DesktopView />
}

export default Home
