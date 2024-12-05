import { SignatureTemplate, LayoutType, WebsafeFont } from '@/types/signature';

interface TemplateBase {
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative';
  preview?: string;
}

const createTemplate = (
  id: string,
  base: TemplateBase,
  layout: LayoutType,
  font: WebsafeFont = 'Arial'
): SignatureTemplate => ({
  id,
  ...base,
  typography: {
    fontFamily: font,
    fontSize: {
      name: 16,
      title: 14,
      contact: 12,
      cta: 12,
    },
    color: '#000000',
    fontWeight: 'normal',
    lineHeight: 1.5,
  },
  divider: {
    style: 'solid',
    color: '#cccccc',
    thickness: 1,
    orientation: 'horizontal',
  },
  layout: {
    type: layout,
    spacing: {
      between: 8,
      padding: 20,
    },
    alignment: 'left',
    maxWidth: 600,
  },
});

export const defaultTemplates: SignatureTemplate[] = [
  createTemplate('modern-stacked', {
    name: 'Modern Stacked',
    description: 'Clean, vertical layout with modern typography',
    category: 'modern',
  }, 'stacked', 'Helvetica'),

  createTemplate('classic-horizontal', {
    name: 'Classic Horizontal',
    description: 'Traditional side-by-side layout',
    category: 'classic',
  }, 'horizontal', 'Times New Roman'),

  createTemplate('minimal-logo-left', {
    name: 'Minimal Logo Left',
    description: 'Logo on the left with clean typography',
    category: 'minimal',
  }, 'logo-left', 'Arial'),

  createTemplate('creative-centered', {
    name: 'Creative Centered',
    description: 'Centered layout with artistic spacing',
    category: 'creative',
  }, 'centered', 'Georgia'),

  createTemplate('modern-compact', {
    name: 'Modern Compact',
    description: 'Space-efficient design with modern feel',
    category: 'modern',
  }, 'compact', 'Helvetica'),

  createTemplate('classic-logo-right', {
    name: 'Classic Logo Right',
    description: 'Traditional layout with right-aligned logo',
    category: 'classic',
  }, 'logo-right', 'Times New Roman'),

  createTemplate('minimal-centered', {
    name: 'Minimal Centered',
    description: 'Clean, centered layout with minimal elements',
    category: 'minimal',
  }, 'centered', 'Arial'),

  createTemplate('modern-classic', {
    name: 'Modern Classic',
    description: 'Traditional layout with modern typography',
    category: 'modern',
  }, 'classic', 'Georgia'),
];

// Template-specific layout generators
export const generateLayoutHtml = (
  elements: string[],
  layout: LayoutType,
  spacing: { between: number; padding: number },
  alignment: 'left' | 'center' | 'right',
  maxWidth?: number
): string => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment];

  switch (layout) {
    case 'stacked':
      return `
        <div style="max-width: ${maxWidth}px; padding: ${spacing.padding}px;" class="${alignmentClass}">
          ${elements.join(`<div style="margin-top: ${spacing.between}px;"></div>`)}
        </div>
      `;

    case 'horizontal':
      return `
        <div style="max-width: ${maxWidth}px; padding: ${spacing.padding}px; display: flex; align-items: center; gap: ${spacing.between}px;" class="${alignmentClass}">
          ${elements.join('')}
        </div>
      `;

    case 'logo-left':
      const [logo, ...rest] = elements;
      return `
        <div style="max-width: ${maxWidth}px; padding: ${spacing.padding}px; display: flex; gap: ${spacing.between * 2}px;" class="${alignmentClass}">
          <div>${logo}</div>
          <div>${rest.join(`<div style="margin-top: ${spacing.between}px;"></div>`)}</div>
        </div>
      `;

    // Add other layout types...

    default:
      return `
        <div style="max-width: ${maxWidth}px; padding: ${spacing.padding}px;" class="${alignmentClass}">
          ${elements.join(`<div style="margin-top: ${spacing.between}px;"></div>`)}
        </div>
      `;
  }
};