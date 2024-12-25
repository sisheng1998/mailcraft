"use client"

import React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import DesktopView from "@/components/home/desktop-view"
import MobileView from "@/components/home/mobile-view"

const Home = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileView /> : <DesktopView />
}

export default Home
