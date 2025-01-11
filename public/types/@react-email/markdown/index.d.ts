import * as React from "react"
import { StylesType } from "md-to-react-email"

type MarkdownProps = Readonly<{
  children: string
  markdownCustomStyles?: StylesType
  markdownContainerStyles?: React.CSSProperties
}>
declare const Markdown: React.ForwardRefExoticComponent<
  Readonly<{
    children: string
    markdownCustomStyles?: StylesType | undefined
    markdownContainerStyles?: React.CSSProperties | undefined
  }> &
    React.RefAttributes<HTMLDivElement>
>

export { Markdown, type MarkdownProps }
