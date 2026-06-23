"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, MessageSquare, Terminal, Clock, CheckCircle2, Cpu, Rocket } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
)

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isFocused, setIsFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp link with form data
    const whatsappNumber = "+91 9318475247" // Indian country code + number
    const whatsappMessage = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Open WhatsApp chat in a new tab
    window.open(whatsappLink, "_blank")

    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-[#03050a] relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Deep Space Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <FadeIn>
          <div className="flex flex-col items-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <MessageSquare className="w-3.5 h-3.5" /> Comm Channel Open
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tight text-center drop-shadow-sm">
              Let's Connect
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ── Left Side: Identity Matrix ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Info Chips */}
            <FadeIn delay={0.2} className="flex flex-col gap-4">
              
              {/* Email Chip */}
              <a href="mailto:raghavahuja2412@gmail.com" className="group">
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent hover:from-cyan-500/50 hover:to-blue-500/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-[#0a0e1a]/90 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">Secure Email</div>
                      <div className="text-slate-200 font-medium tracking-wide group-hover:text-cyan-300 transition-colors">raghavahuja2412@gmail.com</div>
                    </div>
                  </div>
                </div>
              </a>

              {/* WhatsApp Chip */}
              <a href="https://wa.me/919318475247" target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent hover:from-emerald-500/50 hover:to-green-500/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-[#0a0e1a]/90 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                      <WhatsAppIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">Direct Message</div>
                      <div className="text-slate-200 font-medium tracking-wide group-hover:text-emerald-300 transition-colors">+91 9318475247</div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Location Chip */}
              <div className="group cursor-default">
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent hover:from-violet-500/50 hover:to-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-violet-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-[#0a0e1a]/90 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                      <MapPin className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">Current Coordinates</div>
                      <div className="text-slate-200 font-medium tracking-wide group-hover:text-violet-300 transition-colors">Delhi, India</div>
                    </div>
                  </div>
                </div>
              </div>

            </FadeIn>

            {/* Stats Telemetry Dashboard */}
            <FadeIn delay={0.4}>
              <div className="p-6 rounded-2xl bg-[#0a0e1a]/50 border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono uppercase tracking-widest mb-6">
                  <ActivityIndicator /> Status Telemetry
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-slate-200 mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" /> &lt; 24h
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-200 mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Availability</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-200 mb-1 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-violet-400" /> 10+
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Technologies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-200 mb-1 flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-amber-400" /> 3+
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Major Projects</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── Right Side: Terminal Messaging Console ── */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.3} className="h-full">
              <div className="relative h-full rounded-[2rem] p-[1px] bg-gradient-to-br from-cyan-500/30 via-slate-800/40 to-violet-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)] group">
                <div className="bg-[#0a0e1a]/95 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 h-full relative overflow-hidden flex flex-col">
                  
                  {/* Decorative Terminal Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-mono text-cyan-100 tracking-wider">SECURE_COMMS_LINK</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                    
                    <div className="relative">
                      <label htmlFor="name" className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block ml-1">
                        Transmitter Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('name')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className={`w-full bg-white/[0.03] border-b-2 rounded-t-lg px-4 py-4 text-slate-200 focus:outline-none transition-all duration-300 font-medium
                          ${isFocused === 'name' ? 'border-cyan-400 bg-white/[0.06] shadow-[0_4px_20px_-10px_rgba(34,211,238,0.5)]' : 'border-white/10'}`}
                        placeholder="Enter your designation"
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block ml-1">
                        Return Address (Email)
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className={`w-full bg-white/[0.03] border-b-2 rounded-t-lg px-4 py-4 text-slate-200 focus:outline-none transition-all duration-300 font-medium
                          ${isFocused === 'email' ? 'border-violet-400 bg-white/[0.06] shadow-[0_4px_20px_-10px_rgba(139,92,246,0.5)]' : 'border-white/10'}`}
                        placeholder="your.email@server.com"
                      />
                    </div>

                    <div className="relative flex-1 flex flex-col">
                      <label htmlFor="message" className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-2 block ml-1">
                        Payload (Message)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('message')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className={`w-full flex-1 min-h-[160px] bg-white/[0.03] border-b-2 rounded-t-lg px-4 py-4 text-slate-200 focus:outline-none transition-all duration-300 font-medium resize-none
                          ${isFocused === 'message' ? 'border-emerald-400 bg-white/[0.06] shadow-[0_4px_20px_-10px_rgba(16,185,129,0.5)]' : 'border-white/10'}`}
                        placeholder="Transmit your project details, ideas, or greeting..."
                      />
                    </div>

                    <div className="pt-4 mt-auto">
                      <button
                        type="submit"
                        className="w-full relative overflow-hidden group rounded-xl bg-cyan-500/20 border border-cyan-500/50 py-4 text-cyan-100 font-bold tracking-widest transition-all duration-300 hover:bg-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                      >
                        {/* Button Hover Shine */}
                        <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-12 -translate-x-[200%] group-hover:animate-[shimmer_1.5s_ease-out_infinite]" />
                        
                        <div className="flex items-center justify-center gap-3 relative z-10">
                          <Send className="w-5 h-5 text-cyan-300" />
                          <span>TRANSMIT MESSAGE</span>
                        </div>
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}

// Helper component for the pinging dot
function ActivityIndicator() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
    </span>
  )
}
