"use client"

import React from "react"
import Editor, { BeforeMount, OnMount } from "@monaco-editor/react"

import { useCodeEditor } from "@/hooks/useCodeEditor"

const CodeEditor = () => {
  const { value, setValue } = useCodeEditor()

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      esModuleInterop: true,
    })

    fetch("https://cdn.jsdelivr.net/npm/@types/react/index.d.ts")
      .then((response) => response.text())
      .then((data) => {
        // Add the fetched type definitions to Monaco Editor
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          data,
          "file:///node_modules/@types/react/index.d.ts"
        )
      })
      .catch((error) => {
        console.error("Failed to fetch type definitions:", error)
      })
    fetch("https://cdn.jsdelivr.net/npm/@types/node/globals.d.ts")
      .then((response) => response.text())
      .then((data) => {
        // Add the fetched type definitions to Monaco Editor
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          data,
          "file:///node_modules/@types/node/globals.d.ts"
        )
      })
      .catch((error) => {
        console.error("Failed to fetch type definitions:", error)
      })
    fetch(
      "https://cdn.jsdelivr.net/npm/@react-email/components/dist/index.d.ts"
    )
      .then((response) => response.text())
      .then((data) => {
        // Add the fetched type definitions to Monaco Editor
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          data,
          "file:///node_modules/@react-email/components/index.d.ts"
        )
      })
      .catch((error) => {
        console.error("Failed to fetch type definitions:", error)
      })
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {}

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
      onMount={handleEditorDidMount}
      path="file:///main.tsx"
    />
  )
}

export default CodeEditor
