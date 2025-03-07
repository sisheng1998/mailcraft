"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useQueryState } from "nuqs"

import { useEmail } from "@/hooks/use-email"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodePreview from "@/components/code/code-preview"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import GenerateCode from "@/components/code/generate-code"
import EmailPreview from "@/components/email/email-preview"
import { MODE_KEY, MODES, parseAsMode } from "@/constants/views"
import { FileMimeType } from "@/utils/download-file"

const CodeEditor = dynamic(() => import("@/components/code/code-editor"), {
  ssr: false,
})

const MobileView = () => {
  const { code } = useEmail()

  const [mode, setMode] = useQueryState(
    MODE_KEY,
    parseAsMode.withDefault(MODES[0].value)
  )

  const isEditor = mode === "editor"

  return (
    <Tabs
      value={mode}
      onValueChange={setMode}
      className="flex flex-1 flex-col bg-background"
    >
      <div className="flex items-center justify-between gap-4 border-b pr-4">
        <TabsList variant="outline">
          {MODES.map((mode) => (
            <TabsTrigger key={mode.value} value={mode.value}>
              {mode.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {isEditor && (
          <div className="-mr-1.5 flex items-center gap-0.5">
            <GenerateCode />

            <DownloadFile
              content={code}
              filename="email.tsx"
              mimeType={FileMimeType.TSX}
            />

            <CopyToClipboard content={code} />
          </div>
        )}
      </div>

      {MODES.map((mode) => (
        <TabsContent
          key={mode.value}
          value={mode.value}
          className="mt-0 flex-1"
        >
          {mode.value === "editor" && <CodeEditor />}
          {mode.value === "preview" && <EmailPreview />}
          {mode.value === "code" && <CodePreview />}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default MobileView
