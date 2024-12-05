import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from './SortSelect';

interface MobileFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortOptions: SortOption[];
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function MobileFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  sortOptions,
  sortBy,
  onSortChange,
}: MobileFiltersProps) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                   rounded-lg text-sm text-gray-900 dark:text-gray-100 appearance-none"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                   rounded-lg text-sm text-gray-900 dark:text-gray-100 appearance-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}