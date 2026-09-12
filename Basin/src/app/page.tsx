'use client';

import { ThemeToggle } from '../components/ThemeToggle';
import { tools } from '../data/projects';
import type { Tool } from '../types';

function ToolCard({ title, description, path, tag }: Tool) {
  return (
    <a
      href={path}
      className="group block bg-card rounded-lg border border-border p-6 transition-all duration-200 hover:shadow-lg hover:border-primary/20"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {tag}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Basin
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Internal tools built by design at{' '}
            <a
              href="https://authzed.com"
              className="text-primary font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              AuthZed
            </a>.
          </p>
        </div>

        <div className="grid gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
