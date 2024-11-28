"use client";

import Image from "next/image";
import { LogoSet, LogoVariant } from "@/lib/types";
import { LogoDownload } from "./logo-download";
import { getBackgroundColor } from "./utils";

interface LogoPreviewProps {
  logo: LogoSet;
  variant: LogoVariant;
}

export function LogoPreview({ logo, variant }: LogoPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{logo.name}</h3>
        <LogoDownload logo={logo} variant={variant} />
      </div>
      <div className={`rounded-lg p-8 ${getBackgroundColor(variant)}`}>
        <div className="relative h-16">
          <Image
            src={logo.variants[variant]}
            alt={`${logo.name} ${variant} logo`}
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}