"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { LogoSet, LogoVariant } from "@/lib/types";
import { downloadFile } from "./utils";

interface LogoDownloadProps {
  logo: LogoSet;
  variant: LogoVariant;
}

export function LogoDownload({ logo, variant }: LogoDownloadProps) {
  const handleDownload = async (format: 'png' | 'svg') => {
    const path = logo.variants[variant];
    const svgPath = path.replace('@2x.png', '.svg');
    const url = format === 'png' ? path : svgPath;
    const filename = `${logo.name}-${variant}.${format}`;
    
    try {
      await downloadFile(url, filename);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDownload('png')}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDownload('svg')}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        SVG
      </Button>
    </div>
  );
}