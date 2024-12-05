'use client';

import { Header } from '../components/Header'
import { ProjectGrid } from '../components/ProjectGrid'
import { ThemeToggle } from '../components/ThemeToggle'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <Header
          title="Welcome to the Basin"
          description={
            <>
              A collection of tools born from our own design challenges, now shared to empower others. 
              Like a hidden desert basin, these resources have been uncovered, refined, and made accessible 
              to support thoughtful, scalable, and consistent design.
              <br /><br />
              Basin is our way of giving back—helping teams everywhere innovate and create with ease.
              <br /><br />
              Explore Basin and discover tools to support your journey.
            </>
          }
          footnote={
            <span className="text-sm text-muted-foreground mt-2 block">
              Built by design at{' '}
              <a 
                href="https://authzed.com" 
                className="text-primary font-semibold hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                authzed
              </a>
              , using{' '}
              <a 
                href="https://bolt.new/~/sb1-q1yuzm"
                className="text-primary font-semibold hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                bolt.new
              </a>
              .
            </span>
          }
        />

        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}
