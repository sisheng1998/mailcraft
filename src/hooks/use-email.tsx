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

import { evaluateCode, transpileCode } from "@/lib/email"
import { HOME_PAGE_CODE } from "@/components/email/constants"

interface EmailContextType {
  code: string
  setCode: (code: string) => void
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

        const transpiledCode = await transpileCode(code)
        const emailComponent = evaluateCode(transpiledCode)

        const previewProps = emailComponent.PreviewProps || {}
        const previewHtml = await render(
          createElement(emailComponent, previewProps)
        )
        setPreviewHtml(previewHtml)

        const emailHtml = await render(createElement(emailComponent), {
          pretty: true,
        })
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
  }, [code, initialized])

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
