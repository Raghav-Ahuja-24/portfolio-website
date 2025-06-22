import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"

export function Certificates() {
  const certificates = [
    {
      title: "Microsoft Power BI Data Analyst Professional Certificate",
      issuer: "Microsoft (Coursera)",
      date: "April 2025",
      description:
        "Comprehensive professional certificate covering data analysis, visualization, and business intelligence using Microsoft Power BI. Gained expertise in data modeling, DAX, and creating interactive dashboards for business insights.",
      skills: ["Power BI", "Data Analysis", "Data Visualization", "DAX", "Business Intelligence", "Excel"],
      certificateUrl: "https://coursera.org/verify/professional-cert/PUU6XQQ0YF9N",
      gradient: "gradient-bg-1",
    },
    {
      title: "Operating Systems and You: Becoming a Power User",
      issuer: "Google (Coursera)",
      date: "May 2025",
      description:
        "Comprehensive course covering operating systems fundamentals, system administration, and power user techniques. Learned about Windows and Linux systems, command line interfaces, and system troubleshooting.",
      skills: ["Operating Systems", "Windows", "Linux", "Command Line", "System Administration", "Troubleshooting"],
      certificateUrl: "https://coursera.org/verify/RNUER75XQMBN",
      gradient: "gradient-bg-2",
    },
    {
      title: "SQL for Data Science",
      issuer: "University of California, Davis (Coursera)",
      date: "November 2024",
      description:
        "Advanced SQL course focused on data science applications. Covered complex queries, data manipulation, joins, subqueries, and database design principles for extracting insights from large datasets.",
      skills: ["SQL", "Database Management", "Data Science", "Data Analysis", "MySQL", "PostgreSQL"],
      certificateUrl: "https://coursera.org/verify/N9TY9YC18FVL",
      gradient: "gradient-bg-3",
    },
  ]

  return (
    <section id="certificates" className="py-20 px-6 lg:px-12 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full gradient-bg-6 opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            <span className="gradient-text-3">Certificates</span>
          </h2>
        </FadeIn>
        <StaggerContainer className="space-y-8 max-w-4xl mx-auto" staggerDelay={0.2}>
          {certificates.map((cert, index) => (
            <StaggerItem key={index}>
              <Card className="bg-[#1a1f2e]/80 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 ${cert.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-1">{cert.title}</h3>
                          <p className="text-gray-400 mb-2">{cert.issuer}</p>
                        </div>
                        <span className="text-gray-500 text-sm bg-white/5 px-3 py-1 rounded-full">{cert.date}</span>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">{cert.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            className={`px-3 py-1 text-white text-xs rounded-full ${
                              skillIndex % 3 === 0
                                ? "gradient-bg-1"
                                : skillIndex % 3 === 1
                                  ? "gradient-bg-3"
                                  : "gradient-bg-2"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className={`${cert.gradient} hover:scale-105 transition-all duration-300 text-white border-0`}
                      >
                        <Link href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </Link>
                      </Button>
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
