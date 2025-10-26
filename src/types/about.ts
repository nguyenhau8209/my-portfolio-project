export interface ProfileData {
  name: string
  title: string
  headline: string
  valueProposition: string
  profileImage: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export interface ExperienceData {
  id: string
  company: string
  role: string
  duration: {
    start: string
    end?: string
    current?: boolean
  }
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
}

export interface SkillItem {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsExperience?: number
  icon?: string
}

export interface SkillsData {
  categories: {
    [category: string]: SkillItem[]
  }
}

export interface PersonalData {
  interests: string[]
  location: string
  timezone: string
  availability: 'available' | 'busy' | 'unavailable'
  bio: string
}

export interface AboutMeSectionProps {
  profileData: ProfileData
  experienceData: ExperienceData[]
  skillsData: SkillsData
  personalData: PersonalData
}
