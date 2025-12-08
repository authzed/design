"use client";

import { Button } from "@/components/ui/button";
import type { LockupVariant } from "@/lib/types";

interface LockupVariantSelectorProps {
  selectedVariant: LockupVariant;
  onVariantChange: (variant: LockupVariant) => void;
}

export function LockupVariantSelector({ selectedVariant, onVariantChange }: LockupVariantSelectorProps) {
  const variants: { value: LockupVariant; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  return (
    <div className="inline-flex rounded-md border bg-muted/30 p-1">
      {variants.map(({ value, label }) => (
        <Button
          key={value}
          variant={selectedVariant === value ? "secondary" : "ghost"}
          onClick={() => onVariantChange(value)}
          size="sm"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
