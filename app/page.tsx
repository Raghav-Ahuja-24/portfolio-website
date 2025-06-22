import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Technologies } from "@/components/technologies"
import { Certificates } from "@/components/certificates"
import { Education } from "@/components/education"
import { Projects } from "@/components/projects"
import { Resume } from "@/components/resume"
import { Contact } from "@/components/contact"
import { ScrollProgress } from "@/components/animations/scroll-progress"

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
        <Resume />
        <Contact />
      </main>
    </div>
  )
}
