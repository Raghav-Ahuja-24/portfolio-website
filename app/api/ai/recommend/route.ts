import { NextResponse } from "next/server"
import { z } from "zod"
import { recommendProjects } from "@/lib/rag/recommender"

export const runtime = "nodejs"

const bodySchema = z.object({
  query: z.string().optional(),
  category: z.enum(["ai", "web", "research"]).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { query, category } = bodySchema.parse(body)
    const result = await recommendProjects(query, category)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    console.error("Recommend API error:", error)
    return NextResponse.json({ error: "Failed to recommend projects" }, { status: 500 })
  }
}
