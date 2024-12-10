import React from "react"

import { CodeEditorProvider } from "@/hooks/useCodeEditor"
import CodeEditor from "@/components/CodeEditor"
import EmailPreview from "@/components/EmailPreview"

const Home = () => (
  <main className="flex h-screen flex-row overflow-hidden">
    <CodeEditorProvider>
      <div className="flex-1 shrink-0 overflow-y-auto">
        <CodeEditor />
      </div>
      <div className="flex-1 shrink-0 overflow-y-auto">
        <EmailPreview />
      </div>
    </CodeEditorProvider>
  </main>
)

export default Home
