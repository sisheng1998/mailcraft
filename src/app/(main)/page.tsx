import React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "@/components/code-editor"
import EmailPreview from "@/components/email/email-preview"

const Home = () => (
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>
      <CodeEditor />
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>
      <EmailPreview />
    </ResizablePanel>
  </ResizablePanelGroup>
)

export default Home
