"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { LogoSet } from "@/lib/types";
import JSZip from "jszip";

interface DownloadAllProps {
  logos: LogoSet[];
}

export function DownloadAll({ logos }: DownloadAllProps) {
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    
    for (const logo of logos) {
      const logoFolder = zip.folder(logo.name);
      if (!logoFolder) continue;

      for (const [variant, path] of Object.entries(logo.variants)) {
        try {
          // Download PNG
          const pngResponse = await fetch(path);
          const pngBlob = await pngResponse.blob();
          logoFolder.file(`${logo.name}-${variant}.png`, pngBlob);

          // Download SVG
          const svgPath = path.replace('@2x.png', '.svg');
          const svgResponse = await fetch(svgPath);
          const svgBlob = await svgResponse.blob();
          logoFolder.file(`${logo.name}-${variant}.svg`, svgBlob);
        } catch (error) {
          console.error(`Failed to download ${logo.name} ${variant}:`, error);
        }
      }
    }

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'AuthZed-Logos.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate zip:', error);
    }
  };

  return (
    <Button
      onClick={handleDownloadAll}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download All Logos
    </Button>
  );
}