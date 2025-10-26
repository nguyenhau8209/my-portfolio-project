import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/sections/ContactForm'
import { mockFetch, mockFetchError } from '../../utils/testUtils'

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm', () => {
  const mockEndpoint = 'https://formspree.io/f/test'
  const mockMessages = {
    success: 'Message sent successfully!',
    error: 'Failed to send message',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    minLength: 'Message must be at least 10 characters'
  }

  const defaultProps = {
    endpoint: mockEndpoint,
    messages: mockMessages
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  describe('Form Rendering', () => {
    it('renders all form fields', () => {
      render(<ContactForm {...defaultProps} />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('shows required field indicators', () => {
      render(<ContactForm {...defaultProps} />)
      
      expect(screen.getByText('Name *')).toBeInTheDocument()
      expect(screen.getByText('Email *')).toBeInTheDocument()
      expect(screen.getByText('Subject *')).toBeInTheDocument()
      expect(screen.getByText('Message *')).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<ContactForm {...defaultProps} />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('validates required fields on submit', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      expect(screen.getAllByText(mockMessages.required)).toHaveLength(4)
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      await user.tab()
      
      expect(screen.getByText(mockMessages.invalidEmail)).toBeInTheDocument()
    })

    it('validates message minimum length', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'short')
      await user.tab()
      
      expect(screen.getByText(mockMessages.minLength)).toBeInTheDocument()
    })

    it('accepts valid email format', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'test@example.com')
      await user.tab()
      
      expect(screen.queryByText(mockMessages.invalidEmail)).not.toBeInTheDocument()
    })

    it('accepts message with sufficient length', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'This is a long enough message')
      await user.tab()
      
      expect(screen.queryByText(mockMessages.minLength)).not.toBeInTheDocument()
    })

    it('clears errors when user starts typing', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const nameInput = screen.getByLabelText(/name/i)
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(screen.getAllByText(mockMessages.required)).toHaveLength(4)
      
      await user.type(nameInput, 'John Doe')
      expect(screen.getAllByText(mockMessages.required)).toHaveLength(3)
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup()
      mockFetch({ success: true })
      
      render(<ContactForm {...defaultProps} />)
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(mockEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('John Doe')
        })
      })
    })

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup()
      mockFetch({ success: true })
      
      render(<ContactForm {...defaultProps} />)
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument()
        expect(screen.getByText(mockMessages.success)).toBeInTheDocument()
      })
    })

    it('shows error message on submission failure', async () => {
      const user = userEvent.setup()
      mockFetchError('Network error')
      
      render(<ContactForm {...defaultProps} />)
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        expect(screen.getByText(mockMessages.error)).toBeInTheDocument()
      })
    })

    it('disables form during submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      render(<ContactForm {...defaultProps} />)
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
      expect(screen.getByLabelText(/name/i)).toBeDisabled()
    })

    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))
      
      render(<ContactForm {...defaultProps} />)
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })

    it('resets form after successful submission', async () => {
      const user = userEvent.setup()
      mockFetch({ success: true })
      
      render(<ContactForm {...defaultProps} />)
      
      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument()
      })
      
      // Click "Send another message"
      await user.click(screen.getByText('Send another message'))
      
      expect(screen.getByLabelText(/name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email/i)).toHaveValue('')
    })
  })

  describe('Character Counter', () => {
    it('shows character count for message field', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'Hello')
      
      expect(screen.getByText('5/10 minimum characters')).toBeInTheDocument()
    })

    it('updates character count as user types', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'Hi')
      expect(screen.getByText('2/10 minimum characters')).toBeInTheDocument()
      
      await user.type(messageInput, ' there')
      expect(screen.getByText('8/10 minimum characters')).toBeInTheDocument()
    })
  })

  describe('Optional Fields', () => {
    it('renders phone field as optional', () => {
      render(<ContactForm {...defaultProps} />)
      
      const phoneLabel = screen.getByText('Phone')
      expect(phoneLabel).toBeInTheDocument()
      expect(phoneLabel).not.toHaveTextContent('*')
    })

    it('renders company field as optional', () => {
      render(<ContactForm {...defaultProps} />)
      
      const companyLabel = screen.getByText('Company')
      expect(companyLabel).toBeInTheDocument()
      expect(companyLabel).not.toHaveTextContent('*')
    })

    it('includes optional fields in submission', async () => {
      const user = userEvent.setup()
      mockFetch({ success: true })
      
      render(<ContactForm {...defaultProps} />)
      
      // Fill all fields including optional ones
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone/i), '+1 (555) 123-4567')
      await user.type(screen.getByLabelText(/company/i), 'Test Company')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message')
      
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(mockEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('Test Company')
        })
      })
    })
  })

  describe('Form Styling', () => {
    it('applies error styling to invalid fields', async () => {
      const user = userEvent.setup()
      render(<ContactForm {...defaultProps} />)
      
      const nameInput = screen.getByLabelText(/name/i)
      await user.click(screen.getByRole('button', { name: /send message/i }))
      
      expect(nameInput).toHaveClass('border-red-300')
    })

    it('applies normal styling to valid fields', () => {
      render(<ContactForm {...defaultProps} />)
      
      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toHaveClass('border-border')
    })
  })

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<ContactForm {...defaultProps} />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('has proper input types', () => {
      render(<ContactForm {...defaultProps} />)
      
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email')
      expect(screen.getByLabelText(/phone/i)).toHaveAttribute('type', 'tel')
    })

    it('has proper textarea for message', () => {
      render(<ContactForm {...defaultProps} />)
      
      const messageField = screen.getByLabelText(/message/i)
      expect(messageField.tagName).toBe('TEXTAREA')
    })
  })
})
