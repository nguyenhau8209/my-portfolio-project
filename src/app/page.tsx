'use client';

import { AppLayout } from '@/components/layout/AppLayout'
import { AboutMeSection, ProjectsSection, ContactSection } from '@/components/sections'
import { aboutData } from '@/data/aboutData'
import { projectsDataWithCategories } from '@/data/projectsData'
import { contactInfo, socialLinks, formConfig } from '@/data/contactData'
import { useState } from 'react'
import { Project } from '@/types/projects'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(undefined);
  };

  return (
    <AppLayout>
      <div className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Hello, I'm{' '}
              <span className="text-primary">John Doe</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Full-stack developer passionate about creating digital experiences that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#about"
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
              >
                Learn More
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutMeSection {...aboutData} />

        {/* Projects Section */}
        <ProjectsSection
          projects={projectsDataWithCategories.projects}
          categories={projectsDataWithCategories.categories}
          onProjectSelect={handleProjectSelect}
          onProjectClose={handleProjectClose}
          selectedProject={selectedProject}
        />

        {/* Contact Section */}
        <ContactSection 
          contactInfo={contactInfo}
          socialLinks={socialLinks}
          formConfig={formConfig}
        />
      </div>
    </AppLayout>
  )
}
