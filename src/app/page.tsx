import { AppLayout } from '@/components/layout/AppLayout'
import { AboutMeSection } from '@/components/sections'
import { aboutData } from '@/data/aboutData'

export default function Home() {
  return (
    <AppLayout currentSection="home">
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
        <section id="projects" className="py-24 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
              My Projects
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed text-center">
              This is a placeholder for the Projects section. The layout components are working correctly!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
              Get In Touch
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed text-center">
              This is a placeholder for the Contact section. The layout components are working correctly!
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
