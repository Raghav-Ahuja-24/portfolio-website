"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"

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
                      <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
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
                      <div className="w-12 h-12 gradient-bg-2 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <a
                          href="tel:+919318475247"
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
