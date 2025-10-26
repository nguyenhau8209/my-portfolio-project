import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { createMockThemeToggleProps } from '../../utils/testUtils'

describe('ThemeToggle', () => {
  const mockOnToggle = jest.fn()
  
  const defaultProps = createMockThemeToggleProps({
    onToggle: mockOnToggle
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders with light theme', () => {
      render(<ThemeToggle {...defaultProps} />)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Light')).toBeInTheDocument()
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
    })

    it('renders with dark theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="dark" resolvedTheme="dark" />)
      
      expect(screen.getByText('Dark')).toBeInTheDocument()
      expect(screen.getByLabelText('Switch to system mode')).toBeInTheDocument()
    })

    it('renders with system theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="system" />)
      
      expect(screen.getByText('System')).toBeInTheDocument()
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })
  })

  describe('Theme Icons', () => {
    it('shows sun icon for light theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="light" />)
      expect(screen.getByText('☀️')).toBeInTheDocument()
    })

    it('shows moon icon for dark theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="dark" resolvedTheme="dark" />)
      expect(screen.getByText('🌙')).toBeInTheDocument()
    })

    it('shows computer icon for system theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="system" />)
      expect(screen.getByText('💻')).toBeInTheDocument()
    })

    it('shows fallback icon for unknown theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="unknown" as any />)
      expect(screen.getByText('☀️')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onToggle when clicked', () => {
      render(<ThemeToggle {...defaultProps} />)
      
      fireEvent.click(screen.getByRole('button'))
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })

    it('applies pressed animation on click', () => {
      render(<ThemeToggle {...defaultProps} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(button).toHaveClass('animate-theme-toggle')
    })

    it('has correct aria-pressed state', () => {
      render(<ThemeToggle {...defaultProps} resolvedTheme="dark" />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })

    it('has correct aria-pressed state for light theme', () => {
      render(<ThemeToggle {...defaultProps} resolvedTheme="light" />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for light theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="light" />)
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
    })

    it('has proper ARIA labels for dark theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="dark" resolvedTheme="dark" />)
      expect(screen.getByLabelText('Switch to system mode')).toBeInTheDocument()
    })

    it('has proper ARIA labels for system theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="system" />)
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })

    it('is keyboard accessible', () => {
      render(<ThemeToggle {...defaultProps} />)
      
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('has proper button type', () => {
      render(<ThemeToggle {...defaultProps} />)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })
  })

  describe('Theme Labels', () => {
    it('shows correct label for light theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="light" />)
      expect(screen.getByText('Light')).toBeInTheDocument()
    })

    it('shows correct label for dark theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="dark" resolvedTheme="dark" />)
      expect(screen.getByText('Dark')).toBeInTheDocument()
    })

    it('shows correct label for system theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="system" />)
      expect(screen.getByText('System')).toBeInTheDocument()
    })
  })

  describe('Button Styling', () => {
    it('applies correct classes for dark theme', () => {
      render(<ThemeToggle {...defaultProps} resolvedTheme="dark" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary-600')
    })

    it('applies correct classes for light theme', () => {
      render(<ThemeToggle {...defaultProps} resolvedTheme="light" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-gray-300')
    })

    it('applies focus ring classes', () => {
      render(<ThemeToggle {...defaultProps} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-primary')
    })
  })

  describe('Toggle Handle Position', () => {
    it('positions handle correctly for dark theme', () => {
      render(<ThemeToggle {...defaultProps} currentTheme="dark" resolvedTheme="dark" />)
      
      const handle = screen.getByText('🌙').closest('div')
      expect(handle).toHaveClass('translate-x-7')
    })

    it('positions handle correctly for light theme', () => {
      render(<ThemeToggle {...defaultProps} resolvedTheme="light" />)
      
      const handle = screen.getByText('☀️').closest('div')
      expect(handle).toHaveClass('translate-x-0.5')
    })
  })
})
