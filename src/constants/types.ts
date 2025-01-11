const BASE_URL = "./types"
const BASE_PATH = "file:///node_modules"

const FILE_NAME = "index.d.ts"

export const TYPES = [
  {
    url: `${BASE_URL}/react/${FILE_NAME}`,
    path: `${BASE_PATH}/@types/react/${FILE_NAME}`,
  },
  ...[
    "body",
    "button",
    "code-block",
    "code-inline",
    "column",
    "components",
    "container",
    "font",
    "head",
    "heading",
    "hr",
    "html",
    "img",
    "link",
    "markdown",
    "preview",
    "row",
    "section",
    "tailwind",
    "text",
  ].map((name) => ({
    url: `${BASE_URL}/@react-email/${name}/${FILE_NAME}`,
    path: `${BASE_PATH}/@react-email/${name}/${FILE_NAME}`,
  })),
]
