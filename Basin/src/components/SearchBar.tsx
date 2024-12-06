import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[200px] pl-9 pr-3 py-2 bg-background text-foreground
                 placeholder-muted-foreground rounded-lg border border-input text-sm
                 focus:outline-none focus:ring-1 focus:ring-ring"
        placeholder="Search projects..."
      />
    </div>
  );
}