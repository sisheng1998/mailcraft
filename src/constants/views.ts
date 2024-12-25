import { CodeXml, Monitor, Smartphone } from "lucide-react"
import { createParser } from "nuqs"

export const VIEW_KEY = "view"

export const VIEWS = [
  {
    title: "Desktop",
    value: "desktop",
    icon: Monitor,
  },
  {
    title: "Mobile",
    value: "mobile",
    icon: Smartphone,
  },
  {
    title: "Code",
    value: "code",
    icon: CodeXml,
  },
]

export const parseAsView = createParser({
  parse: (value) =>
    VIEWS.find((v) => v.value === value)?.value || VIEWS[0].value,
  serialize: (value) => value,
})

export const TYPE_KEY = "type"

export const TYPES = [
  {
    title: "HTML",
    value: "html",
  },
  {
    title: "Plain Text",
    value: "plain-text",
  },
]

export const parseAsType = createParser({
  parse: (value) =>
    TYPES.find((t) => t.value === value)?.value || TYPES[0].value,
  serialize: (value) => value,
})

export const MODE_KEY = "mode"

export const MODES = [
  {
    title: "Editor",
    value: "editor",
  },
  {
    title: "Preview",
    value: "preview",
  },
  {
    title: "Code",
    value: "code",
  },
]

export const parseAsMode = createParser({
  parse: (value) =>
    MODES.find((v) => v.value === value)?.value || MODES[0].value,
  serialize: (value) => value,
})
