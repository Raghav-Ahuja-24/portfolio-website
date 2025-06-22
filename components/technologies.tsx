import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { FloatingTechIcons } from "@/components/floating-tech-icons"

export function Technologies() {
  const techCategories = [
    {
      title: "Frontend Development",
      items: ["React", "TypeScript", "Vite", "Tailwind CSS", "HTML5", "CSS3"],
      gradient: "gradient-bg-1",
      glow: "glow-blue",
    },
    {
      title: "Backend & Database",
      items: ["Node.js", "Firebase", "SQL", "Flask", "RESTful APIs", "Authentication"],
      gradient: "gradient-bg-2",
      glow: "glow-purple",
    },
    {
      title: "AI & Machine Learning",
      items: ["Python", "TensorFlow", "PyTorch", "CNN", "LSTM", "GRU"],
      gradient: "gradient-bg-3",
      glow: "glow-pink",
    },
    {
      title: "Data Science & Audio Processing",
      items: ["NumPy", "Pandas", "Scikit-learn", "Librosa", "MFCC", "Signal Processing"],
      gradient: "gradient-bg-4",
      glow: "glow-blue",
    },
    {
      title: "Tools & Systems",
      items: ["Git", "Power BI", "Windows", "Linux", "DAX", "Excel"],
      gradient: "gradient-bg-5",
      glow: "glow-purple",
    },
    {
      title: "Specialized Skills",
      items: [
        "Medical AI",
        "Audio Analysis",
        "Real-time Processing",
        "Data Visualization",
        "Cross-validation",
        "Hyperparameter Tuning",
      ],
      gradient: "gradient-bg-6",
      glow: "glow-pink",
    },
  ]

  return (
    <section id="technologies" className="py-20 px-6 lg:px-12 bg-[#0f1419] relative overflow-hidden">
      {/* Floating Technology Icons */}
      <FloatingTechIcons />

      {/* Background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 gradient-bg-4 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 gradient-bg-1 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text-2">Technologies</span>
          </h2>
        </FadeIn>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <StaggerItem key={category.title}>
              <Card
                className={`bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:${category.glow} group relative z-20`}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 ${category.gradient} rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="text-gray-300 text-sm hover:text-white transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
