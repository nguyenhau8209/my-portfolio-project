interface ContactInfo {
  email: string
  location: string
}

interface SocialLink {
  platform: string
  url: string
  icon: string
  label: string
}

interface FooterProps {
  contactInfo?: ContactInfo
  socialLinks?: SocialLink[]
  quickLinks?: Array<{
    id: string
    label: string
    href: string
  }>
}

const defaultContactInfo: ContactInfo = {
  email: 'contact@example.com',
  location: 'San Francisco, CA'
}

const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/username',
    icon: 'linkedin',
    label: 'LinkedIn'
  },
  {
    platform: 'github',
    url: 'https://github.com/username',
    icon: 'github',
    label: 'GitHub'
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/username',
    icon: 'twitter',
    label: 'Twitter'
  }
]

const defaultQuickLinks = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' }
]

export function Footer({ 
  contactInfo = defaultContactInfo, 
  socialLinks = defaultSocialLinks,
  quickLinks = defaultQuickLinks 
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-4">
              <a 
                href="#home" 
                className="text-xl font-bold text-text-primary hover:text-primary transition-colors duration-200"
              >
                Your Name
              </a>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                Full-stack developer passionate about creating digital experiences that make a difference.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-full text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 transform hover:-translate-y-0.5"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-4">Contact</h3>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {contactInfo.email}
              </a>
              <span className="text-sm text-text-secondary">
                {contactInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">
              © {currentYear} Your Name. All rights reserved.
            </p>
            <nav className="flex gap-6" aria-label="Legal links">
              <a
                href="/privacy"
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
