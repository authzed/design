"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Status } from "@/components/ui/status-badge";

interface NavItem {
  title: string;
  href: string;
  status?: Status;
  items?: NavItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sidebarNavItems: NavSection[] = [
  {
    title: "Foundations",
    items: [
      {
        title: "Colors",
        href: "/colors",
        status: "ready",
        items: [
          {
            title: "Semantic Colors",
            href: "/colors#semantic-colors",
          },
          {
            title: "Color Scale",
            href: "/colors#color-scale",
          },
        ],
      },
      {
        title: "Typography",
        href: "/typography",
        status: "ready",
      },
      {
        title: "Logo",
        href: "/logo",
        status: "ready",
        items: [
          {
            title: "Logo Variations",
            href: "/logo#logo-variations",
          },
          {
            title: "Usage Guidelines",
            href: "/logo#usage-guidelines",
          },
        ],
      },
      {
        title: "Icons",
        href: "/icons",
        status: "coming-soon",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/components/buttons",
        status: "ready",
      },
      {
        title: "Forms",
        href: "/components/forms",
        status: "wip",
      },
      {
        title: "Cards",
        href: "/components/cards",
        status: "coming-soon",
      },
      {
        title: "Navigation",
        href: "/components/navigation",
        status: "coming-soon",
      },
      {
        title: "Tables",
        href: "/components/tables",
        status: "coming-soon",
      },
      {
        title: "Tabs",
        href: "/components/tabs",
        status: "coming-soon",
      },
      {
        title: "Tooltips",
        href: "/components/tooltips",
        status: "coming-soon",
      },
      {
        title: "Modals",
        href: "/components/modals",
        status: "coming-soon",
      },
      {
        title: "Layout",
        href: "/components/layout",
        status: "coming-soon",
      },
      {
        title: "Data Display",
        href: "/components/data-display",
        status: "coming-soon",
      },
      {
        title: "Data Entry",
        href: "/components/data-entry",
        status: "coming-soon",
      },
      {
        title: "Feedback",
        href: "/components/feedback",
        status: "coming-soon",
      },
      {
        title: "Inputs",
        href: "/components/inputs",
        status: "coming-soon",
      },
      {
        title: "Overlays",
        href: "/components/overlays",
        status: "coming-soon",
      },
      {
        title: "Toggle",
        href: "/components/toggle",
        status: "coming-soon",
      },
    ],
  },
  {
    title: "Guidelines",
    items: [
      {
        title: "Voice & Tone",
        href: "/guidelines/voice-tone",
        status: "wip"
      },
      {
        title: "Photography",
        href: "/guidelines/photography",
        status: "coming-soon"
      },
      {
        title: "Animation",
        href: "/guidelines/animation",
        status: "coming-soon"
      },
    ],
  },
  {
    title: "Assets",
    items: [
      {
        title: "Banners",
        href: "/assets/banners",
        status: "coming-soon"
      },
    ],
  },
];

const statusConfig = {
  ready: {
    dotColor: "bg-green-500",
  },
  wip: {
    dotColor: "bg-yellow-500",
  },
  deprecated: {
    dotColor: "bg-red-500",
  },
  "coming-soon": {
    dotColor: "bg-slate-500",
  },
};

interface SiteNavProps {
  className?: string;
}

export function SiteNav({ className }: SiteNavProps) {
  const pathname = usePathname();

  // Find which section contains the current path
  const defaultSection = sidebarNavItems.findIndex(section =>
    section.items.some(item => pathname?.startsWith(item.href))
  );

  return (
    <div className={cn(
      "fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block",
      className
    )}>
      <div className="h-full py-6 pl-8 pr-6 lg:py-8">
        <Accordion 
          type="multiple" 
          defaultValue={sidebarNavItems.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {sidebarNavItems.map((section, index) => (
            <AccordionItem key={section.title} value={`item-${index}`}>
              <AccordionTrigger className="text-sm">{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-1">
                  {section.items.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href || pathname.startsWith(item.href + "#")
                            ? "bg-accent text-accent-foreground"
                            : "transparent"
                        )}
                      >
                        <span>{item.title}</span>
                        {item.status && (
                          <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[item.status].dotColor)} />
                        )}
                      </Link>
                      {item.items && (pathname === item.href || pathname.startsWith(item.href + "#")) && (
                        <div className="ml-4 mt-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                                pathname.endsWith(subItem.href.split("#")[1])
                                  ? "bg-accent/50 text-accent-foreground"
                                  : "transparent"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}