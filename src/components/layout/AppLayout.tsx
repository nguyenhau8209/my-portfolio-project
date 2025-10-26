import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface AppLayoutProps {
  children: React.ReactNode
  currentSection?: string
}

export function AppLayout({ children, currentSection }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentSection={currentSection} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
