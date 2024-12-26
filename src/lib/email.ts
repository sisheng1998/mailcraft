import React from "react"
import * as ReactEmailComponents from "@react-email/components"
import { transform } from "@swc/wasm-web"

import { Email, EmailComponent } from "@/types/email"
import {
  REACT_EMAIL_API_ENDPOINT,
  REACT_EMAIL_DEMO_URL,
} from "@/constants/email"

export const transpileCode = async (code: string) => {
  const result = await transform(code, {
    jsc: { parser: { syntax: "typescript", tsx: true } },
    module: { type: "commonjs" },
    isModule: true,
  })

  return result.code
}

export const evaluateCode = (code: string): EmailComponent => {
  const { module, process, require } = {
    module: {
      exports: {
        default: undefined as unknown,
      },
    },
    process: {
      env: {
        NODE_ENV: "production",
      },
    },
    require: (module: string) => {
      if (module === "react") return React
      if (module === "@react-email/components") return ReactEmailComponents
      throw new Error(`Module "${module}" not found`)
    },
  }

  new Function(
    "exports",
    "process",
    "require",
    `const React = require("react");
    ${code}`
  )(module.exports, process, require)

  const emailComponent = module.exports.default

  if (emailComponent === undefined) {
    throw new Error("The code does not contain a default export")
  }

  return emailComponent as EmailComponent
}

const invisibleCharacters: { [key: string]: string } = {
  "\xa0": "&#847;", // NO-BREAK SPACE
  "\u200c": "&zwnj;", // ZERO WIDTH NON-JOINER
  "\u200b": "&#8199;", // ZERO WIDTH SPACE
  "\u200d": "&#8203;", // ZERO WIDTH JOINER
  "\u200e": "&#65279;", // LEFT-TO-RIGHT MARK
  "\u200f": "&#8207;", // RIGHT-TO-LEFT MARK
  "\ufeff": "&#65279;", // ZERO WIDTH NO-BREAK SPACE
}

export const getCleanHtml = (html: string) =>
  html.replace(
    /[\xa0\u200c\u200b\u200d\u200e\u200f\ufeff](?! )/g,
    (match) => invisibleCharacters[match]
  )

const replaceUrl = (attribute: string) => (match: string, url: string) =>
  match.replace(
    `${attribute}="/static/${url}"`,
    `${attribute}="${REACT_EMAIL_DEMO_URL}/static/${url}"`
  )

export const updateStaticResourceUrls = (html: string): string => {
  html = html.replace(
    /<img\s+[^>]*src="\/static\/([^"]+)"[^>]*>/g,
    replaceUrl("src")
  )
  html = html.replace(
    /<link\s+[^>]*href="\/static\/([^"]+)"[^>]*>/g,
    replaceUrl("href")
  )
  html = html.replace(
    /style="([^"]*)url\(&quot;\/static\/([^&]+)&quot;\)([^"]*)"/g,
    (match, before, url, after) =>
      `style="${before}url(&quot;${REACT_EMAIL_DEMO_URL}/static/${url}&quot;)${after}"`
  )

  return html
}

export const sendTestEmail = async (body: {
  to: string
  subject: string
  html: string
}) => {
  const response = await fetch(REACT_EMAIL_API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong")
  }

  return data
}

export const getAllEmails = (): Email[] =>
  Object.entries(localStorage)
    .filter(([key]) => key.startsWith("email-"))
    .map(([_, value]) => JSON.parse(value))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
