import { SignatureTemplate } from '@/core/types/signature';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Check } from 'lucide-react';

interface TemplateGridProps {
  templates: SignatureTemplate[];
  selectedTemplate?: string;
  onSelect: (template: SignatureTemplate) => void;
  filter?: 'modern' | 'classic' | 'minimal' | 'creative';
}

export function TemplateGrid({ templates, selectedTemplate, onSelect, filter }: TemplateGridProps) {
  const filteredTemplates = filter 
    ? templates.filter(t => t.category === filter)
    : templates;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {filteredTemplates.map((template) => (
        <Card
          key={template.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onSelect(template)}
        >
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {template.category}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {template.layout.type.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
