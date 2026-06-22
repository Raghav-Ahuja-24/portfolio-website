export type ProjectCategory = "ai" | "web" | "research"

export interface PortfolioProject {
  id: string
  title: string
  role?: string
  description: string
  technologies: string[]
  categories: ProjectCategory[]
  githubUrl: string
}

export interface CorpusDocument {
  id: string
  source: string
  title: string
  content: string
  categories?: ProjectCategory[]
  metadata?: Record<string, string>
}

export const PROFILE = {
  name: "Raghav Ahuja",
  title: "AI Enthusiast & B.Tech CSE Student",
  email: "raghavahuja2412@gmail.com",
  location: "Delhi, India",
  university: "Bennett University",
  degree: "B.Tech Computer Science and Engineering",
  cgpa: "7.75/10.0",
  github: "https://github.com/dark-Warrior-2412",
  linkedin: "https://www.linkedin.com/in/raghav-ahuja-46ba58290/",
  summary:
    "Second-year B.Tech CSE student at Bennett University passionate about Artificial Intelligence, machine learning, deep learning, and modern web technologies. Experienced with neural networks (LSTM, GRU, CNN), NLP, full-stack development, and data analytics.",
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: "sprout-circle",
    title: "Sprout Circle - Smart Daycare Management App",
    role: "Frontend Lead Developer",
    description:
      "Led frontend development for an innovative daycare management solution serving children from infancy to 13 years. Features secure multi-role authentication for parents, teachers, and administrators, interactive educational games, a 24/7 AI chatbot for instant support, real-time GPS tracking for school buses, live photo updates from classrooms, integrated payment gateways, and comprehensive progress reporting.",
    technologies: ["React", "TypeScript", "Node.js", "Firebase", "Vite", "Tailwind CSS", "SQL"],
    categories: ["web", "ai"],
    githubUrl: "https://github.com/dark-Warrior-2412",
  },
  {
    id: "cardiosonic",
    title: "CardioSonic - Heart Disease Prediction System",
    role: "AI/ML Engineer",
    description:
      "Expert-level deep learning project that predicts heart conditions by analyzing heartbeat audio files (.wav/.mp3) with 100% test accuracy. Uses CNNs and LSTM/GRU networks with PhysioNet datasets, advanced audio preprocessing, MFCC feature extraction, and a real-time visualization dashboard with confidence scores.",
    technologies: ["Python", "TensorFlow", "CNN", "LSTM", "Flask", "Librosa", "NumPy", "Scikit-learn"],
    categories: ["ai", "research"],
    githubUrl: "https://github.com/dark-Warrior-2412",
  },
  {
    id: "aakashvaani",
    title: "Aakashvaani - Python Voice Assistant",
    description:
      "Python-based voice assistant that plays music/videos, performs web searches, sets alarms, and provides weather updates. Converts voice commands to text and delivers text and voice responses using pyttsx3, speech_recognition, and web scraping modules.",
    technologies: ["Python", "pyttsx3", "Speech Recognition", "Web Scraping", "Automation"],
    categories: ["ai"],
    githubUrl: "https://github.com/dark-Warrior-2412",
  },
]

export const EXPERIENCE = [
  {
    title: "AI Research Intern",
    company: "Tech Innovation Lab",
    period: "Summer 2024",
    description:
      "Developed and optimized LSTM and GRU models for time series forecasting. Contributed to research on improving model accuracy and reducing computational complexity for real-time applications.",
    technologies: ["Python", "TensorFlow", "LSTM", "GRU", "Jupyter", "Git"],
  },
  {
    title: "Machine Learning Project Lead",
    company: "Bennett University",
    period: "2023 - 2024",
    description:
      "Led a team project to develop a sentiment analysis system using deep learning. Implemented GRU-based architecture and achieved 92% accuracy on test datasets.",
    technologies: ["Python", "PyTorch", "GRU", "NLP", "Flask", "React"],
  },
  {
    title: "AI/ML Tutor",
    company: "Freelance",
    period: "2023 - Present",
    description:
      "Tutoring students in AI/ML concepts including neural networks, LSTM/GRU, and Python programming.",
    technologies: ["Python", "TensorFlow", "PyTorch", "Neural Networks"],
  },
]

export const RESEARCH_EXPERIENCE = [
  {
    id: "pose-estimation-multi-dataset",
    title: "Robust Human Pose Estimation Using Multi-Dataset Training",
    affiliation: "Dept. of CSE, Bennett University — Greater Noida, India",
    period: "2025 — Present",
    role: "Research Author (E23CSEU0770)",
    status: "Awaiting Approval",
    statusDetail: "Manuscript complete — pending formal approval for publication",
    description:
      "Co-authored research introducing a deep learning framework for human pose estimation trained from scratch using multi-dataset learning on MPII, CrowdPose, and COCO. The encoder-decoder CNN pipeline improves keypoint localization under occlusion and crowded scenes. Unified keypoint representation and balanced sampling across datasets yielded stronger generalization than single-dataset training, with combined-model PCKh@0.5 of 89.1% and AP of 84.7%.",
    team: ["Gyan Dogra", "Vaishnavi Bisen", "Viraj Dev Jamwal", "Rishabh Singh"],
    metrics: [
      { label: "PCKh@0.5 (Combined)", value: "89.1%" },
      { label: "Average Precision", value: "84.7%" },
      { label: "Multi-Dataset Gain", value: "+3.7%" },
    ],
    focus: [
      "Computer Vision",
      "Pose Estimation",
      "MPII",
      "CrowdPose",
      "COCO",
      "CNN",
      "Keypoint Detection",
    ],
    gradient: "gradient-bg-1",
    highlight: true,
  },
]

export const EDUCATION = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    school: "Bennett University",
    period: "2023 - 2027 (Expected)",
    gpa: "CGPA: 7.75/10.0",
    description:
      "Third year student focusing on software engineering, data structures, algorithms, web development, and artificial intelligence.",
  },
  {
    degree: "Higher Secondary Education (12th Grade)",
    school: "ITL Public School",
    period: "2022",
    gpa: "Percentage: 81.2%",
    description: "Focus on Mathematics, Physics, and Chemistry.",
  },
]

export const CERTIFICATES = [
  {
    title: "Microsoft Power BI Data Analyst Professional Certificate",
    issuer: "Microsoft (Coursera)",
    date: "April 2025",
    skills: ["Power BI", "Data Analysis", "Data Visualization", "DAX", "Business Intelligence"],
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google (Coursera)",
    date: "December 2024",
    skills: ["Data Analytics", "R Programming", "SQL", "Tableau", "Statistical Analysis"],
  },
  {
    title: "Computer Communications Specialization",
    issuer: "University of California (Coursera)",
    date: "January 2025",
    skills: ["Computer Networks", "TCP/IP", "Network Security", "Wireless Communication"],
  },
  {
    title: "Operating Systems and You: Becoming a Power User",
    issuer: "Google (Coursera)",
    date: "May 2025",
    skills: ["Operating Systems", "Windows", "Linux", "Command Line", "System Administration"],
  },
  {
    title: "SQL for Data Science",
    issuer: "University of California, Davis (Coursera)",
    date: "November 2024",
    skills: ["SQL", "Database Management", "Data Science", "MySQL", "PostgreSQL"],
  },
]

export const TECHNOLOGIES: Record<string, string[]> = {
  "Frontend Development": ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "HTML/CSS"],
  "Backend & Database": ["Node.js", "Firebase", "SQL", "Flask", "REST APIs", "Authentication"],
  "Deep Learning": [
    "Python",
    "TensorFlow",
    "PyTorch",
    "CNN",
    "LSTM",
    "GRU",
    "Model Design",
    "Training Techniques",
  ],
  "Generative AI & RAG": [
    "NLP",
    "LLMs",
    "Image Processing",
    "Video Processing",
    "Generative AI",
    "RAG",
  ],
  "Data Science & Audio Processing": ["NumPy", "Pandas", "Scikit-learn", "Librosa", "MFCC", "Signal Processing"],
  "Tools & Systems": ["Git", "Power BI", "Windows", "Linux", "DAX", "Excel"],
  "Specialized Skills": [
    "Medical AI",
    "Pose Estimation",
    "Computer Vision",
    "Real-time ML",
    "Cross-validation",
    "Hyperparameter Tuning",
  ],
}

export const ALL_SKILLS = [...new Set(Object.values(TECHNOLOGIES).flat())]

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  ai: "AI Projects",
  web: "Web Development Projects",
  research: "Research Projects",
}

/** Build flat document list for RAG indexing */
export function buildCorpusDocuments(): CorpusDocument[] {
  const docs: CorpusDocument[] = [
    {
      id: "profile",
      source: "profile",
      title: "Profile",
      content: `${PROFILE.name} — ${PROFILE.title}. ${PROFILE.summary} Email: ${PROFILE.email}. Location: ${PROFILE.location}. ${PROFILE.degree} at ${PROFILE.university}, CGPA ${PROFILE.cgpa}. GitHub: ${PROFILE.github}. LinkedIn: ${PROFILE.linkedin}.`,
    },
    {
      id: "about",
      source: "about",
      title: "About",
      content:
        "Raghav is a B.Tech CSE student at Bennett University passionate about AI, ML, deep learning, and web technologies. Interests include neural networks, GRU, LSTM for sequence modeling, NLP, and full-stack development.",
    },
  ]

  for (const project of PROJECTS) {
    docs.push({
      id: `project-${project.id}`,
      source: "project",
      title: project.title,
      content: `${project.title}. Role: ${project.role ?? "Developer"}. ${project.description} Technologies: ${project.technologies.join(", ")}.`,
      categories: project.categories,
      metadata: { github: project.githubUrl },
    })
  }

  for (const [i, exp] of EXPERIENCE.entries()) {
    docs.push({
      id: `experience-${i}`,
      source: "experience",
      title: `${exp.title} at ${exp.company}`,
      content: `${exp.title} at ${exp.company} (${exp.period}). ${exp.description} Technologies: ${exp.technologies.join(", ")}.`,
    })
  }

  for (const research of RESEARCH_EXPERIENCE) {
    docs.push({
      id: `research-${research.id}`,
      source: "research",
      title: research.title,
      content: `${research.title} at ${research.affiliation} (${research.period}). Role: ${research.role}. Status: ${research.status}. ${research.description} Team: ${research.team.join(", ") || "Solo"}. Focus: ${research.focus.join(", ")}.`,
      categories: ["research"],
    })
  }

  for (const [i, edu] of EDUCATION.entries()) {
    docs.push({
      id: `education-${i}`,
      source: "education",
      title: edu.degree,
      content: `${edu.degree} at ${edu.school} (${edu.period}). ${edu.gpa}. ${edu.description}`,
    })
  }

  for (const [i, cert] of CERTIFICATES.entries()) {
    docs.push({
      id: `certificate-${i}`,
      source: "certificate",
      title: cert.title,
      content: `${cert.title} by ${cert.issuer} (${cert.date}). Skills: ${cert.skills.join(", ")}.`,
    })
  }

  for (const [category, items] of Object.entries(TECHNOLOGIES)) {
    docs.push({
      id: `tech-${category.toLowerCase().replace(/\s+/g, "-")}`,
      source: "technologies",
      title: category,
      content: `${category}: ${items.join(", ")}.`,
    })
  }

  docs.push({
    id: "resume-summary",
    source: "resume",
    title: "Resume Summary",
    content:
      "Resume highlights: Education & Academic Achievements, Technical Projects (Sprout Circle, CardioSonic, Aakashvaani), Technical Skills (React, Python, TensorFlow, PyTorch, LSTM, GRU, CNN, NLP, SQL, Firebase), Certifications (Google Data Analytics, Microsoft Power BI, SQL for Data Science), and AI/ML experience including research internship and tutoring.",
  })

  return docs
}

export function getProjectsByCategory(category: ProjectCategory): PortfolioProject[] {
  return PROJECTS.filter((p) => p.categories.includes(category))
}
