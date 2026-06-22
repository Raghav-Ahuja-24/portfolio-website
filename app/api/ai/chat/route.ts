import { NextResponse } from "next/server"
import { z } from "zod"
import { generateChatResponse } from "@/lib/rag/llm"

export const runtime = "nodejs"

const bodySchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .optional()
    .default([]),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { message, history } = bodySchema.parse(body)
    const result = await generateChatResponse(message, history)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
