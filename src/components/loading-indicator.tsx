import React from "react"
import { Loader } from "lucide-react"

const LoadingIndicator = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background p-4">
    <Loader className="size-8 animate-spin" />
  </div>
)

export default LoadingIndicator
