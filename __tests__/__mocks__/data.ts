export const mockProject = {
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
  }
}

export const mockProjects = [
  mockProject,
  {
    ...mockProject,
    id: 'test-project-2',
    title: 'E-commerce Platform',
    year: '2022',
    teamSize: 4,
    featured: false,
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Jest'],
    category: { id: 'fullstack', name: 'Full Stack', color: 'bg-green-500', icon: '🚀' }
  },
  {
    ...mockProject,
    id: 'test-project-3',
    title: 'Mobile App',
    year: '2021',
    teamSize: 1,
    technologies: ['React Native', 'TypeScript'],
    category: { id: 'mobile', name: 'Mobile', color: 'bg-purple-500', icon: '📱' }
  }
]

export const mockAboutData = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Passionate developer with 5+ years of experience',
  skills: {
    frontend: ['React', 'TypeScript', 'Next.js'],
    backend: ['Node.js', 'Python', 'PostgreSQL'],
    tools: ['Git', 'Docker', 'AWS']
  },
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Developer',
      duration: '2020 - Present',
      description: 'Led development of multiple projects'
    }
  ]
}

export const mockContactData = {
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  social: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe'
  }
}
