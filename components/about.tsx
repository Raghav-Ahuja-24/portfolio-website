import { FadeIn } from "@/components/animations/fade-in"

export function About() {
  return (
    <section id="about" className="py-20 px-6 lg:px-12 relative">
      {/* Background gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 gradient-bg-2 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            About <span className="gradient-text">Me</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="text-gray-300 text-lg leading-relaxed space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p>
              Hi! I am <span className="gradient-text-2 font-semibold">Raghav</span>, and I am currently a second-year
              student pursuing my Bachelor of Technology in Computer Science and Engineering from Bennett University. I
              am passionate about <span className="gradient-text-3 font-semibold">Artificial Intelligence</span> and
              have been building my expertise in machine learning, deep learning, and modern web technologies.
            </p>
            <p>
              I'm particularly interested in <span className="gradient-text font-semibold">neural networks</span> and
              have hands-on experience with advanced models like{" "}
              <span className="gradient-text-2 font-semibold">GRU (Gated Recurrent Units)</span> and{" "}
              <span className="gradient-text-3 font-semibold">LSTM (Long Short-Term Memory)</span> networks for sequence
              modeling and time series analysis. I enjoy working on challenging AI projects that help me explore the
              intersection of machine learning and practical applications.
            </p>
            <p>
              Beyond AI, I'm enthusiastic about creating{" "}
              <span className="gradient-text font-semibold">innovative solutions</span> and staying up-to-date with the
              latest technologies in software development. Currently, I'm focused on expanding my knowledge in deep
              learning frameworks, natural language processing, and full-stack development.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
