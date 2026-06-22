"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Sparkles, FolderKanban, FileSearch, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  sources?: string[]
}

interface ProjectRec {
  id: string
  title: string
  role?: string
  description: string
  technologies: string[]
  githubUrl: string
  relevance?: string
}

interface JDResult {
  matchScore: number
  semanticScore: number
  skillsScore: number
  matchedSkills: string[]
  missingSkills: string[]
  relevantProjects: { title: string; reason: string; score: number }[]
  summary: string
}

const QUICK_PROMPTS = [
  "What AI projects has Raghav built?",
  "Tell me about CardioSonic",
  "What are Raghav's skills?",
  "Summarize Raghav's experience",
]

const PROJECT_FILTERS = [
  { label: "AI Projects", category: "ai" as const, query: "Show AI projects" },
  { label: "Web Development", category: "web" as const, query: "Show Web Development projects" },
  { label: "Research", category: "research" as const, query: "Show Research projects" },
]

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("chat")

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Raghav AI — ask me anything about Raghav's projects, skills, education, or experience.",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Recommender state
  const [projects, setProjects] = useState<ProjectRec[]>([])
  const [projectLabel, setProjectLabel] = useState("")
  const [projectsLoading, setProjectsLoading] = useState(false)

  // JD analyzer state
  const [jdText, setJdText] = useState("")
  const [jdResult, setJdResult] = useState<JDResult | null>(null)
  const [jdLoading, setJdLoading] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  useEffect(() => {
    if (open && tab === "projects" && projects.length === 0) {
      fetchProjects("ai")
    }
  }, [open, tab, projects.length])

  const sendChat = async (text: string) => {
    if (!text.trim() || chatLoading) return
    const userMsg: ChatMessage = { role: "user", content: text.trim() }
    setMessages((m) => [...m, userMsg])
    setChatInput("")
    setChatLoading(true)

    try {
      const history = messages.filter((m) => m.role === "user" || m.role === "assistant")
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer, sources: data.sources },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  const fetchProjects = async (category: "ai" | "web" | "research") => {
    setProjectsLoading(true)
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      })
      const data = await res.json()
      if (res.ok) {
        setProjects(data.projects)
        setProjectLabel(data.label)
      }
    } finally {
      setProjectsLoading(false)
    }
  }

  const analyzeJd = async () => {
    if (jdText.trim().length < 20 || jdLoading) return
    setJdLoading(true)
    setJdResult(null)
    try {
      const res = await fetch("/api/ai/analyze-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jdText.trim() }),
      })
      const data = await res.json()
      if (res.ok) setJdResult(data)
    } finally {
      setJdLoading(false)
    }
  }

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 pl-4 pr-5 py-3 rounded-full gradient-bg-1 text-white shadow-lg shadow-purple-500/25 hover:scale-105 transition-all duration-300 border border-white/10"
          aria-label="Open Raghav AI assistant"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-medium">Chat with Raghav AI</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(100vw-2rem,420px)] h-[min(85vh,640px)] flex flex-col rounded-2xl border border-white/15 bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg-1 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Raghav AI</p>
                <p className="text-[10px] text-gray-500">RAG · Portfolio Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col min-h-0 overflow-hidden">
            <TabsList className="mx-3 mt-2 mb-1 shrink-0 grid grid-cols-3 h-9 bg-white/5 border border-white/10 p-1">
              <TabsTrigger
                value="chat"
                className="text-xs gap-1 data-[state=active]:gradient-bg-1 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
              >
                <Bot className="w-3 h-3" /> Chat
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="text-xs gap-1 data-[state=active]:gradient-bg-2 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
              >
                <FolderKanban className="w-3 h-3" /> Projects
              </TabsTrigger>
              <TabsTrigger
                value="analyzer"
                className="text-xs gap-1 data-[state=active]:gradient-bg-3 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400"
              >
                <FileSearch className="w-3 h-3" /> JD Match
              </TabsTrigger>
            </TabsList>

            {/* ── Chat ── */}
            <TabsContent
              value="chat"
              className="flex flex-1 flex-col min-h-0 mt-0 px-3 pb-3 overflow-hidden data-[state=inactive]:hidden"
            >
              {/* Messages — scrollable, takes remaining space */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1">
                <div className="space-y-3 py-2">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words ${
                          msg.role === "user"
                            ? "gradient-bg-1 text-white rounded-br-md"
                            : "bg-white/[0.06] text-gray-200 border border-white/10 rounded-bl-md"
                        }`}
                      >
                        {msg.content}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-1">
                            {msg.sources.map((s) => (
                              <Badge key={s} variant="outline" className="text-[9px] border-white/15 text-gray-500">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs pl-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Thinking...
                    </div>
                  )}
                  <div ref={chatEndRef} className="h-1" />
                </div>
              </div>

              {/* Footer — suggestions + input, never overlaps messages */}
              <div className="shrink-0 pt-3 mt-2 border-t border-white/10 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Try asking</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendChat(p)}
                        disabled={chatLoading}
                        className="text-[10px] leading-snug px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-colors disabled:opacity-50"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <Textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendChat(chatInput)
                      }
                    }}
                    placeholder="Ask about Raghav..."
                    className="flex-1 min-h-[42px] max-h-24 py-2.5 resize-none bg-white/5 border-white/10 text-white placeholder:text-gray-600 text-sm leading-normal"
                    rows={1}
                  />
                  <Button
                    size="icon"
                    className="gradient-bg-1 shrink-0 h-[42px] w-[42px] border-0"
                    onClick={() => sendChat(chatInput)}
                    disabled={chatLoading || !chatInput.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ── Project Recommender ── */}
            <TabsContent
              value="projects"
              className="flex flex-1 flex-col min-h-0 mt-0 px-3 pb-3 overflow-hidden data-[state=inactive]:hidden"
            >
              <div className="shrink-0 flex flex-wrap gap-2 py-2">
                {PROJECT_FILTERS.map((f) => (
                  <Button
                    key={f.category}
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 border-white/15 text-gray-300 hover:bg-white/10 bg-transparent"
                    onClick={() => fetchProjects(f.category)}
                    disabled={projectsLoading}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1">
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-12 text-gray-500 text-sm gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading projects...
                  </div>
                ) : (
                  <div className="space-y-3 pb-2">
                    {projectLabel && (
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{projectLabel}</p>
                    )}
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:border-white/20 transition-colors"
                      >
                        <h4 className="text-sm font-medium text-white mb-1">{p.title}</h4>
                        {p.role && <p className="text-[11px] text-blue-400 mb-1">{p.role}</p>}
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-2">{p.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {p.technologies.slice(0, 5).map((t) => (
                            <Badge key={t} className="text-[9px] gradient-bg-3 border-0 text-white">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[11px] text-cyan-400 hover:text-cyan-300"
                          >
                            View on GitHub <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ── Resume / JD Analyzer ── */}
            <TabsContent
              value="analyzer"
              className="flex flex-1 flex-col min-h-0 mt-0 px-3 pb-3 overflow-hidden data-[state=inactive]:hidden"
            >
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1">
                <div className="py-2 space-y-3">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Paste a job description to see how well Raghav&apos;s portfolio matches — powered by RAG +
                    embeddings.
                  </p>
                  <Textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste job description here..."
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 text-sm"
                  />
                  <Button
                    className="w-full gradient-bg-2 border-0 text-white"
                    onClick={analyzeJd}
                    disabled={jdLoading || jdText.trim().length < 20}
                  >
                    {jdLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      <>
                        <FileSearch className="w-4 h-4 mr-2" /> Get Match Score
                      </>
                    )}
                  </Button>

                  {jdResult && (
                    <div className="space-y-3 pt-1 pb-2">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Overall Match</span>
                          <span className="text-2xl font-light gradient-text-2">{jdResult.matchScore}%</span>
                        </div>
                        <Progress value={jdResult.matchScore} className="h-2 bg-white/10" />
                        <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
                          <span>Skills: {jdResult.skillsScore}%</span>
                          <span>Semantic: {jdResult.semanticScore}%</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">{jdResult.summary}</p>

                      {jdResult.matchedSkills.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Matched Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {jdResult.matchedSkills.map((s) => (
                              <Badge key={s} className="text-[9px] gradient-bg-4 border-0 text-white">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {jdResult.missingSkills.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Gaps to Address</p>
                          <div className="flex flex-wrap gap-1">
                            {jdResult.missingSkills.map((s) => (
                              <Badge key={s} variant="outline" className="text-[9px] border-red-400/30 text-red-300/70">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {jdResult.relevantProjects.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Relevant Projects</p>
                          {jdResult.relevantProjects.map((p) => (
                            <div key={p.title} className="text-xs text-gray-400 mb-1.5 flex justify-between gap-2">
                              <span className="text-gray-300 truncate">{p.title}</span>
                              <span className="text-cyan-400 shrink-0">{p.score}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  )
}
