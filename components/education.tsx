"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Education() {
  const [activePortal, setActivePortal] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Very subtle parallax
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const education = [
    {
      title: "School",
      degree: "Higher Secondary Education",
      school: "ITL Public School",
      period: "2022",
      description: "Foundation built. Completed higher secondary education with a core focus on Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills.",
      gpa: "Percentage: 81.2%",
      color: "#2dd4bf", // Teal
      glow: "rgba(45, 212, 191, 0.6)",
      depth: 0,
      yOffset: isMobile ? -140 : 0,
      xOffset: isMobile ? 0 : -180,
      size: isMobile ? 260 : 320,
    },
    {
      title: "University",
      degree: "B.Tech in Computer Science",
      school: "Bennett University",
      period: "2023 - 2027",
      description: "Advanced stage. Focusing on software engineering, data structures, algorithms, web development, and AI. Active participant in coding competitions and technical events.",
      gpa: "CGPA: 7.75/10.0",
      color: "#a855f7", // Purple
      glow: "rgba(168, 85, 247, 0.8)",
      depth: 0,
      yOffset: isMobile ? 140 : 0,
      xOffset: isMobile ? 0 : 180,
      size: isMobile ? 260 : 320,
    }
  ]

  return (
    <section id="education" className="py-32 bg-[#0a0e1a] relative overflow-hidden flex flex-col items-center min-h-[800px]">
      
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-900/10 rounded-full blur-[100px] animate-pulse delay-1000 pointer-events-none" />

      <h2 className="text-4xl font-light text-white mb-2 relative z-20 text-center tracking-widest uppercase">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
          Education Timeline
        </span>
      </h2>
      <p className="text-slate-400 mb-20 z-20 tracking-wide text-sm uppercase">A Portal to the Future</p>

      {/* 3D Scene Container */}
      <div 
        className="relative w-full max-w-5xl h-[600px] flex justify-center items-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div 
          className="absolute inset-0 flex justify-center items-center transform-style-3d"
          animate={{ rotateX: mousePos.y + 10, rotateY: mousePos.x }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* Portals */}
          {education.map((edu, idx) => {
            const isActive = activePortal === idx;
            const isDimmed = activePortal !== null && activePortal !== idx;
            
            return (
              <motion.div
                key={idx}
                className="absolute flex justify-center items-center cursor-pointer group"
                style={{
                  width: edu.size,
                  height: edu.size,
                  marginLeft: -edu.size / 2,
                  marginTop: -edu.size / 2,
                  x: edu.xOffset,
                  y: edu.yOffset,
                  z: edu.depth,
                  zIndex: isActive ? 50 : 10 + idx, // Dynamically bring active portal to front
                }}
                animate={{
                  opacity: isDimmed ? 0.3 : 1,
                  scale: isActive ? 1.05 : 1,
                }}
                onHoverStart={() => setActivePortal(idx)}
                onHoverEnd={() => setActivePortal(null)}
              >
                {/* Portal Ring Core */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 backdrop-blur-md flex items-center justify-center transition-all duration-500"
                  style={{
                    borderColor: edu.color,
                    boxShadow: `0 0 40px ${edu.glow}, inset 0 0 40px ${edu.glow}`,
                    background: isActive ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.2)",
                  }}
                  animate={{ rotateZ: [0, -360] }}
                  transition={{ repeat: Infinity, duration: 30 - idx * 10, ease: "linear" }}
                >
                  {/* Inner futuristic dashed ring */}
                  <div 
                    className="absolute inset-4 rounded-full border-2 border-dashed opacity-50"
                    style={{ borderColor: edu.color }}
                  />
                </motion.div>

                {/* Portal Label (always visible) */}
                <div 
                  className="absolute z-10 text-center font-bold tracking-[0.2em] uppercase transition-all duration-300 text-xl"
                  style={{ 
                    color: edu.color,
                    textShadow: `0 0 10px ${edu.glow}`,
                    opacity: isActive ? 0 : 1
                  }}
                >
                  {edu.title}
                </div>

                {/* Hover Info Panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
                      animate={{ opacity: 1, y: edu.size / 2 + 20, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute left-1/2 w-[300px] sm:w-[340px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left"
                      style={{ 
                        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${edu.glow}`,
                      }}
                    >
                      <h3 className="text-2xl font-bold mb-2 leading-tight" style={{ color: edu.color }}>
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-white font-semibold mb-3">{edu.school}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs px-2 py-1 bg-white/10 rounded uppercase tracking-wider text-slate-300 font-medium">
                          {edu.period}
                        </span>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded uppercase tracking-wider text-slate-300 font-medium">
                          {edu.gpa}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {edu.description}
                      </p>
                      
                      {/* Decorative panel line */}
                      <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b"
                        style={{ background: edu.color, boxShadow: `0 0 12px ${edu.glow}` }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

        </motion.div>
      </div>

    </section>
  )
}
