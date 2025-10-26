'use client'

import { useEffect, useRef } from 'react'
import { Navigation } from './Navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavClick: (section: string) => void
  currentSection?: string
}

export function MobileMenu({ isOpen, onClose, onNavClick, currentSection }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      // Focus the menu container
      setTimeout(() => {
        menuRef.current?.focus()
      }, 100)
    } else {
      // Restore body scroll
      document.body.style.overflow = ''
      
      // Return focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
        previousActiveElement.current = null
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      // Trap focus within the menu
      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>
      
      if (!focusableElements.length) return
      
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleNavClick = (section: string) => {
    onNavClick(section)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed top-16 left-0 right-0 bottom-0 bg-background z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="max-w-sm mx-auto">
            <Navigation 
              currentSection={currentSection}
              onNavClick={handleNavClick}
              isMobile={true}
            />
            
            {/* Additional mobile menu content */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-text-secondary mb-4">
                  Let's work together to create something amazing!
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('contact')
                  }}
                >
                  <span>📧</span>
                  <span>Get In Touch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
