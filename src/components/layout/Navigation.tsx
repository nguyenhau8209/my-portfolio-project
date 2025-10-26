interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  external?: boolean
  order: number
  description?: string
}

interface NavigationProps {
  items?: NavigationItem[]
  currentSection?: string
  onNavClick: (section: string) => void
  isMobile?: boolean
}

const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
    icon: '🏠',
    external: false,
    order: 0,
    description: 'Go to home section'
  },
  {
    id: 'about',
    label: 'About',
    href: '#about',
    icon: '👤',
    external: false,
    order: 1,
    description: 'Learn about me'
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '#projects',
    icon: '💼',
    external: false,
    order: 2,
    description: 'View my projects'
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: '📧',
    external: false,
    order: 3,
    description: 'Get in touch'
  },
  {
    id: 'resume',
    label: 'Resume',
    href: '/resume.pdf',
    icon: '📄',
    external: true,
    order: 4,
    description: 'Download my resume'
  }
]

export function Navigation({ 
  items = defaultNavigationItems, 
  currentSection, 
  onNavClick,
  isMobile = false 
}: NavigationProps) {
  // Sort items by order
  const sortedItems = [...items].sort((a, b) => a.order - b.order)

  const handleNavClick = (item: NavigationItem) => {
    if (!item.external) {
      onNavClick(item.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, item: NavigationItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!item.external) {
        handleNavClick(item)
      }
    }
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
        <ul className="flex flex-col gap-1" role="menubar">
          {sortedItems.map((item, index) => (
            <li key={item.id} role="none" className="mobile-nav-item" style={{ animationDelay: `${index * 0.05}s` }}>
              <a
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  currentSection === item.id
                    ? 'bg-primary/10 border-primary text-primary shadow-sm'
                    : 'text-text-primary hover:bg-surface hover:border-border hover:shadow-sm border-transparent'
                }`}
                onClick={(e) => {
                  if (!item.external) {
                    e.preventDefault()
                    handleNavClick(item)
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, item)}
                role="menuitem"
                aria-current={currentSection === item.id ? 'page' : undefined}
                aria-describedby={item.description ? `${item.id}-desc` : undefined}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                tabIndex={0}
              >
                <span className={`text-lg transition-transform duration-200 ${
                  currentSection === item.id ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.external && (
                  <span className="text-xs opacity-60" aria-hidden="true">↗</span>
                )}
                {item.description && (
                  <span id={`${item.id}-desc`} className="sr-only">
                    {item.description}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
      <ul className="flex items-center gap-1" role="menubar">
        {sortedItems.map((item, index) => (
          <li key={item.id} role="none" className="nav-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <a
              href={item.href}
              className={`group relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                currentSection === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
              onClick={(e) => {
                if (!item.external) {
                  e.preventDefault()
                  handleNavClick(item)
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, item)}
              role="menuitem"
              aria-current={currentSection === item.id ? 'page' : undefined}
              aria-describedby={item.description ? `${item.id}-desc` : undefined}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              tabIndex={0}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
                {item.external && (
                  <span className="text-xs opacity-60" aria-hidden="true">↗</span>
                )}
              </span>
              
              {/* Active indicator */}
              {currentSection === item.id && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full active-indicator"></span>
              )}
              
              {/* Hover effect */}
              <span className={`absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                currentSection === item.id ? 'opacity-100' : ''
              }`}></span>
              
              {item.description && (
                <span id={`${item.id}-desc`} className="sr-only">
                  {item.description}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
