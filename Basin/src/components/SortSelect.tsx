import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = {
  label: string;
  value: string;
};

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
}

export function SortSelect({ value, onChange, options }: SortSelectProps) {
  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-[130px] appearance-none bg-background text-foreground border border-input
                 rounded-md py-2 pl-3 pr-8 text-sm
                 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ArrowUpDown className="w-4 h-4 text-muted-foreground absolute right-3 pointer-events-none" />
    </div>
  );
}