import type { GenerativeModel } from "@google/generative-ai"

/** Models to try in order — first available wins */
export const GEMINI_CHAT_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash"] as const

export function getGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
}

export async function generateWithGemini(
  apiKey: string,
  options: {
    systemInstruction?: string
    prompt: string
    maxOutputTokens?: number
  },
): Promise<{ text: string; model: string } | null> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai")
  const genAI = new GoogleGenerativeAI(apiKey)

  for (const modelName of GEMINI_CHAT_MODELS) {
    try {
      const model: GenerativeModel = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
        generationConfig: options.maxOutputTokens
          ? { maxOutputTokens: options.maxOutputTokens }
          : undefined,
      })
      const res = await model.generateContent(options.prompt)
      const text = res.response.text()?.trim()
      if (text) return { text, model: modelName }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      // Try next model on quota / not-found errors
      if (msg.includes("429") || msg.includes("404") || msg.includes("quota")) continue
      throw e
    }
  }

  return null
}
