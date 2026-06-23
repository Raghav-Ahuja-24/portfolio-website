"use client"

import React from "react"
import { motion } from "framer-motion"
import { FlaskConical, Clock, FileCheck, Users, Activity, Network, Binary, ShieldCheck } from "lucide-react"
import { RESEARCH_EXPERIENCE } from "@/lib/portfolio/corpus"
import { FadeIn } from "@/components/animations/fade-in"

export function ResearchExperience() {
  const entry = RESEARCH_EXPERIENCE[0]

  if (!entry) return null

  // Separate Datasets from conceptual tags for the bottom strip
  const datasets = entry.focus.filter(f => ["MPII", "CrowdPose", "COCO"].includes(f))
  const concepts = entry.focus.filter(f => !["MPII", "CrowdPose", "COCO"].includes(f))

  return (
    <section id="research" className="py-24 px-6 lg:px-12 bg-[#050814] relative overflow-hidden">
      {/* Background glow and subtle space effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <FadeIn>
          {/* Futuristic Section Header */}
          <div className="flex items-center gap-6 mb-16 max-w-4xl mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-400/80" />
            <h2 className="text-sm md:text-base font-medium text-cyan-300 tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
              Research Mission Control
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-400/80" />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* Main Mission Control Panel */}
          <div className="relative w-full rounded-[2rem] p-[1px] bg-gradient-to-br from-cyan-500/40 via-slate-800/40 to-violet-500/40 shadow-[0_0_100px_rgba(6,182,212,0.15)] group">
            <div className="bg-[#0a0e1a]/90 backdrop-blur-3xl rounded-[2rem] overflow-hidden relative">
              
              {/* Subtle Grid Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: '20px 20px'
                }} 
              />

              {/* Animated Connection Lines Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                  animate={{ translateX: ['-100%', '100%'] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
                  animate={{ translateX: ['100%', '-100%'] }}
                  transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* 3-6-3 Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 border-b border-white/5">
                
                {/* ── Left Panel: Identity & Status ── */}
                <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <div className="flex flex-col h-full justify-between gap-10">
                    <div>
                      {/* Glowing Flask Avatar */}
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-950 to-blue-900/50 flex items-center justify-center border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-6 relative overflow-hidden"
                        animate={{ boxShadow: ['0 0 20px rgba(6,182,212,0.2)', '0 0 45px rgba(6,182,212,0.5)', '0 0 20px rgba(6,182,212,0.2)'] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <div className="absolute inset-0 bg-cyan-400/20 blur-xl animate-pulse" />
                        <FlaskConical className="w-7 h-7 text-cyan-300 relative z-10" />
                      </motion.div>
                      
                      <div className="space-y-1.5">
                        <div className="text-cyan-400/80 text-[10px] uppercase tracking-[0.2em] font-mono">Lead Investigator</div>
                        <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-md">Raghav Ahuja</h3>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">{entry.affiliation}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] text-emerald-300 uppercase tracking-widest font-semibold">{entry.status}</span>
                      </div>
                      
                      <div className="px-3 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                        <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] text-amber-300 uppercase tracking-widest font-semibold">Manuscript Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Center Panel: Research Summary ── */}
                <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center relative">
                  {/* Subtle pulsing background node */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] uppercase tracking-widest font-mono mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      <Network className="w-3.5 h-3.5" />
                      Core Architecture Concept
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400 mb-6 leading-[1.15] tracking-tight drop-shadow-sm">
                      {entry.title}
                    </h2>
                    
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light mb-8 max-w-2xl">
                      {entry.description}
                    </p>

                    <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Research Team</span>
                      <div className="flex flex-wrap gap-2">
                        {entry.team.map((member, i) => (
                          <div 
                            key={i} 
                            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2"
                          >
                            <div className="w-4 h-4 rounded-full bg-cyan-900/50 flex items-center justify-center text-[8px] text-cyan-300">
                              {member.split(' ').map(n => n[0]).join('')}
                            </div>
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right Panel: Floating Metric Cards ── */}
                <div className="lg:col-span-3 p-8 border-t lg:border-t-0 lg:border-l border-white/5 bg-gradient-to-bl from-white/[0.02] to-transparent">
                  <div className="flex flex-col gap-5 h-full justify-center relative z-10">
                    <div className="text-[10px] text-cyan-400/70 uppercase tracking-[0.2em] font-mono mb-2 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" /> Performance Telemetry
                    </div>

                    {entry.metrics.map((metric, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5, x: -5, scale: 1.02 }}
                        className="p-5 rounded-2xl bg-[#0f1423] border border-white/5 hover:border-cyan-500/40 hover:bg-[#131b2f] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] group cursor-default"
                      >
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 group-hover:text-cyan-400 transition-colors">{metric.label}</div>
                        <div className="text-3xl font-black text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all tracking-tight">
                          {metric.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Bottom Strip: Datasets Orbit ── */}
              <div className="p-6 bg-[#03050a]/60 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                
                {/* Simulated Data Flow Line Header */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <motion.div 
                  className="absolute top-0 left-0 w-32 h-[1px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
                  animate={{ left: ['-10%', '110%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="flex items-center gap-5 flex-wrap w-full md:w-auto">
                  <div className="text-[10px] text-cyan-500 uppercase tracking-[0.2em] font-mono flex items-center gap-2 shrink-0">
                    <Binary className="w-3.5 h-3.5" /> Data Orbit
                  </div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {datasets.map((ds, i) => (
                      <div key={i} className="px-3.5 py-1.5 rounded-md border border-cyan-500/20 bg-cyan-950/30 text-xs text-cyan-100 uppercase tracking-wider shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
                        {ds}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block w-px h-8 bg-white/10 shrink-0" />

                <div className="flex items-center gap-5 flex-wrap w-full md:w-auto md:justify-end">
                  <div className="text-[10px] text-violet-400 uppercase tracking-[0.2em] font-mono flex items-center gap-2 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" /> Pipeline Config
                  </div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {concepts.map((concept, i) => (
                      <div key={i} className="px-3.5 py-1.5 rounded-md border border-violet-500/20 bg-violet-950/30 text-xs text-violet-100 uppercase tracking-wider shadow-[inset_0_0_10px_rgba(139,92,246,0.1)]">
                        {concept}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
