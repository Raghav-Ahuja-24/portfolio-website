export const dynamic = "force-dynamic"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Technologies } from "@/components/technologies"
import { Certificates } from "@/components/certificates"
import { Education } from "@/components/education"
import { Projects } from "@/components/projects"
import { ResearchExperience } from "@/components/research-experience"
import { Resume } from "@/components/resume"
import { Contact } from "@/components/contact"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { AiAssistantWidget } from "@/components/ai-assistant/ai-assistant-widget"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Certificates />
        <Education />
        <Projects />
        <ResearchExperience />
        <Resume />
        <Contact />
      </main>
      <AiAssistantWidget />
    </div>
  )
}
