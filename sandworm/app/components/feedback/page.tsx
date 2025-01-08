'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { alertExamples } from "./alert-examples";
import { CodePreview } from "@/components/code-preview";
import { ToastExamples } from "./toast-examples/index";
import { toastExamples } from "./toast-examples/data";
import type { ToastExample } from "./toast-examples/types";
import { ProgressExample } from "./progress-example";
import { AlertDialogExample } from "./alert-dialog-example";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

export default function FeedbackPage() {
  const [showAlertCode, setShowAlertCode] = useState(false);
  const [showToastCode, setShowToastCode] = useState(false);
  const [showProgressCode, setShowProgressCode] = useState(false);
  const [showDialogCode, setShowDialogCode] = useState(false);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Feedback</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground">
          Components for providing feedback to users through alerts, toasts, and progress indicators.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Alerts</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAlertCode(!showAlertCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showAlertCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6">
              {alertExamples.map((alert) => (
                <div key={alert.variant} className="space-y-4">
                  <Alert variant={alert.variant}>
                    <alert.icon className="h-4 w-4" />
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                  </Alert>
                  {showAlertCode && (
                    <CodePreview 
                      usage={alert.usage}
                      imports={alert.imports}
                      component={`npx shadcn-ui@latest add alert`}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Toast Notifications</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowToastCode(!showToastCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showToastCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-4">
                <ToastExamples />
                {showToastCode && (
                  <div className="space-y-4">
                    {toastExamples.map((toast: ToastExample, index: number) => (
                      <CodePreview 
                        key={index}
                        usage={toast.usage}
                        imports={toast.imports}
                        component={`npx shadcn-ui@latest add toast`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Progress</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowProgressCode(!showProgressCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showProgressCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-4">
                <ProgressExample />
                {showProgressCode && (
                  <div className="space-y-4">
                    <CodePreview 
                      usage={`// Default Progress
const [progress, setProgress] = useState(0)

<Progress value={progress} className="w-full h-[6px]" />`}
                      imports={`import { Progress } from "@/components/ui/progress"`}
                      component={`npx shadcn-ui@latest add progress`}
                    />
                    <CodePreview 
                      usage={`// Gradient Progress
const [progress, setProgress] = useState(0)

<Progress 
  value={progress} 
  className={cn(
    "w-full h-[6px]",
    "[&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:via-purple-500 [&>div]:to-pink-500"
  )}
/>`}
                      imports={`import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"`}
                      component={`npx shadcn-ui@latest add progress`}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Alert Dialog</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDialogCode(!showDialogCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showDialogCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-4">
                <AlertDialogExample />
                {showDialogCode && (
                  <CodePreview 
                    usage={`<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
                    imports={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}
                    component={`npx shadcn-ui@latest add alert-dialog`}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}