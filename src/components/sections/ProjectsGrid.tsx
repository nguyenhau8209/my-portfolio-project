'use client';

import { ProjectsGridProps } from '@/types/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectsGrid = ({ projects, onProjectSelect, loading = false }: ProjectsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-14" />
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No projects found</h3>
        <p className="text-text-secondary">
          Try adjusting your search criteria or filters to find more projects.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={onProjectSelect}
          index={index}
        />
      ))}
    </div>
  );
};
