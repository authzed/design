"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LockupSet, LockupVariant } from "@/lib/types";

interface LockupDownloadProps {
  lockup: LockupSet;
  variant: LockupVariant;
}

export function LockupDownload({ lockup, variant }: LockupDownloadProps) {
  const downloadLockup = (format: 'png' | 'svg') => {
    const path = lockup.variants[variant][format];
    const link = document.createElement("a");
    link.href = path;
    link.download = path.split("/").pop() || `${lockup.name}-${variant}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download lockup</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => downloadLockup('png')}>
          Download PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadLockup('svg')}>
          Download SVG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
