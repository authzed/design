import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { BannerVariant, BannerSet } from "@/lib/types";

interface BannerPreviewProps {
  banner: BannerSet;
  variant: BannerVariant;
}

export function BannerPreview({ banner, variant }: BannerPreviewProps) {
  const handleDownloadSVG = () => {
    window.open(banner.variants[variant].svg, '_blank');
  };

  const handleDownloadPNG = () => {
    window.open(banner.variants[variant].png, '_blank');
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/1] w-full">
        <Image
          src={banner.variants[variant].png}
          alt={`${banner.name} ${variant} banner`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium">{banner.name}</h3>
          <p className="text-sm text-muted-foreground">{banner.description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSVG}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            SVG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPNG}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            PNG
          </Button>
        </div>
      </div>
    </Card>
  );
}
