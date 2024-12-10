"use client";

import { useState } from "react";
import { BannerPreview } from "@/components/banner/banner-preview";
import { BannerVariantSelector } from "@/components/banner/banner-variant-selector";
import { StatusBadge } from "@/components/ui/status-badge";
import { bannerSets } from "@/config/banners";
import type { BannerVariant } from "@/lib/types";

export default function BannersPage() {
  const [selectedVariant, setSelectedVariant] = useState<BannerVariant>("light");

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
          <StatusBadge status="coming-soon" />
        </div>
        <p className="text-lg text-muted-foreground">
          Official AuthZed banners for marketing and promotional materials.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Banner Collection</h2>
          <div className="flex items-center justify-between mb-6">
            <BannerVariantSelector variant={selectedVariant} onVariantChange={setSelectedVariant} />
          </div>
          <div className="grid gap-6">
            {bannerSets.map((banner) => (
              <BannerPreview key={banner.name} banner={banner} variant={selectedVariant} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
