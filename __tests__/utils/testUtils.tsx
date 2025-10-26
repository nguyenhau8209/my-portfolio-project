import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Mock theme context for testing
const mockThemeContext = {
  theme: 'light',
  setTheme: jest.fn(),
  resolvedTheme: 'light',
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider value={mockThemeContext}>
      {children}
    </ThemeProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Test utilities
export const createMockProject = (overrides = {}) => ({
  id: 'test-project',
  title: 'Test Project',
  shortDescription: 'A test project description',
  longDescription: 'A longer test project description',
  year: '2023',
  duration: '3 months',
  teamSize: 2,
  status: { name: 'Completed', color: 'bg-green-100 text-green-800' },
  featured: true,
  color: 'bg-gradient-to-br from-blue-500 to-purple-600',
  image: '/images/test-project.jpg',
  images: {
    screenshots: ['/images/test-project-1.jpg', '/images/test-project-2.jpg'],
    thumbnails: ['/images/test-project-thumb-1.jpg']
  },
  technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  category: { id: 'frontend', name: 'Frontend', color: 'bg-blue-500', icon: '💻' },
  features: ['Feature 1', 'Feature 2'],
  challenges: ['Challenge 1', 'Challenge 2'],
  achievements: ['Achievement 1', 'Achievement 2'],
  links: {
    live: 'https://test-project.com',
    github: 'https://github.com/test/project'
  },
  ...overrides
})

export const createMockProjects = (count = 3) => 
  Array.from({ length: count }, (_, index) => 
    createMockProject({
      id: `test-project-${index + 1}`,
      title: `Test Project ${index + 1}`,
      year: `${2023 - index}`,
    })
  )

export const createMockContactFormData = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Test Subject',
  message: 'This is a test message with enough characters',
  phone: '+1 (555) 123-4567',
  company: 'Test Company',
  ...overrides
})

export const createMockThemeToggleProps = (overrides = {}) => ({
  currentTheme: 'light' as const,
  resolvedTheme: 'light' as const,
  onToggle: jest.fn(),
  ...overrides
})

// Mock fetch for API testing
export const mockFetch = (response: any, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: jest.fn().mockResolvedValue(response),
    text: jest.fn().mockResolvedValue(JSON.stringify(response)),
  })
}

export const mockFetchError = (error = 'Network error') => {
  global.fetch = jest.fn().mockRejectedValue(new Error(error))
}

// Wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.IntersectionObserver = mockIntersectionObserver
}

// Mock ResizeObserver
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn()
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.ResizeObserver = mockResizeObserver
}
