import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "ready" | "draft" | "deprecated" | "under-review"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    ready: {
      color: "hsl(var(--teal-500))",
      background: "hsl(var(--teal-500) / 0.1)",
      border: "hsl(var(--teal-500) / 0.5)"
    },
    draft: {
      color: "hsl(var(--stone-500))",
      background: "hsl(var(--stone-500) / 0.1)",
      border: "hsl(var(--stone-500) / 0.5)"
    },
    "under-review": {
      color: "hsl(var(--sand-500))",
      background: "hsl(var(--sand-500) / 0.1)",
      border: "hsl(var(--sand-500) / 0.5)"
    },
    deprecated: {
      color: "hsl(var(--red-800))",
      background: "hsl(var(--red-800) / 0.1)",
      border: "hsl(var(--red-800) / 0.5)"
    },
  }

  return (
    <Badge
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border",
        className
      )}
      style={{
        color: variants[status].color,
        backgroundColor: variants[status].background,
        borderColor: variants[status].border
      }}
    >
      {status.replace("-", " ")}
    </Badge>
  )
}
