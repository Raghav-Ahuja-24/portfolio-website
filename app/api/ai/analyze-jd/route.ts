import { NextResponse } from "next/server"
import { z } from "zod"
import { analyzeJobDescription } from "@/lib/rag/jd-analyzer"

export const runtime = "nodejs"

const bodySchema = z.object({
  jobDescription: z.string().min(20).max(15000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { jobDescription } = bodySchema.parse(body)
    const result = await analyzeJobDescription(jobDescription)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Job description must be at least 20 characters" }, { status: 400 })
    }
    console.error("JD analyze API error:", error)
    return NextResponse.json({ error: "Failed to analyze job description" }, { status: 500 })
  }
}
