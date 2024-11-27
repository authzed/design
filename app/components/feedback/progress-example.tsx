"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function ProgressExample() {
  const [progress, setProgress] = useState(0);

  const handleProgressChange = () => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  };

  return (
    <div className="space-y-2">
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between">
        <Button
          size="sm"
          onClick={handleProgressChange}
        >
          Increment Progress
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setProgress(0)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}