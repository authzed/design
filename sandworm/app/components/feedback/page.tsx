import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { alertExamples } from "./alert-examples";
import { CodePreview } from "@/components/code-preview";
import { ToastExamples } from "./toast-examples";
import { ProgressExample } from "./progress-example";
import { AlertDialogExample } from "./alert-dialog-example";
import { StatusBadge } from "@/components/ui/status-badge";

export default function FeedbackPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
          <StatusBadge status="coming-soon" />
        </div>
        <p className="text-lg text-muted-foreground">
          Components for providing feedback and notifications to users.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Alerts</h2>
          <div className="space-y-8">
            {alertExamples.map((alert) => (
              <Card key={alert.variant}>
                <CardHeader>
                  <CardTitle className="capitalize">{alert.variant} Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Alert variant={alert.variant}>
                        <alert.icon className="h-4 w-4" />
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.description}</AlertDescription>
                      </Alert>
                    </div>
                    <div>
                      <CodePreview 
                        usage={alert.usage}
                        imports={alert.imports}
                      />
                    </div>
                  </div>
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <ToastExamples />
                </div>
                <div>
                  <CodePreview 
                    usage={`<Button onClick={() => toast({ title: "Success", description: "Action completed successfully" })}>
  Show Toast
</Button>`}
                    imports={`import { toast } from "@/components/ui/use-toast"`}
                  />
                </div>
              </div>
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
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
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
                </div>
                <div>
                  <CodePreview 
                    usage={`<Progress value={33} className="w-full" />`}
                    imports={`import { Progress } from "@/components/ui/progress"`}
                  />
                </div>
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <AlertDialogExample />
                </div>
                <div>
                  <CodePreview 
                    usage={`<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
                    imports={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}