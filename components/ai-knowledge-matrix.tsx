"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X, Zap } from "lucide-react"
import { useHasMounted } from "@/hooks/use-has-mounted"
import {
  HONEYCOMB_ROWS,
  DOMAIN_MAP,
  SKILL_CONNECTIONS,
  type SkillDomain,
} from "@/lib/skills-matrix-data"
import {
  getChipPlacements,
  type ChipShape,
} from "@/lib/skill-chip-layout"
import { CyberMetropolis } from "@/components/cyber-metropolis"

gsap.registerPlugin(ScrollTrigger)

/** Layout tokens */
const HEX_W = 200
const HEX_H = 226
const CELL_W = 340
const CELL_H = 340
const GAP_X = 80
const GAP_Y = 60
const CHIP_ORBIT = 128

const CHIP_SHAPE_CLASS: Record<ChipShape, string> = {
  pill: "rounded-full px-2 py-0.5 text-[9px]",
  capsule: "rounded-full px-3 py-1",
  hex: "skills-hex-clip px-2.5 py-1.5 min-w-[44px] text-center text-[9px]",
  pent: "skills-pent-clip px-2.5 py-1.5 min-w-[44px] text-center text-[9px]",
  node: "rounded-md px-2 py-1 text-[9px]",
}

function SkillChip({
  label,
  x,
  y,
  shape,
  delay,
  accent,
}: {
  label: string
  x: number
  y: number
  shape: ChipShape
  delay: number
  accent: string
}) {
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.span
        className={`block font-mono whitespace-nowrap border ${CHIP_SHAPE_CLASS[shape]}`}
        style={{
          borderColor: `${accent}66`,
          background: "rgba(8, 12, 22, 0.96)",
          color: "#fff",
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ delay, duration: 0.25 }}
      >
        {label}
      </motion.span>
    </div>
  )
}

function NeuralMesh({
  cellRefsRef,
  activeId,
  containerRef,
}: {
  cellRefsRef: React.RefObject<Map<string, HTMLDivElement>>
  activeId: string | null
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; key: string }[]>([])

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      const cellRefs = cellRefsRef.current
      if (!container || !cellRefs) return
      const rect = container.getBoundingClientRect()

      setLines(
        SKILL_CONNECTIONS.map(([a, b]) => {
          const elA = cellRefs.get(a)
          const elB = cellRefs.get(b)
          if (!elA || !elB) return null
          const ra = elA.getBoundingClientRect()
          const rb = elB.getBoundingClientRect()
          return {
            key: `${a}-${b}`,
            x1: ra.left + ra.width / 2 - rect.left,
            y1: ra.top + ra.height / 2 - rect.top,
            x2: rb.left + rb.width / 2 - rect.left,
            y2: rb.top + rb.height / 2 - rect.top,
          }
        }).filter(Boolean) as { x1: number; y1: number; x2: number; y2: number; key: string }[],
      )
    }

    update()
    const t = window.setTimeout(update, 150)
    window.addEventListener("resize", update)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener("resize", update)
    }
  }, [cellRefsRef, containerRef, activeId])

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden>
      <defs>
        <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(102,126,234,0.5)" />
          <stop offset="50%" stopColor="rgba(79,172,254,0.6)" />
          <stop offset="100%" stopColor="rgba(240,147,251,0.5)" />
        </linearGradient>
      </defs>
      {lines.map((line) => {
        const lit = !activeId || line.key.includes(activeId)
        return (
          <motion.line
            key={line.key}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#neural-grad)"
            strokeWidth={lit ? 1 : 0.5}
            strokeDasharray="5 5"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: lit ? 0.35 : 0.08 }}
          />
        )
      })}
    </svg>
  )
}

function SkillModule({
  domain,
  isActive,
  isFocused,
  isDimmed,
  onHover,
  onLeave,
  onClick,
  cellRef,
}: {
  domain: SkillDomain
  isActive: boolean
  isFocused: boolean
  isDimmed: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  cellRef: (el: HTMLDivElement | null) => void
}) {
  const anchor = { x: 50, y: 50 }
  const chipPlacements = getChipPlacements(domain.items, isFocused, anchor, CHIP_ORBIT)
  const mounted = useHasMounted()

  return (
    <div
      ref={cellRef}
      className={`relative flex items-center justify-center shrink-0 overflow-visible ${isActive ? "z-40" : "z-10"}`}
      style={{ width: CELL_W, height: CELL_H }}
    >
      {/* Chips orbit outside the hex — rendered at cell level so they don't stack inside */}
      <AnimatePresence>
        {isActive && (
          <div
            className="absolute left-1/2 top-1/2 z-30 pointer-events-none overflow-visible"
            style={{ width: 0, height: 0 }}
          >
            {chipPlacements.map(({ label, x, y, shape, key }, i) => (
              <SkillChip
                key={key}
                label={label}
                x={x}
                y={y}
                shape={shape}
                delay={i * 0.03}
                accent={domain.accent}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="button"
        tabIndex={0}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
        className="relative flex items-center justify-center outline-none cursor-pointer"
        style={{ width: HEX_W, height: HEX_H, transformOrigin: "center center" }}
        animate={{
          y: isActive || !mounted ? 0 : [0, -6, 0],
          scale: isFocused ? 1.08 : isActive ? 1.08 : 1,
          opacity: isDimmed ? 0.5 : 1,
        }}
        transition={
          isActive
            ? { scale: { duration: 0.25 }, opacity: { duration: 0.25 } }
            : {
                y: mounted
                  ? { duration: 4 + domain.floatDelay, repeat: Infinity, ease: "easeInOut", delay: domain.floatDelay }
                  : { duration: 0 },
                scale: { duration: 0.25 },
                opacity: { duration: 0.25 },
              }
        }
      >
        {/* Hex body — equal size for all domains */}
        <div
          className="relative skills-hex-clip"
          style={{
            width: HEX_W,
            height: HEX_H,
            background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            boxShadow: isActive
              ? `0 0 28px ${domain.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`
              : "0 12px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className={`absolute inset-0 ${domain.gradient} opacity-10 skills-hex-clip`} />
          <div className="absolute inset-0 skills-hex-clip border border-white/20 bg-[#0b101c]/90" />

          <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">
            <div className={`w-9 h-9 ${domain.gradient} rounded-lg mb-2 flex items-center justify-center`}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white leading-tight mb-1">{domain.title}</h3>
            <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-snug">
              {domain.subtitle}
            </p>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 overflow-hidden w-full"
                >
                  <div className="h-1 w-16 mx-auto rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className={`h-full ${domain.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${domain.proficiency}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <p className="text-[9px] text-cyan-400/90 mt-1 font-mono">{domain.proficiency}%</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FocusPanel({ domain, onClose }: { domain: SkillDomain; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-[#0a0e1a]/85 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative max-w-lg w-full rounded-2xl border border-white/15 overflow-hidden z-10"
        style={{ boxShadow: `0 0 48px ${domain.glow}` }}
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
      >
        <div className={`absolute inset-0 ${domain.gradient} opacity-10`} />
        <div className="relative p-6 sm:p-8 bg-[#121820]/95">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/60 mb-2">Skill cluster</p>
          <h3 className="text-2xl font-semibold text-white mb-1">{domain.title}</h3>
          <p className="text-sm text-gray-400 mb-5">{domain.subtitle}</p>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">{domain.experience}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {domain.items.map((item) => (
              <span key={item} className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {domain.projects.map((p) => (
              <span key={p} className={`text-xs px-3 py-1 rounded-lg ${domain.gradient} text-white`}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AiKnowledgeMatrix() {
  const sectionRef = useRef<HTMLElement>(null)
  const clusterRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const focusedDomain = focusedId ? DOMAIN_MAP.get(focusedId) : undefined

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-matrix-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      )
      gsap.fromTo(
        ".skills-matrix-sub",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative scroll-mt-[120px] pt-[120px] pb-24 lg:pb-32 bg-[#04060f] isolate"
    >
      {/* Background layer — z-0, behind all content */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <CyberMetropolis />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,6,15,0.7) 0%, rgba(4,6,15,0.25) 40%, rgba(4,6,15,0.35) 100%)",
          }}
        />
      </div>

      {/* Foreground content — z-10, below navbar z-50 */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
            <p className="skills-matrix-sub text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-cyan-400/50 mb-4">
              System.load(skills_matrix)
            </p>
            <h2 className="skills-matrix-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              AI <span className="gradient-text-2">Knowledge</span> Matrix
            </h2>
            <p className="skills-matrix-sub text-gray-400 text-sm sm:text-base leading-relaxed">
              Seven holographic skill domains — interconnected, interactive, and built for deep-tech exploration.
            </p>
          </div>
        </div>

        {/* Honeycomb cluster — flex rows, centered, fixed gaps (desktop) */}
        <div className="hidden md:flex w-full justify-center px-4 sm:px-6 overflow-visible">
          <div ref={clusterRef} className="relative inline-flex flex-col items-center overflow-visible" style={{ gap: GAP_Y }}>
            <NeuralMesh
              cellRefsRef={cellRefs}
              activeId={hoveredId ?? focusedId}
              containerRef={clusterRef}
            />

            {HONEYCOMB_ROWS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center items-center"
                style={{ gap: GAP_X }}
              >
                {row.map((domainId) => {
                  const domain = DOMAIN_MAP.get(domainId)
                  if (!domain) return null
                  return (
                    <SkillModule
                      key={domain.id}
                      domain={domain}
                      isActive={hoveredId === domain.id || focusedId === domain.id}
                      isFocused={focusedId === domain.id}
                      isDimmed={focusedId !== null && focusedId !== domain.id}
                      onHover={() => !focusedId && setHoveredId(domain.id)}
                      onLeave={() => !focusedId && setHoveredId(null)}
                      onClick={() => setFocusedId(focusedId === domain.id ? null : domain.id)}
                      cellRef={(el) => {
                        if (el) cellRefs.current.set(domain.id, el)
                        else cellRefs.current.delete(domain.id)
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile list */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 mt-10 grid grid-cols-2 gap-2 md:hidden">
          {Array.from(DOMAIN_MAP.values()).map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setFocusedId(d.id)}
              className="text-left p-3 rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <p className="text-xs font-medium text-white truncate">{d.title}</p>
              <p className="text-[9px] text-gray-500 font-mono mt-0.5">{d.proficiency}%</p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {focusedDomain && <FocusPanel domain={focusedDomain} onClose={() => setFocusedId(null)} />}
      </AnimatePresence>
    </section>
  )
}
