import type { Tool } from '../types';

export const tools: Tool[] = [
  {
    title: 'Email Signature',
    description: 'Generate on-brand email signatures for Gmail and Outlook with live preview, drag-and-drop ordering, and one-click copy.',
    path: '/email-signature',
    tag: 'Brand',
  },
  {
    title: 'OG Image Generator',
    description: 'Create OpenGraph preview images for blog posts with voronoi backgrounds, theme presets, and PNG export.',
    path: '/og-generator',
    tag: 'Content',
  },
  {
    title: 'Voronoi Explorer',
    description: 'Interactive Voronoi diagram generator with chromatic aberration, layered rendering, and preset management.',
    path: '/voronoi',
    tag: 'Generative',
  },
];
