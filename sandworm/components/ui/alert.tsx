import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground backdrop-blur-xl relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-[hsl(var(--blue-700)_/_0.2)] bg-[hsl(var(--blue-700)_/_0.05)] text-[hsl(var(--blue-700))] [&>svg]:text-[hsl(var(--blue-700))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--blue-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:border-[hsl(var(--blue-400)_/_0.2)] dark:bg-[hsl(var(--blue-900)_/_0.05)] dark:text-[hsl(var(--blue-400))] dark:[&>svg]:text-[hsl(var(--blue-400))] dark:before:bg-[hsl(var(--blue-900)_/_0.3)]",
        error: "border-[hsl(var(--red-600)_/_0.2)] bg-[hsl(var(--red-600)_/_0.05)] text-[hsl(var(--red-600))] [&>svg]:text-[hsl(var(--red-600))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--red-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:border-[hsl(var(--red-400)_/_0.2)] dark:bg-[hsl(var(--red-900)_/_0.05)] dark:text-[hsl(var(--red-400))] dark:[&>svg]:text-[hsl(var(--red-400))] dark:before:bg-[hsl(var(--red-900)_/_0.3)]",
        warning: "border-[hsl(var(--sand-500)_/_0.2)] bg-[hsl(var(--sand-500)_/_0.05)] text-[hsl(var(--sand-500))] [&>svg]:text-[hsl(var(--sand-500))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--sand-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:border-[hsl(var(--sand-400)_/_0.2)] dark:bg-[hsl(var(--sand-900)_/_0.05)] dark:text-[hsl(var(--sand-400))] dark:[&>svg]:text-[hsl(var(--sand-400))] dark:before:bg-[hsl(var(--sand-900)_/_0.3)]",
        success: "border-[hsl(var(--teal-600)_/_0.2)] bg-[hsl(var(--teal-600)_/_0.05)] text-[hsl(var(--teal-600))] [&>svg]:text-[hsl(var(--teal-600))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--teal-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:border-[hsl(var(--teal-400)_/_0.2)] dark:bg-[hsl(var(--teal-900)_/_0.05)] dark:text-[hsl(var(--teal-400))] dark:[&>svg]:text-[hsl(var(--teal-400))] dark:before:bg-[hsl(var(--teal-900)_/_0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };