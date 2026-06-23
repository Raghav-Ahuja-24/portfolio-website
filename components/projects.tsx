"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Activity, Zap, Cpu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"

// Define the project data with metrics for the new UI
const projects = [
  {
    title: "Sprout Circle",
    subtitle: "Smart Daycare Management App",
    role: "Frontend Lead Developer",
    metrics: ["Multi-role platform", "GPS tracking", "AI chatbot"],
    description: "Led frontend development for an innovative daycare management solution serving children from infancy to 13 years. Features secure multi-role authentication, interactive educational games, a 24/7 AI chatbot, real-time GPS tracking, and comprehensive progress reporting.",
    image: "/images/sproutcircle-new-logo.png",
    technologies: ["React", "TypeScript", "Node.js", "Firebase", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/dark-Warrior-2412",
    liveUrl: "https://example.com",
    themeColor: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-cyan-500/20",
    icon: <Activity className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "CardioSonic",
    subtitle: "Heart Disease Prediction System",
    role: "AI/ML Engineer",
    metrics: ["Heart disease prediction", "Deep learning", "Audio analysis"],
    description: "Expert-level deep learning project that predicts heart conditions by analyzing heartbeat audio files (.wav/.mp3) with 100% test accuracy. Uses CNNs and LSTM/GRU networks with PhysioNet datasets, advanced audio preprocessing, and MFCC feature extraction.",
    image: "/images/cardiosonic-logo.png",
    technologies: ["Python", "TensorFlow", "CNN", "LSTM", "Flask", "Librosa"],
    githubUrl: "https://github.com/dark-Warrior-2412",
    liveUrl: "https://example.com",
    themeColor: "from-rose-500 to-pink-500",
    shadowColor: "shadow-pink-500/20",
    icon: <Activity className="w-5 h-5 text-pink-400" />
  },
  {
    title: "Aakashvaani",
    subtitle: "Python Voice Assistant",
    role: "Core Developer",
    metrics: ["Voice assistant", "Speech recognition", "Automation"],
    description: "Developed 'Aakashvaani,' a Python-based voice assistant capable of performing operations like playing media, web searches, setting alarms, and providing weather updates. Converts user voice commands to text and delivers both text and voice responses.",
    image: "/images/aakashvaani-logo.png",
    technologies: ["Python", "pyttsx3", "Speech Recognition", "Web Scraping", "Automation"],
    githubUrl: "https://github.com/dark-Warrior-2412",
    liveUrl: "https://example.com",
    themeColor: "from-violet-500 to-purple-500",
    shadowColor: "shadow-purple-500/20",
    icon: <Zap className="w-5 h-5 text-purple-400" />
  },
]

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const getPositionStyles = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length
    
    if (diff === 0) {
      // Active center
      return {
        x: "0%",
        scale: 1,
        zIndex: 30,
        opacity: 1,
        rotateY: "0deg",
      }
    } else if (diff === 1) {
      // Right
      return {
        x: isMobile ? "110%" : "60%",
        scale: 0.8,
        zIndex: 20,
        opacity: isMobile ? 0 : 0.4,
        rotateY: "-25deg",
      }
    } else {
      // Left (assuming 3 projects total)
      return {
        x: isMobile ? "-110%" : "-60%",
        scale: 0.8,
        zIndex: 20,
        opacity: isMobile ? 0 : 0.4,
        rotateY: "25deg",
      }
    }
  }

  return (
    <section id="projects" className="py-24 px-4 lg:px-12 relative bg-[#03050a] overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Dynamic Background Glow based on active project */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none transition-all duration-1000 mix-blend-screen">
        <div className={`w-[800px] h-[800px] rounded-full blur-[150px] bg-gradient-to-br ${projects[activeIndex].themeColor} opacity-20`} />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col items-center mb-16 relative z-40">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5" /> Innovation Lab
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight text-center drop-shadow-md">
              Project Showcase
            </h2>
          </div>
        </FadeIn>

        {/* Carousel Container */}
        <div className="relative w-full h-[650px] md:h-[550px] flex items-center justify-center perspective-1000">
          
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-50">
            <button 
              onClick={prevProject}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 backdrop-blur-md transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-50">
            <button 
              onClick={nextProject}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 backdrop-blur-md transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {projects.map((project, index) => {
              const styles = getPositionStyles(index)
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={project.title}
                  initial={false}
                  animate={{
                    x: styles.x,
                    scale: styles.scale,
                    rotateY: styles.rotateY,
                    zIndex: styles.zIndex,
                    opacity: styles.opacity,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                  className={`absolute w-full max-w-[340px] md:max-w-[450px] h-full ${isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-60 transition-opacity'}`}
                  onClick={() => !isActive && setActiveIndex(index)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Active Project Card */}
                  <div className={`w-full h-full rounded-[2rem] p-[1px] bg-gradient-to-br ${isActive ? project.themeColor : 'from-white/10 to-white/5'} ${isActive ? project.shadowColor : ''} shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group`}>
                    <div className="bg-[#0a0e1a]/95 backdrop-blur-2xl rounded-[2rem] p-6 h-full flex flex-col relative overflow-hidden">
                      
                      {/* Top Branding / Logo Area */}
                      <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/5 mb-6 group/image">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.themeColor} opacity-20`} />
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={200}
                          height={200}
                          className="object-contain relative z-10 transition-transform duration-700 group-hover/image:scale-110"
                        />
                        
                        {/* Orbiting Tech ring (only visible when active) */}
                        {isActive && (
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="w-[250px] h-[250px] rounded-full border border-dashed border-white/20 absolute"
                            />
                            {/* Abstract orbiting dots */}
                            <motion.div 
                              animate={{ rotate: -360 }}
                              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                              className="w-[180px] h-[180px] rounded-full border border-white/5 absolute flex items-center justify-center"
                            >
                              <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -top-1 blur-[1px]" />
                              <div className="w-2 h-2 rounded-full bg-purple-400 absolute -bottom-1 blur-[1px]" />
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                          {project.icon}
                          <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                        </div>
                        <p className="text-sm font-mono text-slate-400 mb-4">{project.subtitle}</p>

                        {/* Highlight Metrics */}
                        {isActive && (
                          <div className="grid grid-cols-1 gap-2 mb-4">
                            {project.metrics.map((metric, i) => (
                              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${project.themeColor}`} />
                                <span className="text-xs text-slate-200 font-medium tracking-wide">{metric}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Expandable Description (Hover/Active) */}
                        <div className="relative flex-1 overflow-hidden group/desc mb-4">
                          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 group-hover/desc:line-clamp-none transition-all duration-300">
                            {project.description}
                          </p>
                          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0a0e1a]/95 to-transparent group-hover/desc:opacity-0 transition-opacity" />
                        </div>

                        {/* Technologies Tags */}
                        {isActive && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.technologies.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono text-slate-300 rounded bg-white/5 border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2.5 py-1 text-[10px] font-mono text-slate-500 rounded bg-white/5 border border-transparent">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        {isActive && (
                          <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold tracking-wider transition-all"
                            >
                              <Github className="w-4 h-4" /> CODE_DB
                            </Link>
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${project.themeColor} text-white text-xs font-bold tracking-wider hover:opacity-90 transition-all shadow-lg`}
                            >
                              <ExternalLink className="w-4 h-4" /> DEPLOY
                            </Link>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex 
                    ? `w-8 h-1.5 bg-gradient-to-r ${projects[activeIndex].themeColor}` 
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
