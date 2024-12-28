"use client"

import { useEffect } from "react"

// https://github.com/radix-ui/primitives/issues/3141

const RadixDialogProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const body = document.body

    const forceResetScroll = () => {
      if (body.hasAttribute("data-scroll-locked")) {
        body.removeAttribute("data-scroll-locked")
        body.style.pointerEvents = ""
        body.style.removeProperty("padding-right")
        body.style.removeProperty("overflow")
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-scroll-locked") {
          forceResetScroll()
        }
      })
    })

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    })

    forceResetScroll()

    return () => {
      observer.disconnect()
      forceResetScroll()
    }
  }, [])

  return children
}

export default RadixDialogProvider
