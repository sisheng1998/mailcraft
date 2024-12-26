import { createParser } from "nuqs"

import { getAllEmails } from "@/lib/email"

export const REACT_EMAIL_DEMO_URL = "https://demo.react.email"

export const REACT_EMAIL_API_ENDPOINT = "https://react.email/api/send/test"

export const EMAIL_ID_KEY = "email"

export const parseAsEmailId = createParser({
  parse: (value) => {
    const emails = getAllEmails()
    return emails.find((email) => email.id === value)?.id || ""
  },
  serialize: (value) => value,
})
