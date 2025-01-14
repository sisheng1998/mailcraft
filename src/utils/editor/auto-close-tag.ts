import { Monaco } from "@monaco-editor/react"
import {
  IKeyboardEvent,
  editor as monacoEditor,
  Selection,
} from "monaco-editor"

export const ENABLED_LANGUAGES: readonly string[] = ["typescript"] as const

const SELF_CLOSING_TAGS = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  "circle",
  "ellipse",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "use",
] as const

const isSelfClosing = (tag: string): boolean =>
  SELF_CLOSING_TAGS.includes(tag as any)

const handleAutoCloseTag = (
  event: IKeyboardEvent,
  editor: monacoEditor.IStandaloneCodeEditor,
  monaco: Monaco
): void => {
  const model = editor.getModel()
  if (!model || !ENABLED_LANGUAGES.includes(model.getLanguageId())) return

  if (event.browserEvent.key === ">") {
    const currentSelections = editor.getSelections() ?? []
    const edits: monacoEditor.IIdentifiedSingleEditOperation[] = []
    const newSelections: Selection[] = []

    for (const selection of currentSelections) {
      if (!selection) continue

      newSelections.push(
        new monaco.Selection(
          selection.selectionStartLineNumber,
          selection.selectionStartColumn + 1,
          selection.endLineNumber,
          selection.endColumn + 1
        )
      )

      const contentBeforeChange = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn,
      })

      const match = contentBeforeChange.match(/<([\w-]+)(?![^>]*\/>)[^>]*$/)
      if (!match?.[1]) continue

      const [fullMatch, tag] = match
      if (isSelfClosing(tag) || fullMatch.trim().endsWith("/")) continue

      edits.push({
        range: {
          startLineNumber: selection.endLineNumber,
          startColumn: selection.endColumn + 1,
          endLineNumber: selection.endLineNumber,
          endColumn: selection.endColumn + 1,
        },
        text: `</${tag}>`,
      })
    }

    if (edits.length > 0) {
      setTimeout(
        () => editor.executeEdits("auto-close-tag", edits, newSelections),
        0
      )
    }
  }
}

export default handleAutoCloseTag
