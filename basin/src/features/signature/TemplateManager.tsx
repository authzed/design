import type { SignatureTemplate, SignatureConfig } from '@/core/types/signature';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { saveTemplate, getTemplates, deleteTemplate } from '@/utils/template-storage';
import { Save, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TemplateManagerProps {
  currentConfig: SignatureConfig;
  onLoadTemplate: (template: SignatureTemplate) => void;
}

type TemplateCategory = 'modern' | 'classic' | 'minimal' | 'creative';

interface NewTemplateState {
  name: string;
  description: string;
  category: TemplateCategory;
}

export function TemplateManager({ currentConfig, onLoadTemplate }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<SignatureTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTemplate, setNewTemplate] = useState<NewTemplateState>({
    name: '',
    description: '',
    category: 'modern',
  });
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await getTemplates();
        setTemplates(loadedTemplates);
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const handleSaveTemplate = async () => {
    setIsLoading(true);
    try {
      await saveTemplate({
        name: newTemplate.name,
        description: newTemplate.description,
        category: newTemplate.category,
        typography: currentConfig.typography,
        layout: currentConfig.layout,
        divider: currentConfig.divider,
      });
      const updatedTemplates = await getTemplates();
      setTemplates(updatedTemplates);
      setSaveDialogOpen(false);
      setNewTemplate({ name: '', description: '', category: 'modern' });
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteTemplate(id);
      const updatedTemplates = await getTemplates();
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error('Error deleting template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Design Template</DialogTitle>
            <DialogDescription>
              Save your current design settings as a template for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={newTemplate.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTemplate((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="My Signature Template"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTemplate.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewTemplate((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your template..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newTemplate.category}
                onValueChange={(value: TemplateCategory) =>
                  setNewTemplate((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveTemplate}
              disabled={!newTemplate.name.trim() || isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Select
        onValueChange={(id) => {
          const template = templates.find((t) => t.id === id);
          if (template) onLoadTemplate(template);
        }}
        disabled={isLoading || templates.length === 0}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={isLoading ? "Loading..." : templates.length === 0 ? "No templates" : "Load Template"} />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem
              key={template.id}
              value={template.id}
              className="flex justify-between group"
            >
              <div className="flex-1">
                <span className="font-medium">{template.name}</span>
                {template.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {template.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDeleteTemplate(template.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
