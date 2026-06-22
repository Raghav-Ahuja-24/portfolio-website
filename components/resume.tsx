"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import Image from "next/image"

const RESUME_PDF = "/RESUME_RAGHAV_AHUJA.pdf"
const RESUME_PREVIEW = "/images/raghav-ahuja-resume-preview.png"

export function Resume() {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = RESUME_PDF
    link.download = "RESUME_RAGHAV_AHUJA.pdf"
    link.click()
  }

  const handlePreview = () => {
    window.open(RESUME_PDF, "_blank")
  }

  return (
    <section id="resume" className="py-20 px-6 lg:px-12 relative">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 gradient-bg-1 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text-2">Resume</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SlideIn direction="left" delay={0.2}>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-medium text-white mb-4">Download My Resume</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Access my detailed resume to learn more about my academic background, technical projects, and skills.
                  It provides a comprehensive overview of my journey in Computer Science with a specialization in
                  Artificial Intelligence.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>Updated: June 2026</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span>Format: PDF</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300 text-sm">Size: ~117KB</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleDownload}
                  className="flex-1 gradient-bg-1 hover:scale-105 transition-all duration-300 text-white border-0"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button
                  onClick={handlePreview}
                  variant="outline"
                  className="flex-1 bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.4}>
            <Card className="bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handlePreview}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handlePreview()
                      }
                    }}
                    className="relative w-full aspect-[3/4] max-h-[420px] rounded-lg border border-white/10 overflow-hidden bg-white shadow-lg group/preview cursor-pointer"
                    aria-label="Open resume preview"
                  >
                    <Image
                      src={RESUME_PREVIEW}
                      alt="Raghav Ahuja Resume Preview"
                      fill
                      className="object-contain object-top p-1"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-transparent group-hover/preview:bg-black/10 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover/preview:opacity-100">
                      <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        Click to open full preview
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Resume Highlights</h3>
                    <p className="text-gray-300 text-sm mb-4">Key sections included in my resume:</p>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 gradient-bg-1 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Education & Academic Achievements</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 gradient-bg-2 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Technical Projects</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 gradient-bg-3 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Technical Skills</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 gradient-bg-4 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Certifications</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
