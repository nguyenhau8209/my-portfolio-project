'use client';

import { ProjectsSectionProps } from '@/types/projects';
import { useState, useMemo } from 'react';
import { ProjectsFilter } from './ProjectsFilter';
import { ProjectsGrid } from './ProjectsGrid';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection = ({
  projects,
  categories,
  onProjectSelect,
  onProjectClose,
  selectedProject
}: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(false);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category.id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Sort projects
    switch (sortBy) {
      case 'featured':
        filtered = filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.order - a.order;
        });
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => b.year - a.year || b.order - a.order);
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => a.year - b.year || a.order - b.order);
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered = filtered.sort((a, b) => a.category.name.localeCompare(b.category.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [projects, selectedCategory, searchQuery, sortBy]);

  const handleProjectSelect = (project: any) => {
    onProjectSelect(project);
  };

  const handleProjectClose = () => {
    onProjectClose();
  };

  const handleCategoryChange = (categoryId: string) => {
    setLoading(true);
    setSelectedCategory(categoryId);
    // Simulate loading delay for better UX
    setTimeout(() => setLoading(false), 300);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  return (
    <section id="projects" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            My Projects
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
            A collection of projects that showcase my skills in full-stack development, 
            from concept to deployment. Each project represents a unique challenge and 
            learning opportunity.
          </p>
        </div>

        {/* Filter Controls */}
        <ProjectsFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        {/* Projects Grid */}
        <ProjectsGrid
          projects={filteredAndSortedProjects}
          onProjectSelect={handleProjectSelect}
          loading={loading}
        />

        {/* Results Summary */}
        {!loading && (
          <div className="mt-12 text-center">
            <p className="text-text-secondary">
              Showing {filteredAndSortedProjects.length} of {projects.length} projects
              {selectedCategory !== 'all' && (
                <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
              )}
              {searchQuery && (
                <span> matching "{searchQuery}"</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleProjectClose}
        />
      )}
    </section>
  );
};
