"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from "@/hooks/use-page-status";

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Buttons</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Interactive button components with different variants, sizes, and states.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Variants</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Sizes</h2>
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Large</Button>
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">States</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button disabled variant="secondary">
                Disabled
              </Button>
              <Button onClick={handleLoadingClick} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Click to Load"
                )}
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">With Icons</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Login with Email
              </Button>
              <Button variant="secondary">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Small with Icon
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
              <div className="flex justify-center">
                <Button variant="secondary" size="lg" className="w-full max-w-sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe to Newsletter
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Back
                </Button>
                <Button size="sm">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}