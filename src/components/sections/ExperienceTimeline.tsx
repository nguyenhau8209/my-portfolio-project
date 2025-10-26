'use client'

import { useState, useRef, useEffect } from 'react'
import { ExperienceData } from '@/types'

interface ExperienceTimelineProps {
  experienceData: ExperienceData[]
}

export function ExperienceTimeline({ experienceData }: ExperienceTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for timeline visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Calculate duration in months/years
  const calculateDuration = (start: string, end?: string, current?: boolean) => {
    const startDate = new Date(start)
    const endDate = current ? new Date() : (end ? new Date(end) : new Date())
    
    const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (endDate.getMonth() - startDate.getMonth())
    
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''}`
    } else {
      const years = Math.floor(diffInMonths / 12)
      const months = diffInMonths % 12
      if (months === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`
      }
      return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`
    }
  }

  return (
    <section className="space-y-8" aria-labelledby="experience-heading" ref={timelineRef}>
      <h3 id="experience-heading" className="text-2xl md:text-3xl font-bold text-text-primary text-center relative">
        Professional Experience
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
      </h3>
      
      <div className="relative">
        {/* Enhanced Timeline line with gradient */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/30 hidden md:block"></div>
        
        <div className="space-y-8">
          {experienceData.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative flex items-start space-x-6 md:space-x-8 timeline-item ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Enhanced Timeline dot with hover effects */}
              <div className="relative flex-shrink-0">
                <div className={`timeline-dot w-16 h-16 bg-primary rounded-full items-center justify-center text-white font-bold text-sm hidden md:flex transition-all duration-300 ${
                  activeIndex === index ? 'scale-110 shadow-lg shadow-primary/50' : 'scale-100'
                } ${experience.duration.current ? 'timeline-current-dot' : ''}`}>
                  {index + 1}
                </div>
                {/* Pulse effect for current position */}
                {experience.duration.current && (
                  <div className="absolute inset-0 w-16 h-16 bg-primary/30 rounded-full animate-pulse hidden md:block"></div>
                )}
              </div>
              
              {/* Enhanced Timeline content */}
              <div className={`timeline-content flex-1 bg-surface rounded-lg p-6 border border-border hover-lift transition-all duration-300 ${
                activeIndex === index ? 'border-primary/50 shadow-lg shadow-primary/10' : ''
              }`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                      {experience.role}
                    </h4>
                    <p className="text-lg text-primary font-medium mb-2">
                      {experience.company}
                    </p>
                    {/* Duration badge */}
                    <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {calculateDuration(experience.duration.start, experience.duration.end, experience.duration.current)}
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary mt-2 md:mt-0 md:text-right">
                    <time dateTime={experience.duration.start} className="block">
                      {new Date(experience.duration.start).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </time>
                    <span className="text-primary font-medium">
                      {experience.duration.current ? 'Present' : 
                       new Date(experience.duration.end!).toLocaleDateString('en-US', { 
                         year: 'numeric', 
                         month: 'short' 
                       })}
                    </span>
                  </div>
                </div>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {experience.description}
                </p>
                
                {/* Enhanced Achievements with icons */}
                {experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Enhanced Technologies with better styling */}
                {experience.technologies.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Technologies & Tools
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="tech-tag px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors cursor-default"
                          title={`Used ${tech} in this role`}
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
