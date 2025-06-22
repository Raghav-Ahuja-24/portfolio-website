import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"

export function Education() {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      school: "Bennett University",
      period: "2023 - 2027 (Expected)",
      description:
        "Currently pursuin Third year, focusing on software engineering, data structures, algorithms, web development, and artificial intelligence. Active participant in coding competitions and technical events.",
      gpa: "CGPA: 7.75/10.0",
      gradient: "gradient-bg-4", // Added gradient for card background
      textGradient: "gradient-text-2", // Added gradient for text
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      school: "ITL Public School",
      period: "2022",
      description:
        "Completed higher secondary education with focus on Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills.",
      gpa: "Percentage: 81.2%",
      gradient: "gradient-bg-5", // Added gradient for card background
      textGradient: "gradient-text-3", // Added gradient for text
    },
  ]

  return (
    <section id="education" className="py-20 px-6 lg:px-12 bg-[#0f1419] relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 gradient-bg-1 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 gradient-bg-3 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text">Education</span>
          </h2>
        </FadeIn>
        <StaggerContainer className="space-y-8 max-w-4xl mx-auto" staggerDelay={0.3}>
          {education.map((edu, index) => (
            <StaggerItem key={index}>
              <Card
                className={`bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Inner gradient overlay for visual effect */}
                <div
                  className={`absolute inset-0 ${edu.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-medium mb-1 ${edu.textGradient}`}>{edu.degree}</h3>
                      <p className={`mb-2 ${edu.textGradient} font-semibold`}>{edu.school}</p>
                    </div>
                    <span className="text-gray-500 text-sm bg-white/5 px-3 py-1 rounded-full">{edu.period}</span>
                  </div>
                  <p className="text-gray-300 mb-2 leading-relaxed">{edu.description}</p>
                  <p className="text-gray-400 text-sm">{edu.gpa}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
