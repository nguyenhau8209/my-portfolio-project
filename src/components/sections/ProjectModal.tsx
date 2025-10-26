'use client';

import { ProjectModalProps } from '@/types/projects';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = project.images || [project.image];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      setImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 animate-modal-enter">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${project.category.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {project.category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{project.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.duration}</span>
                  <span>•</span>
                  <span>{project.teamSize} developer{project.teamSize > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Image Gallery */}
            <div className="relative h-64 md:h-80 bg-gray-100">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <Image
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setImageLoaded(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status.color}`}>
                  {project.status.name}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">About This Project</h3>
                <p className="text-text-secondary leading-relaxed">{project.description}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-background text-text-secondary text-sm rounded-lg border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Challenges & Solutions</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-text-secondary text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Achievements</h3>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-text-secondary text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-background">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">Role: {project.role}</span>
                <span className="text-sm text-text-secondary">•</span>
                <span className="text-sm text-text-secondary">{project.month} {project.year}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Live Demo</span>
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-border text-text-primary rounded-lg font-medium hover:border-primary hover:text-primary transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {project.links.caseStudy && (
                  <a
                    href={project.links.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-border text-text-primary rounded-lg font-medium hover:border-primary hover:text-primary transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Case Study</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
