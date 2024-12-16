"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, X } from "lucide-react";

interface GuidelineItem {
  text: string;
}

interface GuidelinesCardProps {
  type: "do" | "dont";
  items: GuidelineItem[];
}

export function GuidelinesCard({ type, items }: GuidelinesCardProps) {
  const isDo = type === "do";
  
  return (
    <Alert 
      variant={isDo ? "success" : "error"}
      className=""
    >
      <AlertTitle className="text-xl">
        {isDo ? "Do" : "Don't"}
      </AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-2">
          {items.map((item, index) => (
            <li 
              key={index}
              className="flex items-start gap-2"
            >
              <span 
                className={`mt-1.5 h-1 w-1 rounded-full ${
                  isDo 
                    ? "bg-teal-600 dark:bg-teal-400" 
                    : "bg-red-600 dark:bg-red-400"
                }`}
                aria-hidden="true"
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}