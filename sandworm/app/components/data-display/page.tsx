import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableExample } from "./table-example";
import { AccordionExample } from "./accordion-example";
import { ScrollExample } from "./scroll-example";

export default function DataDisplayPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Display</h1>
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