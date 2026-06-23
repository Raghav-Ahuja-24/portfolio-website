"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Download, Eye, Briefcase, GraduationCap, FlaskConical, Code2, Award, Zap, CheckCircle2 } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import Image from "next/image"

const RESUME_PDF = "/RESUME_RAGHAV_AHUJA.pdf"
const RESUME_PREVIEW = "/images/raghav-ahuja-resume-preview.png"

const NODES = [
  { id: "edu", label: "Education", icon: GraduationCap, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", pos: { top: "5%", left: "15%" }, delay: 0.2 },
  { id: "proj", label: "Projects", icon: Code2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", pos: { top: "45%", left: "5%" }, delay: 0.3 },
  { id: "research", label: "Research", icon: FlaskConical, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", pos: { bottom: "10%", left: "20%" }, delay: 0.4 },
  { id: "skills", label: "Skills", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", pos: { top: "15%", right: "15%" }, delay: 0.5 },
  { id: "cert", label: "Certifications", icon: Award, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", pos: { bottom: "25%", right: "10%" }, delay: 0.6 },
]

export function Resume() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 3D Tilt Setup
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

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
    <section id="resume" className="py-24 px-4 lg:px-12 relative bg-[#03050a] overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Deep Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header / Health Score */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 relative z-30">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Briefcase className="w-3.5 h-3.5" /> Digital Dossier
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight drop-shadow-md">
                Identity Core
              </h2>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3 bg-[#0a0e1a]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Profile Health</span>
                  <span className="text-emerald-400 font-bold tracking-wider">100% OPTIMAL</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handlePreview}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold tracking-wider transition-all flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" /> INITIALIZE VIEW
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                >
                  <Download className="w-3.5 h-3.5" /> EXTRACT DATA
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Central Dossier Area */}
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center mt-10 lg:mt-0">
          
          {/* SVG Connection Lines (Background) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 hidden lg:block">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
                <stop offset="50%" stopColor="rgba(56, 189, 248, 0.6)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0.1)" />
              </linearGradient>
            </defs>
            {/* Draw abstract connecting lines from center to nodes */}
            <path d="M 50% 50% L 20% 15%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
            <path d="M 50% 50% L 10% 50%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
            <path d="M 50% 50% L 25% 85%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
            <path d="M 50% 50% L 80% 25%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
            <path d="M 50% 50% L 85% 70%" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
          </svg>

          {/* Floating Nodes */}
          {NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: node.delay, duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className={`absolute hidden lg:flex flex-col items-center gap-3 z-10 ${isHovered ? 'opacity-40 blur-[2px]' : 'opacity-100'} transition-all duration-500 hover:!opacity-100 hover:!blur-0`}
              style={node.pos}
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                className={`w-14 h-14 rounded-2xl ${node.bg} ${node.border} border backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] relative group cursor-default hover:scale-110 transition-transform`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
                <node.icon className={`w-6 h-6 ${node.color}`} />
              </motion.div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 bg-[#0a0e1a]/90 px-3 py-1.5 rounded-full border border-white/10 shadow-lg backdrop-blur-md">
                {node.label}
              </span>
            </motion.div>
          ))}

          {/* Central 3D Capsule */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX: mounted ? rotateX : 0, 
              rotateY: mounted ? rotateY : 0, 
              perspective: 1500 
            }}
            className="relative w-[300px] sm:w-[420px] h-[450px] sm:h-[600px] z-20 cursor-pointer group"
            onClick={handlePreview}
          >
            {/* Holographic glowing base/shadow */}
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-[2.5rem] blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500 opacity-60" />
            
            <div className="w-full h-full relative rounded-3xl border border-cyan-500/40 bg-[#050814]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden transform-gpu transition-all duration-300 group-hover:shadow-[0_0_80px_rgba(6,182,212,0.4)]">
              
              {/* Animated Corner Brackets */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl m-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl m-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl m-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-400 rounded-br-xl m-3 opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Resume Image */}
              <div className="absolute inset-5 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <Image
                  src={RESUME_PREVIEW}
                  alt="Resume Preview"
                  fill
                  className="object-contain object-top opacity-80 group-hover:opacity-100 transition-opacity filter group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Scanning Laser Line */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl z-10">
                <motion.div
                  className="w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_3px_rgba(34,211,238,0.8)]"
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{ position: 'absolute' }}
                />
                <motion.div
                  className="w-full h-40 bg-gradient-to-b from-transparent via-cyan-400/5 to-cyan-400/20"
                  animate={{ top: ['-30%', '110%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  style={{ position: 'absolute' }}
                />
              </div>

              {/* Overlay Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none rounded-3xl mix-blend-overlay z-20" />

              {/* Hover Status Text */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <span className="px-5 py-2 rounded-full bg-[#0a0e1a]/95 border border-cyan-500/50 text-cyan-300 text-[10px] uppercase tracking-widest font-mono shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md whitespace-nowrap">
                  Initialize View
                </span>
              </div>
            </div>

            {/* Floating Particles around Capsule */}
            <motion.div 
              className="absolute -top-8 -right-8 w-3 h-3 bg-cyan-400 rounded-full blur-[2px]"
              animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-1/2 -left-10 w-2 h-2 bg-blue-400 rounded-full blur-[1px]"
              animate={{ y: [0, 30, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.div 
              className="absolute -bottom-6 right-1/4 w-4 h-4 bg-violet-400 rounded-full blur-[3px]"
              animate={{ x: [0, 20, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            />

          </motion.div>

        </div>
      </div>
    </section>
  )
}
