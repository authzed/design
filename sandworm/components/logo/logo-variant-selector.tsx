"use client";

import { Button } from "@/components/ui/button";
import type { LogoVariant } from "@/lib/types";

interface LogoVariantSelectorProps {
  selectedVariant: LogoVariant;
  onVariantChange: (variant: LogoVariant) => void;
}

export function LogoVariantSelector({ selectedVariant, onVariantChange }: LogoVariantSelectorProps) {
  const variants: { value: LogoVariant; label: string }[] = [
    { value: "color-light", label: "Color Light" },
    { value: "color-dark", label: "Color Dark" },
    { value: "slate-050", label: "Slate Light" },
    { value: "slate-850", label: "Slate Dark" },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {variants.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedVariant === value ? "default" : "secondary"}
          onClick={() => onVariantChange(value)}
          size="sm"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}