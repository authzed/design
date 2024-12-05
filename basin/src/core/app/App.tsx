import { useState, useCallback } from 'react';
import { PersonalInfoForm } from '@/features/signature/PersonalInfoForm';
import { DesignCustomizer } from '@/features/signature/DesignCustomizer';
import { SignaturePreview } from '@/features/signature/SignaturePreview';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { TemplateManager } from '@/features/signature/TemplateManager';
import { generateSignatureHtml, downloadSignature } from '@/utils/signature-generator';
import type { SignatureConfig, SignatureTemplate, WebsafeFont, LayoutType, TypographySettings, DividerSettings, LayoutSettings } from '@/core/types/signature';
import { Mail } from 'lucide-react';
import { Toaster } from '@/shared/ui/toaster';
import './App.css';

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    jobTitle: '',
    phoneNumber: '',
    companyWebsite: '',
    ctaUrl: '',
  });

  const [designConfig, setDesignConfig] = useState<{
    typography: TypographySettings;
    divider: DividerSettings;
    layout: LayoutSettings;
  }>({
    typography: {
      fontFamily: 'Arial' as WebsafeFont,
      fontSize: {
        name: 16,
        title: 14,
        contact: 12,
        cta: 12
      },
      color: '#000000',
      fontWeight: 'normal' as const,
      lineHeight: 1.5,
    },
    divider: {
      style: 'solid' as const,
      color: '#cccccc',
      thickness: 1,
      orientation: 'horizontal' as const,
    },
    layout: {
      type: 'stacked' as LayoutType,
      spacing: {
        between: 8,
        padding: 20,
      },
      alignment: 'left' as const,
      maxWidth: 600,
    },
  });

  const config: SignatureConfig = {
    personalInfo,
    ...designConfig
  };

  const handleLoadTemplate = useCallback((template: SignatureTemplate) => {
    setDesignConfig({
      typography: template.typography,
      divider: template.divider,
      layout: template.layout
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Email Signature Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6 py-8">
          <div className="sticky top-4 z-10 bg-gray-50 pt-4 pb-6">
            <div className="space-y-4">
              <SignaturePreview config={config} />
              <div className="flex gap-4">
                <Button
                  onClick={() =>
                    generateSignatureHtml(config).then(html =>
                      downloadSignature(html, config.personalInfo.fullName || 'signature')
                    )
                  }
                  className="flex-1"
                >
                  Download Signature
                </Button>
                <TemplateManager
                  currentConfig={config}
                  onLoadTemplate={handleLoadTemplate}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <div className="p-4 bg-white rounded-lg shadow">
                  <PersonalInfoForm
                    defaultValues={personalInfo}
                    onChange={setPersonalInfo}
                  />
                </div>
              </TabsContent>
              <TabsContent value="design">
                <div className="p-4 bg-white rounded-lg shadow">
                  <DesignCustomizer
                    typography={designConfig.typography}
                    divider={designConfig.divider}
                    layout={designConfig.layout}
                    onUpdate={setDesignConfig}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
