import * as React from "react"
import * as react_jsx_runtime from "react/jsx-runtime"

type PreviewProps = Readonly<
  React.ComponentPropsWithoutRef<"div"> & {
    children: string | string[]
  }
>
declare const Preview: React.ForwardRefExoticComponent<
  Readonly<
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "ref"
    > & {
      children: string | string[]
    }
  > &
    React.RefAttributes<HTMLDivElement>
>
declare const renderWhiteSpace: (
  text: string
) => react_jsx_runtime.JSX.Element | null

export { Preview, type PreviewProps, renderWhiteSpace }
