'use client'

import { SkillsData, SkillItem } from '@/types'
import { useState, useMemo } from 'react'

interface SkillsDisplayProps {
  skillsData: SkillsData
}

const skillLevelColors = {
  beginner: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  advanced: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
  expert: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
}

const skillLevelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate', 
  advanced: 'Advanced',
  expert: 'Expert'
}

const skillLevelProgress = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100
}

export function SkillsDisplay({ skillsData }: SkillsDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get all categories for filter
  const categories = Object.keys(skillsData.categories)
  
  // Filter skills based on search term, level, and category
  const filteredSkills = useMemo(() => {
    let filtered = { ...skillsData.categories }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = { [selectedCategory]: filtered[selectedCategory] || [] }
    }
    
    // Filter by search term and level
    Object.keys(filtered).forEach(category => {
      filtered[category] = filtered[category].filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel
        return matchesSearch && matchesLevel
      })
    })
    
    // Remove empty categories
    Object.keys(filtered).forEach(category => {
      if (filtered[category].length === 0) {
        delete filtered[category]
      }
    })
    
    return filtered
  }, [skillsData.categories, searchTerm, selectedLevel, selectedCategory])

  // Get skill statistics
  const totalSkills = Object.values(skillsData.categories).flat().length
  const expertSkills = Object.values(skillsData.categories).flat().filter(skill => skill.level === 'expert').length
  const averageExperience = Math.round(
    Object.values(skillsData.categories).flat().reduce((sum, skill) => sum + (skill.yearsExperience || 0), 0) / totalSkills
  )

  return (
    <section className="space-y-8" aria-labelledby="skills-heading">
      <div className="text-center space-y-4">
        <h3 id="skills-heading" className="text-2xl md:text-3xl font-bold text-text-primary relative">
          Skills & Technologies
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
        </h3>
        
        {/* Skills Statistics */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>{totalSkills} Total Skills</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            <span>{expertSkills} Expert Level</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>{averageExperience}+ Years Avg</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Level Filter */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        >
          <option value="all">All Levels</option>
          <option value="expert">Expert</option>
          <option value="advanced">Advanced</option>
          <option value="intermediate">Intermediate</option>
          <option value="beginner">Beginner</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(filteredSkills).length > 0 ? (
          Object.entries(filteredSkills).map(([category, skills], categoryIndex) => (
            <div
              key={category}
              className="bg-surface rounded-lg p-6 border border-border hover-lift skill-category"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                {category}
                <span className="ml-auto text-sm text-text-secondary bg-background px-2 py-1 rounded-full">
                  {skills.length}
                </span>
              </h4>
              
              <div className="space-y-3">
                {skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
                    style={{ animationDelay: `${skillIndex * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {skill.icon && (
                          <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
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
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skillLevelProgress[skill.level]}%`,
                          animationDelay: `${skillIndex * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">No skills found</h4>
            <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Skills Summary & Highlights */}
      <div className="mt-8 space-y-6">
        {/* What I Bring to the Table */}
        <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
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

        {/* Skill Level Distribution */}
        <div className="p-6 bg-surface rounded-lg border border-border">
          <h4 className="text-lg font-bold text-text-primary mb-4 text-center">
            Skill Level Distribution
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(skillLevelLabels).map(([level, label]) => {
              const count = Object.values(skillsData.categories).flat().filter(skill => skill.level === level).length
              const percentage = totalSkills > 0 ? Math.round((count / totalSkills) * 100) : 0
              
              return (
                <div key={level} className="text-center space-y-2">
                  <div className="relative w-16 h-16 mx-auto">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200 dark:text-gray-700"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${skillLevelColors[level as keyof typeof skillLevelColors].split(' ')[0]}`}
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-text-primary">{percentage}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">{label}</p>
                    <p className="text-xs text-text-secondary">{count} skills</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || selectedLevel !== 'all' || selectedCategory !== 'all') && (
          <div className="text-center">
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedLevel('all')
                setSelectedCategory('all')
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
