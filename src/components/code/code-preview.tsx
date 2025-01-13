"use client"

import React, { useEffect, useRef } from "react"
import { Editor, OnMount } from "@monaco-editor/react"
import { editor as monacoEditor } from "monaco-editor"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"

import { useEmail } from "@/hooks/use-email"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import LoadingIndicator from "@/components/loading-indicator"
import PreviewContainer from "@/components/preview-container"
import { parseAsType, TYPE_KEY, TYPES } from "@/constants/views"
import { FileMimeType } from "@/utils/download-file"

const CodePreview = () => {
  const { resolvedTheme } = useTheme()

  const { emailHtml, plainText } = useEmail()
  const [type, setType] = useQueryState(
    TYPE_KEY,
    parseAsType.withDefault(TYPES[0].value)
  )

  const isPlainText = type === "plain-text"

  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor>()

  useEffect(() => {
    return () => {
      editorRef.current?.getModel()?.dispose()
    }
  }, [])

  const handleOnMount: OnMount = (editor) => {
    editorRef.current = editor
  }

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
            className="mt-0 flex-1"
          >
            <Editor
              theme={`${resolvedTheme}-plus`}
              defaultLanguage="html"
              className="[&_.monaco-editor]:absolute"
              loading={<LoadingIndicator />}
              value={type.value === "plain-text" ? plainText : emailHtml}
              onMount={handleOnMount}
              path={`file:///index.${type.value === "plain-text" ? "txt" : "html"}`}
              options={{
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                readOnly: true,
                padding: {
                  top: 4,
                },
                renderControlCharacters: false,
                unicodeHighlight: {
                  invisibleCharacters: false,
                  ambiguousCharacters: false,
                },
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </PreviewContainer>
  )
}

export default CodePreview
