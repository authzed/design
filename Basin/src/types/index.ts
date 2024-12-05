import { LucideIcon } from 'lucide-react';

export interface Project {
  icon: LucideIcon;
  title: string;
  technology: string;
  description: string;
  color: string;
  demoUrl: string;
  previewUrl: string;
  sourceUrl: string;
  category: string;
  tags: string[];
  createdAt: string; // ISO date string
}