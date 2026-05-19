import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LogoCloudVariant } from "@/lib/types";

interface LogoCloudVariantSelectorProps {
  variant: LogoCloudVariant;
  onChange: (value: LogoCloudVariant) => void;
}

export function LogoCloudVariantSelector({
  variant,
  onChange,
}: LogoCloudVariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="logo-cloud-variant-select">Variant</Label>
      <Select value={variant} onValueChange={onChange}>
        <SelectTrigger id="logo-cloud-variant-select" className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="transparent-white">
            Transparent / white logos
          </SelectItem>
          <SelectItem value="transparent-dark">
            Transparent / dark logos
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
