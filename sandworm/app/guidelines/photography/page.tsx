'use client';

import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';

export default function PhotographyPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Photography</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Guidelines for using photography and imagery across our brand.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Style Guidelines</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>Coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
}