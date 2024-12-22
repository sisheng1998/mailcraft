import React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "@/components/code/code-editor"
import EmailPreview from "@/components/email/email-preview"

const Home = () => (
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel className="min-w-80">
      <CodeEditor />
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel className="min-w-80">
      <EmailPreview />
    </ResizablePanel>
  </ResizablePanelGroup>
)

export default Home
