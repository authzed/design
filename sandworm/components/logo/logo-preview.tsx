'use client';

import Image from 'next/image';
import type { LogoSet, LogoVariant, WordmarkVariants, LogoMarkVariants } from '@/lib/types';
import { LogoDownload } from './logo-download';
import { Card } from '@/components/ui/card';
import { getBackgroundColor } from './utils';

interface LogoPreviewProps {
  logo: LogoSet;
  variant: LogoVariant;
  preferSvg?: boolean;
}

// Type guard to check if variants is WordmarkVariants
function isWordmarkVariants(variants: WordmarkVariants | LogoMarkVariants): variants is WordmarkVariants {
  return 'color-light' in variants;
}

export function LogoPreview({ logo, variant, preferSvg = true }: LogoPreviewProps) {
  const variants = logo.variants;
  const isWordmark = isWordmarkVariants(variants);

  // Determine the actual variant to use
  let actualVariant: LogoVariant;
  if (isWordmark) {
    actualVariant = variant in variants ? variant : 'color-light';
  } else {
    actualVariant = variant in variants ? variant : 'color';
  }

  // Get the logo path
  const logoFormat = variants[actualVariant as keyof typeof variants];
  const logoPath = preferSvg ? logoFormat.svg : logoFormat.png;

  return (
    <Card className="overflow-hidden">
      <div
        className={`relative flex h-32 items-center justify-center p-6 ${getBackgroundColor(actualVariant)}`}
      >
        <Image
          src={logoPath}
          alt={`${logo.name} ${actualVariant} logo`}
          className="h-auto max-h-full w-auto"
          width={200}
          height={100}
          priority
          loading="eager"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between border-t bg-muted/10 px-4 py-2">
        <h3 className="text-sm font-medium">{logo.name}</h3>
        <LogoDownload logo={logo} variant={actualVariant} />
      </div>
    </Card>
  );
}
