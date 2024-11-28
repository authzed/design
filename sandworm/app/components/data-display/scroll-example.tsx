"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export function ScrollExample() {
  return (
    <ScrollArea className="h-72 rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Item {i + 1}</p>
              <p className="text-sm text-muted-foreground">
                Description for item {i + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}