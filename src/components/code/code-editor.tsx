"use client"

import React, { useEffect, useRef } from "react"
import Editor, { OnMount } from "@monaco-editor/react"
import { editor as monacoEditor } from "monaco-editor"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"
import { useLocalStorage } from "usehooks-ts"

import { Email } from "@/types/email"
import { useEmail } from "@/hooks/use-email"
import LoadingIndicator from "@/components/loading-indicator"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"
import handleAutoCloseTag from "@/utils/editor/auto-close-tag"
import initializeMonacoEditor from "@/utils/editor/initialize-monaco-editor"

initializeMonacoEditor()

// TODO: Fix tailwindcss intellisense not working when refresh with code preview
// TODO: Fix comment bug in TSX
// TODO: Add suggestion for import statements
// TODO: Add auto complete for import statements

const CodeEditor = () => {
  const { resolvedTheme } = useTheme()
  const { code, setCode } = useEmail()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))
  const [email, setEmail] = useLocalStorage<Email | null>(
    `email-${emailId}`,
    null
  )

  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor>()

  useEffect(() => {
    return () => {
      editorRef.current?.getModel()?.dispose()
    }
  }, [])

  const handleOnMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    editor.onKeyDown((event) => {
      handleAutoCloseTag(event, editor, monaco)
    })
  }

  const handleChange = (code: string = "") =>
    email ? setEmail({ ...email, code }) : setCode(code)

  return (
    <Editor
      theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
      defaultLanguage="typescript"
      className="[&_.monaco-editor]:absolute"
      loading={<LoadingIndicator />}
      value={code}
      onChange={handleChange}
      onMount={handleOnMount}
      path="file:///index.tsx"
      options={{
        minimap: {
          enabled: false,
        },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        padding: {
          top: 4,
        },
      }}
    />
  )
}

export default CodeEditor
