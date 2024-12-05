import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';
import { Slider } from '@/shared/ui/slider';
import { LayoutSelector } from './LayoutSelector';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { TypographySettings, DividerSettings, LayoutSettings, WebsafeFont } from '@/core/types/signature';

interface DesignCustomizerProps {
  typography: TypographySettings;
  divider: DividerSettings;
  layout: LayoutSettings;
  onUpdate: (settings: {
    typography: TypographySettings;
    divider: DividerSettings;
    layout: LayoutSettings;
  }) => void;
}

interface FormValues {
  typography: TypographySettings;
  divider: DividerSettings;
  layout: LayoutSettings;
}

export function DesignCustomizer({
  typography,
  divider,
  layout,
  onUpdate,
}: DesignCustomizerProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      typography,
      divider,
      layout,
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onUpdate(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  const websafeFonts: WebsafeFont[] = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Times',
    'Courier New',
    'Courier',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Tahoma',
    'Trebuchet MS',
  ];

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Layout</h3>
          <FormField
            control={form.control}
            name="layout.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layout Type</FormLabel>
                <LayoutSelector value={field.value} onChange={field.onChange} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="layout.alignment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alignment</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="layout.spacing.between"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spacing Between Elements ({field.value}px)</FormLabel>
                <FormControl>
                  <Slider
                    min={4}
                    max={32}
                    step={2}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <h3 className="text-lg font-medium mt-6">Typography</h3>
          <FormField
            control={form.control}
            name="typography.fontFamily"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font Family</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {websafeFonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typography.color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    {...field}
                    className="h-10 w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typography.fontWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font Weight</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <h3 className="text-lg font-medium mt-6">Divider</h3>
          <FormField
            control={form.control}
            name="divider.style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Divider Style</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="divider.color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Divider Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    {...field}
                    className="h-10 w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="divider.thickness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Divider Thickness ({field.value}px)</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
