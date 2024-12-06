"use client";

import { Button } from "@/components/ui/button";
import type { LogoVariant } from "@/lib/types";
import { Sun, Moon } from "lucide-react";

interface LogoVariantSelectorProps {
  selectedVariant: LogoVariant;
  onVariantChange: (variant: LogoVariant) => void;
}

export function LogoVariantSelector({ selectedVariant, onVariantChange }: LogoVariantSelectorProps) {
  const variants: { value: LogoVariant; label: string; icon?: React.ReactNode }[] = [
    { value: "color-light", label: "Color Light", icon: <Sun className="h-4 w-4" /> },
    { value: "color-dark", label: "Color Dark", icon: <Moon className="h-4 w-4" /> },
    { value: "slate-050", label: "Slate Light", icon: <Sun className="h-4 w-4" /> },
    { value: "slate-850", label: "Slate Dark", icon: <Moon className="h-4 w-4" /> },
  ];

  return (
    <div className="inline-flex rounded-md border bg-muted/30 p-1">
      {variants.map(({ value, label, icon }) => (
        <Button
          key={value}
          variant={selectedVariant === value ? "secondary" : "ghost"}
          onClick={() => onVariantChange(value)}
          size="sm"
          className="gap-2"
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
}