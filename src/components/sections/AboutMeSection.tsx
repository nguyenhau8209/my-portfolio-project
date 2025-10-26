'use client'

import { AboutMeSectionProps } from '@/types'
import { HeroSection } from './HeroSection'
import { AboutContent } from './AboutContent'
import { ExperienceTimeline } from './ExperienceTimeline'
import { SkillsDisplay } from './SkillsDisplay'
import { PersonalTouch } from './PersonalTouch'

export function AboutMeSection({
  profileData,
  experienceData,
  skillsData,
  personalData
}: AboutMeSectionProps) {
  return (
    <section id="about" className="py-24 bg-background" aria-labelledby="about-heading">
      <h2 id="about-heading" className="visually-hidden">About Me</h2>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Hero Section */}
          <div className="order-1 lg:order-1">
            <HeroSection profileData={profileData} />
          </div>
          
          {/* Content Section */}
          <div className="order-2 lg:order-2 space-y-12">
            <AboutContent personalData={personalData} />
            <PersonalTouch personalData={personalData} />
          </div>
        </div>
        
        {/* Experience Timeline */}
        <div className="mt-16">
          <ExperienceTimeline experienceData={experienceData} />
        </div>
        
        {/* Skills Display */}
        <div className="mt-16">
          <SkillsDisplay skillsData={skillsData} />
        </div>
      </div>
    </section>
  )
}
