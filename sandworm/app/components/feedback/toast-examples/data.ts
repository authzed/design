import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import type { ToastExample } from "./types";

export const toastExamples: ToastExample[] = [
  {
    variant: "info",
    icon: Info,
    title: "Info",
    description: "This is an informational notification.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"`,
    usage: `const { toast } = useToast()

toast({
  variant: "info",
  title: "Info",
  description: "This is an informational notification.",
  icon: <Info className="h-4 w-4" />,
  className: cn(
    "backdrop-blur-xl relative overflow-hidden [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 min-h-[3.5rem] flex-col items-start",
    "border-[hsl(var(--blue-700)_/_0.2)] bg-[hsl(var(--blue-700)_/_0.05)] text-[hsl(var(--blue-700))]",
    "before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--blue-100)_/_0.3)]",
    "after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)]",
    "dark:border-[hsl(var(--blue-400)_/_0.2)] dark:bg-[hsl(var(--blue-900)_/_0.05)] dark:text-[hsl(var(--blue-400))]",
    "dark:before:bg-[hsl(var(--blue-900)_/_0.3)]"
  )
})`
  },
  {
    variant: "success",
    icon: CheckCircle,
    title: "Success",
    description: "Your changes have been saved successfully.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"`,
    usage: `const { toast } = useToast()

toast({
  variant: "success",
  title: "Success",
  description: "Your changes have been saved successfully.",
  icon: <CheckCircle className="h-4 w-4" />,
  className: cn(
    "backdrop-blur-xl relative overflow-hidden [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 min-h-[3.5rem] flex-col items-start",
    "border-[hsl(var(--teal-600)_/_0.2)] bg-[hsl(var(--teal-600)_/_0.05)] text-[hsl(var(--teal-600))]",
    "before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--teal-100)_/_0.3)]",
    "after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)]",
    "dark:border-[hsl(var(--teal-400)_/_0.2)] dark:bg-[hsl(var(--teal-900)_/_0.05)] dark:text-[hsl(var(--teal-400))]",
    "dark:before:bg-[hsl(var(--teal-900)_/_0.3)]"
  )
})`
  },
  {
    variant: "error",
    icon: XCircle,
    title: "Error",
    description: "Something went wrong. Please try again.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { XCircle } from "lucide-react"`,
    usage: `const { toast } = useToast()

toast({
  variant: "error",
  title: "Error",
  description: "Something went wrong. Please try again.",
  icon: <XCircle className="h-4 w-4" />,
  className: cn(
    "backdrop-blur-xl relative overflow-hidden [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 min-h-[3.5rem] flex-col items-start",
    "border-[hsl(var(--red-600)_/_0.2)] bg-[hsl(var(--red-600)_/_0.05)] text-[hsl(var(--red-600))]",
    "before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--red-100)_/_0.3)]",
    "after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)]",
    "dark:border-[hsl(var(--red-400)_/_0.2)] dark:bg-[hsl(var(--red-900)_/_0.05)] dark:text-[hsl(var(--red-400))]",
    "dark:before:bg-[hsl(var(--red-900)_/_0.3)]"
  )
})`
  },
  {
    variant: "warning",
    icon: AlertTriangle,
    title: "Warning",
    description: "Please review your changes before proceeding.",
    imports: `import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"`,
    usage: `const { toast } = useToast()

toast({
  variant: "warning",
  title: "Warning",
  description: "Please review your changes before proceeding.",
  icon: <AlertTriangle className="h-4 w-4" />,
  className: cn(
    "backdrop-blur-xl relative overflow-hidden [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 min-h-[3.5rem] flex-col items-start",
    "border-[hsl(var(--sand-500)_/_0.2)] bg-[hsl(var(--sand-500)_/_0.05)] text-[hsl(var(--sand-500))]",
    "before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--sand-100)_/_0.3)]",
    "after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)]",
    "dark:border-[hsl(var(--sand-400)_/_0.2)] dark:bg-[hsl(var(--sand-900)_/_0.05)] dark:text-[hsl(var(--sand-400))]",
    "dark:before:bg-[hsl(var(--sand-900)_/_0.3)]"
  )
})`
  }
]; 