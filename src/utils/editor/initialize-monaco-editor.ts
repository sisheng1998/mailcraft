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

export const highlighter = createHighlighter({
  themes: [DARK_THEME, LIGHT_THEME],
  langs: ["html", "tsx"],
  langAlias: {
    typescript: "tsx",
  },
})

const initializeMonacoEditor = () => {
  loader.config({ monaco })

  loader.init().then(async (monaco) => {
    shikiToMonaco(await highlighter, monaco)

    const isDarkMode = document.documentElement.classList.contains("dark")
    monaco.editor.setTheme(isDarkMode ? "vs-dark" : "light")

    monaco.languages.css.cssDefaults.setOptions({
      data: {
        dataProviders: {
          tailwindcssData,
        },
      },
    })

    configureMonacoTailwindcss(monaco)

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })

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
