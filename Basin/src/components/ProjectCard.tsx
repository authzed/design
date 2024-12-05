import React from 'react';
import { ArrowRight, Github, ExternalLink, X } from 'lucide-react';
import type { Project } from '../types';
import { useProjectCard } from '../hooks/useProjectCard';
import { cn } from '../utils/cn';

type ProjectCardProps = Project;

export function ProjectCard(props: ProjectCardProps) {
  const {
    isExpanded,
    containerRef,
    contentRef,
    toggleExpanded,
    animationClass,
  } = useProjectCard();

  const { 
  icon: Icon, 
  title, 
  description, 
  technology, 
  color,
  demoUrl,
  sourceUrl,
  category,
  createdAt,
  tags
  } = props;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "group relative bg-card rounded-lg border border-border transition-all duration-300",
        isExpanded ? "col-span-full z-10 expanded" : "hover:shadow-lg cursor-pointer",
        animationClass
      )}
      onClick={!isExpanded ? toggleExpanded : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          !isExpanded && toggleExpanded();
        }
        if (e.key === 'Escape' && isExpanded) {
          toggleExpanded();
        }
      }}
      aria-expanded={isExpanded}
    >
      {!isExpanded ? (
        // Collapsed View
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{technology}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">{category}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ) : (
        // Expanded View
        <div 
          ref={contentRef}
          className="opacity-0 transition-opacity duration-200"
        >
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <Icon className={`w-8 h-8 ${color}`} />
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
                <p className="text-muted-foreground">{technology}</p>
              </div>
            </div>
            <button
              onClick={toggleExpanded}
              className="p-2 hover:bg-muted/50 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-2 space-y-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={props.previewUrl}
                  alt={`${title} preview`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-foreground">About this project</h3>
                <p className="text-muted-foreground">{description}</p>
                
                <h3 className="text-lg font-semibold text-foreground mt-6">Development Process</h3>
                <ul className="list-disc pl-4 text-muted-foreground">
                  <li>Initial planning and architecture design</li>
                  <li>Core functionality implementation</li>
                  <li>UI/UX refinement and testing</li>
                  <li>Performance optimization</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6">Key Challenges</h3>
                <ul className="list-disc pl-4 text-muted-foreground">
                  <li>Optimizing performance for large datasets</li>
                  <li>Implementing real-time updates</li>
                  <li>Ensuring cross-browser compatibility</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Project Links</h3>
                <div className="space-y-2">
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2 hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Demo</span>
                  </a>
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2 hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Source</span>
                  </a>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Project Details</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p>Category: {category}</p>
                  <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
                  <p>Technology: {technology}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}