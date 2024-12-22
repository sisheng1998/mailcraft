export enum FileMimeType {
  TEXT = "text/plain",
  HTML = "text/html",
  TSX = "text/typescript-jsx",
}

export const downloadFile = (
  content: string | Blob,
  filename: string,
  mimeType: FileMimeType
): void => {
  if (typeof window === "undefined") return

  let blob: Blob

  if (content instanceof Blob) {
    blob = content
  } else {
    blob = new Blob([content], { type: mimeType })
  }

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)

  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
