"use client"

import React from "react"
import Editor, { BeforeMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useDebounceCallback } from "usehooks-ts"

import { useEmail } from "@/hooks/use-email"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CopyToClipboard from "@/components/code/copy-to-clipboard"
import DownloadFile from "@/components/code/download-file"
import { FileMimeType } from "@/utils/download-file"

const CodeEditor = () => {
  const { resolvedTheme } = useTheme()
  const { code, setCode } = useEmail()

  const debounced = useDebounceCallback(setCode, 500)

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      isolatedModules: true,
    })
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
          beforeMount={handleEditorWillMount}
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
