'use client'

import { ExperienceData } from '@/types'

interface ExperienceTimelineProps {
  experienceData: ExperienceData[]
}

export function ExperienceTimeline({ experienceData }: ExperienceTimelineProps) {
  return (
    <section className="space-y-8" aria-labelledby="experience-heading">
      <h3 id="experience-heading" className="text-2xl md:text-3xl font-bold text-text-primary text-center relative">
        Experience
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
        
        <div className="space-y-8">
          {experienceData.map((experience, index) => (
            <div
              key={experience.id}
              className="relative flex items-start space-x-6 md:space-x-8 timeline-item"
            >
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full items-center justify-center text-white font-bold text-sm hidden md:flex">
                {index + 1}
              </div>
              
              {/* Timeline content */}
              <div className="flex-1 bg-surface rounded-lg p-6 border border-border hover-lift">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-text-primary mb-1">
                      {experience.role}
                    </h4>
                    <p className="text-lg text-primary font-medium">
                      {experience.company}
                    </p>
                  </div>
                  <div className="text-sm text-text-secondary mt-2 md:mt-0">
                    <time dateTime={experience.duration.start}>
                      {experience.duration.start} - {experience.duration.current ? 'Present' : experience.duration.end}
                    </time>
                  </div>
                </div>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {experience.description}
                </p>
                
                {/* Achievements */}
                {experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-text-primary mb-2">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Technologies */}
                {experience.technologies.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
