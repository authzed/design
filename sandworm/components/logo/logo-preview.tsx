'use client';

import Image from 'next/image';
import type { LogoSet, LogoVariant } from '@/lib/types';
import { LogoDownload } from './logo-download';
import { Card } from '@/components/ui/card';
import { getBackgroundColor } from './utils';

interface LogoPreviewProps {
  logo: LogoSet;
  variant: LogoVariant;
  preferSvg?: boolean;
}

export function LogoPreview({ logo, variant, preferSvg = true }: LogoPreviewProps) {
  const logoPath = preferSvg ? logo.variants[variant].svg : logo.variants[variant].png;

  return (
    <Card className="overflow-hidden">
      <div
        className={`relative flex h-32 items-center justify-center p-6 ${getBackgroundColor(variant)}`}
      >
        <Image
          src={logoPath}
          alt={`${logo.name} ${variant} logo`}
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
        <LogoDownload logo={logo} variant={variant} />
      </div>
    </Card>
  );
}
