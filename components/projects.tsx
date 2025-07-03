import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"

export function Projects() {
  const projects = [
    {
      title: "Sprout Circle - Smart Daycare Management App",
      description:
        "Led frontend development for an innovative daycare management solution serving children from infancy to 13 years. Features secure multi-role authentication for parents, teachers, and administrators, interactive educational games to engage children, a 24/7 AI chatbot for instant support, real-time GPS tracking for school buses, live photo updates from classrooms, integrated payment gateways for tuition, and comprehensive progress reporting for child development. This project significantly streamlined daycare operations and enhanced communication between staff and parents.",
      image: "/images/sproutcircle-new-logo.png",
      width: 400,
      height: 100,
      technologies: ["React", "TypeScript", "Node.js", "Firebase", "Vite", "Tailwind CSS", "SQL"],
      githubUrl: "https://github.com/dark-Warrior-2412",
      liveUrl: "https://example.com",
      gradient: "gradient-bg-1",
      role: "Frontend Lead Developer",
    },
    {
      title: "CardioSonic - Heart Disease Prediction System",
      description:
        "Expert-level deep learning project that predicts heart conditions by analyzing heartbeat audio files (.wav/.mp3) with 100% test accuracy. Uses CNNs and LSTM/GRU networks with PhysioNet datasets, advanced audio preprocessing, MFCC feature extraction, and real-time visualization dashboard with confidence scores and educational content.",
      image: "/images/cardiosonic-logo.png",
      width: 300,
      height: 300,
      technologies: ["Python", "TensorFlow", "CNN", "LSTM", "Flask", "Librosa", "NumPy", "Scikit-learn"],
      githubUrl: "https://github.com/dark-Warrior-2412",
      liveUrl: "https://example.com",
      gradient: "gradient-bg-2",
      role: "AI/ML Engineer",
    },
    {
      title: "Aakashvaani - Python Voice Assistant",
      description:
        "Developed 'Aakashvaani,' a Python-based voice assistant capable of performing basic operations like playing music/videos, web searches, setting alarms, and providing weather updates. It converts user voice commands to text, processes requests, and delivers both text and voice responses. The project integrates various Python modules including `pyttsx3` for text-to-speech, `speech_recognition` for voice input, `datetime`, `wikipedia`, `webbrowser`, `os`, `smtplib`, `googlesearch`, and `bs4` for comprehensive functionality.",
      image: "/images/aakashvaani-logo.png",
      width: 300,
      height: 300,
      technologies: ["Python", "pyttsx3", "Speech Recognition", "Web Scraping", "Automation"],
      githubUrl: "https://github.com/dark-Warrior-2412",
      liveUrl: "https://example.com",
      gradient: "gradient-bg-3",
    },
  ]

  return (
    <section id="projects" className="py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text">Projects</span>
          </h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <Card className="bg-[#1a1f2e]/80 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden h-[200px] flex items-center justify-center bg-white">
                  <div className={`absolute inset-0 ${project.gradient} opacity-20`}></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={project.width}
                    height={project.height}
                    className="object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                  />
                </div>
                <CardContent className="p-6 pt-10">
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  {project.role && <p className="text-sm text-blue-400 mb-3 font-medium">Role: {project.role}</p>}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-white text-xs rounded ${
                          techIndex % 3 === 0
                            ? "gradient-bg-1"
                            : techIndex % 3 === 1
                              ? "gradient-bg-3"
                              : "gradient-bg-2"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={`flex-1 ${project.gradient} hover:scale-105 transition-all duration-300 text-white border-0`}
                    >
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
