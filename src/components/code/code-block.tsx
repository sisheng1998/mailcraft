"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import LoadingIndicator from "@/components/loading-indicator"
import { highlighter } from "@/utils/editor/initialize-monaco-editor"

const CodeBlock = ({ code }: { code: string }) => {
  const { resolvedTheme } = useTheme()

  const [html, setHtml] = useState<string>()

  useEffect(() => {
    void (async () => {
      const html = (await highlighter).codeToHtml(code, {
        lang: "html",
        theme: resolvedTheme === "dark" ? "vs-dark" : "light",
      })

      setHtml(html)
    })()
  }, [code, resolvedTheme])

  return html !== undefined ? (
    <div
      className="code-preview absolute inset-0 flex flex-col text-sm sm:text-xs [&>pre]:flex-1 [&>pre]:overflow-auto [&>pre]:pt-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <LoadingIndicator />
  )
}

export default CodeBlock
