import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"

export function Experience() {
  const experiences = [
    {
      title: "AI Research Intern",
      company: "Tech Innovation Lab",
      period: "Summer 2024",
      description:
        "Worked on developing and optimizing LSTM and GRU models for time series forecasting. Contributed to research on improving model accuracy and reducing computational complexity for real-time applications.",
      technologies: ["Python", "TensorFlow", "LSTM", "GRU", "Jupyter", "Git"],
      gradient: "gradient-bg-1",
    },
    {
      title: "Machine Learning Project Lead",
      company: "Bennett University",
      period: "2023 - 2024",
      description:
        "Led a team project to develop a sentiment analysis system using deep learning models. Implemented GRU-based architecture and achieved 92% accuracy on test datasets.",
      technologies: ["Python", "PyTorch", "GRU", "NLP", "Flask", "React"],
      gradient: "gradient-bg-2",
    },
    {
      title: "AI/ML Tutor",
      company: "Freelance",
      period: "2023 - Present",
      description:
        "Providing tutoring in artificial intelligence and machine learning concepts to fellow students. Specializing in neural networks, deep learning models like LSTM/GRU, and Python programming.",
      technologies: ["Python", "TensorFlow", "PyTorch", "Neural Networks", "Teaching"],
      gradient: "gradient-bg-3",
    },
  ]

  return (
    <section id="experience" className="py-20 px-6 lg:px-12 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full gradient-bg-6 opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text-3">Experience</span>
          </h2>
        </FadeIn>
        <StaggerContainer className="space-y-8 max-w-4xl mx-auto" staggerDelay={0.2}>
          {experiences.map((exp, index) => (
            <StaggerItem key={index}>
              <Card className="bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 ${exp.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-1">{exp.title}</h3>
                          <p className="text-gray-400 mb-2">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm bg-white/5 px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 text-white text-xs rounded-full ${
                              techIndex % 3 === 0
                                ? "gradient-bg-1"
                                : techIndex % 3 === 1
                                  ? "gradient-bg-3"
                                  : "gradient-bg-2"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
