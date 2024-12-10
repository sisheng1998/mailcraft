"use client"

import React from "react"
import Editor from "@monaco-editor/react"

import { useCodeEditor } from "@/hooks/useCodeEditor"

const CodeEditor = () => {
  const { value, setValue } = useCodeEditor()

  const handleChange = (value?: string) => {
    setValue(value || "")
  }

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="typescript"
      value={value}
      onChange={handleChange}
    />
  )
}

export default CodeEditor
