export interface ContactInfo {
  email: string
  phone?: string
  location: string
  timezone: string
  availability: 'available' | 'busy' | 'unavailable'
  responseTime: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
  label: string
  description?: string
}

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  company?: string
}

export interface FormErrors {
  [key: string]: string
}

export interface FormState {
  data: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSubmitted: boolean
  submitError?: string
}

export interface ContactSectionProps {
  contactInfo: ContactInfo
  socialLinks: SocialLink[]
  formConfig: {
    endpoint: string
    messages: {
      success: string
      error: string
      required: string
      invalidEmail: string
      minLength: string
    }
  }
}
