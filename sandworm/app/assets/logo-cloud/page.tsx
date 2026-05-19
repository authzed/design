"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { LogoCloudPreview } from "@/components/logo-cloud/logo-cloud-preview";
import { LogoCloudVariantSelector } from "@/components/logo-cloud/logo-cloud-variant-selector";
import { logoCloud, logoCloudLastUpdated } from "@/config/logo-cloud";
import type { LogoCloudVariant } from "@/lib/types";

export default function LogoCloudPage() {
  const [selectedVariant, setSelectedVariant] =
    useState<LogoCloudVariant>("dark");

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Logo Cloud</h1>
            <span className="mt-2 shrink-0 text-xs text-muted-foreground">
              Last updated{" "}
              <time dateTime={logoCloudLastUpdated}>
                {new Date(logoCloudLastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
          </div>
          <p className="text-muted-foreground">
            Customer-logo composition with surrounding industry pills. Use as a
            pitch-deck hero, homepage section, social card, or email asset.
            Palette snaps to <code>stone-975</code> / <code>stone-025</code>;
            transparent variants composite onto your own surface. Stills export
            at 2× ({logoCloud.dimensions.width * 2}×
            {logoCloud.dimensions.height * 2}).
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Variants</h2>
            <LogoCloudVariantSelector
              variant={selectedVariant}
              onChange={setSelectedVariant}
            />
          </div>

          <div className="grid gap-6">
            <LogoCloudPreview
              set={logoCloud}
              variant={selectedVariant}
              frame="cloud"
              label="Full cloud — logos + pills"
              description="The complete composition: 3 logo rows centered, surrounded by 6 rows of industry pills at fading distances. Best for densest 'breadth of customers' moments."
            />
            <LogoCloudPreview
              set={logoCloud}
              variant={selectedVariant}
              frame="logos"
              label="Logos only — zoomed"
              description="Just the customer logos at the zoomed-in scale (1.35×). Cleaner, hero-ier, less busy. Use when you want named-customer credibility without the industry-breadth pill cloud."
            />
          </div>
        </div>

        <div className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">Source</p>
          <p>
            Rendered from{" "}
            <code>scratch/design-lab/logo-cloud-variants/</code> in
            claudes-fort. Each variant is the static end-frame of the GSAP
            animation; regenerate via{" "}
            <code>node capture.mjs</code> after starting the local server with{" "}
            <code>python3 -m http.server 8787</code>.
          </p>
        </div>
      </div>
    </Container>
  );
}
