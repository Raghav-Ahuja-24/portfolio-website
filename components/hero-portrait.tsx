"use client"

import { useState, useRef, type MouseEvent } from "react"
import Image from "next/image"
import { motion, useSpring, useTransform } from "framer-motion"
import { useHasMounted } from "@/hooks/use-has-mounted"

/** Drop your transparent PNG (black coat) at public/images/raghav-portrait.png */
const PORTRAIT_SRC = "/images/raghav-portrait.png"

const SHARDS = [
  { id: 1, top: "8%", left: "-4%", size: 28, rotate: -24, delay: 0 },
  { id: 2, top: "34%", right: "-6%", size: 22, rotate: 38, delay: 0.4 },
  { id: 3, top: "62%", left: "2%", size: 18, rotate: 12, delay: 0.8 },
  { id: 4, top: "78%", right: "4%", size: 14, rotate: -45, delay: 1.2 },
  { id: 5, top: "18%", right: "8%", size: 12, rotate: 60, delay: 0.6 },
]

export function HeroPortrait() {
  const mounted = useHasMounted()
  const [portraitReady, setPortraitReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useSpring(0, { stiffness: 120, damping: 22 })
  const mouseY = useSpring(0, { stiffness: 120, damping: 22 })

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [10, -10])
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [-6, 6])
  const portraitX = useTransform(mouseX, [-0.5, 0.5], [-12, 12])
  const portraitY = useTransform(mouseY, [-0.5, 0.5], [-8, 8])

  const showPlaceholder = !mounted || !portraitReady

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-[min(100%,440px)] aspect-[4/5] mx-auto lg:mx-0 lg:ml-auto"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer aura */}
      <div className="absolute -inset-10 void-rift-aura rounded-full blur-3xl opacity-60 pointer-events-none" />

      <motion.div
        className="relative w-full h-full"
        style={
          mounted
            ? { rotateY, rotateX, transformStyle: "preserve-3d" }
            : { transformStyle: "preserve-3d" }
        }
      >
        {/* Floating glass shards */}
        {SHARDS.map((shard) => (
          <motion.div
            key={shard.id}
            className="absolute void-shard pointer-events-none z-20"
            style={{
              top: shard.top,
              left: shard.left,
              right: shard.right,
              width: shard.size,
              height: shard.size * 1.6,
              rotate: shard.rotate,
            }}
            animate={mounted ? { y: [0, -10, 0], opacity: [0.35, 0.75, 0.35] } : false}
            transition={{ duration: 4 + shard.delay, repeat: Infinity, ease: "easeInOut", delay: shard.delay }}
          />
        ))}

        {/* Main portal — asymmetric clip */}
        <div className="absolute inset-0 void-portal-clip overflow-hidden border border-white/10">
          {/* Left void */}
          <div className="absolute inset-0 bg-[#030508]" />

          {/* Right dimension — living mesh */}
          <div className="absolute inset-0 void-mesh-bg opacity-90" />

          {/* The rift — portrait silhouettes against this */}
          <div className="absolute top-0 bottom-0 left-[46%] -translate-x-1/2 w-[3px] void-rift-core z-[2]" />
          <div className="absolute top-0 bottom-0 left-[46%] -translate-x-1/2 w-16 void-rift-glow z-[1]" />
          <div className="absolute top-0 bottom-0 left-[46%] -translate-x-1/2 w-32 void-rift-halo z-0" />

          {/* Scan sweep */}
          <div className="absolute inset-0 void-scan-line pointer-events-none z-[3]" />

          {/* Neural breach lines */}
          <svg className="absolute inset-0 w-full h-full z-[4] pointer-events-none opacity-40" viewBox="0 0 440 550">
            <motion.path
              d="M202 0 L202 180 L120 240 L202 320 L202 550"
              fill="none"
              stroke="url(#riftStroke)"
              strokeWidth="1"
              initial={false}
              animate={mounted ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />
            <motion.path
              d="M202 80 L280 140 L202 220 M202 400 L160 460 L202 520"
              fill="none"
              stroke="url(#riftStroke)"
              strokeWidth="0.75"
              initial={false}
              animate={mounted ? { pathLength: 1, opacity: 0.7 } : { pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="riftStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="35%" stopColor="rgba(180,230,255,0.8)" />
                <stop offset="65%" stopColor="rgba(140,100,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* HUD micro-labels */}
          <div className="absolute top-5 left-5 z-10 font-mono text-[9px] tracking-[0.3em] text-cyan-300/40 uppercase">
            breach // 04
          </div>
          <div className="absolute top-5 right-5 z-10 font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase text-right">
            dim · open
          </div>
          <div className="absolute bottom-5 left-5 z-10 font-mono text-[9px] text-white/20">
            <span className="void-blink text-emerald-400/70">●</span> signal locked
          </div>

          {/* Portrait — steps through the rift */}
          <motion.div
            className="absolute inset-x-0 top-0 bottom-0 flex items-end justify-center z-[15]"
            style={mounted ? { x: portraitX, y: portraitY } : undefined}
          >
            <div className="relative h-[98%] w-full flex items-end justify-center isolate">
              <Image
                src={PORTRAIT_SRC}
                alt="Raghav Ahuja"
                width={400}
                height={500}
                priority
                className={`void-portrait-cutout h-full w-auto max-w-[96%] object-contain object-bottom transition-opacity duration-700 ${
                  portraitReady ? "opacity-100" : "opacity-0 absolute pointer-events-none"
                }`}
                onLoad={() => setPortraitReady(true)}
                onError={() => setPortraitReady(false)}
              />

              {showPlaceholder && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end h-full pb-6">
                  {/* Silhouette stepping out of rift */}
                  <div className="relative flex items-end justify-center h-[78%] w-full">
                    <div className="absolute top-0 bottom-12 left-[46%] -translate-x-1/2 w-20 void-rift-glow opacity-80" />
                    <div className="relative z-10 flex flex-col items-center justify-end h-full">
                      <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-b from-slate-500/50 to-slate-900/90 border border-white/15 mb-1 shadow-[0_0_30px_rgba(180,220,255,0.15)]" />
                      <div className="w-[110px] h-[140px] rounded-t-[40%] bg-gradient-to-b from-slate-800/90 via-[#0a0c10] to-transparent border-x border-t border-white/10 void-portrait-cutout" />
                    </div>
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.35em] text-white/35 uppercase mt-2">Awaiting subject</p>
                  <p className="text-[10px] text-white/20 mt-1 text-center max-w-[200px]">
                    PNG · no background ·{" "}
                    <span className="text-cyan-400/45">images/raghav-portrait.png</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Floor reflection under black coat */}
          <div className="absolute bottom-0 inset-x-0 h-24 z-[12] pointer-events-none">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 void-floor-reflection blur-lg" />
            <div className="absolute bottom-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
          </div>

          {/* Chromatic edge fringing on portal border */}
          <div className="absolute inset-0 void-chromatic-edge pointer-events-none z-[20]" />
        </div>

        {/* Orbiting tag */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md font-mono text-[10px] tracking-widest text-white/50 uppercase whitespace-nowrap"
          animate={mounted ? { y: [0, -4, 0] } : false}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          emerging from the void
        </motion.div>
      </motion.div>
    </div>
  )
}
