import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type {
  LogoCloudFrame,
  LogoCloudSet,
  LogoCloudVariant,
} from "@/lib/types";

interface LogoCloudPreviewProps {
  set: LogoCloudSet;
  variant: LogoCloudVariant;
  frame: LogoCloudFrame;
  label: string;
  description: string;
}

const isTransparent = (variant: LogoCloudVariant) =>
  variant === "transparent-white" || variant === "transparent-dark";

const isLightFilled = (variant: LogoCloudVariant) =>
  variant === "light" || variant === "transparent-dark";

export function LogoCloudPreview({
  set,
  variant,
  frame,
  label,
  description,
}: LogoCloudPreviewProps) {
  const asset = set.frames[frame][variant];

  const handleDownload = () => {
    window.open(asset.png, "_blank");
  };

  // Show transparent variants over a contrasting backdrop so logos remain readable
  const previewBackground = isTransparent(variant)
    ? isLightFilled(variant)
      ? "bg-[hsl(300_6%_97%)]"
      : "bg-[hsl(280_47%_4%)]"
    : "";

  return (
    <Card className="overflow-hidden">
      <div
        className={`relative aspect-[16/9] w-full ${previewBackground}`.trim()}
      >
        <Image
          src={asset.png}
          alt={`${set.name} — ${label} (${variant})`}
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            PNG · {set.dimensions.width * 2}×{set.dimensions.height * 2} (2×)
          </Button>
        </div>
      </div>
    </Card>
  );
}
