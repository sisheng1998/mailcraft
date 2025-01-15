"use client"

import React, { useEffect, useRef } from "react"
import Editor, { BeforeMount, OnMount } from "@monaco-editor/react"
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
import setupMonacoEditor from "@/utils/editor/setup-monaco-editor"

initializeMonacoEditor()

// TODO: Fix comment bug in TSX

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

  const handleBeforeMount: BeforeMount = async (monaco) => {
    await setupMonacoEditor(monaco, resolvedTheme)
  }

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
      theme={`${resolvedTheme}-plus`}
      defaultLanguage="typescript"
      className="[&_.monaco-editor]:absolute"
      loading={<LoadingIndicator />}
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
          top: 4,
        },
      }}
    />
  )
}

export default CodeEditor
