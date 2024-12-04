import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BannerVariant } from "@/lib/types";

interface BannerVariantSelectorProps {
  variant: BannerVariant;
  onChange: (value: BannerVariant) => void;
}

export function BannerVariantSelector({
  variant,
  onChange,
}: BannerVariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="variant-select">Variant</Label>
      <Select value={variant} onValueChange={onChange}>
        <SelectTrigger id="variant-select" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
