import { createOpenAI } from "@ai-sdk/openai"
import { APICallError, generateText } from "ai"

import { Settings } from "@/components/settings/settings-button"
import { EMAIL_SYSTEM_PROMPT } from "@/constants/ai"

export const testConnection = async ({
  modelName,
  baseURL,
  apiKey,
}: Settings) => {
  try {
    const client = createOpenAI({
      baseURL,
      apiKey,
    })

    const model = client(modelName)

    await generateText({
      model,
      prompt: "Hello, who are you?",
    })
  } catch (error) {
    if (APICallError.isInstance(error)) {
      throw new Error(
        error.statusCode === 401 ? "Invalid API Key" : error.message
      )
    } else if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error("Invalid Model URL")
    } else {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}

export const generateEmailTemplate = async ({
  prompt,
  modelName,
  baseURL,
  apiKey,
}: Settings & {
  prompt: string
}) => {
  try {
    const client = createOpenAI({
      baseURL,
      apiKey,
    })

    const model = client(modelName)

    const { text } = await generateText({
      model,
      messages: [
        {
          role: "system",
          content: EMAIL_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    })

    const result = text
      .replace(/^[\s\S]*?```([\s\S]*?)```[\s\S]*$/, "$1")
      .replace(/^[a-z]+\n/, "")
      .trim()

    return result
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}
