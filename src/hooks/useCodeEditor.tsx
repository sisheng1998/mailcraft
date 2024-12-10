"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"

interface CodeEditorContextType {
  value: string
  setValue: (value: string) => void
}

const CodeEditorContext = createContext<CodeEditorContextType | undefined>(
  undefined
)

interface CodeEditorProviderProps {
  children: ReactNode
}

export const CodeEditorProvider: React.FC<CodeEditorProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState<string>("")

  return (
    <CodeEditorContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  )
}

export const useCodeEditor = (): CodeEditorContextType => {
  const context = useContext(CodeEditorContext)

  if (!context) {
    throw new Error("useCodeEditor must be used within a CodeEditorProvider")
  }

  return context
}
