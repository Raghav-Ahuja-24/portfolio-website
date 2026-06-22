import type { CorpusDocument } from "@/lib/portfolio/corpus"

export interface TextChunk {
  id: string
  documentId: string
  source: string
  title: string
  content: string
  categories?: CorpusDocument["categories"]
  metadata?: Record<string, string>
}

const CHUNK_SIZE = 500
const CHUNK_OVERLAP = 80

export function chunkDocuments(documents: CorpusDocument[]): TextChunk[] {
  const chunks: TextChunk[] = []

  for (const doc of documents) {
    const text = doc.content.trim()
    if (text.length <= CHUNK_SIZE) {
      chunks.push({
        id: `${doc.id}-0`,
        documentId: doc.id,
        source: doc.source,
        title: doc.title,
        content: text,
        categories: doc.categories,
        metadata: doc.metadata,
      })
      continue
    }

    let start = 0
    let index = 0
    while (start < text.length) {
      const end = Math.min(start + CHUNK_SIZE, text.length)
      chunks.push({
        id: `${doc.id}-${index}`,
        documentId: doc.id,
        source: doc.source,
        title: doc.title,
        content: text.slice(start, end),
        categories: doc.categories,
        metadata: doc.metadata,
      })
      if (end >= text.length) break
      start = end - CHUNK_OVERLAP
      index++
    }
  }

  return chunks
}
