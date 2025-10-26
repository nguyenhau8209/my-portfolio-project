'use client'

import Image from 'next/image'
import { ProfileData } from '@/types'

interface HeroSectionProps {
  profileData: ProfileData
}

export function HeroSection({ profileData }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Profile Image */}
      <div className="relative profile-image-container">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <Image
            src={profileData.profileImage.src}
            alt={profileData.profileImage.alt}
            width={profileData.profileImage.width}
            height={profileData.profileImage.height}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Decorative ring */}
        <div className="absolute -inset-2 rounded-full border-2 border-primary/20 profile-image-ring"></div>
      </div>
      
      {/* Name and Title */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
          {profileData.name}
        </h1>
        <h2 className="text-xl md:text-2xl text-primary font-medium">
          {profileData.title}
        </h2>
      </div>
      
      {/* Headline */}
      <p className="text-lg md:text-xl text-text-secondary max-w-md leading-relaxed">
        {profileData.headline}
      </p>
      
      {/* Value Proposition */}
      <p className="text-base md:text-lg text-text-secondary max-w-lg leading-relaxed">
        {profileData.valueProposition}
      </p>
      
      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <a
          href="#contact"
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Let's Work Together
        </a>
        <a
          href="#projects"
          className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105"
        >
          View My Work
        </a>
      </div>
    </div>
  )
}
