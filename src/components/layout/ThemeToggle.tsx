'use client'

interface ThemeToggleProps {
  currentTheme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ currentTheme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className="relative w-12 h-6 bg-border rounded-full cursor-pointer transition-all duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={onToggle}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={currentTheme === 'dark'}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 flex items-center justify-center shadow-md ${
          currentTheme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        <span className="text-xs">
          {currentTheme === 'light' ? '☀️' : '🌙'}
        </span>
      </div>
    </button>
  )
}
