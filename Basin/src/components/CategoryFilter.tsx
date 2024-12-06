import React from 'react';
import { Hash } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <>
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${
          selectedCategory === 'all'
            ? 'bg-accent text-accent-foreground'
            : 'hover:bg-muted/50 text-muted-foreground'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${
            selectedCategory === category
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-muted/50 text-muted-foreground'
          }`}
        >
          {category}
        </button>
      ))}
    </>
  );
}