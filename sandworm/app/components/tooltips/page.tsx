"use client";

import { StatusBadge } from "@/components/ui/status-badge";

export default function TooltipsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Tooltips</h1>
          <StatusBadge status="coming-soon" />
        </div>
        <p className="text-lg text-muted-foreground">
          Tooltip components for displaying additional information on hover.
        </p>
      </div>
    </div>
  );
}
