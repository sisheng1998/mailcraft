"use client"

import React from "react"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"

import { useEmail } from "@/hooks/use-email"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import { parseAsType, TYPE_KEY, TYPES } from "@/constants/views"
import { FileMimeType } from "@/utils/download-file"

const CodePreview = () => {
  const { resolvedTheme } = useTheme()

  const { emailHtml, plainText } = useEmail()
  const [value, setValue] = useQueryState(
    TYPE_KEY,
    parseAsType.withDefault(TYPES[0].value)
  )

  const isPlainText = value === "plain-text"

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="flex flex-1 flex-col bg-background"
    >
      <div className="flex items-center justify-between gap-4 pr-4">
        <TabsList className="h-auto justify-start rounded-none bg-transparent p-0">
          {TYPES.map((type) => (
            <TabsTrigger
              key={type.value}
              value={type.value}
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
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
          className="mt-0 flex-1"
        >
          <Editor
            theme={resolvedTheme === "light" ? "vs" : "vs-dark"}
            className="[&_.monaco-editor]:absolute"
            defaultLanguage="html"
            value={type.value === "plain-text" ? plainText : emailHtml}
            path="file:///index.html"
            options={{
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
              readOnly: true,
              padding: {
                top: 8,
              },
            }}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default CodePreview
