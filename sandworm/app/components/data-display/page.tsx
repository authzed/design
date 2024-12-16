'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableExample } from "./table-example";
import { AccordionExample } from "./accordion-example";
import { ScrollExample } from "./scroll-example";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';

export default function DataDisplayPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Data Display</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Components for displaying data in tables, lists, and other formats.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Tables</h2>
          <Card>
            <CardHeader>
              <CardTitle>Example Table</CardTitle>
            </CardHeader>
            <CardContent>
              <TableExample />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Accordion</h2>
          <Card>
            <CardHeader>
              <CardTitle>FAQ Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <AccordionExample />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Scrollable Content</h2>
          <Card>
            <CardHeader>
              <CardTitle>Scrollable Area</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollExample />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}