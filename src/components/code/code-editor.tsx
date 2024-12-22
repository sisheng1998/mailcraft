"use client"

import React, { useRef } from "react"
import Editor, { BeforeMount, OnMount } from "@monaco-editor/react"
import { editor } from "monaco-editor"
import { useTheme } from "next-themes"
import { useDebounceCallback } from "usehooks-ts"

import { useEmail } from "@/hooks/use-email"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import FormatCode from "@/components/code/format-code"
import { FileMimeType } from "@/utils/download-file"

const CodeEditor = () => {
  const { resolvedTheme } = useTheme()
  const { code, setCode } = useEmail()

  const debounced = useDebounceCallback(setCode, 500)

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      isolatedModules: true,
    })
  }

  const handleOnMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const handleChange = (value?: string) => debounced(value || "")

  return (
    <Tabs
      value="editor"
      className="relative flex h-full flex-1 flex-col bg-background"
    >
      <div className="flex items-center justify-between gap-4 border-b pr-4">
        <TabsList variant="outline">
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>

        <div className="-mr-1.5 flex items-center gap-0.5">
          {editorRef.current !== null && (
            <FormatCode editor={editorRef.current} />
          )}

          <DownloadFile
            content={code}
            filename="email.tsx"
            mimeType={FileMimeType.TSX}
          />

          <CopyToClipboard content={code} />
        </div>
      </div>

      <TabsContent value="editor" className="mt-0 flex-1">
        <Editor
          theme={resolvedTheme === "light" ? "vs" : "vs-dark"}
          defaultLanguage="typescript"
          className="[&_.monaco-editor]:absolute"
          value={code}
          onChange={handleChange}
          beforeMount={handleBeforeMount}
          onMount={handleOnMount}
          path="file:///index.tsx"
          options={{
            minimap: {
              enabled: false,
            },
            wordWrap: "on",
            scrollBeyondLastLine: false,
            padding: {
              top: 8,
            },
          }}
        />
      </TabsContent>
    </Tabs>
  )
}

export default CodeEditor
