"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodePreviewProps {
  usage: string;
  component?: string;
  imports?: string;
  className?: string;
}

export function CodePreview({ usage, component, imports, className }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative rounded-lg border border-[hsl(var(--stone-900))] bg-[hsl(var(--stone-800))] ${className}`}>
      <Tabs defaultValue="usage" className="w-full">
        <div className="flex items-center justify-between px-2 pt-2">
          <TabsList className="bg-[hsl(var(--stone-850))]">
            <TabsTrigger 
              value="usage"
              className="data-[state=active]:bg-[hsl(var(--stone-600))] data-[state=active]:text-[hsl(var(--violet-100))]"
            >
              Usage
            </TabsTrigger>
            {component && (
              <TabsTrigger 
                value="component"
                className="data-[state=active]:bg-[hsl(var(--stone-600))] data-[state=active]:text-[hsl(var(--violet-100))]"
              >
                Component
              </TabsTrigger>
            )}
            {imports && (
              <TabsTrigger 
                value="imports"
                className="data-[state=active]:bg-[hsl(var(--stone-600))] data-[state=active]:text-[hsl(var(--violet-100))]"
              >
                Imports
              </TabsTrigger>
            )}
          </TabsList>
          <Button
            size="icon"
            variant="ghost"
            className="text-[hsl(var(--violet-100))] hover:text-[hsl(var(--violet-200))] hover:bg-[hsl(var(--stone-700))]"
            onClick={() => {
              const textToCopy = [
                imports,
                component ? "\n// Component Definition\n" + component : "",
                "\n// Usage\n" + usage
              ].filter(Boolean).join("\n");
              copyToClipboard(textToCopy);
            }}
          >
            {copied ? (
              <Check className="h-4 w-4 text-[hsl(var(--teal-400))]" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <TabsContent 
          value="usage" 
          className="p-4 text-[hsl(var(--violet-100))] rounded-b-lg"
        >
          <pre className="overflow-x-auto">
            <code className="block text-sm font-mono">{usage}</code>
          </pre>
        </TabsContent>
        {component && (
          <TabsContent 
            value="component" 
            className="p-4 text-[hsl(var(--violet-100))] rounded-b-lg"
          >
            <pre className="overflow-x-auto">
              <code className="block text-sm font-mono">{component}</code>
            </pre>
          </TabsContent>
        )}
        {imports && (
          <TabsContent 
            value="imports" 
            className="p-4 text-[hsl(var(--violet-100))] rounded-b-lg"
          >
            <pre className="overflow-x-auto">
              <code className="block text-sm font-mono">{imports}</code>
            </pre>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}