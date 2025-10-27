'use client'

import { useState, useCallback } from 'react'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { useNavigation } from '@/hooks/useNavigation'

interface HeaderProps {
  currentSection?: string
}

export function Header({ currentSection: propCurrentSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Use the navigation hook for better state management
  const { activeSection, isScrolled, scrollToSection } = useNavigation()

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleNavClick = useCallback((section: string) => {
    setIsMobileMenuOpen(false)
    scrollToSection(section)
  }, [scrollToSection])

  // Use prop currentSection if provided, otherwise use detected activeSection
  const currentSection = propCurrentSection || activeSection

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/98 backdrop-blur-md shadow-lg border-b border-border' 
            : 'bg-background/95 backdrop-blur-sm border-b border-border'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="#home" 
              className="text-xl font-bold text-text-primary hover:text-primary transition-colors duration-200"
              aria-label="Portfolio Home"
            >
              Your Name
            </a>

            {/* Desktop Navigation */}
            <Navigation 
              currentSection={currentSection}
              onNavClick={handleNavClick}
            />

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={handleMobileMenuToggle}
                aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                type="button"
              >
                <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
        currentSection={currentSection}
      />
    </>
  )
}
