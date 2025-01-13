/** @type {import('next').NextConfig} */

import MonacoEditorWebpackPlugin from "monaco-editor-webpack-plugin"

const nextConfig = {
  output: "export",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new MonacoEditorWebpackPlugin({
          languages: ["html", "css", "typescript"],
          filename: "static/[name].worker.js",
        })
      )
    }

    return config
  },
}

export default nextConfig
