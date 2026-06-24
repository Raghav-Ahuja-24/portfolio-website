"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Education() {
  const [activePortal, setActivePortal] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
      yOffset: isMobile ? -160 : 0,
      xOffset: isMobile ? 0 : -200,
      size: isMobile ? 240 : 300,
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
      yOffset: isMobile ? 160 : 0,
      xOffset: isMobile ? 0 : 200,
      size: isMobile ? 240 : 300,
    }
  ]

  // Stable hover handlers — prevent flickering by using callbacks
  const handleHover = useCallback((idx: number) => {
    setActivePortal(idx)
  }, [])

  const handleUnhover = useCallback(() => {
    setActivePortal(null)
  }, [])

  return (
    <section id="education" className="py-32 bg-[#0a0e1a] relative overflow-hidden flex flex-col items-center min-h-[800px]">
      
      {/* Background glows — pure CSS, no re-renders */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-900/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

      <h2 className="text-4xl font-light text-white mb-2 relative z-20 text-center tracking-widest uppercase">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
          Education Timeline
        </span>
      </h2>
      <p className="text-slate-400 mb-20 z-20 tracking-wide text-sm uppercase">A Portal to the Future</p>

      {/* Scene Container — no 3D mouse tracking, just static layout */}
      <div className="relative w-full max-w-5xl h-[600px] flex justify-center items-center">
        <div className="absolute inset-0 flex justify-center items-center">

          {/* Connecting line between portals */}
          {!isMobile && (
            <div 
              className="absolute w-[200px] h-[2px] z-0"
              style={{
                background: "linear-gradient(90deg, rgba(45, 212, 191, 0.3), rgba(168, 85, 247, 0.3))",
              }}
            />
          )}
          {isMobile && (
            <div 
              className="absolute h-[160px] w-[2px] z-0"
              style={{
                background: "linear-gradient(180deg, rgba(45, 212, 191, 0.3), rgba(168, 85, 247, 0.3))",
              }}
            />
          )}

          {/* Portals */}
          {education.map((edu, idx) => {
            const isActive = activePortal === idx
            const isDimmed = activePortal !== null && activePortal !== idx
            
            return (
              <div
                key={idx}
                className="absolute flex justify-center items-center"
                style={{
                  width: edu.size + 60, // Extra padding to prevent hover-zone gaps
                  height: edu.size + 60,
                  transform: `translate(${edu.xOffset}px, ${edu.yOffset}px)`,
                  zIndex: isActive ? 50 : 10 + idx,
                  willChange: "auto",
                }}
                onMouseEnter={() => handleHover(idx)}
                onMouseLeave={handleUnhover}
              >
                {/* Portal Visual Circle */}
                <motion.div 
                  className="absolute rounded-full border-4 flex items-center justify-center"
                  style={{
                    width: edu.size,
                    height: edu.size,
                    borderColor: edu.color,
                    boxShadow: isActive 
                      ? `0 0 60px ${edu.glow}, inset 0 0 50px ${edu.glow}` 
                      : `0 0 30px ${edu.glow}, inset 0 0 30px ${edu.glow}`,
                    background: isActive ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)",
                    willChange: "box-shadow, background",
                    transition: "box-shadow 0.4s ease, background 0.4s ease",
                  }}
                  animate={{ 
                    scale: isActive ? 1.08 : isDimmed ? 0.95 : 1,
                    opacity: isDimmed ? 0.35 : 1,
                  }}
                  transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                >
                  {/* Rotating dashed inner ring — pure CSS animation for smoothness */}
                  <div 
                    className="absolute rounded-full border-2 border-dashed opacity-40"
                    style={{ 
                      inset: "16px",
                      borderColor: edu.color,
                      animation: `spin ${25 + idx * 10}s linear infinite`,
                    }}
                  />

                  {/* Second inner ring */}
                  <div 
                    className="absolute rounded-full border opacity-20"
                    style={{ 
                      inset: "32px",
                      borderColor: edu.color,
                      animation: `spin ${40 + idx * 10}s linear infinite reverse`,
                    }}
                  />
                </motion.div>

                {/* Portal Label */}
                <motion.div 
                  className="absolute z-10 text-center font-bold tracking-[0.2em] uppercase text-xl pointer-events-none"
                  style={{ 
                    color: edu.color,
                    textShadow: `0 0 15px ${edu.glow}`,
                  }}
                  animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.8 : 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {edu.title}
                </motion.div>

                {/* Hover Info Panel — positioned INSIDE the hover zone to prevent flicker */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute w-[300px] sm:w-[340px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left pointer-events-none"
                      style={{ 
                        top: `${edu.size / 2 + 30}px`,
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${edu.glow}`,
                        zIndex: 60,
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
              </div>
            );
          })}

        </div>
      </div>

      {/* CSS keyframes for ring rotation — much smoother than framer motion Infinity */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </section>
  )
}
