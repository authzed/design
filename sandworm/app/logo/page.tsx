'use client';

import { useState } from 'react';
import { LogoPreview } from '@/components/logo/logo-preview';
import { LogoVariantSelector } from '@/components/logo/logo-variant-selector';
import { DownloadAll } from '@/components/logo/download-all';
import { GuidelinesCard } from '@/components/logo/guidelines-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { logoSets } from '@/config/logos';
import type { LogoVariant } from '@/lib/types';

const doItems = [
  { text: "Use approved logo files only. Keep the logo consistent with our brand standards." },
  { text: "Maintain minimum clear space. Give the logo room to stand out clearly." },
  { text: "Use appropriate color variants for the background. Select the version that ensures the logo remains easy to see and understand." },
  { text: "Maintain aspect ratio when scaling. Keep the logo's shape and proportions intact for maximum recognizability." },
];

const dontItems = [
  { text: "Modify or distort the logo. Altering its shape or proportions undermines brand consistency." },
  { text: "Change logo colors. Stick to the approved color variations to maintain brand recognition." },
  { text: "Add effects or shadows. The logo's strength lies in its simplicity." },
  { text: "Use the logo smaller than the minimum size. Keep it large enough to remain legible and distinct." },
];

export default function LogoPage() {
  const [selectedVariant, setSelectedVariant] = useState<LogoVariant>('color-light');

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Logo</h1>
          <StatusBadge status="ready" />
        </div>
        <h2 className="text-2xl">Our Steady Reference Point</h2>
        <p className="text-lg text-muted-foreground">
          Inspired by the shifting sands of Arrakis—an inhospitable yet resource-rich world—and the
          letter Z, standing for the authorization at the heart of our mission. Together, these
          elements symbolize our platform's ability to shape and navigate complex permission
          landscapes with the same adaptability and resilience that desert life demands.
        </p>
      </div>

      <div className="space-y-6">
        <section id="logo-variations">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Logo Variations</h2>
            <p className="mt-2 text-muted-foreground">
              We offer a range of logo variations to ensure clarity and consistency across different
              contexts:
            </p>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li>
                <strong>Color Light & Color Dark:</strong> Bright, impactful versions for use on both light
                and dark backgrounds, ensuring the logo remains distinct and visible.
              </li>
              <li>
                <strong>Slate Light & Slate Dark:</strong> More subtle variations that maintain a strong
                brand presence while blending smoothly into quieter design environments.
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Choose the version that fits best with your overall design, ensuring the logo's visibility
              and integrity in any setting.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <LogoVariantSelector
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
            <DownloadAll logos={logoSets} />
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {logoSets.slice(0, 2).map((logo) => (
                <LogoPreview key={logo.name} logo={logo} variant={selectedVariant} />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {logoSets.slice(2).map((logo) => (
                <LogoPreview key={logo.name} logo={logo} variant={selectedVariant} />
              ))}
            </div>
          </div>
        </section>

        <section id="usage-guidelines">
          <div className="grid gap-6 md:grid-cols-2">
            <GuidelinesCard
              type="do"
              items={doItems}
            />
            <GuidelinesCard
              type="dont"
              items={dontItems}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
