import { FadeIn } from "@/components/animations/fade-in"
import { ABOUT_PARAGRAPHS, type AboutSegment } from "@/lib/portfolio/corpus"
import { BeyondCode } from "@/components/beyond-code"

function renderSegment(segment: AboutSegment, key: number) {
  if (typeof segment === "string") {
    return <span key={key}>{segment}</span>
  }

  return (
    <span key={key} className={`${segment.highlight} font-semibold`}>
      {segment.text}
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="py-20 px-6 lg:px-12 relative">
      {/* Background gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 gradient-bg-2 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center lg:text-left">
            About <span className="gradient-text">Me</span>
          </h2>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.2}>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph.map((segment, segmentIndex) => renderSegment(segment, segmentIndex))}</p>
              ))}
            </div>
          </FadeIn>
          
          <div className="flex justify-center items-center h-full">
            <BeyondCode />
          </div>
        </div>
      </div>
    </section>
  )
}
