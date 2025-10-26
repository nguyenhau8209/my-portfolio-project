'use client'

import { SkillsData } from '@/types'

interface SkillsDisplayProps {
  skillsData: SkillsData
}

const skillLevelColors = {
  beginner: 'bg-red-100 text-red-800 border-red-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-blue-100 text-blue-800 border-blue-200',
  expert: 'bg-green-100 text-green-800 border-green-200'
}

const skillLevelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate', 
  advanced: 'Advanced',
  expert: 'Expert'
}

export function SkillsDisplay({ skillsData }: SkillsDisplayProps) {
  return (
    <section className="space-y-8" aria-labelledby="skills-heading">
      <h3 id="skills-heading" className="text-2xl md:text-3xl font-bold text-text-primary text-center relative">
        Skills & Technologies
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skillsData.categories).map(([category, skills], categoryIndex) => (
          <div
            key={category}
            className="bg-surface rounded-lg p-6 border border-border hover-lift skill-category"
          >
            <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              {category}
            </h4>
            
            <div className="space-y-3">
              {skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    {skill.icon && (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <span className="text-lg">{skill.icon}</span>
                      </div>
                    )}
                    <span className="font-medium text-text-primary">{skill.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${skillLevelColors[skill.level]}`}
                    >
                      {skillLevelLabels[skill.level]}
                    </span>
                    {skill.yearsExperience && (
                      <span className="text-xs text-text-secondary">
                        {skill.yearsExperience}y
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Skills Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
        <h4 className="text-lg font-bold text-text-primary mb-4 text-center">
          What I Bring to the Table
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🚀</span>
            </div>
            <h5 className="font-semibold text-text-primary">Fast Development</h5>
            <p className="text-sm text-text-secondary">Rapid prototyping and efficient delivery</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🔧</span>
            </div>
            <h5 className="font-semibold text-text-primary">Problem Solving</h5>
            <p className="text-sm text-text-secondary">Creative solutions to complex challenges</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">📱</span>
            </div>
            <h5 className="font-semibold text-text-primary">Responsive Design</h5>
            <p className="text-sm text-text-secondary">Beautiful experiences on all devices</p>
          </div>
        </div>
      </div>
    </section>
  )
}
