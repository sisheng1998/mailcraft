"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const ScreenSizeIndicator = ({
  iframeRef,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement>
}) => {
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  }>({
    width: iframeRef.current?.clientWidth || 0,
    height: iframeRef.current?.clientHeight || 0,
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (!iframeRef.current) return

      setDimensions({
        width: iframeRef.current.clientWidth,
        height: iframeRef.current.clientHeight,
      })
    }

    const resizeObserver = new ResizeObserver(updateDimensions)
    iframeRef.current && resizeObserver.observe(iframeRef.current)

    return () => resizeObserver.disconnect()
  }, [iframeRef])

  const { width, height } = dimensions

  return (
    <div className="flex items-center justify-center gap-2 border-b px-4 py-[0.9375rem] text-xs font-medium tracking-wider">
      <p>
        {width.toLocaleString()}px (W) x {height.toLocaleString()}px (H)
      </p>

      <span className="text-muted-foreground">-</span>

      {[
        { breakpoint: 0, label: "XS" },
        { breakpoint: 640, label: "SM" },
        { breakpoint: 768, label: "MD" },
        { breakpoint: 1024, label: "LG" },
        { breakpoint: 1280, label: "XL" },
        { breakpoint: 1536, label: "2XL" },
      ].map(({ breakpoint, label }, index, array) => {
        const isVisible =
          width >= breakpoint &&
          (index === array.length - 1 || width < array[index + 1].breakpoint)

        return (
          <p key={label} className={cn(!isVisible && "hidden")}>
            {label}
          </p>
        )
      })}
    </div>
  )
}

export default ScreenSizeIndicator
