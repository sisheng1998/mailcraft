import * as React from "react"
import type { Config } from "tailwindcss"

export declare interface EmailElementProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export declare const Tailwind: React.FC<TailwindProps>

export declare type TailwindConfig = Pick<
  Config,
  | "important"
  | "prefix"
  | "separator"
  | "safelist"
  | "blocklist"
  | "presets"
  | "future"
  | "experimental"
  | "darkMode"
  | "theme"
  | "corePlugins"
  | "plugins"
>

export declare interface TailwindProps {
  children: React.ReactNode
  config?: TailwindConfig
}

export {}
