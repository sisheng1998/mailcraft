"use client"

import React, {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { render } from "@react-email/render"
import initSwc from "@swc/wasm-web"
import { useDebounceValue } from "usehooks-ts"

import {
  evaluateCode,
  transpileCode,
  updateStaticResourceUrls,
} from "@/lib/email"
import { HOME_PAGE_CODE } from "@/constants/email-templates"

interface EmailContextType {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  previewHtml: string
  emailHtml: string
  plainText: string
  initialized: boolean
  error: string
}

const EmailContext = createContext<EmailContextType | undefined>(undefined)

interface EmailProviderProps {
  children: ReactNode
}

const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [code, setCode] = useState<string>(HOME_PAGE_CODE)
  const [debouncedCode] = useDebounceValue<string>(code, 500)

  const [previewHtml, setPreviewHtml] = useState<string>("")
  const [emailHtml, setEmailHtml] = useState<string>("")
  const [plainText, setPlainText] = useState<string>("")

  const [initialized, setInitialized] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

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

        const transpiledCode = await transpileCode(debouncedCode)
        const emailComponent = evaluateCode(transpiledCode)

        const previewProps = emailComponent.PreviewProps || {}
        const previewHtml = updateStaticResourceUrls(
          await render(createElement(emailComponent, previewProps))
        )
        setPreviewHtml(previewHtml)

        const emailHtml = updateStaticResourceUrls(
          await render(createElement(emailComponent), {
            pretty: true,
          })
        )
        setEmailHtml(emailHtml)

        const plainText = await render(createElement(emailComponent), {
          plainText: true,
        })
        setPlainText(plainText)
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      }
    }

    renderEmail()

    const originalConsoleError = console.error
    console.error = (...args: unknown[]) => setError(args.join(" "))

    return () => {
      console.error = originalConsoleError
    }
  }, [debouncedCode, initialized])

  return (
    <EmailContext.Provider
      value={{
        code,
        setCode,
        previewHtml,
        emailHtml,
        plainText,
        initialized,
        error,
      }}
    >
      {children}
    </EmailContext.Provider>
  )
}

const useEmail = (): EmailContextType => {
  const context = useContext(EmailContext)

  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider")
  }

  return context
}

export { EmailProvider, useEmail }
