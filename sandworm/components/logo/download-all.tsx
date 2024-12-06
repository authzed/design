"use client";

import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LogoSet } from "@/lib/types";
import JSZip from "jszip";

interface DownloadAllProps {
  logos: LogoSet[];
}

export function DownloadAll({ logos }: DownloadAllProps) {
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const formats = ['png', 'svg'] as const;

    logos.forEach((logo) => {
      const folderName = logo.name.replace(/\s+/g, '-');
      const logoFolder = zip.folder(folderName);
      if (!logoFolder) return;

      // Create format-specific subfolders
      const pngFolder = logoFolder.folder('png');
      const svgFolder = logoFolder.folder('svg');
      if (!pngFolder || !svgFolder) return;

      Object.entries(logo.variants).forEach(([variant, paths]) => {
        // Get filenames without path
        const pngFileName = paths.png.split('/').pop() || `${folderName}-${variant}.png`;
        const svgFileName = paths.svg.split('/').pop() || `${folderName}-${variant}.svg`;

        // Add files to their respective format folders
        pngFolder.file(pngFileName, fetch(paths.png).then(res => res.blob()));
        svgFolder.file(svgFileName, fetch(paths.svg).then(res => res.blob()));
      });
    });

    try {
      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "authzed-logos.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Failed to generate zip:', error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={handleDownloadAll}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Download Full Logo Set
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" className="max-w-xs">
          <p>Download all logo variations in both PNG and SVG formats, organized by brand and file type</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}