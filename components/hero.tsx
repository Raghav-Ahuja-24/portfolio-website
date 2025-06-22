import { Linkedin, Github, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { Mail } from "lucide-react"
import { FloatingTechIcons } from "@/components/floating-tech-icons"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 lg:px-12 pt-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient opacity-10"></div>

      {/* Floating Technology Icons */}
      <FloatingTechIcons />

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 gradient-bg-1 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 gradient-bg-3 rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <SlideIn direction="left">
              <div>
                <h1 className="text-6xl lg:text-7xl font-thin text-white mb-4 tracking-wide">
                  <span className="gradient-text">Raghav</span> <span className="gradient-text-2">Ahuja</span>
                </h1>
                <p className="text-xl font-light">
                  <span className="gradient-text-3">AI Enthusiast & B.Tech CSE Student</span>
                </p>
              </div>
            </SlideIn>

            <FadeIn delay={0.3}>
              <div className="flex space-x-4">
                <Link
                  href="https://www.linkedin.com/in/raghav-ahuja-46ba58290/"
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://github.com/dark-Warrior-2412"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.instagram.com/raghavahuja2412/"
                  className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://x.com/RaghavAhuja2412"
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="sr-only">X (Twitter)</span>
                </Link>
                <Link
                  href="mailto:raghavahuja2412@gmail.com"
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          <SlideIn direction="right" delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 gradient-bg-1 rounded-lg blur-xl opacity-30 animate-pulse"></div>
                <Image
                  src="/images/raghav-photo.png"
                  alt="Raghav Ahuja"
                  width={400}
                  height={500}
                  className="rounded-lg object-cover relative z-10 border-2 border-white/10"
                  style={{ objectPosition: "center 35%" }}
                />
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
