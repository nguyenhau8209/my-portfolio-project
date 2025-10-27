'use client'

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [isPressed, setIsPressed] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const handleClick = () => {
    setIsPressed(true)
    toggleTheme()
    setTimeout(() => setIsPressed(false), 150)
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const getThemeIcon = () => {
    return isDark ? '🌙' : '☀️'
  }

  const getThemeLabel = () => {
    return isDark ? 'Switch to light mode' : 'Switch to dark mode'
  }

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle Button */}
      <button
        className={`
          relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
          ${isPressed ? 'animate-theme-toggle' : ''}
          ${isDark 
            ? 'bg-primary-600 hover:bg-primary-500' 
            : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
          }
        `}
        onClick={handleClick}
        aria-label={getThemeLabel()}
        aria-pressed={isDark}
        type="button"
      >
        {/* Toggle Track */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20" />
        
        {/* Toggle Handle */}
        <div
          className={`
            absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 
            flex items-center justify-center transform
            ${isDark ? 'translate-x-7' : 'translate-x-0.5'}
          `}
        >
          <span className="text-xs transition-all duration-300">
            {getThemeIcon()}
          </span>
        </div>
      </button>

      {/* Theme Label */}
      <span className="text-sm text-text-secondary font-medium hidden sm:block">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </div>
  )
}
