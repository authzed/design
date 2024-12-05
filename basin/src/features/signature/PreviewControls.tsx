import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/hooks/use-toast';
import { Copy, Sun, Moon, Smartphone } from 'lucide-react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/toggle-group';

interface PreviewControlsProps {
  html: string;
  previewMode: 'light' | 'dark' | 'mobile';
  onPreviewModeChange: (mode: 'light' | 'dark' | 'mobile') => void;
}

export function PreviewControls({ html, previewMode, onPreviewModeChange }: PreviewControlsProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html);
      toast({
        title: 'Copied!',
        description: 'Signature HTML copied to clipboard',
        duration: 2000,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to copy signature',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <ToggleGroup
        type="single"
        value={previewMode}
        onValueChange={(value: 'light' | 'dark' | 'mobile') => value && onPreviewModeChange(value)}
      >
        <ToggleGroupItem value="light" aria-label="Light mode">
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark mode">
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="mobile" aria-label="Mobile preview">
          <Smartphone className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="flex items-center gap-2"
      >
        <Copy className="h-4 w-4" />
        Copy HTML
      </Button>
    </div>
  );
}
