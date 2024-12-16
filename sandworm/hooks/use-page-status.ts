import { usePathname } from "next/navigation";
import { pageStatus, PageStatus } from "@/config/page-status";

export function usePageStatus(): PageStatus {
  const pathname = usePathname();
  return pageStatus[pathname] || "draft";
}
