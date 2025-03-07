"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useQueryState } from "nuqs"

import { useEmail } from "@/hooks/use-email"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodePreview from "@/components/code/code-preview"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import GenerateCode from "@/components/code/generate-code"
import EmailPreview from "@/components/email/email-preview"
import { parseAsView, VIEW_KEY, VIEWS } from "@/constants/views"
import { FileMimeType } from "@/utils/download-file"

const CodeEditor = dynamic(() => import("@/components/code/code-editor"), {
  ssr: false,
})

const DesktopView = () => {
  const { code } = useEmail()

  const [view] = useQueryState(
    VIEW_KEY,
    parseAsView.withDefault(VIEWS[0].value)
  )

  const isCodePreview = view === "code"

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="min-w-80">
        <Tabs
          value="editor"
          className="relative flex h-full flex-1 flex-col bg-background"
        >
          <div className="flex items-center justify-between gap-4 border-b pr-4">
            <TabsList variant="outline">
              <TabsTrigger value="editor">Editor</TabsTrigger>
            </TabsList>

            <div className="-mr-1.5 flex items-center gap-0.5">
              <GenerateCode />

              <DownloadFile
                content={code}
                filename="email.tsx"
                mimeType={FileMimeType.TSX}
              />

              <CopyToClipboard content={code} />
            </div>
          </div>

          <TabsContent value="editor" className="mt-0 flex-1">
            <CodeEditor />
          </TabsContent>
        </Tabs>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel className="min-w-80">
        {isCodePreview ? (
          <CodePreview />
        ) : (
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel className="min-h-[calc(20rem+47px)]">
              <EmailPreview />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={0} />
          </ResizablePanelGroup>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default DesktopView
