import { AboutMeSectionProps } from '@/types'

export const aboutData: AboutMeSectionProps = {
  profileData: {
    name: "John Doe",
    title: "Full-Stack Developer",
    headline: "Building digital experiences that matter",
    valueProposition: "Passionate developer with 5+ years of experience creating scalable web applications and solving complex problems with modern technologies.",
    profileImage: {
      src: "/images/profile.jpg",
      alt: "Professional headshot of John Doe",
      width: 400,
      height: 400
    }
  },
  experienceData: [
    {
      id: "exp-1",
      company: "Tech Corp",
      role: "Senior Frontend Developer",
      duration: {
        start: "2022-01",
        current: true
      },
      description: "Lead frontend development for customer-facing applications, focusing on performance optimization and user experience.",
      achievements: [
        "Improved page load times by 40% through code optimization",
        "Led a team of 3 developers on major product features",
        "Implemented a comprehensive design system used across 10+ products",
        "Reduced bug reports by 60% through improved testing practices"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Jest", "Storybook"]
    },
    {
      id: "exp-2", 
      company: "StartupXYZ",
      role: "Full-Stack Developer",
      duration: {
        start: "2020-03",
        end: "2021-12"
      },
      description: "Developed end-to-end web applications from concept to deployment, working closely with product and design teams.",
      achievements: [
        "Built and launched 3 major features that increased user engagement by 25%",
        "Implemented CI/CD pipeline reducing deployment time by 70%",
        "Mentored 2 junior developers and conducted code reviews",
        "Optimized database queries resulting in 50% faster API responses"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "GraphQL"]
    },
    {
      id: "exp-3",
      company: "Digital Agency",
      role: "Frontend Developer",
      duration: {
        start: "2019-06",
        end: "2020-02"
      },
      description: "Created responsive websites and web applications for various clients across different industries.",
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Increased client satisfaction scores by 30%",
        "Developed reusable component library saving 40% development time",
        "Implemented accessibility features achieving WCAG 2.1 AA compliance"
      ],
      technologies: ["Vue.js", "JavaScript", "Sass", "Webpack", "Figma", "Git"]
    }
  ],
  skillsData: {
    categories: {
      "Frontend": [
        { name: "React", level: "expert", yearsExperience: 4, icon: "⚛️" },
        { name: "TypeScript", level: "advanced", yearsExperience: 3, icon: "📘" },
        { name: "Next.js", level: "advanced", yearsExperience: 2, icon: "▲" },
        { name: "Vue.js", level: "intermediate", yearsExperience: 2, icon: "💚" },
        { name: "Tailwind CSS", level: "expert", yearsExperience: 3, icon: "🎨" },
        { name: "Sass/SCSS", level: "advanced", yearsExperience: 4, icon: "💎" }
      ],
      "Backend": [
        { name: "Node.js", level: "advanced", yearsExperience: 3, icon: "🟢" },
        { name: "Python", level: "intermediate", yearsExperience: 2, icon: "🐍" },
        { name: "Express.js", level: "advanced", yearsExperience: 3, icon: "🚀" },
        { name: "GraphQL", level: "intermediate", yearsExperience: 2, icon: "🔷" },
        { name: "REST APIs", level: "expert", yearsExperience: 4, icon: "🌐" }
      ],
      "Database": [
        { name: "PostgreSQL", level: "advanced", yearsExperience: 3, icon: "🐘" },
        { name: "MongoDB", level: "intermediate", yearsExperience: 2, icon: "🍃" },
        { name: "Redis", level: "intermediate", yearsExperience: 1, icon: "🔴" },
        { name: "MySQL", level: "intermediate", yearsExperience: 2, icon: "🐬" }
      ],
      "DevOps & Tools": [
        { name: "Docker", level: "intermediate", yearsExperience: 2, icon: "🐳" },
        { name: "AWS", level: "intermediate", yearsExperience: 2, icon: "☁️" },
        { name: "Git", level: "expert", yearsExperience: 5, icon: "📚" },
        { name: "Jest", level: "advanced", yearsExperience: 3, icon: "🧪" },
        { name: "Webpack", level: "intermediate", yearsExperience: 2, icon: "📦" },
        { name: "Figma", level: "intermediate", yearsExperience: 2, icon: "🎨" }
      ]
    }
  },
  personalData: {
    interests: ["Photography", "Hiking", "Open Source", "Coffee", "Reading", "Gaming"],
    location: "San Francisco, CA",
    timezone: "PST",
    availability: "available",
    bio: "I'm a passionate full-stack developer with over 5 years of experience building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or hiking in the beautiful California mountains."
  }
}
