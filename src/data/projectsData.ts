import { Project, ProjectCategory, ProjectStatus } from '@/types/projects';

export const projectCategories: ProjectCategory[] = [
  {
    id: 'web-app',
    name: 'Web Applications',
    description: 'Full-stack web applications and platforms',
    color: 'bg-blue-500',
    icon: '🌐'
  },
  {
    id: 'mobile-app',
    name: 'Mobile Apps',
    description: 'iOS and Android mobile applications',
    color: 'bg-green-500',
    icon: '📱'
  },
  {
    id: 'e-commerce',
    name: 'E-commerce',
    description: 'Online stores and shopping platforms',
    color: 'bg-purple-500',
    icon: '🛒'
  },
  {
    id: 'dashboard',
    name: 'Dashboards',
    description: 'Analytics and admin dashboards',
    color: 'bg-orange-500',
    icon: '📊'
  },
  {
    id: 'api',
    name: 'APIs & Backend',
    description: 'REST APIs and backend services',
    color: 'bg-red-500',
    icon: '⚙️'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    description: 'User interface and experience design',
    color: 'bg-pink-500',
    icon: '🎨'
  }
];

export const projectStatuses: ProjectStatus[] = [
  {
    id: 'completed',
    name: 'Completed',
    color: 'bg-green-100 text-green-800',
    description: 'Fully developed and deployed'
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    color: 'bg-blue-100 text-blue-800',
    description: 'Currently under development'
  },
  {
    id: 'prototype',
    name: 'Prototype',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Proof of concept or MVP'
  },
  {
    id: 'archived',
    name: 'Archived',
    color: 'bg-gray-100 text-gray-800',
    description: 'No longer maintained'
  }
];

export const projectsData: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A comprehensive e-commerce platform built with Next.js, featuring advanced product management, secure payment processing, and real-time inventory tracking. The platform supports multiple vendors, complex pricing rules, and integrates with major shipping providers.',
    shortDescription: 'Full-stack e-commerce platform with advanced features and multi-vendor support.',
    image: '/images/projects/ecommerce-platform.jpg',
    images: [
      '/images/projects/ecommerce-platform.jpg',
      '/images/projects/ecommerce-dashboard.jpg',
      '/images/projects/ecommerce-mobile.jpg'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis', 'Docker', 'AWS'],
    category: projectCategories[2], // e-commerce
    status: projectStatuses[0], // completed
    featured: true,
    year: 2023,
    month: 'November',
    duration: '6 months',
    teamSize: 4,
    role: 'Lead Developer',
    challenges: [
      'Implementing complex pricing rules and discount systems',
      'Optimizing database queries for large product catalogs',
      'Ensuring PCI compliance for payment processing',
      'Building scalable inventory management system'
    ],
    achievements: [
      'Achieved 99.9% uptime during peak shopping seasons',
      'Reduced page load times by 60% through optimization',
      'Processed over $2M in transactions in first year',
      'Achieved 95% customer satisfaction rating'
    ],
    features: [
      'Multi-vendor marketplace support',
      'Advanced product search and filtering',
      'Real-time inventory tracking',
      'Secure payment processing with Stripe',
      'Comprehensive admin dashboard',
      'Mobile-responsive design',
      'Order tracking and notifications',
      'Customer review and rating system'
    ],
    links: {
      live: 'https://ecommerce-platform-demo.vercel.app',
      github: 'https://github.com/johndoe/ecommerce-platform',
      demo: 'https://ecommerce-platform-demo.vercel.app/demo',
      caseStudy: '/case-studies/ecommerce-platform'
    },
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    order: 1
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A modern task management application with real-time collaboration features, built using React and Node.js. Features include project boards, time tracking, team collaboration, and advanced reporting capabilities.',
    shortDescription: 'Collaborative task management platform with real-time updates and team features.',
    image: '/images/projects/task-management.jpg',
    images: [
      '/images/projects/task-management.jpg',
      '/images/projects/task-dashboard.jpg',
      '/images/projects/task-mobile.jpg'
    ],
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'JWT', 'Chart.js'],
    category: projectCategories[0], // web-app
    status: projectStatuses[0], // completed
    featured: true,
    year: 2023,
    month: 'August',
    duration: '4 months',
    teamSize: 3,
    role: 'Full-stack Developer',
    challenges: [
      'Implementing real-time collaboration features',
      'Managing complex state across multiple components',
      'Optimizing performance for large datasets',
      'Creating intuitive drag-and-drop interface'
    ],
    achievements: [
      'Reduced project completion time by 40% for teams',
      'Achieved 98% user retention rate',
      'Processed over 1M tasks in first 6 months',
      'Received 4.8/5 average user rating'
    ],
    features: [
      'Real-time collaboration and updates',
      'Drag-and-drop task management',
      'Time tracking and reporting',
      'Team and project organization',
      'Advanced filtering and search',
      'Mobile app for iOS and Android',
      'Integration with popular tools',
      'Customizable dashboards and views'
    ],
    links: {
      live: 'https://taskmanager-app.vercel.app',
      github: 'https://github.com/johndoe/task-management-app',
      demo: 'https://taskmanager-app.vercel.app/demo'
    },
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    order: 2
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard for tracking business metrics, user behavior, and performance indicators. Built with modern data visualization libraries and real-time data processing.',
    shortDescription: 'Real-time analytics dashboard with advanced data visualization and reporting.',
    image: '/images/projects/analytics-dashboard.jpg',
    images: [
      '/images/projects/analytics-dashboard.jpg',
      '/images/projects/analytics-mobile.jpg'
    ],
    technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    category: projectCategories[3], // dashboard
    status: projectStatuses[0], // completed
    featured: false,
    year: 2023,
    month: 'June',
    duration: '3 months',
    teamSize: 2,
    role: 'Frontend Developer',
    challenges: [
      'Creating responsive data visualizations',
      'Handling large datasets efficiently',
      'Implementing real-time data updates',
      'Designing intuitive user interface'
    ],
    achievements: [
      'Reduced data analysis time by 70%',
      'Improved decision-making speed by 50%',
      'Handled 10M+ data points in real-time',
      'Achieved 99.5% data accuracy'
    ],
    features: [
      'Real-time data visualization',
      'Customizable dashboard widgets',
      'Advanced filtering and drill-down',
      'Export capabilities (PDF, Excel)',
      'Automated report generation',
      'Mobile-responsive design',
      'Role-based access control',
      'API for third-party integrations'
    ],
    links: {
      live: 'https://analytics-dashboard-demo.vercel.app',
      github: 'https://github.com/johndoe/analytics-dashboard',
      demo: 'https://analytics-dashboard-demo.vercel.app/demo'
    },
    color: 'bg-gradient-to-br from-orange-500 to-red-500',
    order: 3
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracking App',
    description: 'A mobile fitness application for iOS and Android that helps users track workouts, monitor progress, and achieve fitness goals. Features include workout plans, progress tracking, and social features.',
    shortDescription: 'Mobile fitness app with workout tracking, progress monitoring, and social features.',
    image: '/images/projects/fitness-app.jpg',
    images: [
      '/images/projects/fitness-app.jpg',
      '/images/projects/fitness-workout.jpg',
      '/images/projects/fitness-progress.jpg'
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Expo', 'Redux', 'Chart.js'],
    category: projectCategories[1], // mobile-app
    status: projectStatuses[1], // in-progress
    featured: true,
    year: 2024,
    month: 'January',
    duration: '5 months',
    teamSize: 3,
    role: 'Mobile Developer',
    challenges: [
      'Optimizing app performance for mobile devices',
      'Implementing offline functionality',
      'Creating smooth animations and transitions',
      'Integrating with fitness tracking devices'
    ],
    achievements: [
      'Achieved 4.7/5 App Store rating',
      'Reached 50K+ downloads in first 3 months',
      'Users completed 1M+ workouts',
      'Achieved 85% user retention rate'
    ],
    features: [
      'Workout tracking and planning',
      'Progress monitoring and analytics',
      'Social features and challenges',
      'Integration with fitness devices',
      'Offline workout support',
      'Personalized recommendations',
      'Nutrition tracking integration',
      'Community and leaderboards'
    ],
    links: {
      github: 'https://github.com/johndoe/fitness-app',
      demo: 'https://fitness-app-demo.vercel.app'
    },
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
    order: 4
  },
  {
    id: 'api-gateway',
    title: 'API Gateway Service',
    description: 'A microservices API gateway built with Node.js and Express, providing authentication, rate limiting, request routing, and monitoring capabilities for distributed systems.',
    shortDescription: 'Microservices API gateway with authentication, rate limiting, and monitoring.',
    image: '/images/projects/api-gateway.jpg',
    images: [
      '/images/projects/api-gateway.jpg',
      '/images/projects/api-monitoring.jpg'
    ],
    technologies: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker', 'Kubernetes', 'Prometheus'],
    category: projectCategories[4], // api
    status: projectStatuses[0], // completed
    featured: false,
    year: 2023,
    month: 'April',
    duration: '2 months',
    teamSize: 2,
    role: 'Backend Developer',
    challenges: [
      'Implementing secure authentication and authorization',
      'Building scalable rate limiting mechanisms',
      'Creating comprehensive monitoring and logging',
      'Ensuring high availability and fault tolerance'
    ],
    achievements: [
      'Reduced API response time by 30%',
      'Achieved 99.9% uptime',
      'Handled 10M+ requests per day',
      'Reduced security incidents by 95%'
    ],
    features: [
      'JWT-based authentication',
      'Rate limiting and throttling',
      'Request routing and load balancing',
      'Comprehensive monitoring and logging',
      'API versioning support',
      'Webhook management',
      'Documentation generation',
      'Health checks and metrics'
    ],
    links: {
      github: 'https://github.com/johndoe/api-gateway',
      demo: 'https://api-gateway-demo.vercel.app'
    },
    color: 'bg-gradient-to-br from-red-500 to-pink-500',
    order: 5
  },
  {
    id: 'design-system',
    title: 'Design System',
    description: 'A comprehensive design system and component library built with React and Storybook, providing consistent UI components and design tokens for multiple applications.',
    shortDescription: 'Comprehensive design system with React components and design tokens.',
    image: '/images/projects/design-system.jpg',
    images: [
      '/images/projects/design-system.jpg',
      '/images/projects/design-components.jpg',
      '/images/projects/design-tokens.jpg'
    ],
    technologies: ['React', 'TypeScript', 'Storybook', 'Styled Components', 'Figma', 'Jest', 'Chromatic'],
    category: projectCategories[5], // ui-ux
    status: projectStatuses[0], // completed
    featured: false,
    year: 2023,
    month: 'February',
    duration: '3 months',
    teamSize: 2,
    role: 'UI/UX Developer',
    challenges: [
      'Creating consistent design tokens',
      'Building accessible components',
      'Maintaining design system documentation',
      'Ensuring cross-browser compatibility'
    ],
    achievements: [
      'Reduced development time by 40%',
      'Improved design consistency by 90%',
      'Achieved WCAG 2.1 AA compliance',
      'Adopted by 5+ internal teams'
    ],
    features: [
      'Comprehensive component library',
      'Design tokens and theming',
      'Interactive documentation',
      'Accessibility guidelines',
      'Cross-platform compatibility',
      'Automated testing and validation',
      'Figma integration',
      'Version control and updates'
    ],
    links: {
      live: 'https://design-system-demo.vercel.app',
      github: 'https://github.com/johndoe/design-system',
      figma: 'https://figma.com/design-system'
    },
    color: 'bg-gradient-to-br from-pink-500 to-purple-500',
    order: 6
  }
];

export const projectsDataWithCategories = {
  projects: projectsData,
  categories: projectCategories,
  statuses: projectStatuses
};
