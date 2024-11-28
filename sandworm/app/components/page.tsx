import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Square, Type, FileText, Layout, Menu, Bell, Calendar, Sliders, FileInput, ToggleLeft } from "lucide-react";

const components = [
  {
    title: "Buttons",
    description: "Button components with different variants, sizes, and states.",
    href: "/components/buttons",
    icon: Square,
  },
  {
    title: "Forms",
    description: "Form components including inputs, checkboxes, and radios.",
    href: "/components/forms",
    icon: Type,
  },
  {
    title: "Cards",
    description: "Card components for displaying content in a contained format.",
    href: "/components/cards",
    icon: FileText,
  },
  {
    title: "Navigation",
    description: "Navigation components including menus, breadcrumbs, and tabs.",
    href: "/components/navigation",
    icon: Menu,
  },
  {
    title: "Layout",
    description: "Layout components for structuring page content.",
    href: "/components/layout",
    icon: Layout,
  },
  {
    title: "Feedback",
    description: "Feedback components like alerts, toasts, and progress indicators.",
    href: "/components/feedback",
    icon: Bell,
  },
  {
    title: "Data Display",
    description: "Components for displaying data in tables, lists, and grids.",
    href: "/components/data-display",
    icon: Calendar,
  },
  {
    title: "Overlays",
    description: "Modal dialogs, popovers, and other overlay components.",
    href: "/components/overlays",
    icon: Sliders,
  },
  {
    title: "Inputs",
    description: "Input components for text, numbers, and other data types.",
    href: "/components/inputs",
    icon: FileInput,
  },
  {
    title: "Data Entry",
    description: "Components for entering and editing data.",
    href: "/components/data-entry",
    icon: Square,
  },
  {
    title: "Toggle",
    description: "Toggle components for switching between states.",
    href: "/components/toggle",
    icon: ToggleLeft,
  }
];

export default function ComponentsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore our collection of reusable UI components built with accessibility and customization in mind.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link key={component.href} href={component.href} className="group">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-8 w-8 text-primary mb-2">
                  <component.icon className="h-full w-full" />
                </div>
                <CardTitle>{component.title}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-primary group-hover:underline inline-flex items-center">
                  View Component
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Usage Guidelines</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Accessibility First</h3>
              <p className="text-muted-foreground">
                All components are built with accessibility in mind, following WCAG guidelines.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Customization</h3>
              <p className="text-muted-foreground">
                Components can be customized using Tailwind CSS classes and variants.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Responsive Design</h3>
              <p className="text-muted-foreground">
                Components are designed to work seamlessly across all screen sizes.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}