"use client";

import React, { type FC } from "react";
import { Button } from "../../../../components/ui/button";
import { useToast } from "../../../../hooks/use-toast";
import { toastExamples } from "./data";
import type { ToastExample } from "./types";
import { cn } from "../../../../lib/utils";

export const ToastExamples: FC = () => {
  const { toast } = useToast();

  const getButtonStyles = (variant: ToastExample["variant"]) => {
    switch (variant?.toLowerCase()) {
      case "error":
        return "border-[hsl(var(--red-600)_/_0.2)] bg-[hsl(var(--red-600)_/_0.05)] text-[hsl(var(--red-600))] hover:bg-[hsl(var(--red-800)_/_0.075)] hover:text-[hsl(var(--red-800))] dark:border-[hsl(var(--red-400)_/_0.2)] dark:bg-[hsl(var(--red-900)_/_0.05)] dark:text-[hsl(var(--red-400))] dark:hover:bg-[hsl(var(--red-900)_/_0.075)] dark:hover:text-[hsl(var(--red-200))]";
      case "warning":
        return "border-[hsl(var(--sand-500)_/_0.2)] bg-[hsl(var(--sand-500)_/_0.05)] text-[hsl(var(--sand-500))] hover:bg-[hsl(var(--sand-700)_/_0.075)] hover:text-[hsl(var(--sand-700))] dark:border-[hsl(var(--sand-400)_/_0.2)] dark:bg-[hsl(var(--sand-900)_/_0.05)] dark:text-[hsl(var(--sand-400))] dark:hover:bg-[hsl(var(--sand-900)_/_0.075)] dark:hover:text-[hsl(var(--sand-200))]";
      case "success":
        return "border-[hsl(var(--teal-600)_/_0.2)] bg-[hsl(var(--teal-600)_/_0.05)] text-[hsl(var(--teal-600))] hover:bg-[hsl(var(--teal-800)_/_0.075)] hover:text-[hsl(var(--teal-800))] dark:border-[hsl(var(--teal-400)_/_0.2)] dark:bg-[hsl(var(--teal-900)_/_0.05)] dark:text-[hsl(var(--teal-400))] dark:hover:bg-[hsl(var(--teal-900)_/_0.075)] dark:hover:text-[hsl(var(--teal-200))]";
      case "info":
        return "border-[hsl(var(--blue-700)_/_0.2)] bg-[hsl(var(--blue-700)_/_0.05)] text-[hsl(var(--blue-700))] hover:bg-[hsl(var(--blue-800)_/_0.075)] hover:text-[hsl(var(--blue-800))] dark:border-[hsl(var(--blue-400)_/_0.2)] dark:bg-[hsl(var(--blue-900)_/_0.05)] dark:text-[hsl(var(--blue-400))] dark:hover:bg-[hsl(var(--blue-900)_/_0.075)] dark:hover:text-[hsl(var(--blue-300))]";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {toastExamples.map((example: ToastExample, index: number) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => {
            const Icon = example.icon;
            toast({
              variant: example.variant,
              title: example.title,
              description: example.description,
              icon: <Icon className="h-4 w-4" />,
              className: cn(
                "backdrop-blur-xl relative overflow-hidden [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 min-h-[3.5rem] flex-col items-start",
                example.variant === "info" 
                  ? "border-[hsl(var(--blue-700)_/_0.2)] bg-[hsl(var(--blue-700)_/_0.05)] text-[hsl(var(--blue-700))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--blue-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:before:bg-[hsl(var(--blue-900)_/_0.3)] dark:border-[hsl(var(--blue-400)_/_0.2)] dark:bg-[hsl(var(--blue-900)_/_0.05)] dark:text-[hsl(var(--blue-400))]"
                  : example.variant === "success"
                  ? "border-[hsl(var(--teal-600)_/_0.2)] bg-[hsl(var(--teal-600)_/_0.05)] text-[hsl(var(--teal-600))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--teal-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:before:bg-[hsl(var(--teal-900)_/_0.3)] dark:border-[hsl(var(--teal-400)_/_0.2)] dark:bg-[hsl(var(--teal-900)_/_0.05)] dark:text-[hsl(var(--teal-400))]"
                  : example.variant === "error"
                  ? "border-[hsl(var(--red-600)_/_0.2)] bg-[hsl(var(--red-600)_/_0.05)] text-[hsl(var(--red-600))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--red-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:before:bg-[hsl(var(--red-900)_/_0.3)] dark:border-[hsl(var(--red-400)_/_0.2)] dark:bg-[hsl(var(--red-900)_/_0.05)] dark:text-[hsl(var(--red-400))]"
                  : "border-[hsl(var(--sand-500)_/_0.2)] bg-[hsl(var(--sand-500)_/_0.05)] text-[hsl(var(--sand-500))] before:absolute before:inset-0 before:-z-10 before:bg-[hsl(var(--sand-100)_/_0.3)] after:absolute after:inset-0 after:-z-20 after:bg-[hsl(var(--background)_/_0.8)] dark:before:bg-[hsl(var(--sand-900)_/_0.3)] dark:border-[hsl(var(--sand-400)_/_0.2)] dark:bg-[hsl(var(--sand-900)_/_0.05)] dark:text-[hsl(var(--sand-400))]"
              ),
            });
          }}
          className={cn(
            "gap-2",
            getButtonStyles(example.variant)
          )}
        >
          <example.icon className="h-4 w-4" />
          Show {example.title} Toast
        </Button>
      ))}
    </div>
  );
}; 