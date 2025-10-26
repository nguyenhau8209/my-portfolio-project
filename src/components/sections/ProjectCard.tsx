'use client';

import { ProjectCardProps } from '@/types/projects';
import Image from 'next/image';
import { useState } from 'react';

export const ProjectCard = ({ project, onSelect, index }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    onSelect(project);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={handleCardClick}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="bg-surface rounded-xl overflow-hidden border border-border hover-lift transition-all duration-300 group-hover:border-primary/50">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 ${project.color} opacity-90`} />
          <div className="relative h-full flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status.color}`}>
                {project.status.name}
              </span>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">
                  Featured
                </span>
              </div>
            )}

            {/* Category Icon */}
            <div className="absolute bottom-4 left-4">
              <div className={`w-10 h-10 ${project.category.color} rounded-lg flex items-center justify-center text-white text-lg shadow-lg`}>
                {project.category.icon}
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <span className="text-sm text-text-secondary">
              {project.year}
            </span>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md border border-border"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-background text-text-secondary text-xs rounded-md border border-border">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Project Meta */}
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {project.duration}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {project.teamSize} dev{project.teamSize > 1 ? 's' : ''}
              </span>
            </div>
            <span className="text-primary font-medium group-hover:text-primary-dark transition-colors duration-200">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
