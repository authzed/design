import { LucideIcon } from "lucide-react";
import type { ToasterToast } from "@/hooks/use-toast";

export interface ToastExample {
  variant?: "default" | "info" | "success" | "warning" | "error";
  icon: LucideIcon;
  title: string;
  description: string;
  imports: string;
  usage: string;
}

export type Toast = ToasterToast; 