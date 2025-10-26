'use client'

import { PersonalData } from '@/types'

interface AboutContentProps {
  personalData: PersonalData
}

export function AboutContent({ personalData }: AboutContentProps) {
  return (
    <article className="space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold text-text-primary relative">
        About
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
      </h3>
      
      <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
        <p className="text-lg leading-relaxed mb-4">
          {personalData.bio}
        </p>
        
        <p className="text-base leading-relaxed">
          I'm passionate about creating digital experiences that make a real difference. 
          With a strong foundation in both frontend and backend technologies, I enjoy 
          tackling complex problems and turning ideas into reality.
        </p>
      </div>
      
      {/* Key Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-text-primary font-medium">5+ Years Experience</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-text-primary font-medium">Full-Stack Developer</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-text-primary font-medium">Modern Technologies</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-text-primary font-medium">Problem Solver</span>
        </div>
      </div>
    </article>
  )
}
