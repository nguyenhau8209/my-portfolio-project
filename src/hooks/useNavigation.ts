'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseNavigationProps {
  sections?: string[]
  offset?: number
}

export function useNavigation({ 
  sections = ['home', 'about', 'projects', 'contact'], 
  offset = 100 
}: UseNavigationProps = {}) {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setIsScrolled(scrollY > 20)
    
    // Detect active section based on scroll position
    const headerHeight = 64
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i])
      if (section) {
        const sectionTop = section.offsetTop - headerHeight - offset
        if (scrollY >= sectionTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }
  }, [sections, offset])

  useEffect(() => {
    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64
      const elementPosition = element.offsetTop - headerHeight
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      })
    }
  }, [])

  return {
    activeSection,
    isScrolled,
    scrollToSection,
    setActiveSection
  }
}
