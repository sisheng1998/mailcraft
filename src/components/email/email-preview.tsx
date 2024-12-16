"use client"

import React, { createElement, useEffect, useState } from "react"
import * as ReactEmailComponents from "@react-email/components"
import { render } from "@react-email/render"
import initSwc, { transform } from "@swc/wasm-web"

import { useEmail } from "@/hooks/use-email"
import ErrorMessage from "@/components/email/error-message"

interface EmailComponent {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode
  PreviewProps?: Record<string, unknown>
}

const transpileCode = async (code: string) => {
  const result = await transform(code, {
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
  const { value } = useEmail()
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

  useEffect(() => {
    if (!initialized) return

    const renderEmail = async () => {
      try {
        setError("")

        if (!value.trim()) return

        const transpiledCode = await transpileCode(value)
        const emailComponent = evaluateCode(transpiledCode)

        if (emailComponent === undefined) {
          throw new Error(
            "The email component does not contain a default export"
          )
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

    renderEmail()
  }, [value, initialized])

  return (
    <div className="relative flex h-full flex-col bg-white">
      <ErrorMessage error={error} />

      {emailHtml && (
        <iframe
          srcDoc={emailHtml}
          title="Email Preview"
          className="h-full w-full border-0 bg-white"
          sandbox="allow-popups"
        />
      )}
    </div>
  )
}

export default EmailPreview
