import { buildCorpusDocuments } from "@/lib/portfolio/corpus"
import { chunkDocuments, type TextChunk } from "@/lib/rag/chunker"
import { embedTexts, cosineSimilarity } from "@/lib/rag/embeddings"

export interface IndexedChunk extends TextChunk {
  embedding: number[]
}

let indexPromise: Promise<IndexedChunk[]> | null = null

async function buildIndex(): Promise<IndexedChunk[]> {
  const documents = buildCorpusDocuments()
  const chunks = chunkDocuments(documents)
  const embeddings = await embedTexts(chunks.map((c) => `${c.title}\n${c.content}`))

  return chunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
  }))
}

export async function getVectorIndex(): Promise<IndexedChunk[]> {
  if (!indexPromise) {
    indexPromise = buildIndex()
  }
  return indexPromise
}

export function resetVectorIndex() {
  indexPromise = null
}

export interface RetrievalResult {
  chunk: IndexedChunk
  score: number
}

export async function retrieve(query: string, topK = 5): Promise<RetrievalResult[]> {
  const index = await getVectorIndex()
  const { embedText } = await import("@/lib/rag/embeddings")
  const queryEmbedding = await embedText(query)

  const scored = index.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

export async function retrieveByCategory(
  category: "ai" | "web" | "research",
  topK = 6,
): Promise<RetrievalResult[]> {
  const index = await getVectorIndex()
  const filtered = index.filter((c) => c.categories?.includes(category))
  return filtered.slice(0, topK).map((chunk) => ({ chunk, score: 1 }))
}
