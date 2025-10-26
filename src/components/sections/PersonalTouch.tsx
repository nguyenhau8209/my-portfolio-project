'use client'

import { PersonalData } from '@/types'

interface PersonalTouchProps {
  personalData: PersonalData
}

const availabilityColors = {
  available: 'bg-green-100 text-green-800 border-green-200',
  busy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  unavailable: 'bg-red-100 text-red-800 border-red-200'
}

const availabilityLabels = {
  available: 'Available',
  busy: 'Busy',
  unavailable: 'Unavailable'
}

export function PersonalTouch({ personalData }: PersonalTouchProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold text-text-primary relative">
        Personal Touch
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location & Availability */}
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-lg border border-border">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Location
            </h4>
            <p className="text-text-secondary">{personalData.location}</p>
            <p className="text-sm text-text-secondary">Timezone: {personalData.timezone}</p>
          </div>
          
          <div className="p-4 bg-surface rounded-lg border border-border">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
              Availability
            </h4>
            <span
              className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${availabilityColors[personalData.availability]}`}
            >
              {availabilityLabels[personalData.availability]}
            </span>
          </div>
        </div>
        
        {/* Interests */}
        <div className="space-y-4">
          <div className="p-4 bg-surface rounded-lg border border-border">
            <h4 className="font-semibold text-text-primary mb-3 flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Interests & Hobbies
            </h4>
            <div className="flex flex-wrap gap-2">
              {personalData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fun Facts or Additional Info */}
      <div className="p-6 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/20">
        <h4 className="text-lg font-bold text-text-primary mb-3 text-center">
          Fun Facts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-lg">☕</span>
            </div>
            <p className="text-sm text-text-secondary">Coffee enthusiast</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-lg">🌱</span>
            </div>
            <p className="text-sm text-text-secondary">Always learning</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-lg">🎯</span>
            </div>
            <p className="text-sm text-text-secondary">Goal-oriented</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-lg">🤝</span>
            </div>
            <p className="text-sm text-text-secondary">Team player</p>
          </div>
        </div>
      </div>
    </div>
  )
}
