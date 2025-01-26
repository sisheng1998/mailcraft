import { createOpenAI } from "@ai-sdk/openai"
import { APICallError, generateText } from "ai"

import { Settings } from "@/components/settings/settings-button"

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

    const { text: result } = await generateText({
      model,
      messages: [
        {
          role: "system",
          content: "",
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

    return result
  } catch (error) {
    if (
      APICallError.isInstance(error) ||
      (error instanceof TypeError && error.message.includes("Failed to fetch"))
    ) {
      throw new Error("")
    } else {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}
