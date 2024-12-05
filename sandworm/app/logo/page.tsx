"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { LogoPreview } from "@/components/logo/logo-preview";
import { LogoVariantSelector } from "@/components/logo/logo-variant-selector";
import { DownloadAll } from "@/components/logo/download-all";
import { GuidelinesCard } from "@/components/logo/guidelines-card";
import { logoSets } from "@/config/logos";
import type { LogoVariant } from "@/lib/types";

const doItems = [
  { text: "Use approved logo files only" },
  { text: "Maintain minimum clear space" },
  { text: "Use appropriate color variants for background" },
  { text: "Maintain aspect ratio when scaling" },
];

const dontItems = [
  { text: "Modify or distort the logo" },
  { text: "Change logo colors" },
  { text: "Add effects or shadows" },
  { text: "Use logo smaller than minimum size" },
];

export default function LogoPage() {
  const [selectedVariant, setSelectedVariant] = useState<LogoVariant>("color-light");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Logo</h1>
        <p className="text-muted-foreground">
          Guidelines for logo usage and specifications across different platforms and contexts.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Logo Variations</h2>
            <DownloadAll logos={logoSets} />
          </div>
          <Tabs defaultValue="variants" className="space-y-4">
            <TabsList>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="usage">Usage Guidelines</TabsTrigger>
            </TabsList>
            <TabsContent value="variants" className="space-y-6">
              <Card className="p-6">
                <LogoVariantSelector
                  selectedVariant={selectedVariant}
                  onVariantChange={setSelectedVariant}
                />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                  {logoSets.slice(0, 2).map((logo) => (
                    <LogoPreview
                      key={logo.name}
                      logo={logo}
                      variant={selectedVariant}
                    />
                  ))}
                </div>
                <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                  {logoSets.slice(2).map((logo) => (
                    <LogoPreview
                      key={logo.name}
                      logo={logo}
                      variant={selectedVariant}
                    />
                  ))}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="usage" className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Usage Guidelines</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Light Backgrounds</h4>
                    <p className="text-muted-foreground">
                      Use Color Light or Slate 850 variants on light backgrounds.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Dark Backgrounds</h4>
                    <p className="text-muted-foreground">
                      Use Color Dark or Slate 050 variants on dark backgrounds.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Minimum Size</h4>
                    <p className="text-muted-foreground">
                      Digital: 100px width minimum
                      <br />
                      Print: 35mm width minimum
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Stacked Logo Usage</h4>
                    <p className="text-muted-foreground">
                      Use the stacked logo variation in space-constrained contexts, such as:
                      <br />
                      - Competitor landscapes
                      <br />
                      - Small UI elements
                      <br />
                      - Mobile displays
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">Do's and Don'ts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <GuidelinesCard type="do" items={doItems} />
            <GuidelinesCard type="dont" items={dontItems} />
          </div>
        </section>
      </div>
    </div>
  );
}