const EMBEDDING_DIM = 256

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1)
}

/** Local fallback when no API key — term-frequency hashing */
export function embedTextLocal(text: string): number[] {
  const vec = new Array(EMBEDDING_DIM).fill(0)
  const tokens = tokenize(text)

  for (const token of tokens) {
    let hash = 0
    for (let i = 0; i < token.length; i++) {
      hash = (hash * 31 + token.charCodeAt(i)) >>> 0
    }
    const idx = hash % EMBEDDING_DIM
    vec[idx] += 1
  }

  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1
  return vec.map((v) => v / norm)
}

export async function embedText(text: string): Promise<number[]> {
  const geminiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (geminiKey) {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai")
      const genAI = new GoogleGenerativeAI(geminiKey)
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" })
      const result = await model.embedContent(text.slice(0, 8000))
      const values = result.embedding.values
      if (values?.length) return values
    } catch {
      /* fall through */
    }
  }

  if (openaiKey) {
    try {
      const OpenAI = (await import("openai")).default
      const openai = new OpenAI({ apiKey: openaiKey })
      const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text.slice(0, 8000),
      })
      const values = res.data[0]?.embedding
      if (values?.length) return values
    } catch {
      /* fall through */
    }
  }

  return embedTextLocal(text)
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  return Promise.all(texts.map((t) => embedText(t)))
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const len = Math.min(a.length, b.length)
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB)
  return denom === 0 ? 0 : dot / denom
}

export function getEmbeddingProvider(): "gemini" | "openai" | "local" {
  if (process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY) return "gemini"
  if (process.env.OPENAI_API_KEY) return "openai"
  return "local"
}
