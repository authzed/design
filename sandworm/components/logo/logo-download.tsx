"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LogoSet, LogoVariant } from "@/lib/types";

interface LogoDownloadProps {
  logo: LogoSet;
  variant: LogoVariant;
}

export function LogoDownload({ logo, variant }: LogoDownloadProps) {
  const downloadLogo = (format: 'png' | 'svg') => {
    const path = logo.variants[variant][format];
    const link = document.createElement("a");
    link.href = path;
    link.download = path.split("/").pop() || `${logo.name}-${variant}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download logo</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => downloadLogo('png')}>
          Download PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadLogo('svg')}>
          Download SVG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}