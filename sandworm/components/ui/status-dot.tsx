import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "ready" | "draft" | "deprecated" | "under-review";
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  const variants = {
    ready: "bg-[#14B8A6] dark:bg-[#5EEAD4]", // teal-500/300
    draft: "bg-[#64748B] dark:bg-[#94A3B8]", // slate-500/400
    "under-review": "bg-[#EAB308] dark:bg-[#FDE047]", // yellow-500/300
    deprecated: "bg-[#991B1B] dark:bg-[#B91C1C]", // red-800/700
  };

  return (
    <div
      className={cn(
        "h-1.5 w-1.5 rounded-full",
        variants[status],
        className
      )}
      aria-label={`Status: ${status}`}
    />
  );
}
