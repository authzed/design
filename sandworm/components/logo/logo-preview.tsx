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
  const isLogomark = logo.name === "Logomark";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{logo.name}</h3>
        <LogoDownload logo={logo} variant={variant} />
      </div>
      <div className={`flex h-32 items-center justify-center rounded-lg p-8 ${getBackgroundColor(variant)}`}>
        <div className={`relative ${isLogomark ? "h-16 w-16" : "h-16 w-full"}`}>
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