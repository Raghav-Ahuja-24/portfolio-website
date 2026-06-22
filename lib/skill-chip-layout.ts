export type ChipShape = "pill" | "hex" | "pent" | "node" | "capsule"
export type PolygonKind = "triangle" | "square" | "pentagon" | "hexagon" | "septagon"

export interface ChipPlacement {
  label: string
  x: number
  y: number
  shape: ChipShape
  key: string
}

export interface DomainAnchor {
  x: number
  y: number
}

/** Matches skills hex: 200×226, pointy-top clip-path */
const HEX_HALF_W = 100
const HEX_HALF_H = 113
const CHIP_H = 20
const CHIP_PAD = 22
const CHAR_W = 6.4
const CHIP_GAP = 12
const OUTER_MARGIN = 6
const ORBIT_SCALE = 0.7

const HEX_VERTS: [number, number][] = [
  [0, -HEX_HALF_H],
  [HEX_HALF_W, -HEX_HALF_H / 2],
  [HEX_HALF_W, HEX_HALF_H / 2],
  [0, HEX_HALF_H],
  [-HEX_HALF_W, HEX_HALF_H / 2],
  [-HEX_HALF_W, -HEX_HALF_H / 2],
]

/** Deep Learning only — 8-node radial, all pills on the same orbit */
const RADIAL_ORBIT_8: Record<string, number> = {
  Python: -Math.PI / 2,
  LSTM: -Math.PI / 6,
  TensorFlow: 0,
  "Training Techniques": -Math.PI / 2 - Math.PI / 3,
  CNN: Math.PI,
  "Model Design": (4* Math.PI) / 4.75,
  PyTorch: Math.PI / 2,
  GRU: Math.PI / 6,
}

function estimateChipWidth(label: string): number {
  return Math.max(48, label.length * CHAR_W + CHIP_PAD)
}

function rayHexBoundary(angle: number): number {
  const dx = Math.cos(angle)
  const dy = Math.sin(angle)
  let best = Infinity

  for (let i = 0; i < 6; i++) {
    const [x1, y1] = HEX_VERTS[i]
    const [x2, y2] = HEX_VERTS[(i + 1) % 6]
    const ex = x2 - x1
    const ey = y2 - y1
    const denom = dx * ey - dy * ex
    if (Math.abs(denom) < 1e-9) continue

    const t = (x1 * ey - y1 * ex) / denom
    const u = (x1 * dy - y1 * dx) / denom
    if (t > 0 && u >= 0 && u <= 1 && t < best) best = t
  }

  return Number.isFinite(best) ? best : HEX_HALF_H
}

function chipOutset(angle: number, chipW: number): number {
  const nx = Math.cos(angle)
  const ny = Math.sin(angle)
  const halfAlong = Math.abs(nx) * (chipW / 2) + Math.abs(ny) * (CHIP_H / 2)
  return rayHexBoundary(angle) + halfAlong + OUTER_MARGIN
}

function isDeepLearningLayout(items: string[]): boolean {
  return (
    items.length === 8 &&
    items.includes("Python") &&
    items.includes("Training Techniques") &&
    items.every((l) => l in RADIAL_ORBIT_8)
  )
}

/** Even radial ring from top — used by all domains except Deep Learning */
function evenRadialAngles(items: string[]): { label: string; angle: number }[] {
  return items.map((label, i) => ({
    label,
    angle: -Math.PI / 2 + (i / items.length) * Math.PI * 2,
  }))
}

function resolveAngles(items: string[]): { label: string; angle: number }[] {
  if (isDeepLearningLayout(items)) {
    return items.map((label) => ({ label, angle: RADIAL_ORBIT_8[label] }))
  }
  return evenRadialAngles(items)
}

function unifiedOrbitRadius(slots: { label: string; angle: number }[]): number {
  const maxW = Math.max(...slots.map((s) => estimateChipWidth(s.label)))
  const clearanceR = Math.max(
    ...slots.map((s) => chipOutset(s.angle, estimateChipWidth(s.label))),
  )

  const n = slots.length
  if (n <= 1) return clearanceR * ORBIT_SCALE

  const sinHalf = Math.sin(Math.PI / n)
  const spacingR = sinHalf > 0 ? (maxW + CHIP_GAP) / (2 * sinHalf) : clearanceR

  return Math.max(clearanceR, spacingR) * ORBIT_SCALE
}

function placeUnifiedRadial(items: string[], focusScale: number): ChipPlacement[] {
  const slots = resolveAngles(items)
  const orbitR = unifiedOrbitRadius(slots) * focusScale

  return slots.map((s, i) => ({
    label: s.label,
    x: Math.cos(s.angle) * orbitR,
    y: Math.sin(s.angle) * orbitR,
    shape: "pill" as const,
    key: `${s.label}-${i}`,
  }))
}

export function getPolygonKind(count: number): PolygonKind {
  if (count <= 3) return "triangle"
  if (count === 4) return "square"
  if (count === 5) return "pentagon"
  if (count === 6) return "hexagon"
  return "septagon"
}

export function getChipPlacements(
  items: string[],
  focused: boolean,
  _anchor: DomainAnchor,
  _orbitRadius: number,
): ChipPlacement[] {
  const focusScale = focused ? 1.03 : 1

  if (items.length === 1) {
    const r = chipOutset(-Math.PI / 2, estimateChipWidth(items[0])) * ORBIT_SCALE * focusScale
    return [{ label: items[0], x: 0, y: -r, shape: "pill", key: `${items[0]}-0` }]
  }

  if (items.length === 2) {
    const r =
      Math.max(chipOutset(Math.PI, estimateChipWidth(items[0])), chipOutset(0, estimateChipWidth(items[1]))) *
      ORBIT_SCALE *
      focusScale
    return items.map((label, i) => ({
      label,
      x: i === 0 ? -r : r,
      y: 0,
      shape: "pill" as const,
      key: `${label}-${i}`,
    }))
  }

  return placeUnifiedRadial(items, focusScale)
}

export function getPolygonGuidePoints(
  items: string[],
  focused: boolean,
  anchor: DomainAnchor,
  orbitRadius: number,
): { x: number; y: number }[] {
  return getChipPlacements(items, focused, anchor, orbitRadius).map(({ x, y }) => ({ x, y }))
}
