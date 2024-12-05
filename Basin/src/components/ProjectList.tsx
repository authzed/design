import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.title}
          className="flex items-start space-x-4 p-4 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex-shrink-0">
            <project.icon className={`w-8 h-8 ${project.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <div className="flex items-center space-x-2">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="mt-1 text-sm text-foreground/80">
              {project.description}
            </p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {project.technology}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}