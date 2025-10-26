import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { mockProject, mockProjects } from '../../__mocks__/data'

describe('ProjectCard', () => {
  const mockOnSelect = jest.fn()
  
  const defaultProps = {
    project: mockProject,
    onSelect: mockOnSelect,
    index: 0
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders project information correctly', () => {
      render(<ProjectCard {...defaultProps} />)
      
      expect(screen.getByText(mockProject.title)).toBeInTheDocument()
      expect(screen.getByText(mockProject.shortDescription)).toBeInTheDocument()
      expect(screen.getByText(mockProject.year)).toBeInTheDocument()
      expect(screen.getByText(mockProject.duration)).toBeInTheDocument()
    })

    it('renders status badge', () => {
      render(<ProjectCard {...defaultProps} />)
      expect(screen.getByText(mockProject.status.name)).toBeInTheDocument()
    })

    it('renders featured badge when project is featured', () => {
      render(<ProjectCard {...defaultProps} project={{...mockProject, featured: true}} />)
      expect(screen.getByText('Featured')).toBeInTheDocument()
    })

    it('does not render featured badge when project is not featured', () => {
      render(<ProjectCard {...defaultProps} project={{...mockProject, featured: false}} />)
      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
    })

    it('renders category icon', () => {
      render(<ProjectCard {...defaultProps} />)
      expect(screen.getByText(mockProject.category.icon)).toBeInTheDocument()
    })
  })

  describe('Technologies Display', () => {
    it('renders first 4 technologies', () => {
      render(<ProjectCard {...defaultProps} />)
      
      mockProject.technologies.slice(0, 4).forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })

    it('shows "+X more" when more than 4 technologies', () => {
      const projectWithManyTechs = {
        ...mockProject,
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Jest']
      }
      
      render(<ProjectCard {...defaultProps} project={projectWithManyTechs} />)
      expect(screen.getByText('+2 more')).toBeInTheDocument()
    })

    it('does not show "+X more" when exactly 4 technologies', () => {
      const projectWithFourTechs = {
        ...mockProject,
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB']
      }
      
      render(<ProjectCard {...defaultProps} project={projectWithFourTechs} />)
      expect(screen.queryByText(/\+.*more/)).not.toBeInTheDocument()
    })
  })

  describe('Image Loading', () => {
    it('shows loading state initially', () => {
      render(<ProjectCard {...defaultProps} />)
      const img = screen.getByRole('img')
      expect(img).toHaveClass('opacity-0')
    })

    it('shows image after loading', async () => {
      render(<ProjectCard {...defaultProps} />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      
      await waitFor(() => {
        expect(img).toHaveClass('opacity-100')
      })
    })

    it('has correct image attributes', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('alt', mockProject.title)
      expect(img).toHaveAttribute('src', mockProject.image)
    })
  })

  describe('Interactions', () => {
    it('calls onSelect when clicked', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const card = screen.getByRole('img').closest('div')!
      fireEvent.click(card)
      expect(mockOnSelect).toHaveBeenCalledWith(mockProject)
    })

    it('applies animation delay based on index', () => {
      render(<ProjectCard {...defaultProps} index={2} />)
      
      const card = document.querySelector('.group.cursor-pointer')!
      expect(card).toHaveStyle('animation-delay: 200ms')
    })

    it('applies correct animation delay for index 0', () => {
      render(<ProjectCard {...defaultProps} index={0} />)
      
      const card = document.querySelector('.group.cursor-pointer')!
      expect(card).toHaveStyle('animation-delay: 0ms')
    })
  })

  describe('Team Size Display', () => {
    it('shows singular form for 1 developer', () => {
      render(<ProjectCard {...defaultProps} project={{...mockProject, teamSize: 1}} />)
      expect(screen.getByText('1 dev')).toBeInTheDocument()
    })

    it('shows plural form for multiple developers', () => {
      render(<ProjectCard {...defaultProps} project={{...mockProject, teamSize: 3}} />)
      expect(screen.getByText('3 devs')).toBeInTheDocument()
    })

    it('shows singular form for 0 developers', () => {
      render(<ProjectCard {...defaultProps} project={{...mockProject, teamSize: 0}} />)
      expect(screen.getByText('0 dev')).toBeInTheDocument()
    })
  })

  describe('Project Meta Information', () => {
    it('displays duration with clock icon', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const durationElement = screen.getByText(mockProject.duration)
      expect(durationElement).toBeInTheDocument()
      
      // Check that it's in the same container as the clock icon
      const clockIcon = durationElement.closest('span')?.querySelector('svg')
      expect(clockIcon).toBeInTheDocument()
    })

    it('displays team size with team icon', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const teamSizeElement = screen.getByText('2 devs')
      expect(teamSizeElement).toBeInTheDocument()
      
      // Check that it's in the same container as the team icon
      const teamIcon = teamSizeElement.closest('span')?.querySelector('svg')
      expect(teamIcon).toBeInTheDocument()
    })

    it('shows "View Details" link', () => {
      render(<ProjectCard {...defaultProps} />)
      expect(screen.getByText('View Details →')).toBeInTheDocument()
    })
  })

  describe('Styling and Classes', () => {
    it('applies correct base classes', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const card = document.querySelector('.group.cursor-pointer')!
      expect(card).toHaveClass('group', 'cursor-pointer')
    })

    it('applies project color background', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const colorOverlay = document.querySelector('.absolute.inset-0')
      expect(colorOverlay).toHaveClass(mockProject.color)
    })

    it('applies status badge styling', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const statusBadge = screen.getByText(mockProject.status.name)
      expect(statusBadge).toHaveClass(mockProject.status.color)
    })

    it('applies category icon styling', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const categoryIcon = screen.getByText(mockProject.category.icon).closest('div')
      expect(categoryIcon).toHaveClass(mockProject.category.color)
    })
  })

  describe('Accessibility', () => {
    it('has proper image alt text', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('alt', mockProject.title)
    })

    it('is keyboard accessible', () => {
      render(<ProjectCard {...defaultProps} />)
      
      const card = document.querySelector('.group.cursor-pointer') as HTMLElement
      card.tabIndex = 0
      card.focus()
      expect(card).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty technologies array', () => {
      const projectWithNoTechs = { ...mockProject, technologies: [] }
      render(<ProjectCard {...defaultProps} project={projectWithNoTechs} />)
      
      expect(screen.queryByText(/\+.*more/)).not.toBeInTheDocument()
    })

    it('handles very long project title', () => {
      const projectWithLongTitle = { 
        ...mockProject, 
        title: 'This is a very long project title that should be handled gracefully'
      }
      render(<ProjectCard {...defaultProps} project={projectWithLongTitle} />)
      
      expect(screen.getByText(projectWithLongTitle.title)).toBeInTheDocument()
    })

    it('handles missing optional fields', () => {
      const minimalProject = {
        ...mockProject,
        phone: undefined,
        company: undefined
      }
      render(<ProjectCard {...defaultProps} project={minimalProject} />)
      
      expect(screen.getByText(mockProject.title)).toBeInTheDocument()
    })
  })
})
