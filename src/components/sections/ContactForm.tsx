'use client'

import { useState } from 'react'
import { FormData, FormErrors, FormState } from '@/types/contact'

interface ContactFormProps {
  endpoint: string
  messages: {
    success: string
    error: string
    required: string
    invalidEmail: string
    minLength: string
  }
}

export function ContactForm({ endpoint, messages }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    data: {
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
      company: ''
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    submitError: undefined
  })

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? messages.required : null
      case 'email':
        if (value.trim() === '') return messages.required
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? messages.invalidEmail : null
      case 'subject':
        return value.trim() === '' ? messages.required : null
      case 'message':
        if (value.trim() === '') return messages.required
        return value.trim().length < 10 ? messages.minLength : null
      default:
        return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      },
      errors: {
        ...prev.errors,
        [name]: '' // Clear error when user starts typing
      }
    }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    
    if (error) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: error
        }
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    let isValid = true

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message']
    requiredFields.forEach(field => {
      const error = validateField(field, formState.data[field as keyof FormData] || '')
      if (error) {
        errors[field] = error
        isValid = false
      }
    })

    setFormState(prev => ({
      ...prev,
      errors
    }))

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      submitError: undefined
    }))

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.data.name,
          email: formState.data.email,
          subject: formState.data.subject,
          message: formState.data.message,
          phone: formState.data.phone,
          company: formState.data.company,
          _replyto: formState.data.email,
          _subject: `Portfolio Contact: ${formState.data.subject}`
        })
      })

      if (response.ok) {
        setFormState(prev => ({
          ...prev,
          isSubmitted: true,
          isSubmitting: false,
          data: {
            name: '',
            email: '',
            subject: '',
            message: '',
            phone: '',
            company: ''
          }
        }))
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: messages.error
      }))
    }
  }

  if (formState.isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="text-green-600 dark:text-green-400 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          {messages.success}
        </p>
        <button
          onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
          className="mt-4 text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.data.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              formState.errors.name
                ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                : 'border-border bg-background hover:border-primary/50'
            }`}
            placeholder="Your full name"
            disabled={formState.isSubmitting}
          />
          {formState.errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formState.errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.data.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              formState.errors.email
                ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                : 'border-border bg-background hover:border-primary/50'
            }`}
            placeholder="your.email@example.com"
            disabled={formState.isSubmitting}
          />
          {formState.errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formState.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.data.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary/50 transition-colors"
            placeholder="+1 (555) 123-4567"
            disabled={formState.isSubmitting}
          />
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.data.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary/50 transition-colors"
            placeholder="Your company name"
            disabled={formState.isSubmitting}
          />
        </div>
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.data.subject}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            formState.errors.subject
              ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
              : 'border-border bg-background hover:border-primary/50'
          }`}
          placeholder="What's this about?"
          disabled={formState.isSubmitting}
        />
        {formState.errors.subject && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {formState.errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.data.message}
          onChange={handleInputChange}
          onBlur={handleBlur}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical ${
            formState.errors.message
              ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
              : 'border-border bg-background hover:border-primary/50'
          }`}
          placeholder="Tell me about your project, opportunity, or just say hello!"
          disabled={formState.isSubmitting}
        />
        {formState.errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {formState.errors.message}
          </p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          {formState.data.message.length}/10 minimum characters
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>

        {formState.submitError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {formState.submitError}
          </p>
        )}
      </div>
    </form>
  )
}
