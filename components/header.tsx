"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#technologies", label: "Technologies" },
    { href: "#certificates", label: "Certificates" },
    { href: "#education", label: "Education" },
    { href: "#projects", label: "Projects" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ]

  // Animation duration from CSS
  const animationDuration = 15 // seconds
  const totalItems = navItems.length

  return (
    <header className="fixed top-0 w-full gradient-bg-1/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-end items-center py-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium">
                <span
                  className="whitespace-nowrap animated-rainbow-bg"
                  // Negative delay to make it appear as if it started earlier, creating a continuous flow
                  style={{ animationDelay: `-${(animationDuration / totalItems) * index}s` }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  className="whitespace-nowrap animated-rainbow-bg"
                  style={{ animationDelay: `-${(animationDuration / totalItems) * index}s` }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
