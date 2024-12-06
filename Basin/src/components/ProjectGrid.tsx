import React from 'react';
import { Hash } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { SortSelect, type SortOption } from './SortSelect';
import type { Project } from '../types';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MobileFilters } from './MobileFilters';

const sortOptions: SortOption[] = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Newest First', value: 'date-desc' },
  { label: 'Oldest First', value: 'date-asc' },
  { label: 'Category', value: 'category' },
];

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('name-asc');
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const categories = React.useMemo(() => {
    return Array.from(new Set(projects.map(p => p.category)));
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                          project.description.toLowerCase().includes(search.toLowerCase()) ||
                          project.technology.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, search, selectedCategory])
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'category':
          return a.category.localeCompare(b.category);
        default: // name-asc
          return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="space-y-6">
      <div className="sm:hidden mb-6">
        <MobileFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortOptions={sortOptions}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="hidden sm:flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-6">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <SortSelect
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)] [&>*.expanded]:row-span-[4]">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}