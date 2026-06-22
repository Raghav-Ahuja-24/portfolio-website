import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { FlaskConical, Clock, FileCheck, Users } from "lucide-react"
import { RESEARCH_EXPERIENCE } from "@/lib/portfolio/corpus"

export function ResearchExperience() {
  const entry = RESEARCH_EXPERIENCE[0]

  if (!entry) return null

  return (
    <section id="research" className="py-20 px-6 lg:px-12 bg-[#0f1419] relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 gradient-bg-2 rounded-full blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 gradient-bg-1 rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-4 text-center">
            <span className="gradient-text-2">Research</span> Experience
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
            Academic research in computer vision and deep learning — publication manuscript complete and awaiting
            formal approval.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden ring-1 ring-cyan-400/15">
            <div className={`absolute inset-0 ${entry.gradient} opacity-[0.05] group-hover:opacity-[0.08] transition-opacity`} />

            <CardContent className="p-6 md:p-8 relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 ${entry.gradient} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <FlaskConical className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-1 group-hover:gradient-text-2 transition-all leading-snug">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-blue-400">{entry.role}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{entry.affiliation}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:justify-end">
                  <Badge className="gradient-bg-2 border-0 text-white text-[10px] gap-1">
                    <Clock className="w-3 h-3" /> In Progress
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-amber-400/40 text-amber-300 bg-amber-400/10"
                  >
                    <FileCheck className="w-3 h-3 mr-1" />
                    {entry.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">{entry.period}</span>
                {entry.statusDetail && (
                  <span className="text-[11px] text-gray-500 italic">{entry.statusDetail}</span>
                )}
              </div>

              {/* Body: description + metrics side by side on desktop */}
              <div className="grid md:grid-cols-[1fr_220px] gap-6 mb-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-300 leading-relaxed">{entry.description}</p>
                  {entry.team.length > 0 && (
                    <div className="flex items-start gap-2 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-600" />
                      <span>
                        <span className="text-gray-400">Research team:</span> {entry.team.join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {entry.metrics.length > 0 && (
                  <div className="flex md:flex-col gap-2">
                    {entry.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center md:text-left"
                      >
                        <p className="text-lg font-light gradient-text-2">{metric.value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {entry.focus.map((tag, i) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 text-white text-[10px] rounded-full ${
                      i % 3 === 0 ? "gradient-bg-1" : i % 3 === 1 ? "gradient-bg-3" : "gradient-bg-2"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
