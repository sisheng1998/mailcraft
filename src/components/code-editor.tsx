"use client"

import React from "react"
import Editor, { BeforeMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"

import { useEmail } from "@/hooks/use-email"

const CodeEditor = () => {
  const { resolvedTheme } = useTheme()
  const { code, setCode } = useEmail()

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

  const handleChange = (value?: string) => {
    setCode(value || "")
  }

  return (
    <Editor
      theme={resolvedTheme === "light" ? "vs" : "vs-dark"}
      defaultLanguage="typescript"
      className="[&_.monaco-editor]:absolute"
      value={code}
      onChange={handleChange}
      beforeMount={handleEditorWillMount}
      path="file:///main.tsx"
      options={{
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        padding: {
          top: 8,
        },
      }}
    />
  )
}

export default CodeEditor
