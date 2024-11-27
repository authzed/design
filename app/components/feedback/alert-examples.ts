import { AlertCircle, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface AlertExample {
  variant: "default" | "info" | "success" | "warning" | "error";
  icon: LucideIcon;
  title: string;
  description: string;
  imports: string;
  usage: string;
}

export const alertExamples: AlertExample[] = [
  {
    variant: "default",
    icon: AlertCircle,
    title: "Heads Up!",
    description: "This is a general heads up message for your attention.",
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"`,
    usage: `<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Heads Up!</AlertTitle>
  <AlertDescription>
    This is a general heads up message for your attention.
  </AlertDescription>
</Alert>`
  },
  {
    variant: "info",
    icon: Info,
    title: "Info",
    description: "This is an informational alert message.",
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"`,
    usage: `<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>
    This is an informational alert message.
  </AlertDescription>
</Alert>`
  },
  {
    variant: "success",
    icon: CheckCircle,
    title: "Success",
    description: "Your changes have been saved successfully.",
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"`,
    usage: `<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`
  },
  {
    variant: "warning",
    icon: AlertTriangle,
    title: "Warning",
    description: "Please review the changes before proceeding.",
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"`,
    usage: `<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Please review the changes before proceeding.
  </AlertDescription>
</Alert>`
  },
  {
    variant: "error",
    icon: XCircle,
    title: "Error!",
    description: "Something went wrong. Please try again.",
    imports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircle } from "lucide-react"`,
    usage: `<Alert variant="error">
  <XCircle className="h-4 w-4" />
  <AlertTitle>Error!</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>`
  }
];