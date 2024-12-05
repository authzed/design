import * as React from 'react';
import { LayoutType } from '@/core/types/signature';
import { Button } from '@/shared/ui/button';
import {
  LayoutGrid,
  AlignVerticalJustifyCenter,
  AlignHorizontalJustifyCenter,
  ImageIcon,
  LayoutTemplate,
  AlignCenter,
  LayoutDashboard,
  BookOpen
} from 'lucide-react';

const LAYOUT_ICONS: Record<LayoutType, React.ReactNode> = {
  'stacked': <AlignVerticalJustifyCenter className="h-4 w-4" />,
  'horizontal': <AlignHorizontalJustifyCenter className="h-4 w-4" />,
  'logo-left': <ImageIcon className="h-4 w-4" />,
  'logo-right': <LayoutTemplate className="h-4 w-4" />,
  'centered': <AlignCenter className="h-4 w-4" />,
  'compact': <LayoutDashboard className="h-4 w-4" />,
  'modern': <LayoutGrid className="h-4 w-4" />,
  'classic': <BookOpen className="h-4 w-4" />
};

interface LayoutSelectorProps {
  value: LayoutType;
  onChange: (layout: LayoutType) => void;
}

export function LayoutSelector({ value, onChange }: LayoutSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {(Object.keys(LAYOUT_ICONS) as LayoutType[]).map((layout) => (
        <Button
          key={layout}
          variant={value === layout ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(layout)}
          className="flex items-center gap-2"
        >
          {LAYOUT_ICONS[layout]}
          <span className="capitalize">{layout.replace('-', ' ')}</span>
        </Button>
      ))}
    </div>
  );
}
