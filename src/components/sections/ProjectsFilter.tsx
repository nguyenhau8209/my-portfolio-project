'use client';

import { ProjectsFilterProps } from '@/types/projects';
import { useState } from 'react';

export const ProjectsFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange
}: ProjectsFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'category', label: 'By Category' }
  ];

  return (
    <div className="mb-12">
      {/* Enhanced Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className={`h-5 w-5 transition-colors duration-200 ${
              isSearchFocused ? 'text-primary' : 'text-text-secondary'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`block w-full pl-10 pr-10 py-3 border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
              isSearchFocused ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Enhanced Category Filter */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-surface text-text-secondary border border-border hover:border-primary hover:text-primary hover:shadow-md'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                All Projects
              </span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface text-text-secondary border border-border hover:border-primary hover:text-primary hover:shadow-md'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Sort Dropdown */}
        <div className="flex items-center space-x-4">
          <label htmlFor="sort-select" className="text-sm font-medium text-text-secondary flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary hover:shadow-md"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary font-medium flex items-center justify-between hover:border-primary transition-colors duration-200"
        >
          <span>Filter & Sort</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isFilterOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-surface border border-border rounded-lg space-y-4">
            {/* Mobile Category Filter */}
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Categories</h4>
              <div className="space-y-2">
                <button
                  onClick={() => onCategoryChange('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-background text-text-secondary hover:bg-surface'
                  }`}
                >
                  All Projects
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-secondary hover:bg-surface'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sort */}
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Sort by</h4>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
