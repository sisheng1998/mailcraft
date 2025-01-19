"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useQueryState } from "nuqs"

import { useEmail } from "@/hooks/use-email"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import PreviewContainer from "@/components/preview-container"
import { parseAsType, TYPE_KEY, TYPES } from "@/constants/views"
import { FileMimeType } from "@/utils/download-file"

const CodeBlock = dynamic(() => import("@/components/code/code-block"), {
  ssr: false,
})

const CodePreview = () => {
  const { emailHtml, plainText } = useEmail()
  const [type, setType] = useQueryState(
    TYPE_KEY,
    parseAsType.withDefault(TYPES[0].value)
  )

  const isPlainText = type === "plain-text"

  return (
    <PreviewContainer>
      <Tabs
        value={type}
        onValueChange={setType}
        className="flex flex-1 flex-col bg-background"
      >
        <div className="flex items-center justify-between gap-4 border-b pr-4">
          <TabsList variant="outline">
            {TYPES.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="-mr-1.5 flex items-center gap-0.5">
            <DownloadFile
              content={isPlainText ? plainText : emailHtml}
              filename={`email.${isPlainText ? "txt" : "html"}`}
              mimeType={isPlainText ? FileMimeType.TEXT : FileMimeType.HTML}
            />

            <CopyToClipboard content={isPlainText ? plainText : emailHtml} />
          </div>
        </div>

        {TYPES.map((type) => (
          <TabsContent
            key={type.value}
            value={type.value}
            className="relative mt-0 flex-1"
          >
            <CodeBlock
              code={type.value === "plain-text" ? plainText : emailHtml}
            />
          </TabsContent>
        ))}
      </Tabs>
    </PreviewContainer>
  )
}

export default CodePreview
