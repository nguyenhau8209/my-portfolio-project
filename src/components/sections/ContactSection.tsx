'use client'

import { ContactSectionProps } from '@/types/contact'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'

export function ContactSection({ contactInfo, socialLinks, formConfig }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. 
            Whether you're looking for a developer, designer, or just want to chat about technology, 
            feel free to reach out!
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-surface border border-border rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-6">
                Send me a message
              </h3>
              <ContactForm 
                endpoint={formConfig.endpoint}
                messages={formConfig.messages}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <ContactInfo 
              contactInfo={contactInfo}
              socialLinks={socialLinks}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              What happens next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">1. Send Message</h4>
                <p className="text-sm text-text-secondary">
                  Fill out the form with your project details or opportunity
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">2. Quick Response</h4>
                <p className="text-sm text-text-secondary">
                  I'll get back to you within 24 hours to discuss next steps
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">3. Let's Build</h4>
                <p className="text-sm text-text-secondary">
                  We'll schedule a call to discuss your project in detail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
