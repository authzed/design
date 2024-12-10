"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { SemanticColor } from "@/lib/semantic-colors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ColorTableProps {
  colors: SemanticColor[];
  showModes?: boolean;
}

function useColorValues(variable: string) {
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

  return colorValues;
}

export function ColorTable({ colors, showModes = false }: ColorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[240px]">Variable</TableHead>
          {showModes && (
            <>
              <TableHead>Light Mode</TableHead>
              <TableHead>Dark Mode</TableHead>
            </>
          )}
          <TableHead>HSL</TableHead>
          <TableHead>HEX</TableHead>
          <TableHead>RGB</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colors.map((color) => {
          const colorValues = useColorValues(color.variable);
          // Get the color name and shade from the token instead of the variable
          const [colorName, shade] = color.token.split('-');
          const isDark = parseInt(shade) >= 600;
          
          return (
            <TableRow key={color.variable}>
              <TableCell className="p-0">
                <div
                  className="px-2 py-2 flex items-center font-mono text-sm w-full h-full min-h-full"
                  style={{
                    backgroundColor: `hsl(var(${color.variable}))`,
                    color: `hsl(var(--${colorName}-${isDark ? '025' : '975'}))`
                  }}
                >
                  {color.variable}
                </div>
              </TableCell>
              {showModes && (
                <>
                  <TableCell className="font-mono text-sm">var(--{color.token})</TableCell>
                  <TableCell className="font-mono text-sm">var(--{color.darkToken})</TableCell>
                </>
              )}
              <TableCell className="font-mono text-sm">{colorValues?.hsl || '-'}</TableCell>
              <TableCell className="font-mono text-sm">{colorValues?.hex || '-'}</TableCell>
              <TableCell className="font-mono text-sm">{colorValues?.rgb || '-'}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}