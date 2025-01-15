import { loader } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import darkPlus from "@shikijs/themes/dark-plus"
import lightPlus from "@shikijs/themes/light-plus"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { configureMonacoTailwindcss, tailwindcssData } from "monaco-tailwindcss"
import { createHighlighter } from "shiki"

import { TYPES } from "@/constants/types"

const DARK_THEME = {
  ...darkPlus,
  name: "vs-dark",
}

const LIGHT_THEME = {
  ...lightPlus,
  name: "light",
}

const initializeMonacoEditor = () => {
  loader.config({ monaco })

  loader.init().then(async (monaco) => {
    const isDarkMode = document.documentElement.classList.contains("dark")

    const highlighter = await createHighlighter({
      themes: isDarkMode
        ? [DARK_THEME, LIGHT_THEME]
        : [LIGHT_THEME, DARK_THEME],
      langs: ["html", "tsx"],
      langAlias: {
        typescript: "tsx",
      },
    })

    shikiToMonaco(highlighter, monaco)

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

    await Promise.all(
      TYPES.map(async ({ url, path }) => {
        const types = await fetch(url).then((res) => res.text())
        monaco.languages.typescript.typescriptDefaults.addExtraLib(types, path)
      })
    )
  })

  window.MonacoEnvironment = {
    getWorker(_, label) {
      switch (label) {
        case "editorWorkerService":
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/editor/editor.worker",
              import.meta.url
            )
          )
        case "html":
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/language/html/html.worker",
              import.meta.url
            )
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
}

export default initializeMonacoEditor
