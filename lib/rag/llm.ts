import { retrieve } from "@/lib/rag/retriever"
import { getGeminiApiKey, generateWithGemini } from "@/lib/rag/gemini-config"

const SYSTEM_PROMPT = `You are "Raghav AI" — a helpful assistant on Raghav Ahuja's portfolio website.
Answer questions about Raghav's skills, projects, education, experience, and certifications.
Use ONLY the provided context. If the answer isn't in the context, say you don't have that information and suggest contacting Raghav at raghavahuja2412@gmail.com.
Be concise, friendly, and professional. Speak in third person about Raghav ("Raghav has...", "He worked on...").`

export async function generateChatResponse(
  message: string,
  history: { role: "user" | "assistant"; content: string }[] = [],
): Promise<{ answer: string; sources: string[]; provider: string }> {
  const results = await retrieve(message, 5)
  const context = results.map((r) => `[${r.chunk.source}] ${r.chunk.title}: ${r.chunk.content}`).join("\n\n")
  const sources = [...new Set(results.map((r) => r.chunk.title))]

  const geminiKey = getGeminiApiKey()
  const openaiKey = process.env.OPENAI_API_KEY

  const userPrompt = `Context:\n${context}\n\nConversation history:\n${history
    .slice(-4)
    .map((h) => `${h.role}: ${h.content}`)
    .join("\n")}\n\nUser: ${message}\n\nAnswer based on the context:`

  if (geminiKey) {
    try {
      const result = await generateWithGemini(geminiKey, {
        systemInstruction: SYSTEM_PROMPT,
        prompt: userPrompt,
        maxOutputTokens: 500,
      })
      if (result) return { answer: result.text, sources, provider: `gemini/${result.model}` }
    } catch (e) {
      console.error("Gemini chat error:", e)
    }
  }

  if (openaiKey) {
    try {
      const OpenAI = (await import("openai")).default
      const openai = new OpenAI({ apiKey: openaiKey })
      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.slice(-4).map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
      })
      const text = res.choices[0]?.message?.content
      if (text) return { answer: text.trim(), sources, provider: "openai" }
    } catch (e) {
      console.error("OpenAI chat error:", e)
    }
  }

  if (results.length === 0) {
    return {
      answer:
        "I don't have enough information to answer that. Try asking about Raghav's projects, skills, education, or experience — or email raghavahuja2412@gmail.com.",
      sources: [],
      provider: "local",
    }
  }

  const top = results[0].chunk
  const hasKey = Boolean(geminiKey || openaiKey)
  const fallbackNote = hasKey
    ? "\n\n_AI is temporarily unavailable (quota or rate limit). Showing retrieved portfolio context._"
    : "\n\n_Add GEMINI_API_KEY in .env.local for full AI responses._"

  return {
    answer: `Based on Raghav's portfolio (${top.title}): ${top.content.slice(0, 400)}${top.content.length > 400 ? "..." : ""}${fallbackNote}`,
    sources,
    provider: "local-rag",
  }
}
