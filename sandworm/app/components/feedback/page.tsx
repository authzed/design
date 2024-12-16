'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { alertExamples } from "./alert-examples";
import { CodePreview } from "@/components/code-preview";
import { ToastExamples } from "./toast-examples";
import { ProgressExample } from "./progress-example";
import { AlertDialogExample } from "./alert-dialog-example";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';

export default function FeedbackPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Feedback</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Components for providing feedback to users through alerts, toasts, and progress indicators.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Alerts</h2>
          <div className="space-y-8">
            {alertExamples.map((alert) => (
              <Card key={alert.variant}>
                <CardHeader>
                  <CardTitle className="capitalize">{alert.variant} Alert</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant={alert.variant}>
                    <alert.icon className="h-4 w-4" />
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                  </Alert>
                  <CodePreview 
                    usage={alert.usage}
                    imports={alert.imports}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Toast Notifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>Example Toasts</CardTitle>
            </CardHeader>
            <CardContent>
              <ToastExamples />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Progress Indicators</h2>
          <Card>
            <CardHeader>
              <CardTitle>Progress Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgressExample />

              <div className="space-y-2">
                <Progress value={33} className="w-full" />
                <p className="text-sm text-muted-foreground">33% Complete</p>
              </div>

              <div className="space-y-2">
                <Progress value={66} className="w-full" />
                <p className="text-sm text-muted-foreground">66% Complete</p>
              </div>

              <div className="space-y-2">
                <Progress value={100} className="w-full" />
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Alert Dialog</h2>
          <Card>
            <CardHeader>
              <CardTitle>Alert Dialog Example</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialogExample />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}