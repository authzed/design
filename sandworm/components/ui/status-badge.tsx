"use client";

import { cn } from "@/lib/utils";

export type Status = "ready" | "wip" | "deprecated" | "coming-soon";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  ready: {
    color: "bg-green-500/15 text-green-700 dark:bg-green-500/25 dark:text-green-300",
    dotColor: "bg-green-500",
    border: "border border-green-500/40 dark:border-green-500/30",
    label: "Ready",
  },
  wip: {
    color: "bg-yellow-500/15 text-yellow-700 dark:bg-yellow-500/25 dark:text-yellow-300",
    dotColor: "bg-yellow-500",
    border: "border border-yellow-500/40 dark:border-yellow-500/30",
    label: "WIP",
  },
  deprecated: {
    color: "bg-red-500/15 text-red-700 dark:bg-red-500/25 dark:text-red-300",
    dotColor: "bg-red-500",
    border: "border border-red-500/40 dark:border-red-500/30",
    label: "Deprecated",
  },
  "coming-soon": {
    color: "bg-slate-500/15 text-slate-700 dark:bg-slate-500/25 dark:text-slate-300",
    dotColor: "bg-slate-500",
    border: "border border-slate-500/40 dark:border-slate-500/30",
    label: "Coming Soon",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        config.color,
        config.border,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)} />
      <span>{config.label}</span>
    </div>
  );
}
