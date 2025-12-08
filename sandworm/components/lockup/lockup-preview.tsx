'use client';

import Image from 'next/image';
import type { LockupSet, LockupVariant } from '@/lib/types';
import { LockupDownload } from './lockup-download';
import { Card } from '@/components/ui/card';
import { getBackgroundColor } from '@/components/logo/utils';

interface LockupPreviewProps {
  lockup: LockupSet;
  variant: LockupVariant;
  preferSvg?: boolean;
}

export function LockupPreview({ lockup, variant, preferSvg = true }: LockupPreviewProps) {
  const logoFormat = lockup.variants[variant];
  const logoPath = preferSvg ? logoFormat.svg : logoFormat.png;

  return (
    <Card className="overflow-hidden">
      <div
        className={`relative flex h-48 items-center justify-center p-6 ${getBackgroundColor(variant)}`}
      >
        <Image
          src={logoPath}
          alt={`${lockup.name} ${variant} lockup`}
          className="w-[225px] h-auto"
          width={225}
          height={112}
          priority
          loading="eager"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between border-t bg-muted/10 px-4 py-2">
        <h3 className="text-sm font-medium">{lockup.name}</h3>
        <LockupDownload lockup={lockup} variant={variant} />
      </div>
    </Card>
  );
}
