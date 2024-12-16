import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "ready" | "draft" | "deprecated" | "under-review";
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  const variants = {
    ready: "hsl(var(--teal-500))",
    draft: "hsl(var(--stone-500))",
    "under-review": "hsl(var(--sand-400))",
    deprecated: "hsl(var(--red-600))",
  };

  return (
    <div
      className={cn(
        "h-1.5 w-1.5 rounded-full",
        "bg-current",
        "drop-shadow-[0_0_2px_currentColor]",
        className
      )}
      style={{ color: variants[status] }}
      aria-label={`Status: ${status}`}
    />
  );
}
