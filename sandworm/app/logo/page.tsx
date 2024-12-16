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
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Logo Variations</h2>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <LogoVariantSelector
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
              <DownloadAll logos={logoSets} />
            </div>

            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {logoSets.slice(0, 2).map((logo) => (
                  <LogoPreview
                    key={logo.name}
                    logo={logo}
                    variant={selectedVariant}
                  />
                ))}
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {logoSets.slice(2).map((logo) => (
                  <LogoPreview
                    key={logo.name}
                    logo={logo}
                    variant={selectedVariant}
                  />
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section>
          <Card className="p-6">
            <h2 className="mb-6 text-2xl font-semibold">Usage Guidelines</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <GuidelinesCard title="Do" items={doItems} type="do" />
              <GuidelinesCard title="Don't" items={dontItems} type="dont" />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}