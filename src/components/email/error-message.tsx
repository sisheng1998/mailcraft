import React from "react"
import stripAnsi from "strip-ansi"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ErrorMessage = ({ error }: { error: string }) => {
  const formattedError = stripAnsi(error)

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 p-4">
      <Alert
        variant="destructive"
        className="relative max-w-screen-sm overflow-hidden border-none bg-zinc-50 p-4 shadow-lg"
      >
        <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

        <AlertTitle className="text-lg text-red-700">
          Code Error Detected
        </AlertTitle>

        <p className="mb-4 text-zinc-700">
          Review the error details below and update your code to fix the issue.
        </p>

        <AlertDescription className="max-h-96 overflow-auto rounded-md bg-zinc-950 px-3.5 py-4 text-zinc-50">
          <pre className="text-xs">{formattedError}</pre>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default ErrorMessage
