"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText } from "lucide-react"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"

export function Resume() {
  const handleDownload = () => {
    window.open("https://drive.google.com/file/d/1a7X-p_t3qh8AF1AUZFBxt1YIWmBvJZjy/view?usp=drive_link", "_blank")
  }

  const handlePreview = () => {
    window.open("https://drive.google.com/file/d/1a7X-p_t3qh8AF1AUZFBxt1YIWmBvJZjy/view?usp=drive_link", "_blank")
  }

  return (
    <section id="resume" className="py-20 px-6 lg:px-12 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full gradient-bg-5 opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text-2">Resume</span>
          </h2>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 gradient-bg-2 rounded-xl flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">My Resume</h3>
                      <p className="text-gray-400">Download or preview my complete professional resume</p>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    Get a comprehensive overview of my professional experience, technical skills, education, and
                    achievements. My resume showcases my journey in data analysis, software development, and various
                    technical projects.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleDownload}
                      className="gradient-bg-2 hover:scale-105 transition-all duration-300 text-white border-0"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                    <Button
                      onClick={handlePreview}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                    <Image
                      src="/images/raghav-ahuja-resume-preview.png"
                      alt="Resume Preview"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
