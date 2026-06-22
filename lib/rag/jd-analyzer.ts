import { ALL_SKILLS } from "@/lib/portfolio/corpus"
import { retrieve } from "@/lib/rag/retriever"
import { embedText, cosineSimilarity } from "@/lib/rag/embeddings"

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2)
}

export interface JDAnalysisResult {
  matchScore: number
  semanticScore: number
  skillsScore: number
  matchedSkills: string[]
  missingSkills: string[]
  relevantProjects: { title: string; reason: string; score: number }[]
  summary: string
  provider: string
}

export async function analyzeJobDescription(jdText: string): Promise<JDAnalysisResult> {
  const jdKeywords = new Set(extractKeywords(jdText))
  const jdLower = jdText.toLowerCase()

  const matchedSkills = ALL_SKILLS.filter((skill) => {
    const s = skill.toLowerCase()
    return jdLower.includes(s) || jdKeywords.has(s.replace(/[^a-z0-9]/g, ""))
  })

  const missingCandidates = [
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GraphQL",
    "MongoDB",
    "Redis",
    "Kafka",
    "CI/CD",
    "Rust",
    "Go",
    "Java",
    "C++",
    "Swift",
    "Kotlin",
  ]
  const missingSkills = missingCandidates.filter((s) => {
    const sl = s.toLowerCase()
    return (jdLower.includes(sl) || jdKeywords.has(sl.replace(/[^a-z0-9]/g, ""))) && !matchedSkills.includes(s)
  })

  const skillsScore = Math.min(100, Math.round((matchedSkills.length / Math.max(jdKeywords.size * 0.15, 3)) * 100))

  const results = await retrieve(jdText, 6)
  const jdEmbedding = await embedText(jdText.slice(0, 4000))

  const projectScores = results
    .filter((r) => r.chunk.source === "project")
    .map((r) => ({
      title: r.chunk.title,
      reason: r.chunk.content.slice(0, 120) + "...",
      score: Math.round(cosineSimilarity(jdEmbedding, r.chunk.embedding) * 100),
    }))

  const semanticScore =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length * 100)
      : 0

  const matchScore = Math.round(skillsScore * 0.45 + semanticScore * 0.55)

  const { getEmbeddingProvider } = await import("@/lib/rag/embeddings")
  const provider = getEmbeddingProvider()

  let summary = `Overall match: ${matchScore}%. ${matchedSkills.length} skills align with the job description.`
  if (projectScores.length > 0) {
    summary += ` Strongest project fit: ${projectScores[0].title}.`
  }
  if (missingSkills.length > 0) {
    summary += ` Consider highlighting experience with: ${missingSkills.slice(0, 3).join(", ")}.`
  }

  const geminiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (geminiKey || openaiKey) {
    try {
      const context = results.map((r) => r.chunk.content).join("\n\n")
      const prompt = `You are analyzing how well Raghav Ahuja's portfolio matches a job description.

Portfolio context:
${context}

Job Description:
${jdText.slice(0, 3000)}

Matched skills: ${matchedSkills.join(", ") || "none detected"}
Match scores — overall: ${matchScore}%, skills: ${skillsScore}%, semantic: ${semanticScore}%

Write a concise 2-3 sentence professional summary of the match for the candidate. Be honest about strengths and gaps.`

      if (geminiKey) {
        const { generateWithGemini } = await import("@/lib/rag/gemini-config")
        const result = await generateWithGemini(geminiKey, { prompt, maxOutputTokens: 200 })
        if (result) summary = result.text
      } else if (openaiKey) {
        const OpenAI = (await import("openai")).default
        const openai = new OpenAI({ apiKey: openaiKey })
        const res = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
        })
        const text = res.choices[0]?.message?.content
        if (text) summary = text.trim()
      }
    } catch {
      /* keep rule-based summary */
    }
  }

  return {
    matchScore,
    semanticScore,
    skillsScore,
    matchedSkills,
    missingSkills,
    relevantProjects: projectScores,
    summary,
    provider,
  }
}
