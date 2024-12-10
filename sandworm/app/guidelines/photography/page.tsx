import { StatusBadge } from "@/components/ui/status-badge";

export default function PhotographyPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Photography</h1>
          <StatusBadge status="coming-soon" />
        </div>
        <p className="text-lg text-muted-foreground">
          Guidelines for using photography in our design system.
        </p>
      </div>

      <div className="space-y-12">
      </div>
    </div>
  );
}