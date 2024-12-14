"use client"

import React, { createElement, useEffect, useState } from "react"
import * as ReactEmailComponents from "@react-email/components"
import { render } from "@react-email/render"
import initSwc, { transform } from "@swc/wasm-web"

import { useCodeEditor } from "@/hooks/use-code-editor"
import { Button } from "@/components/ui/button"

interface EmailComponent {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode
  PreviewProps?: Record<string, unknown>
}

const transpileCode = async (code: string) => {
  const result = await transform(`import React from "react";\n${code}`, {
    jsc: { parser: { syntax: "typescript", tsx: true } },
    module: { type: "commonjs" },
    isModule: true,
  })

  return result.code
}

const evaluateCode = (code: string): EmailComponent | undefined => {
  const { module, process, require } = {
    module: {
      exports: {
        default: undefined as unknown,
      },
    },
    process: {
      env: {
        NODE_ENV: "production",
        VERCEL_URL: "react-email-demo-8m1bdd9sq-resend.vercel.app",
      },
    },
    require: (module: string) => {
      if (module === "react") return React
      if (module === "@react-email/components") return ReactEmailComponents
      throw new Error(`Module "${module}" not found`)
    },
  }

  new Function("exports", "process", "require", code)(
    module.exports,
    process,
    require
  )

  return module.exports.default as EmailComponent
}

const EmailPreview: React.FC = () => {
  const { value } = useCodeEditor()
  const [emailHtml, setEmailHtml] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      await initSwc()
      setInitialized(true)
    }
    init()
  }, [])

  const handlePreview = async () => {
    try {
      setError("")

      if (!value.trim())
        throw new Error("The code editor is empty. Please write some code.")

      const transpiledCode = await transpileCode(value)
      const emailComponent = evaluateCode(transpiledCode)

      if (emailComponent === undefined) {
        throw new Error("The email component does not contain a default export")
      }

      const previewProps = emailComponent.PreviewProps || {}
      const renderedHtml = await render(
        createElement(emailComponent, previewProps)
      )
      setEmailHtml(renderedHtml)
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <div className="flex h-full flex-col">
      <Button onClick={handlePreview} disabled={!initialized}>
        Preview Email
      </Button>

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      {emailHtml && (
        <iframe
          srcDoc={emailHtml}
          title="Email Preview"
          className="h-full w-full border-0"
          sandbox="allow-scripts"
        />
      )}
    </div>
  )
}

export default EmailPreview
