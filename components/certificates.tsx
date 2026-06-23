"use client"

import React, { useRef, useCallback, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Award, ChevronLeft, ChevronRight, Calendar, Train } from "lucide-react"
import Link from "next/link"
import { useHasMounted } from "@/hooks/use-has-mounted"

/* ─── Certificate Data ─── */
const certificates = [
  {
    title: "Microsoft Power BI Data Analyst Professional Certificate",
    shortName: "Power BI",
    issuer: "Microsoft (Coursera)",
    date: "April 2025",
    description:
      "Comprehensive professional certificate covering data analysis, visualization, and business intelligence using Microsoft Power BI. Gained expertise in data modeling, DAX, and creating interactive dashboards for business insights.",
    skills: ["Power BI", "Data Analysis", "Data Visualization", "DAX", "Business Intelligence", "Excel"],
    certificateUrl: "https://coursera.org/verify/professional-cert/PUU6XQQ0YF9N",
    accent: "129, 140, 248",
    lineNumber: 1,
  },
  {
    title: "Google Data Analytics Professional Certificate",
    shortName: "Analytics",
    issuer: "Google (Coursera)",
    date: "December 2024",
    description:
      "Comprehensive specialization covering the entire data analytics process from data collection to visualization. Gained hands-on experience with R, SQL, Tableau, and spreadsheets for data cleaning, analysis, and presentation.",
    skills: ["Data Analytics", "R Programming", "SQL", "Tableau", "Data Visualization", "Statistical Analysis"],
    certificateUrl: "https://coursera.org/verify/specialization/5FGKY446BSQH",
    accent: "52, 211, 153",
    lineNumber: 2,
  },
  {
    title: "Computer Communications Specialization",
    shortName: "Networks",
    issuer: "University of California (Coursera)",
    date: "January 2025",
    description:
      "Advanced specialization focusing on computer networking, communication protocols, and distributed systems. Covered topics including network architecture, TCP/IP protocols, wireless communications, and network security fundamentals.",
    skills: ["Computer Networks", "TCP/IP", "Network Security", "Wireless Communication", "Protocol Design", "Network Architecture"],
    certificateUrl: "https://coursera.org/verify/specialization/COMPUTER_COMM_CERT",
    accent: "251, 146, 60",
    lineNumber: 3,
  },
  {
    title: "Operating Systems and You: Becoming a Power User",
    shortName: "OS Power",
    issuer: "Google (Coursera)",
    date: "May 2025",
    description:
      "Comprehensive course covering operating systems fundamentals, system administration, and power user techniques. Learned about Windows and Linux systems, command line interfaces, and system troubleshooting.",
    skills: ["Operating Systems", "Windows", "Linux", "Command Line", "System Administration", "Troubleshooting"],
    certificateUrl: "https://coursera.org/verify/RNUER75XQMBN",
    accent: "244, 114, 182",
    lineNumber: 4,
  },
  {
    title: "SQL for Data Science",
    shortName: "SQL",
    issuer: "UC Davis (Coursera)",
    date: "November 2024",
    description:
      "Advanced SQL course focused on data science applications. Covered complex queries, data manipulation, joins, subqueries, and database design principles for extracting insights from large datasets.",
    skills: ["SQL", "Database Management", "Data Science", "Data Analysis", "MySQL", "PostgreSQL"],
    certificateUrl: "https://coursera.org/verify/N9TY9YC18FVL",
    accent: "167, 139, 250",
    lineNumber: 5,
  },
]

/* ─── City lights config ─── */
const cityLights = [
  { top: "15%", size: 3, speed: 14, delay: 0, color: "129, 140, 248" },
  { top: "25%", size: 2, speed: 18, delay: 4, color: "167, 139, 250" },
  { top: "40%", size: 2, speed: 11, delay: 2, color: "52, 211, 153" },
  { top: "55%", size: 3, speed: 16, delay: 7, color: "251, 146, 60" },
  { top: "70%", size: 2, speed: 13, delay: 5, color: "244, 114, 182" },
  { top: "20%", size: 2, speed: 20, delay: 9, color: "129, 140, 248" },
  { top: "60%", size: 3, speed: 15, delay: 3, color: "167, 139, 250" },
  { top: "35%", size: 2, speed: 17, delay: 6, color: "52, 211, 153" },
]

/* ─── Route Map ─── */
function RouteMap({
  activeIndex,
  onDotClick,
}: {
  activeIndex: number
  onDotClick: (index: number) => void
}) {
  return (
    <div className="flex items-center md:justify-center overflow-x-auto hide-scrollbar w-full mb-8 px-4">
      <div className="flex items-center gap-0 relative min-w-max mx-auto px-4 pb-2">
        {certificates.map((cert, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => onDotClick(i)}
                className={`metro-route-dot ${i === activeIndex ? "active" : ""}`}
                style={{ "--dot-color": `rgba(${cert.accent}, 0.9)` } as React.CSSProperties}
                aria-label={`Go to ${cert.shortName}`}
              />
              <span
                className="text-[0.6rem] font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap"
                style={{
                  color: i === activeIndex ? `rgba(${cert.accent}, 0.9)` : "rgba(255,255,255,0.25)",
                }}
              >
                {cert.shortName}
              </span>
            </div>
            {i < certificates.length - 1 && (
              <div
                className="w-12 md:w-20 h-[3px] mx-1 rounded-full transition-all duration-500"
                style={{
                  background:
                    i < activeIndex
                      ? `linear-gradient(90deg, rgba(${cert.accent}, 0.5), rgba(${certificates[i + 1].accent}, 0.5))`
                      : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const metroStyles = `
  .metro-carriage-head, .metro-carriage-tail {
    flex: 0 0 auto;
    width: 320px;
    height: 420px;
    position: relative;
    border-radius: 6px;
  }
  @media (max-width: 767px) {
    .metro-carriage-head, .metro-carriage-tail {
      width: 150px;
      height: 480px;
    }
  }
  
  .metro-carriage-head-window, .metro-carriage-tail-window {
    position: absolute;
    top: 146px;
    width: 114px;
    height: 114px; 
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 3px solid #cbd5e1;
    border-radius: 12px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0,0,0,0.1);
    z-index: 5;
    overflow: hidden;
  }
  /* Glass reflection effect */
  .metro-carriage-head-window::after, .metro-carriage-tail-window::after {
    content: '';
    position: absolute;
    top: 0; left: -50%;
    width: 200%; height: 100%;
    background: linear-gradient(to bottom right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%);
    transform: rotate(30deg);
  }

  .metro-carriage-head-window {
    right: 30px;
  }
  .metro-carriage-tail-window {
    left: 30px;
  }
  

  .metro-taillight {
    position: absolute;
    bottom: 40px;
    right: 15px;
    width: 20px;
    height: 20px;
    background: #ef4444;
    border-radius: 50%;
    box-shadow: 0 0 30px 10px rgba(239, 68, 68, 0.7);
    z-index: 5;
  }

  /* Synchronized Background Street Lights (Poles and Bulbs) */
  .metro-track-light-container {
    position: absolute;
    top: -50px; 
    left: 0;
    width: 200%;
    height: 100%;
    pointer-events: none;
    animation: metroTrackMove 4.5s linear infinite;
    will-change: transform;
    transform: translateZ(0);
    z-index: 0; /* Strictly behind the train */
    opacity: 0.4;
  }
  .metro-street-light {
    position: absolute;
    top: 100px;
    width: 6px;
    height: 1000px;
    background: linear-gradient(180deg, #4b5563, #111827);
    border-radius: 3px;
  }
  .metro-street-light::before {
    content: "";
    position: absolute;
    top: 0;
    left: -80px;
    width: 80px;
    height: 40px;
    border-top: 6px solid #4b5563;
    border-right: 6px solid #4b5563;
    border-top-right-radius: 30px;
  }
  .metro-street-light::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -85px;
    width: 18px;
    height: 10px;
    border-radius: 8px;
    background: #fef08a;
    box-shadow: 
      0 0 20px 5px rgba(253, 224, 71, 0.9), 
      0 0 60px 20px rgba(253, 224, 71, 0.5),
      0 0 120px 40px rgba(253, 224, 71, 0.2);
  }

  /* Foreground Light Cones (Only overlaps the roof) */
  .metro-track-cone-container {
    position: absolute;
    top: -50px; 
    left: 0;
    width: 200%;
    height: 100%;
    pointer-events: none;
    animation: metroTrackMove 4.5s linear infinite;
    will-change: transform;
    transform: translateZ(0);
    z-index: 20; /* IN FRONT of train */
  }
  .metro-street-light-cone-wrapper {
    position: absolute;
    top: 0;
  }
  .metro-street-light-cone {
    position: absolute;
    top: 95px; 
    left: -460px; 
    width: 750px;
    height: 555px; 
    background: linear-gradient(180deg, rgba(253, 224, 71, 0.45), rgba(253, 224, 71, 0.05), transparent);
    clip-path: polygon(49% 0, 51% 0, 100% 100%, 0% 100%);
    pointer-events: none;
    mix-blend-mode: color-dodge;
  }

  /* Parallax Stars */
  .metro-stars-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 70%;
    pointer-events: none;
    animation: metroTrackMove 35s linear infinite;
    will-change: transform;
    transform: translateZ(0);
    z-index: 0;
  }
  .metro-star {
    position: absolute;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.3);
  }

  /* Parallax Trees */
  .metro-trees-container {
    position: absolute;
    top: 0;
    bottom: -20px;
    left: 0;
    width: 200%;
    pointer-events: none;
    animation: metroTrackMove 7.5s linear infinite;
    will-change: transform;
    transform: translateZ(0);
    z-index: 0;
  }
  .metro-tree {
    position: absolute;
    bottom: 0;
    opacity: 0.95;
    transform-origin: bottom center;
  }
`;

function PortalAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      const rotateX = y * -15;
      const rotateY = x * 15;

      containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="metro-carriage-head-window"
      style={{
        background: "transparent",
        border: "none",
        boxShadow: "none",
        perspective: "1000px",
        overflow: "visible",
        zIndex: 20,
        width: "170px",
        height: "160px",
        top: "130px"
      }}
    >
      <motion.div
        ref={containerRef}
        className="w-full h-full relative"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }}
      >
        {/* Inner Window Frame */}
        <div className="absolute inset-0 bg-white border-[3px] border-slate-300 rounded-xl overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
          {/* Inner Avatar (Contained inside the enlarged window) */}
          <img
            src="/images/avatar-hi-v3.png"
            alt="Avatar Hi"
            className="absolute max-w-none object-contain pointer-events-none"
            style={{
              width: "130%",
              height: "auto",
              top: "-10%",
              left: "-10%",
              filter: "brightness(0.95) contrast(1.05)",
              transform: "translateZ(10px)"
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

function TrainHead() {
  return (
    <>
      <style>{metroStyles}</style>
      <div className="metro-carriage-head shrink-0">
        <svg width="100%" height="100%" viewBox="0 0 350 520" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <defs>
            <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" /> {/* Yellowish tone on upper part */}
              <stop offset="15%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <path d="M 350 0 L 200 0 L 20 350 Q 0 410 0 470 L 0 520 L 350 520 Z" fill="url(#headGrad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        </svg>
        <PortalAvatar />
      </div>
    </>
  )
}

function TrainTail() {
  return (
    <div className="metro-carriage-tail shrink-0">
      <svg width="100%" height="100%" viewBox="0 0 350 520" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <defs>
          <linearGradient id="tailGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" /> {/* Yellowish tone on upper part */}
            <stop offset="15%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 150 0 L 330 350 Q 350 410 350 470 L 350 520 L 0 520 Z" fill="url(#tailGrad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      </svg>
      <div className="metro-carriage-tail-window" />
      <div className="metro-taillight" />
    </div>
  )
}

/* ─── Single Metro Carriage ─── */
function MetroCarriage({
  cert,
  index,
  isArrived,
}: {
  cert: (typeof certificates)[0]
  index: number
  isArrived: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`metro-carriage ${isArrived ? "arrived" : ""}`}
      style={{ "--carriage-glow": `rgba(${cert.accent}, 0.12)` } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="metro-arrival-glow" style={{ "--glow-color": `rgba(${cert.accent}, 0.2)` } as React.CSSProperties} />
      <div className="metro-carriage-frame flex flex-col h-full">
        {/* LED Destination Display */}
        <div className="metro-led-display">
          <div className="metro-line-badge" style={{ background: `rgba(${cert.accent}, 0.85)` }}>
            {cert.lineNumber}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-semibold leading-tight truncate"
              style={{
                color: `rgba(${cert.accent}, 0.95)`,
                animation: isArrived ? "metroLedFlicker 2s ease" : "none",
                fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
              }}
            >
              {cert.title}
            </h3>
          </div>
        </div>

        {/* Window area — certificate content */}
        <div className="metro-window">
          {/* Issuer + Date row */}
          <div className="flex items-center justify-between mb-3 gap-2">
            <p className="text-xs text-white/40 flex items-center gap-1.5 truncate">
              <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `rgba(${cert.accent}, 0.6)` }} />
              <span className="truncate">{cert.issuer}</span>
            </p>
            <div className="metro-date-badge flex-shrink-0">
              <Calendar className="w-3 h-3" />
              {cert.date}
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={false}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
              marginBottom: isHovered ? 12 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
            className="hidden md:block"
          >
            <p className="text-xs text-white/45 leading-relaxed">{cert.description}</p>
          </motion.div>

          {/* Mobile: always show description */}
          <p className="text-xs text-white/45 leading-relaxed mb-3 md:hidden">{cert.description}</p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.map((skill, i) => (
              <motion.span
                key={skill}
                className="metro-skill-tag"
                style={
                  {
                    "--tag-bg": `rgba(${cert.accent}, 0.1)`,
                    "--tag-border": `rgba(${cert.accent}, 0.25)`,
                    "--tag-color": `rgba(${cert.accent}, 0.9)`,
                  } as React.CSSProperties
                }
                initial={false}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: isHovered ? i * 0.05 : 0,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Spacer to push link to bottom */}
          <div className="flex-1" />

          {/* Certificate link */}
          <Link
            href={cert.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="metro-cert-link mt-auto"
            style={
              {
                "--link-bg": `rgba(${cert.accent}, 0.12)`,
                "--link-border": `rgba(${cert.accent}, 0.3)`,
              } as React.CSSProperties
            }
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Certificate
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
const baseStars = [
  { left: 2, top: 10, size: 2, opacity: 0.8 },
  { left: 8, top: 30, size: 1.5, opacity: 0.5 },
  { left: 14, top: 15, size: 3, opacity: 1 },
  { left: 22, top: 40, size: 2, opacity: 0.7 },
  { left: 28, top: 5, size: 1, opacity: 0.4 },
  { left: 35, top: 25, size: 2.5, opacity: 0.9 },
  { left: 42, top: 12, size: 1.5, opacity: 0.6 },
  { left: 48, top: 35, size: 2, opacity: 0.8 },
];
// Repeat from -50% to 200% to ensure absolutely flawless left/right boundary looping
const starPositions = [
  ...baseStars.map(s => ({ ...s, left: s.left - 50 })),
  ...baseStars,
  ...baseStars.map(s => ({ ...s, left: s.left + 50 })),
  ...baseStars.map(s => ({ ...s, left: s.left + 100 })),
  ...baseStars.map(s => ({ ...s, left: s.left + 150 })),
  ...baseStars.map(s => ({ ...s, left: s.left + 200 })),
];

const treeBasePositions = [3, 12, 22, 33, 42, 48];
const treePositions = [
  ...treeBasePositions.map(p => p - 50),
  ...treeBasePositions,
  ...treeBasePositions.map(p => p + 50),
  ...treeBasePositions.map(p => p + 100),
  ...treeBasePositions.map(p => p + 150),
  ...treeBasePositions.map(p => p + 200),
];

const lightBasePositions = [0, 10, 20, 30, 40];
const lightPositions = [
  ...lightBasePositions.map(p => p - 50),
  ...lightBasePositions,
  ...lightBasePositions.map(p => p + 50),
  ...lightBasePositions.map(p => p + 100),
  ...lightBasePositions.map(p => p + 150),
  200 // Final cap
];

const TreeGraphic = ({ index }: { index: number }) => {
  let seed = index * 1234;
  const rand = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // 40 distinct shades of rich, dark forest greens to make dots look completely unique
  const paths: Record<string, string[]> = {};
  for (let i = 0; i < 40; i++) {
    const hue = 110 + rand() * 50;  // 110 to 160
    const sat = 30 + rand() * 60;   // 30% to 90%
    const light = 10 + rand() * 25; // 10% to 35% (Base dark/mid greens)
    paths[`hsl(${hue}, ${sat}%, ${light}%)`] = [];
  }
  const colorKeys = Object.keys(paths);

  // 4500 ultra-tiny distinct dots
  for (let i = 0; i < 4500; i++) {
    const angle = rand() * Math.PI * 2;
    // Tighter clustering towards center
    const radius = Math.pow(rand(), 0.6) * 165;
    const cx = 150 + Math.cos(angle) * radius;
    const cy = 250 + Math.sin(angle) * radius * 1.5;

    // Very tiny distinct dots
    const r = 2 + rand() * 5;

    // Completely random distinct color assignment (no static highlight!)
    const fill = colorKeys[Math.floor(rand() * colorKeys.length)];

    paths[fill].push(`M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`);
  }

  // Wavy brown branches
  const branches = [];
  for (let b = 0; b < 15; b++) {
    const startX = 140 + rand() * 20;
    const startY = 300 + rand() * 150;

    const branchLength = 60 + rand() * 100;
    const branchAngle = -Math.PI / 2 + (rand() - 0.5) * 2; // Upward spread

    const endX = startX + Math.cos(branchAngle) * branchLength;
    const endY = startY + Math.sin(branchAngle) * branchLength;

    // Wavy control point
    const cpX = startX + (endX - startX) / 2 + (rand() - 0.5) * 50;
    const cpY = startY + (endY - startY) / 2 + (rand() - 0.5) * 50;

    branches.push(
      <path
        key={`branch-${b}`}
        d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
        fill="none"
        stroke={`hsl(30, ${40 + rand() * 20}%, ${15 + rand() * 10}%)`} // Distinct brown shades
        strokeWidth={1.5 + rand() * 3}
        strokeLinecap="round"
      />
    );
  }

  return (
    <svg viewBox="0 0 300 600" className="w-full h-full" style={{ overflow: "visible" }}>
      {/* Trunk */}
      <path d="M 135 600 L 140 250 L 160 250 L 165 600 Z" fill="#0f172a" />

      {/* Branches */}
      {branches}

      {/* Leaves (Rendered as unified ultra-fast paths) */}
      {Object.entries(paths).map(([color, dArray]) => (
        dArray.length > 0 && <path key={color} d={dArray.join(" ")} fill={color} opacity={0.9} />
      ))}
    </svg>
  );
}

export function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const mounted = useHasMounted()
  const titleInView = useInView(sectionRef, { margin: "-200px", once: true })

  const [activeIndex, setActiveIndex] = useState(0)
  const [arrivedIndex, setArrivedIndex] = useState(-1) // Start in 'driving in' mode
  const [isPaused, setIsPaused] = useState(false)
  const [trackOffset, setTrackOffset] = useState(2000) // Start far off-screen to the right
  const [isMobile, setIsMobile] = useState(false)

  /* Setup window resize listener */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  /* Calculate x-offset to center the active carriage */
  const updateOffset = useCallback(() => {
    if (!trackRef.current) return

    if (!titleInView) {
      setTrackOffset(2000) // Keep train hidden off-screen until scrolled into view
      return
    }

    // Train layout calculations
    const headWidth = isMobile ? 150 : 320
    const carriageWidth = isMobile ? 320 : 486
    const gapWidth = 6 // .metro-door-gap
    const containerWidth = trackRef.current.parentElement?.clientWidth || 0
    const spacerWidth = containerWidth / 2 // 50vw

    // Position of the target carriage relative to the start of the track wrapper
    // Formula: Spacer + Head + DoorGap + (Previous Carriages * (Carriage + DoorGap))
    const targetCardStart = spacerWidth + headWidth + gapWidth + (activeIndex * (carriageWidth + gapWidth))

    // Center the card in the viewport
    const offset = -(targetCardStart - (containerWidth / 2) + (carriageWidth / 2))
    setTrackOffset(offset)
  }, [activeIndex, isMobile, titleInView])

  // Recalculate on index or resize
  useEffect(() => {
    updateOffset()
  }, [updateOffset])

  /* Auto-play glide */
  useEffect(() => {
    if (isPaused || !titleInView || arrivedIndex === -1) return

    // 5s platform dwell time before moving to next station
    const timer = setTimeout(() => {
      setArrivedIndex(-1) // leaving station
      setActiveIndex((current) => (current >= certificates.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => clearTimeout(timer)
  }, [isPaused, titleInView, arrivedIndex])

  const goToStation = (index: number) => {
    setArrivedIndex(-1)
    setActiveIndex(index)
  }

  return (
    <section id="certificates" className="py-20 md:py-28 px-0 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #080b14 0%, #0a0e1a 30%, #0c1020 70%, #080b14 100%)" }}>
      {/* ── Background scenery ── */}
      <div className="metro-tunnel-vignette" />

      <div className="metro-wire" style={{ top: "60px" }}>
        {[15, 30, 50, 70, 85].map((pos) => (
          <div key={pos} className="metro-wire-support" style={{ left: `${pos}%` }} />
        ))}
      </div>
      <div className="metro-wire" style={{ top: "72px", opacity: 0.4 }}>
        {[20, 45, 65, 80].map((pos) => (
          <div key={pos} className="metro-wire-support" style={{ left: `${pos}%`, height: "12px" }} />
        ))}
      </div>

      {[12, 38, 62, 88].map((pos) => (
        <div key={pos} className="metro-pillar" style={{ left: `${pos}%`, height: "65%" }} />
      ))}

      {cityLights.map((light, i) => (
        <span
          key={i}
          className="metro-city-light"
          style={{
            top: light.top,
            width: light.size,
            height: light.size,
            background: `rgba(${light.color}, 0.5)`,
            boxShadow: `0 0 ${light.size * 4}px rgba(${light.color}, 0.3)`,
            "--drift-speed": `${light.speed}s`,
            "--drift-delay": `${light.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10" ref={sectionRef}>
        {/* Station header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={mounted && titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-10 px-6"
        >
          <div className="metro-station-sign mb-6 mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <Train className="w-5 h-5 text-white/50" />
              <h2
                className="text-2xl md:text-3xl font-bold tracking-wide"
                style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace' }}
              >
                <span className="gradient-text-3">CERTIFICATION</span>
                <span className="text-white/60 font-light ml-2">EXPRESS</span>
              </h2>
            </div>
          </div>
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
            Next stop → Mastery &nbsp;·&nbsp; {certificates.length} stations on the learning line
          </p>
        </motion.div>

        {/* Route map */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={mounted && titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <RouteMap activeIndex={arrivedIndex === -1 ? activeIndex : arrivedIndex} onDotClick={goToStation} />
        </motion.div>

        {/* Smooth Gliding Train Container */}
        <div className="relative w-full overflow-hidden pt-[600px] pb-0 mb-10">

          {/* Parallax Stars */}
          <div className="metro-stars-container">
            {starPositions.map((star, i) => (
              <div
                key={i}
                className="metro-star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity
                }}
              />
            ))}
          </div>

          {/* Parallax Trees */}
          <div className="metro-trees-container">
            {treePositions.map((pos, i) => (
              <div
                key={i}
                className="metro-tree"
                style={{
                  left: `${pos}%`,
                  height: `${600 + (i % 6) * 60}px`, /* 600, 660, 720, 780, 840, 900px */
                  width: `${300 + (i % 6) * 40}px`, /* 300, 340, 380, 420, 460, 500px */
                  transform: `scaleX(${i % 2 === 0 ? 1 : -1})`, /* Flips highlights randomly */
                  zIndex: i % 2 === 0 ? 1 : 2
                }}
              >
                <TreeGraphic index={i % 6} />
              </div>
            ))}
          </div>

          {/* Synchronized Background Street Lights (Poles and Bulbs) */}
          <div className="metro-track-light-container">
            {lightPositions.map((pos) => (
              <div key={pos} className="metro-street-light" style={{ left: `${pos}%` }} />
            ))}
          </div>

          <motion.div
            ref={trackRef}
            className="flex items-center w-max relative z-10"
            animate={{ x: trackOffset }}
            transition={{
              type: "tween",
              ease: [0.25, 1, 0.5, 1],
              duration: 6.5,
            }}
            onAnimationComplete={() => setArrivedIndex(activeIndex)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Left Spacer for smooth entering */}
            <div style={{ width: "50vw", flexShrink: 0 }} />

            {/* Train Engine Head */}
            <TrainHead />
            <div className="metro-door-gap" />

            {/* Certificate Carriages */}
            {certificates.map((cert, index) => (
              <React.Fragment key={index}>
                <MetroCarriage
                  cert={cert}
                  index={index}
                  isArrived={arrivedIndex === index}
                />
                {index < certificates.length - 1 && (
                  <div className="metro-door-gap shrink-0 relative flex flex-col justify-center items-center" />
                )}
              </React.Fragment>
            ))}

            {/* Train Tail */}
            <div className="metro-door-gap" />
            <TrainTail />

            {/* Right Spacer */}
            <div style={{ width: "50vw", flexShrink: 0 }} />
          </motion.div>

          {/* Synchronized Foreground Light Cones (Overlaps the roof only) */}
          <div className="metro-track-cone-container">
            {lightPositions.map((pos) => (
              <div key={pos} className="metro-street-light-cone-wrapper" style={{ left: `${pos}%` }}>
                <div className="metro-street-light-cone" />
              </div>
            ))}
          </div>




          {/* ── Track system ── */}
          <div className="metro-tracks">
            <div className="metro-ties" />
            <div className="metro-rail metro-rail-top" />
            <div className="metro-rail metro-rail-bottom" />
          </div>

          {/* Safety line */}
          <div className="metro-safety-line" />
        </div>
      </div>
    </section>
  )
}

