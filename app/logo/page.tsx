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
    <div className="container mx-auto space-y-12 px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Logo</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Guidelines for logo usage and specifications across different platforms and contexts.
        </p>
      </div>

      <div className="space-y-8">
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
                <div className="space-y-8">
                  {logoSets.map((logo) => (
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
                <h3 className="mb-4 text-xl font-semibold">Clear Space</h3>
                <p className="mb-4 text-muted-foreground">
                  Maintain adequate clear space around the logo to ensure visibility and impact.
                  The minimum clear space is equal to the height of the logomark symbol.
                </p>
                <div className="aspect-video rounded-lg border-4 border-dashed border-border bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <div className="rounded bg-background p-12">
                      <div className="relative h-12 w-48">
                        <Image
                          src={logoSets[0].variants["color-light"]}
                          alt="Logo clear space example"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

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