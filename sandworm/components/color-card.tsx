"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { SemanticColor } from "@/lib/semantic-colors";

interface ColorCardProps {
  label: string;
  variable: string;
  className?: string;
  showSemanticValue?: boolean;
  semanticMapping?: Pick<SemanticColor, 'token' | 'darkToken'>;
}

export function ColorCard({ 
  label, 
  variable, 
  className, 
  showSemanticValue = false,
  semanticMapping 
}: ColorCardProps) {
  const [colorValues, setColorValues] = useState<{
    hsl: string;
    hex: string;
    rgb: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getColorValue = () => {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      const value = style.getPropertyValue(variable).trim();
      
      if (!value) return null;

      const [h, s, l] = value.split(' ').map(v => parseFloat(v));
      
      // Convert HSL to RGB
      const sPercent = s / 100;
      const lPercent = l / 100;
      const c = (1 - Math.abs(2 * lPercent - 1)) * sPercent;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = lPercent - c / 2;
      
      let r = 0, g = 0, b = 0;
      
      if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
      else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
      else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
      else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
      else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
      else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
      
      const rgb = [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
      ];
      
      // Convert RGB to HEX
      const hex = rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');

      return {
        hsl: `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`,
        rgb: `rgb(${rgb.join(', ')})`,
        hex: `#${hex}`
      };
    };

    const updateColor = () => {
      setColorValues(getColorValue());
    };

    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [variable]);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4">
        <div className="font-medium">{label}</div>
        <div className="font-mono text-sm text-muted-foreground">
          var({variable})
          {semanticMapping && (
            <>
              <br />
              <span className="text-xs">
                Light: {semanticMapping.token}
                <br />
                Dark: {semanticMapping.darkToken}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div
          className={cn("h-16 rounded-md", className)}
          style={{
            backgroundColor: showSemanticValue 
              ? `hsl(var(${variable}))` 
              : `hsl(${colorValues?.hsl || '0 0% 100%'})`
          }}
        />
        {colorValues && (
          <div className="mt-2 space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">HSL:</span>
              <span>{colorValues.hsl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">HEX:</span>
              <span>{colorValues.hex}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">RGB:</span>
              <span>{colorValues.rgb}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}