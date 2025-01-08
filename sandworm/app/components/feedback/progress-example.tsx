"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ProgressExample() {
  const [progress, setProgress] = useState(0);

  const handleProgressChange = () => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="default">
        <TabsList className="mb-4">
          <TabsTrigger value="default">Default</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
        </TabsList>
        <TabsContent value="default" className="space-y-2">
          <Progress value={progress} className="w-full h-[6px] rounded-full [&>div]:rounded-full" />
          <p className="text-sm text-muted-foreground">Default variant</p>
        </TabsContent>
        <TabsContent value="gradient" className="space-y-2">
          <div className="relative">
            <Progress 
              value={progress} 
              className={cn(
                "w-full h-[6px] relative rounded-full",
                "[&>div]:bg-gradient-to-r",
                "[&>div]:from-[hsl(var(--sand-300))]",
                "[&>div]:via-[hsl(var(--red-400))]",
                "[&>div]:to-[hsl(var(--magenta-500))]",
                "[&>div]:shadow-[0_0_8px_rgba(255,255,255,0.5)]",
                "[&>div]:transition-all",
                "[&>div]:duration-300",
                "[&>div]:rounded-full"
              )}
            />
            <div 
              className={cn(
                "absolute inset-0 blur-[6px] rounded-full",
                "opacity-40 dark:opacity-80"
              )}
              style={{
                background: `linear-gradient(to right, hsl(var(--sand-300)), hsl(var(--red-400)), hsl(var(--magenta-600)))`,
                width: `${progress}%`,
                transition: 'width 300ms ease-in-out'
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">Gradient variant with glow effect</p>
        </TabsContent>
      </Tabs>

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