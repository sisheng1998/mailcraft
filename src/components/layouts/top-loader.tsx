"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import Loader, { NextTopLoaderProps } from "nextjs-toploader"
import nProgress from "nprogress"

const TopLoader = (props: NextTopLoaderProps) => {
  const pathname = usePathname()

  useEffect(() => {
    nProgress.done()
  }, [pathname])

  return (
    <Loader
      {...props}
      height={2}
      zIndex={40}
      color="hsl(var(--primary))"
      showSpinner={false}
    />
  )
}

export default TopLoader
