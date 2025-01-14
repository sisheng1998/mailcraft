import { Monaco } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import { configureMonacoTailwindcss, tailwindcssData } from "monaco-tailwindcss"
import { createHighlighter } from "shiki"

import { TYPES } from "@/constants/types"

const setupMonacoEditor = async (monaco: Monaco, resolvedTheme?: string) => {
  const highlighter = await createHighlighter({
    themes:
      resolvedTheme === "light"
        ? ["light-plus", "dark-plus"]
        : ["dark-plus", "light-plus"],
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
}

export default setupMonacoEditor
