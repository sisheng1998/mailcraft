import { createOpenAI } from "@ai-sdk/openai"
import { APICallError, generateText } from "ai"
import { z } from "zod"

export const settingsFormSchema = z.object({
  modelName: z.string().min(1, "Required"),
  baseURL: z.string().min(1, "Required").url("Invalid URL"),
  apiKey: z.string().min(1, "Required"),
})

export type Settings = z.infer<typeof settingsFormSchema>

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
