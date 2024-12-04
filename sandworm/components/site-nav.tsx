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

const sidebarNavItems = [
  {
    title: "Foundations",
    items: [
      {
        title: "Colors",
        href: "/colors",
      },
      {
        title: "Typography",
        href: "/typography",
      },
      {
        title: "Logo",
        href: "/logo",
      },
      {
        title: "Icons",
        href: "/icons",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/components/buttons",
      },
      {
        title: "Forms",
        href: "/components/forms",
      },
      {
        title: "Cards",
        href: "/components/cards",
      },
      {
        title: "Navigation",
        href: "/components/navigation",
      },
      {
        title: "Layout",
        href: "/components/layout",
      },
      {
        title: "Feedback",
        href: "/components/feedback",
      },
      {
        title: "Data Display",
        href: "/components/data-display",
      },
      {
        title: "Overlays",
        href: "/components/overlays",
      },
      {
        title: "Inputs",
        href: "/components/inputs",
      },
      {
        title: "Data Entry",
        href: "/components/data-entry",
      },
      {
        title: "Toggle",
        href: "/components/toggle",
      }
    ],
  },
  {
    title: "Guidelines",
    items: [
      {
        title: "Voice & Tone",
        href: "/guidelines/voice-tone",
      },
      {
        title: "Photography",
        href: "/guidelines/photography",
      },
      {
        title: "Animation",
        href: "/guidelines/animation",
      },
    ],
  },
  {
    title: "Assets",
    items: [
      {
        title: "Banners",
        href: "/assets/banners",
      },
    ],
  },
];

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
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "transparent"
                      )}
                    >
                      {item.title}
                    </Link>
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