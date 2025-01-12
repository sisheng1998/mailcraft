"use client"

import React, { useEffect, useRef } from "react"
import Editor, { BeforeMount, loader, OnMount } from "@monaco-editor/react"
import { editor as monacoEditor, Selection } from "monaco-editor"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { configureMonacoTailwindcss, tailwindcssData } from "monaco-tailwindcss"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"
import { useDebounceCallback, useLocalStorage } from "usehooks-ts"

import { Email } from "@/types/email"
import { useEmail } from "@/hooks/use-email"
import LoadingIndicator from "@/components/loading-indicator"
import { EMAIL_ID_KEY, parseAsEmailId } from "@/constants/email"
import { TYPES } from "@/constants/types"

loader.config({ monaco })

window.MonacoEnvironment = {
  getWorker: (_, label) => {
    switch (label) {
      case "editorWorkerService":
        return new Worker(
          new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url)
        )
      case "typescript":
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/typescript/ts.worker",
            import.meta.url
          )
        )
      case "tailwindcss":
        return new Worker(
          new URL("monaco-tailwindcss/tailwindcss.worker", import.meta.url)
        )
      default:
        throw new Error(`Unknown label ${label}`)
    }
  },
}

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

  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor>()

  useEffect(() => {
    return () => {
      editorRef.current?.getModel()?.dispose()
    }
  }, [])

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.css.cssDefaults.setOptions({
      data: {
        dataProviders: {
          tailwindcssData,
        },
      },
    })

    configureMonacoTailwindcss(monaco)

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      esModuleInterop: true,
      isolatedModules: true,
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

  const handleOnMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    editor.onKeyDown((event) => {
      const enabledLanguages: readonly string[] = [
        "html",
        "markdown",
        "javascript",
        "typescript",
      ] as const

      const model = editor.getModel()
      if (!model || !enabledLanguages.includes(model.getLanguageId())) return

      const isSelfClosing = (tag: string): boolean =>
        [
          "area",
          "base",
          "br",
          "col",
          "command",
          "embed",
          "hr",
          "img",
          "input",
          "keygen",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
          "circle",
          "ellipse",
          "line",
          "path",
          "polygon",
          "polyline",
          "rect",
          "stop",
          "use",
        ].includes(tag)

      if (event.browserEvent.key === ">") {
        const currentSelections = editor.getSelections() ?? []

        const edits: monacoEditor.IIdentifiedSingleEditOperation[] = []
        const newSelections: Selection[] = []

        for (const selection of currentSelections) {
          if (!selection) continue

          newSelections.push(
            new monaco.Selection(
              selection.selectionStartLineNumber,
              selection.selectionStartColumn + 1,
              selection.endLineNumber,
              selection.endColumn + 1
            )
          )

          const contentBeforeChange = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: selection.endLineNumber,
            endColumn: selection.endColumn,
          })

          const match = contentBeforeChange.match(/<([\w-]+)(?![^>]*\/>)[^>]*$/)
          if (!match?.[1]) continue

          const [fullMatch, tag] = match
          if (isSelfClosing(tag) || fullMatch.trim().endsWith("/")) continue

          edits.push({
            range: {
              startLineNumber: selection.endLineNumber,
              startColumn: selection.endColumn + 1,
              endLineNumber: selection.endLineNumber,
              endColumn: selection.endColumn + 1,
            },
            text: `</${tag}>`,
          })
        }

        if (edits.length > 0) {
          setTimeout(
            () => editor.executeEdits("auto-close-tag", edits, newSelections),
            0
          )
        }
      }
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
