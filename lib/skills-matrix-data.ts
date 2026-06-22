export interface SkillDomain {
  id: string
  title: string
  subtitle: string
  items: string[]
  proficiency: number
  experience: string
  projects: string[]
  gradient: string
  glow: string
  accent: string
  floatDelay: number
}

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Interfaces & UX systems",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "HTML/CSS"],
    proficiency: 92,
    experience: "Led frontend for Sprout Circle — multi-role dashboards, real-time UI, and production React architecture.",
    projects: ["Sprout Circle", "Portfolio Website"],
    gradient: "gradient-bg-1",
    glow: "rgba(102, 126, 234, 0.45)",
    accent: "#667eea",
    floatDelay: 0,
  },
  {
    id: "backend",
    title: "Backend & Cloud",
    subtitle: "APIs, auth & data layers",
    items: ["Node.js", "Firebase", "SQL", "Flask", "REST APIs", "Authentication"],
    proficiency: 85,
    experience: "Built secure backends with Firebase, SQL pipelines, and Flask services for ML deployment.",
    projects: ["Sprout Circle", "CardioSonic API"],
    gradient: "gradient-bg-2",
    glow: "rgba(240, 147, 251, 0.4)",
    accent: "#f093fb",
    floatDelay: 0.4,
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    subtitle: "Neural networks & training",
    items: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "CNN",
      "LSTM",
      "GRU",
      "Model Design",
      "Training Techniques",
    ],
    proficiency: 94,
    experience:
      "CNN/LSTM/GRU architectures from scratch — model design, training pipelines, hyperparameter tuning, and research-grade evaluation on vision and sequence tasks.",
    projects: ["CardioSonic", "Pose Estimation Research"],
    gradient: "gradient-bg-3",
    glow: "rgba(79, 172, 254, 0.45)",
    accent: "#4facfe",
    floatDelay: 0.8,
  },
  {
    id: "genai",
    title: "Generative AI & RAG",
    subtitle: "Vision, LLMs & retrieval",
    items: ["NLP", "LLMs", "Image Processing", "Video Processing", "Generative AI", "RAG"],
    proficiency: 91,
    experience:
      "Multimodal AI — image & video pipelines, LLM-powered assistants, embedding + retrieval (RAG), and production Gen AI features on this portfolio.",
    projects: ["Portfolio RAG Assistant", "Aakashvaani", "Sprout Circle"],
    gradient: "gradient-bg-7",
    glow: "rgba(168, 85, 247, 0.45)",
    accent: "#a855f7",
    floatDelay: 1.0,
  },
  {
    id: "data",
    title: "Data Science",
    subtitle: "Analytics & signal ML",
    items: ["NumPy", "Pandas", "Scikit-learn", "Librosa", "MFCC", "Signal Processing"],
    proficiency: 88,
    experience: "End-to-end data pipelines, feature engineering for audio/vision, and Power BI analytics certifications.",
    projects: ["CardioSonic", "Google Data Analytics"],
    gradient: "gradient-bg-4",
    glow: "rgba(67, 233, 123, 0.35)",
    accent: "#43e97b",
    floatDelay: 1.2,
  },
  {
    id: "tools",
    title: "Tools & Systems",
    subtitle: "DevOps & productivity",
    items: ["Git", "Power BI", "Linux", "Windows", "DAX", "Excel"],
    proficiency: 86,
    experience: "Version control workflows, OS administration, and BI dashboards for data-driven decisions.",
    projects: ["Sprout Circle", "Analytics Certs"],
    gradient: "gradient-bg-5",
    glow: "rgba(250, 112, 154, 0.35)",
    accent: "#fa709a",
    floatDelay: 1.6,
  },
  {
    id: "specialized",
    title: "Specialized Skills",
    subtitle: "Domain expertise",
    items: [
      "Medical AI",
      "Pose Estimation",
      "Computer Vision",
      "Real-time ML",
      "Cross-validation",
      "Hyperparameter Tuning",
    ],
    proficiency: 90,
    experience: "Medical signal analysis, computer vision research, and production-grade model optimization.",
    projects: ["CardioSonic", "Pose Estimation Research"],
    gradient: "gradient-bg-6",
    glow: "rgba(168, 237, 234, 0.35)",
    accent: "#a8edea",
    floatDelay: 2,
  },
]

/** Honeycomb rows for desktop layout */
export const HONEYCOMB_ROWS: string[][] = [
  ["frontend", "backend"],
  ["deep-learning", "genai", "data"],
  ["tools", "specialized"],
]

export const DOMAIN_MAP = new Map(SKILL_DOMAINS.map((d) => [d.id, d]))

/** Neural mesh connections between domain ids */
export const SKILL_CONNECTIONS: [string, string][] = [
  ["frontend", "backend"],
  ["frontend", "deep-learning"],
  ["backend", "data"],
  ["deep-learning", "genai"],
  ["deep-learning", "data"],
  ["deep-learning", "specialized"],
  ["genai", "data"],
  ["genai", "specialized"],
  ["data", "tools"],
  ["backend", "tools"],
  ["specialized", "data"],
  ["frontend", "data"],
]
