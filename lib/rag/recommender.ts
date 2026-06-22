import {
  CATEGORY_LABELS,
  getProjectsByCategory,
  PROJECTS,
  type ProjectCategory,
  type PortfolioProject,
} from "@/lib/portfolio/corpus"
import { retrieve } from "@/lib/rag/retriever"

export interface ProjectRecommendation {
  id: string
  title: string
  role?: string
  description: string
  technologies: string[]
  categories: ProjectCategory[]
  githubUrl: string
  relevance?: string
}

const CATEGORY_ALIASES: Record<string, ProjectCategory> = {
  ai: "ai",
  "artificial intelligence": "ai",
  "machine learning": "ai",
  ml: "ai",
  web: "web",
  "web development": "web",
  frontend: "web",
  fullstack: "web",
  "full stack": "web",
  research: "research",
  "research projects": "research",
  "deep learning": "research",
}

export function parseCategoryQuery(query: string): ProjectCategory | null {
  const q = query.toLowerCase().trim()
  for (const [alias, cat] of Object.entries(CATEGORY_ALIASES)) {
    if (q.includes(alias)) return cat
  }
  return null
}

export async function recommendProjects(query?: string, category?: ProjectCategory): Promise<{
  projects: ProjectRecommendation[]
  category: ProjectCategory | null
  label: string
}> {
  let resolvedCategory = category ?? (query ? parseCategoryQuery(query) : null)

  if (!resolvedCategory && query) {
    const results = await retrieve(query, 4)
    const projectChunks = results.filter((r) => r.chunk.source === "project")
    if (projectChunks.length > 0) {
      const projects: ProjectRecommendation[] = projectChunks.map((r) => {
        const full = PROJECTS.find((p) => p.title === r.chunk.title)
        return {
          id: r.chunk.documentId.replace("project-", ""),
          title: r.chunk.title,
          role: full?.role,
          description: full?.description ?? r.chunk.content,
          technologies: full?.technologies ?? [],
          categories: full?.categories ?? [],
          githubUrl: full?.githubUrl ?? r.chunk.metadata?.github ?? "",
          relevance: `Matched via semantic search (${Math.round(r.score * 100)}% relevance)`,
        }
      })
      return { projects, category: null, label: "Recommended Projects" }
    }
  }

  if (resolvedCategory) {
    const list = getProjectsByCategory(resolvedCategory)
    return {
      projects: list.map(toRecommendation),
      category: resolvedCategory,
      label: CATEGORY_LABELS[resolvedCategory],
    }
  }

  const { PROJECTS: allProjects } = await import("@/lib/portfolio/corpus")
  return {
    projects: allProjects.map(toRecommendation),
    category: null,
    label: "All Projects",
  }
}

function toRecommendation(p: PortfolioProject): ProjectRecommendation {
  return {
    id: p.id,
    title: p.title,
    role: p.role,
    description: p.description,
    technologies: p.technologies,
    categories: p.categories,
    githubUrl: p.githubUrl,
  }
}
