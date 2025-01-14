import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

const initializeMonacoEditor = () => {
  loader.config({ monaco })

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
