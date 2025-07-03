"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"

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
    <section id="contact" className="py-20 px-6 lg:px-12 bg-[#0f1419] relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 gradient-bg-1 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-64 h-64 gradient-bg-2 rounded-full blur-3xl opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-20 w-80 h-80 gradient-bg-3 rounded-full blur-3xl opacity-10 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 gradient-bg-4 rounded-full blur-3xl opacity-15 animate-pulse delay-500"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 animated-gradient opacity-5"></div>

      <div className="container mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-light text-white mb-4 text-center">
            <span className="gradient-text-2">Get In Touch</span>
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together!
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <SlideIn direction="left" delay={0.2}>
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-medium text-white mb-6 gradient-text-3">Let's Connect!</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    I'm always excited to discuss new opportunities, innovative projects, and potential collaborations.
                    Whether you're looking for an AI enthusiast, a full-stack developer, or just want to chat about
                    technology, I'd love to hear from you!
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 group/item hover:scale-105 transition-transform duration-300">
                      <a
                        href="mailto:raghavahuja2412@gmail.com"
                        className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 cursor-pointer"
                      >
                        <Mail className="w-6 h-6 text-white" />
                      </a>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <a
                          href="mailto:raghavahuja2412@gmail.com"
                          className="text-white hover:gradient-text-2 transition-all duration-300 font-medium"
                        >
                          raghavahuja2412@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group/item hover:scale-105 transition-transform duration-300">
                      <a
                        href="https://wa.me/919318475247"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-green-500/25"
                      >
                        <WhatsAppIcon className="w-6 h-6 text-white" />
                      </a>
                      <div>
                        <p className="text-gray-400 text-sm">WhatsApp</p>
                        <a
                          href="https://wa.me/919318475247"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:gradient-text-3 transition-all duration-300 font-medium"
                        >
                          +91 9318475247
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group/item hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 gradient-bg-3 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <span className="text-white font-medium">Delhi, India</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-white/10 hover:border-blue-400/30 transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium text-white mb-4 gradient-text">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text-2">3+</div>
                      <div className="text-gray-400 text-sm">Certificates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text-3">10+</div>
                      <div className="text-gray-400 text-sm">Technologies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">3+</div>
                      <div className="text-gray-400 text-sm">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text-2">24/7</div>
                      <div className="text-gray-400 text-sm">Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.4}>
            <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border-white/10 hover:border-indigo-400/30 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 gradient-bg-4 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white gradient-text-2">Send Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/10"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300 mb-2 block">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white focus:border-pink-400 focus:ring-pink-400/20 transition-all duration-300 hover:bg-white/10 resize-none"
                      placeholder="Tell me about your project, ideas, or just say hello!"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gradient-bg-1 hover:scale-105 transition-all duration-300 text-white border-0 py-3 text-lg font-medium shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-400 text-sm text-center">🚀 Usually responds within 24 hours</p>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
