import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LayoutPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Layout</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Components for structuring and organizing page content.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Resizable Panels</h2>
          <Card>
            <CardHeader>
              <CardTitle>Resizable Layout Example</CardTitle>
            </CardHeader>
            <CardContent>
              <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-full rounded-lg border">
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Sidebar</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Main Content</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Separator</h2>
          <Card>
            <CardHeader>
              <CardTitle>Content Separation Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Section One</h3>
                  <p className="text-muted-foreground">Content for section one.</p>
                </div>
                <Separator className="my-4" />
                <div>
                  <h3 className="text-lg font-medium">Section Two</h3>
                  <p className="text-muted-foreground">Content for section two.</p>
                </div>
                <Separator className="my-4" />
                <div>
                  <h3 className="text-lg font-medium">Section Three</h3>
                  <p className="text-muted-foreground">Content for section three.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Scroll Area</h2>
          <Card>
            <CardHeader>
              <CardTitle>Scrollable Container Example</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-72 w-full rounded-md border p-4">
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-sm font-medium">Section {i + 1}</h4>
                      <p className="text-sm text-muted-foreground">
                        This is an example of scrollable content. You can add as much content as needed,
                        and it will be contained within a scrollable area.
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Grid Layout</h2>
          <Card>
            <CardHeader>
              <CardTitle>Grid Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card p-4 text-card-foreground"
                  >
                    <div className="text-sm font-medium">Grid Item {i + 1}</div>
                    <p className="text-sm text-muted-foreground">
                      Example content for grid item
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}