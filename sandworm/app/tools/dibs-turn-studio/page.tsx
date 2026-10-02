'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { usePageStatus } from '@/hooks/use-page-status';

// The studio is a self-contained page in public/embeds (a build artifact from the Dibs rig, see its README).
const STUDIO_SRC = '/embeds/dibs-turn-studio/index.html';

export default function DibsTurnStudioPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Dibs Turn Studio</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground">
          Pose Dibs from the front or the side, then export a transparent PNG. Built on the Dibs rig, the same art
          and bones as the Rive files.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline">
            <a href={STUDIO_SRC} target="_blank" rel="noopener noreferrer">
              Open full screen <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <span className="text-sm text-muted-foreground">
            Drag the dots on Dibs, pick a pose, export. Copy settings saves the exact pose as JSON; paste it back
            on the page to load it.
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <iframe
          src={STUDIO_SRC}
          title="Dibs Turn Studio"
          className="block h-[820px] w-full"
          loading="lazy"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
