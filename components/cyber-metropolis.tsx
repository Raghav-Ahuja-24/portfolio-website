"use client"

import { useEffect, useRef } from "react"
import { SKILL_DOMAINS } from "@/lib/skills-matrix-data"

/** District zones left→right across the skyline */
const DISTRICT_SPANS: Record<string, [number, number]> = {
  frontend: [0.02, 0.15],
  backend: [0.13, 0.26],
  "deep-learning": [0.24, 0.38],
  genai: [0.36, 0.5],
  data: [0.48, 0.62],
  tools: [0.6, 0.74],
  specialized: [0.72, 0.96],
}

const DISTRICTS = SKILL_DOMAINS.map((d) => ({
  id: d.id,
  name: d.title.split(" ")[0],
  accent: d.accent,
  techs: d.items,
  x0: DISTRICT_SPANS[d.id][0],
  x1: DISTRICT_SPANS[d.id][1],
}))

interface WindowLight {
  col: number
  row: number
  on: boolean
  warmth: number
  phase: number
}

interface Building {
  x: number
  w: number
  h: number
  layer: number
  district: (typeof DISTRICTS)[0]
  tech: string
  cols: number
  rows: number
  windows: WindowLight[]
  neonStrip: boolean
  beaconPhase: number
}

interface DataFlow {
  x1: number
  y1: number
  x2: number
  y2: number
  t: number
  speed: number
  accent: string
}

interface Drone {
  x: number
  y: number
  vx: number
  vy: number
  accent: string
  payload: string
  size: number
  trail: { x: number; y: number }[]
}

function buildCity(w: number, groundY: number): Building[] {
  const out: Building[] = []
  for (const district of DISTRICTS) {
    const zoneW = (district.x1 - district.x0) * w
    const zoneX = district.x0 * w
    const count = 5 + Math.floor(Math.random() * 4)
    let cx = zoneX + 8
    while (cx < zoneX + zoneW - 12) {
      const bw = 14 + Math.random() * 22
      const layer = Math.random()
      const maxH = groundY * (0.35 + layer * 0.45)
      const bh = maxH * (0.45 + Math.random() * 0.55)
      const rows = Math.max(2, Math.floor(bh / 10))
      const cols = Math.max(1, Math.floor((bw - 6) / 7))
      const windows: WindowLight[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          windows.push({
            col: c,
            row: r,
            on: Math.random() > 0.38,
            warmth: Math.random(),
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
      out.push({
        x: cx,
        w: bw,
        h: bh,
        layer,
        district,
        tech: district.techs[Math.floor(Math.random() * district.techs.length)],
        cols,
        rows,
        windows,
        neonStrip: Math.random() > 0.72,
        beaconPhase: Math.random() * Math.PI * 2,
      })
      cx += bw + 4 + Math.random() * 10
    }
  }
  return out.sort((a, b) => a.layer - b.layer)
}

function buildFlows(buildings: Building[], groundY: number): DataFlow[] {
  const flows: DataFlow[] = []
  const tall = buildings.filter((b) => b.layer > 0.45)
  for (let i = 0; i < 18; i++) {
    const a = tall[Math.floor(Math.random() * tall.length)]
    const b = tall[Math.floor(Math.random() * tall.length)]
    if (!a || !b || a === b) continue
    flows.push({
      x1: a.x + a.w / 2,
      y1: groundY - a.h,
      x2: b.x + b.w / 2,
      y2: groundY - b.h,
      t: Math.random(),
      speed: 0.0015 + Math.random() * 0.002,
      accent: a.district.accent,
    })
  }
  return flows
}

function buildDrones(w: number, groundY: number): Drone[] {
  return Array.from({ length: 9 }, () => {
    const district = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)]
    return {
      x: (district.x0 + Math.random() * (district.x1 - district.x0)) * w,
      y: groundY * (0.12 + Math.random() * 0.28),
      vx: (Math.random() - 0.3) * 0.7,
      vy: (Math.random() - 0.5) * 0.12,
      accent: district.accent,
      payload: district.techs[Math.floor(Math.random() * district.techs.length)],
      size: 1 + Math.random() * 0.35,
      trail: [],
    }
  })
}

function drawDrone(ctx: CanvasRenderingContext2D, d: Drone, skylineTop: number, ground: number, w: number) {
  d.x += d.vx
  d.y += d.vy
  d.trail.unshift({ x: d.x, y: d.y })
  if (d.trail.length > 16) d.trail.pop()

  if (d.x < 20 || d.x > w - 20) d.vx *= -1
  if (d.y < skylineTop + 30 || d.y > ground - 80) d.vy *= -1

  const scale = d.size
  const halfW = 9 * scale
  const bodyH = 7 * scale

  /* Trail */
  for (let i = 1; i < d.trail.length; i++) {
    ctx.beginPath()
    ctx.moveTo(d.trail[i - 1].x, d.trail[i - 1].y)
    ctx.lineTo(d.trail[i].x, d.trail[i].y)
    ctx.strokeStyle = `${d.accent}${Math.floor((1 - i / d.trail.length) * 70)
      .toString(16)
      .padStart(2, "0")}`
    ctx.lineWidth = 1.5 * scale
    ctx.stroke()
  }

  /* Glow */
  ctx.beginPath()
  ctx.arc(d.x, d.y, 14 * scale, 0, Math.PI * 2)
  ctx.fillStyle = `${d.accent}18`
  ctx.fill()

  /* Drone body */
  ctx.fillStyle = `${d.accent}cc`
  ctx.strokeStyle = `${d.accent}`
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(d.x, d.y - bodyH - 3 * scale)
  ctx.lineTo(d.x - halfW, d.y + bodyH)
  ctx.lineTo(d.x + halfW, d.y + bodyH)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  /* Payload label — readable pill */
  const label = d.payload.length > 14 ? d.payload.slice(0, 13) + "…" : d.payload
  ctx.font = `600 ${Math.round(10 * scale)}px "Segoe UI", system-ui, sans-serif`
  const textW = ctx.measureText(label).width
  const pillPadX = 6 * scale
  const pillH = 16 * scale
  const pillY = d.y - bodyH - pillH - 10 * scale
  const pillW = textW + pillPadX * 2

  ctx.fillStyle = "rgba(6, 10, 20, 0.88)"
  ctx.strokeStyle = `${d.accent}aa`
  ctx.lineWidth = 1
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath()
    ctx.roundRect(d.x - pillW / 2, pillY, pillW, pillH, 4)
    ctx.fill()
    ctx.stroke()
  } else {
    ctx.fillRect(d.x - pillW / 2, pillY, pillW, pillH)
    ctx.strokeRect(d.x - pillW / 2, pillY, pillW, pillH)
  }

  ctx.fillStyle = "#ffffff"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(label, d.x, pillY + pillH / 2)
}

export function CyberMetropolis() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let buildings: Building[] = []
    let flows: DataFlow[] = []
    let drones: Drone[] = []
    let stars: { x: number; y: number; r: number; a: number }[] = []
    let groundY = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      groundY = h * 0.92
      buildings = buildCity(w, groundY)
      flows = buildFlows(buildings, groundY)
      drones = buildDrones(w, groundY)
      stars = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.55,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.35 + 0.1,
      }))
    }

    const windowRect = (b: Building, win: WindowLight, top: number) => {
      const wx = b.x + 3 + win.col * 7
      const wy = top + 4 + win.row * 10
      return { wx, wy, ww: 4, wh: 5 }
    }

    const drawBuilding = (b: Building, ground: number, alphaMul: number) => {
      const top = ground - b.h
      const accent = b.district.accent
      const alpha = (0.1 + b.layer * 0.16) * alphaMul

      ctx.fillStyle = `rgba(6, 10, 22, ${alpha * 2.4})`
      ctx.fillRect(b.x, top, b.w, b.h)

      ctx.strokeStyle = `${accent}${Math.floor(Math.min(alpha * 280, 255))
        .toString(16)
        .padStart(2, "0")}`
      ctx.lineWidth = 0.7
      ctx.strokeRect(b.x, top, b.w, b.h)

      /* Dark window slots */
      for (const win of b.windows) {
        const { wx, wy, ww, wh } = windowRect(b, win, top)
        ctx.fillStyle = "rgba(2, 4, 10, 0.65)"
        ctx.fillRect(wx, wy, ww, wh)
      }

      /* Neon edge strip on select towers */
      if (b.neonStrip) {
        const stripX = b.x + b.w - 2
        const g = ctx.createLinearGradient(stripX, top, stripX, top + b.h)
        g.addColorStop(0, `${accent}00`)
        g.addColorStop(0.2, `${accent}55`)
        g.addColorStop(0.8, `${accent}55`)
        g.addColorStop(1, `${accent}00`)
        ctx.fillStyle = g
        ctx.fillRect(stripX, top + 6, 2, b.h - 12)
      }

      /* Ground-floor glow band */
      ctx.fillStyle = `${accent}22`
      ctx.fillRect(b.x + 1, ground - 5, b.w - 2, 4)

      /* Tech label — tiny, at building base only */
      if (b.layer > 0.55 && b.h > ground * 0.2) {
        ctx.font = "7px monospace"
        ctx.fillStyle = `${accent}55`
        ctx.textAlign = "center"
        const label = b.tech.length > 10 ? b.tech.slice(0, 9) + "…" : b.tech
        ctx.fillText(label, b.x + b.w / 2, ground - 2)
      }
    }

    const drawBuildingLights = (b: Building, ground: number, time: number, alphaMul: number) => {
      const top = ground - b.h
      const accent = b.district.accent
      const layerBoost = 0.45 + b.layer * 0.55

      for (const win of b.windows) {
        if (!win.on) continue

        const flicker = 0.72 + 0.28 * Math.sin(time * 0.002 + win.phase)
        const { wx, wy, ww, wh } = windowRect(b, win, top)
        const cx = wx + ww / 2
        const cy = wy + wh / 2

        /* Warm white vs district accent */
        const warm = win.warmth > 0.55
        const glowColor = warm
          ? `rgba(255, ${200 + Math.floor(win.warmth * 40)}, ${130 + Math.floor(win.warmth * 30)}, ${0.35 * flicker * layerBoost * alphaMul})`
          : `${accent}${Math.floor(55 * flicker * layerBoost * alphaMul)
              .toString(16)
              .padStart(2, "0")}`

        ctx.beginPath()
        ctx.arc(cx, cy, warm ? 5 : 4, 0, Math.PI * 2)
        ctx.fillStyle = glowColor
        ctx.fill()

        ctx.fillStyle = warm
          ? `rgba(255, 236, ${170 + Math.floor(win.warmth * 50)}, ${0.85 * flicker * layerBoost * alphaMul})`
          : `${accent}${Math.floor(210 * flicker * layerBoost * alphaMul)
              .toString(16)
              .padStart(2, "0")}`
        ctx.fillRect(wx, wy, ww, wh)
      }

      /* Rooftop beacon on tall towers */
      if (b.layer > 0.5 && b.h > ground * 0.15) {
        const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * 0.003 + b.beaconPhase))
        const bx = b.x + b.w / 2
        const by = top - 1
        const haloR = Math.max(0.5, 6 * pulse)

        ctx.beginPath()
        ctx.arc(bx, by, haloR, 0, Math.PI * 2)
        ctx.fillStyle = `${accent}${Math.floor(30 * pulse * alphaMul)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(bx, by, 2, 0, Math.PI * 2)
        ctx.fillStyle = `${accent}${Math.floor(220 * pulse * alphaMul)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      }
    }

    let time = 0

    const draw = () => {
      time += 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const ground = groundY

      /* Night sky */
      const sky = ctx.createLinearGradient(0, 0, 0, h)
      sky.addColorStop(0, "#030508")
      sky.addColorStop(0.45, "#050810")
      sky.addColorStop(0.75, "#071018")
      sky.addColorStop(1, "#0a1420")
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h)

      /* Stars — upper sky only */
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${s.a})`
        ctx.fill()
      }

      /* District ground glow bands — very subtle */
      for (const d of DISTRICTS) {
        const gx = d.x0 * w
        const gw = (d.x1 - d.x0) * w
        const g = ctx.createLinearGradient(gx, ground - 20, gx, ground)
        g.addColorStop(0, "transparent")
        g.addColorStop(1, `${d.accent}12`)
        ctx.fillStyle = g
        ctx.fillRect(gx, ground - 80, gw, 80)

        ctx.font = "8px monospace"
        ctx.fillStyle = `${d.accent}30`
        ctx.textAlign = "center"
        ctx.fillText(d.name.toUpperCase(), gx + gw / 2, ground - 6)
      }

      /* City layers — back to front, confined to lower skyline */
      const skylineTop = h * 0.38
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, skylineTop, w, h - skylineTop)
      ctx.clip()

      for (const b of buildings.filter((b) => b.layer < 0.4)) drawBuilding(b, ground, 0.7)
      for (const b of buildings.filter((b) => b.layer >= 0.4 && b.layer < 0.7))
        drawBuilding(b, ground, 0.85)
      for (const b of buildings.filter((b) => b.layer >= 0.7)) drawBuilding(b, ground, 1)

      /* Data flows between towers */
      for (const f of flows) {
        f.t += f.speed
        if (f.t > 1) f.t = 0

        const mx = (f.x1 + f.x2) / 2
        const my = Math.min(f.y1, f.y2) - 40 - Math.abs(f.x1 - f.x2) * 0.08

        ctx.beginPath()
        ctx.moveTo(f.x1, f.y1)
        ctx.quadraticCurveTo(mx, my, f.x2, f.y2)
        ctx.strokeStyle = `${f.accent}18`
        ctx.lineWidth = 0.8
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])

        const px = (1 - f.t) * (1 - f.t) * f.x1 + 2 * (1 - f.t) * f.t * mx + f.t * f.t * f.x2
        const py = (1 - f.t) * (1 - f.t) * f.y1 + 2 * (1 - f.t) * f.t * my + f.t * f.t * f.y2

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `${f.accent}90`
        ctx.fill()
      }

      /* Ground grid */
      ctx.strokeStyle = "rgba(80, 140, 200, 0.06)"
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, ground)
        ctx.lineTo(x - 30, h)
        ctx.stroke()
      }

      ctx.restore()

      /* Atmospheric haze over city — pushes it into background */
      const haze = ctx.createLinearGradient(0, skylineTop - 40, 0, h)
      haze.addColorStop(0, "rgba(3, 5, 8, 0.92)")
      haze.addColorStop(0.25, "rgba(3, 5, 8, 0.5)")
      haze.addColorStop(0.55, "rgba(3, 5, 8, 0.12)")
      haze.addColorStop(1, "rgba(3, 5, 8, 0.3)")
      ctx.fillStyle = haze
      ctx.fillRect(0, 0, w, h)

      /* Building lights — drawn after haze so windows glow visibly */
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, skylineTop, w, h - skylineTop)
      ctx.clip()
      for (const b of buildings.filter((b) => b.layer < 0.4)) drawBuildingLights(b, ground, time, 0.55)
      for (const b of buildings.filter((b) => b.layer >= 0.4 && b.layer < 0.7))
        drawBuildingLights(b, ground, time, 0.75)
      for (const b of buildings.filter((b) => b.layer >= 0.7)) drawBuildingLights(b, ground, time, 1)
      ctx.restore()

      /* Drones — drawn after haze so labels stay readable in the sky */
      for (const d of drones) {
        drawDrone(ctx, d, skylineTop, ground, w)
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.85]"
      aria-hidden
    />
  )
}
