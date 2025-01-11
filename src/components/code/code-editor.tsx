"use client"

import React from "react"
import Editor, { BeforeMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"
import { useDebounceCallback, useLocalStorage } from "usehooks-ts"

import { Email } from "@/types/email"
import { useEmail } from "@/hooks/use-email"
import LoadingIndicator from "@/components/loading-indicator"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"
import { TYPES } from "@/constants/types"

const CodeEditor = () => {
  const { resolvedTheme } = useTheme()
  const { code, setCode } = useEmail()

  const [emailId] = useQueryState(EMAIL_ID_KEY, parseAsEmailId.withDefault(""))
  const [email, setEmail] = useLocalStorage<Email | null>(
    `email-${emailId}`,
    null
  )

  const debounced = useDebounceCallback(
    (code: string) => (email ? setEmail({ ...email, code }) : setCode(code)),
    500
  )

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      esModuleInterop: true,
      isolatedModules: true,
    })

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    })

    TYPES.forEach(({ url, path }) => {
      fetch(url)
        .then((response) => response.text())
        .then((types) =>
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            types,
            path
          )
        )
        .catch((error) => console.error(error))
    })
  }

  const handleChange = (value?: string) => debounced(value || "")

  return (
    <Editor
      theme={resolvedTheme === "light" ? "vs" : "vs-dark"}
      defaultLanguage="typescript"
      className="[&_.monaco-editor]:absolute"
      loading={<LoadingIndicator />}
      value={code}
      onChange={handleChange}
      beforeMount={handleBeforeMount}
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
