import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Type,
  Blend,
  Hexagon,
  Shapes,
  MousePointerClick,
  ClipboardList,
  LayoutPanelTop,
  Compass,
  LayoutGrid,
  Bell,
  Table,
  Layers,
  TextCursorInput,
  FormInput,
  ToggleLeft,
  Workflow,
  BarChart3,
  Accessibility,
  Quote,
  Camera,
  Sparkles,
  Image as ImageIcon,
  Images,
  Slack,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";

interface HubItem {
  name: string;
  href: string;
  icon: LucideIcon;
  tagline: string;
  isNew?: boolean;
}

interface HubGroup {
  label: string;
  /** Tailwind text-color class for the item icons in this group. */
  accent: string;
  items: HubItem[];
}

// Section data mirrors components/site-nav.tsx → sidebarNavItems.
const groups: HubGroup[] = [
  {
    label: "Foundations",
    accent: "text-sand-300",
    items: [
      { name: "Colors", href: "/colors", icon: Palette, tagline: "Seven families, fifteen stops each" },
      { name: "Typography", href: "/typography", icon: Type, tagline: "Type scale, weights, expressive headlines" },
      { name: "Gradients", href: "/gradients", icon: Blend, tagline: "The temperature matrix — warm, cool, spectrum", isNew: true },
      { name: "Logo", href: "/logo", icon: Hexagon, tagline: "Marks, lockups, and clear-space rules" },
      { name: "Icons", href: "/icons", icon: Shapes, tagline: "Lucide at 2px, the Sandworm way" },
    ],
  },
  {
    label: "Components",
    accent: "text-magenta-400",
    items: [
      { name: "Buttons", href: "/components/buttons", icon: MousePointerClick, tagline: "Brand CTAs and app controls" },
      { name: "Forms", href: "/components/forms", icon: ClipboardList, tagline: "Inputs, validation, and layout" },
      { name: "Cards", href: "/components/cards", icon: LayoutPanelTop, tagline: "Dark marketing and base surfaces" },
      { name: "Navigation", href: "/components/navigation", icon: Compass, tagline: "Menus, tabs, and breadcrumbs" },
      { name: "Layout", href: "/components/layout", icon: LayoutGrid, tagline: "Grids, separators, and panels" },
      { name: "Feedback", href: "/components/feedback", icon: Bell, tagline: "Toasts, alerts, and progress" },
      { name: "Data Display", href: "/components/data-display", icon: Table, tagline: "Tables, accordions, and lists" },
      { name: "Overlays", href: "/components/overlays", icon: Layers, tagline: "Dialogs, popovers, and sheets" },
      { name: "Inputs", href: "/components/inputs", icon: TextCursorInput, tagline: "Text fields and search" },
      { name: "Data Entry", href: "/components/data-entry", icon: FormInput, tagline: "Sliders, switches, and calendars" },
      { name: "Toggle", href: "/components/toggle", icon: ToggleLeft, tagline: "Toggles and toggle groups" },
    ],
  },
  {
    label: "Patterns",
    accent: "text-teal-400",
    items: [
      { name: "Diagrams", href: "/diagrams", icon: Workflow, tagline: "Six primitives, one color language", isNew: true },
      { name: "Data Viz", href: "/dataviz", icon: BarChart3, tagline: "Chart palettes for every series count", isNew: true },
    ],
  },
  {
    label: "Guidelines",
    accent: "text-violet-400",
    items: [
      { name: "Accessibility", href: "/accessibility", icon: Accessibility, tagline: "Contrast, focus, and motion safety", isNew: true },
      { name: "Voice & Tone", href: "/guidelines/voice-tone", icon: Quote, tagline: "How AuthZed sounds" },
      { name: "Photography", href: "/guidelines/photography", icon: Camera, tagline: "Imagery direction (coming soon)" },
      { name: "Animation", href: "/guidelines/animation", icon: Sparkles, tagline: "Motion canon — and why we don't bounce" },
    ],
  },
  {
    label: "Assets",
    accent: "text-blue-400",
    items: [
      { name: "Banners", href: "/assets/banners", icon: ImageIcon, tagline: "Ready-made banner treatments" },
      { name: "Logo Cloud", href: "/assets/logo-cloud", icon: Images, tagline: "Customer and partner logo walls" },
    ],
  },
  {
    label: "Tools",
    accent: "text-stone-400",
    items: [
      { name: "Slack Theme", href: "/tools/slack-theme", icon: Slack, tagline: "Branded Slack color themes" },
      { name: "Email Signature", href: "/tools/email-signature", icon: Mail, tagline: "Generate a branded signature" },
    ],
  },
];

const quicklinks = [
  { label: "New here? Start with Colors", href: "/colors" },
  { label: "Building a page? Browse Components", href: "/components/buttons" },
  { label: "Need brand assets? Logo & Banners", href: "/logo" },
];

export default function Home() {
  return (
    <Container className="space-y-16 pb-16">
      {/* Hero — the brand mark moment */}
      <header className="max-w-3xl space-y-6 pt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Sandworm Design System
        </p>
        <h1 className="text-6xl font-light tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-r from-sand-300 via-red-400 to-violet-600 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Sandworm
          </span>
        </h1>
        <div className="space-y-4">
          <p className="text-2xl font-light text-foreground/90">
            The foundation of AuthZed&apos;s design.
          </p>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Like the sandworms of Arrakis, it&apos;s always there—just beneath the surface—providing
            the structure and resources we need to create cohesive, scalable, and user-friendly
            experiences. Whether you&apos;re designing something new or refining what exists, Sandworm
            keeps every surface consistent and on-brand.
          </p>
        </div>

        {/* Quicklinks */}
        <nav className="flex flex-col gap-2 pt-2">
          {quicklinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group inline-flex w-fit items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
            >
              {q.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </nav>
      </header>

      {/* Section hub — grouped card grids */}
      <div className="space-y-14">
        {groups.map((group) => (
          <section key={group.label} className="space-y-5">
            <h2 className="border-b border-border pb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="group">
                    <div className="flex h-full items-start gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:border-magenta-600/40 hover:shadow-[0_0_22px_rgba(165,49,138,0.10)]">
                      <Icon className={`mt-0.5 h-6 w-6 shrink-0 ${group.accent}`} strokeWidth={1.75} />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{item.name}</span>
                          {item.isNew && (
                            <span className="rounded-full bg-magenta-600/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-magenta-700 dark:text-magenta-300">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-light leading-snug text-muted-foreground">
                          {item.tagline}
                        </p>
                      </div>
                      <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
