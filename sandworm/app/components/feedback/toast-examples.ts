import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import type { ToastExample } from "./toast-examples/types";

export const toastExamples: ToastExample[] = [
  {
    variant: "info",
    icon: Info,
    title: "Info",
    description: "This is an informational notification.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"`,
    usage: `const { toast } = useToast()

toast({
  title: "Info",
  description: "This is an informational notification.",
})`
  },
  {
    variant: "success",
    icon: CheckCircle,
    title: "Success",
    description: "Your changes have been saved successfully.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"`,
    usage: `const { toast } = useToast()

toast({
  title: "Success",
  description: "Your changes have been saved successfully.",
})`
  },
  {
    variant: "error",
    icon: XCircle,
    title: "Error",
    description: "Something went wrong. Please try again.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"`,
    usage: `const { toast } = useToast()

toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong. Please try again.",
})`
  },
  {
    variant: "warning",
    icon: AlertTriangle,
    title: "Warning",
    description: "Please review your changes before proceeding.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"`,
    usage: `const { toast } = useToast()

toast({
  title: "Warning",
  description: "Please review your changes before proceeding.",
})`
  }
]; 