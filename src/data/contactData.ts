import { ContactInfo, SocialLink } from '@/types/contact'

export const contactInfo: ContactInfo = {
  email: 'hello@yourname.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  timezone: 'PST (UTC-8)',
  availability: 'available',
  responseTime: 'within 24 hours'
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/yourname',
    icon: 'linkedin',
    label: 'LinkedIn',
    description: 'Professional networking and career updates'
  },
  {
    platform: 'github',
    url: 'https://github.com/yourname',
    icon: 'github',
    label: 'GitHub',
    description: 'Code repositories and open source projects'
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/yourname',
    icon: 'twitter',
    label: 'Twitter',
    description: 'Tech thoughts and industry insights'
  },
  {
    platform: 'email',
    url: 'mailto:hello@yourname.com',
    icon: 'mail',
    label: 'Email',
    description: 'Direct communication for opportunities'
  }
]

export const formConfig = {
  endpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your Formspree form ID
  messages: {
    success: 'Thank you for your message! I\'ll get back to you within 24 hours.',
    error: 'Sorry, there was an error sending your message. Please try again or contact me directly.',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    minLength: 'Message must be at least 10 characters long'
  }
}
