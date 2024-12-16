"use client"

import React from "react"
import Editor, { BeforeMount } from "@monaco-editor/react"

import { useEmail } from "@/hooks/use-email"

const CodeEditor = () => {
  const { value, setValue } = useEmail()

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
    })
  }

  const handleChange = (value?: string) => {
    setValue(value || "")
  }

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="typescript"
      value={value}
      onChange={handleChange}
      beforeMount={handleEditorWillMount}
      path="file:///main.tsx"
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  )
}

export default CodeEditor
