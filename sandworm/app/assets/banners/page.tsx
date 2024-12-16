"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { BannerPreview } from "@/components/banner/banner-preview";
import { BannerVariantSelector } from "@/components/banner/banner-variant-selector";
import { bannerSets } from "@/config/banners";
import type { BannerVariant } from "@/lib/types";

export default function BannersPage() {
  const [selectedVariant, setSelectedVariant] = useState<BannerVariant>("light");

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">
            Official AuthZed banners for marketing and promotional materials.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Banner Collection</h2>
            <BannerVariantSelector
              variant={selectedVariant}
              onChange={setSelectedVariant}
            />
          </div>

          <div className="grid gap-6">
            {bannerSets.map((banner) => (
              <BannerPreview
                key={banner.name}
                banner={banner}
                variant={selectedVariant}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
