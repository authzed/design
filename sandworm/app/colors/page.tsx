import { ColorTable } from '@/components/color-card';
import { semanticColors } from '@/lib/semantic-colors';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { StatusBadge } from '@/components/ui/status-badge';

interface ColorSwatch {
  label: string;
  variable: string;
  token?: string;
  darkToken?: string;
}

const colorScales = {
  stone: [
    { label: 'Stone 025', variable: '--stone-025', token: 'stone-025', darkToken: 'stone-025' },
    { label: 'Stone 050', variable: '--stone-050', token: 'stone-050', darkToken: 'stone-050' },
    { label: 'Stone 100', variable: '--stone-100', token: 'stone-100', darkToken: 'stone-100' },
    { label: 'Stone 150', variable: '--stone-150', token: 'stone-150', darkToken: 'stone-150' },
    { label: 'Stone 200', variable: '--stone-200', token: 'stone-200', darkToken: 'stone-200' },
    { label: 'Stone 300', variable: '--stone-300', token: 'stone-300', darkToken: 'stone-300' },
    { label: 'Stone 400', variable: '--stone-400', token: 'stone-400', darkToken: 'stone-400' },
    { label: 'Stone 500', variable: '--stone-500', token: 'stone-500', darkToken: 'stone-500' },
    { label: 'Stone 600', variable: '--stone-600', token: 'stone-600', darkToken: 'stone-600' },
    { label: 'Stone 700', variable: '--stone-700', token: 'stone-700', darkToken: 'stone-700' },
    { label: 'Stone 800', variable: '--stone-800', token: 'stone-800', darkToken: 'stone-800' },
    { label: 'Stone 850', variable: '--stone-850', token: 'stone-850', darkToken: 'stone-850' },
    { label: 'Stone 900', variable: '--stone-900', token: 'stone-900', darkToken: 'stone-900' },
    { label: 'Stone 950', variable: '--stone-950', token: 'stone-950', darkToken: 'stone-950' },
    { label: 'Stone 975', variable: '--stone-975', token: 'stone-975', darkToken: 'stone-975' },
  ],
  sand: [
    { label: 'Sand 025', variable: '--sand-025', token: 'sand-025', darkToken: 'sand-025' },
    { label: 'Sand 050', variable: '--sand-050', token: 'sand-050', darkToken: 'sand-050' },
    { label: 'Sand 100', variable: '--sand-100', token: 'sand-100', darkToken: 'sand-100' },
    { label: 'Sand 150', variable: '--sand-150', token: 'sand-150', darkToken: 'sand-150' },
    { label: 'Sand 200', variable: '--sand-200', token: 'sand-200', darkToken: 'sand-200' },
    { label: 'Sand 300', variable: '--sand-300', token: 'sand-300', darkToken: 'sand-300' },
    { label: 'Sand 400', variable: '--sand-400', token: 'sand-400', darkToken: 'sand-400' },
    { label: 'Sand 500', variable: '--sand-500', token: 'sand-500', darkToken: 'sand-500' },
    { label: 'Sand 600', variable: '--sand-600', token: 'sand-600', darkToken: 'sand-600' },
    { label: 'Sand 700', variable: '--sand-700', token: 'sand-700', darkToken: 'sand-700' },
    { label: 'Sand 800', variable: '--sand-800', token: 'sand-800', darkToken: 'sand-800' },
    { label: 'Sand 850', variable: '--sand-850', token: 'sand-850', darkToken: 'sand-850' },
    { label: 'Sand 900', variable: '--sand-900', token: 'sand-900', darkToken: 'sand-900' },
    { label: 'Sand 950', variable: '--sand-950', token: 'sand-950', darkToken: 'sand-950' },
    { label: 'Sand 975', variable: '--sand-975', token: 'sand-975', darkToken: 'sand-975' },
  ],
  red: [
    { label: 'Red 025', variable: '--red-025', token: 'red-025', darkToken: 'red-025' },
    { label: 'Red 050', variable: '--red-050', token: 'red-050', darkToken: 'red-050' },
    { label: 'Red 100', variable: '--red-100', token: 'red-100', darkToken: 'red-100' },
    { label: 'Red 150', variable: '--red-150', token: 'red-150', darkToken: 'red-150' },
    { label: 'Red 200', variable: '--red-200', token: 'red-200', darkToken: 'red-200' },
    { label: 'Red 300', variable: '--red-300', token: 'red-300', darkToken: 'red-300' },
    { label: 'Red 400', variable: '--red-400', token: 'red-400', darkToken: 'red-400' },
    { label: 'Red 500', variable: '--red-500', token: 'red-500', darkToken: 'red-500' },
    { label: 'Red 600', variable: '--red-600', token: 'red-600', darkToken: 'red-600' },
    { label: 'Red 700', variable: '--red-700', token: 'red-700', darkToken: 'red-700' },
    { label: 'Red 800', variable: '--red-800', token: 'red-800', darkToken: 'red-800' },
    { label: 'Red 850', variable: '--red-850', token: 'red-850', darkToken: 'red-850' },
    { label: 'Red 900', variable: '--red-900', token: 'red-900', darkToken: 'red-900' },
    { label: 'Red 950', variable: '--red-950', token: 'red-950', darkToken: 'red-950' },
    { label: 'Red 975', variable: '--red-975', token: 'red-975', darkToken: 'red-975' },
  ],
  blue: [
    { label: 'Blue 025', variable: '--blue-025', token: 'blue-025', darkToken: 'blue-025' },
    { label: 'Blue 050', variable: '--blue-050', token: 'blue-050', darkToken: 'blue-050' },
    { label: 'Blue 100', variable: '--blue-100', token: 'blue-100', darkToken: 'blue-100' },
    { label: 'Blue 150', variable: '--blue-150', token: 'blue-150', darkToken: 'blue-150' },
    { label: 'Blue 200', variable: '--blue-200', token: 'blue-200', darkToken: 'blue-200' },
    { label: 'Blue 300', variable: '--blue-300', token: 'blue-300', darkToken: 'blue-300' },
    { label: 'Blue 400', variable: '--blue-400', token: 'blue-400', darkToken: 'blue-400' },
    { label: 'Blue 500', variable: '--blue-500', token: 'blue-500', darkToken: 'blue-500' },
    { label: 'Blue 600', variable: '--blue-600', token: 'blue-600', darkToken: 'blue-600' },
    { label: 'Blue 700', variable: '--blue-700', token: 'blue-700', darkToken: 'blue-700' },
    { label: 'Blue 800', variable: '--blue-800', token: 'blue-800', darkToken: 'blue-800' },
    { label: 'Blue 850', variable: '--blue-850', token: 'blue-850', darkToken: 'blue-850' },
    { label: 'Blue 900', variable: '--blue-900', token: 'blue-900', darkToken: 'blue-900' },
    { label: 'Blue 950', variable: '--blue-950', token: 'blue-950', darkToken: 'blue-950' },
    { label: 'Blue 975', variable: '--blue-975', token: 'blue-975', darkToken: 'blue-975' },
  ],
  teal: [
    { label: 'Teal 025', variable: '--teal-025', token: 'teal-025', darkToken: 'teal-025' },
    { label: 'Teal 050', variable: '--teal-050', token: 'teal-050', darkToken: 'teal-050' },
    { label: 'Teal 100', variable: '--teal-100', token: 'teal-100', darkToken: 'teal-100' },
    { label: 'Teal 150', variable: '--teal-150', token: 'teal-150', darkToken: 'teal-150' },
    { label: 'Teal 200', variable: '--teal-200', token: 'teal-200', darkToken: 'teal-200' },
    { label: 'Teal 300', variable: '--teal-300', token: 'teal-300', darkToken: 'teal-300' },
    { label: 'Teal 400', variable: '--teal-400', token: 'teal-400', darkToken: 'teal-400' },
    { label: 'Teal 500', variable: '--teal-500', token: 'teal-500', darkToken: 'teal-500' },
    { label: 'Teal 600', variable: '--teal-600', token: 'teal-600', darkToken: 'teal-600' },
    { label: 'Teal 700', variable: '--teal-700', token: 'teal-700', darkToken: 'teal-700' },
    { label: 'Teal 800', variable: '--teal-800', token: 'teal-800', darkToken: 'teal-800' },
    { label: 'Teal 850', variable: '--teal-850', token: 'teal-850', darkToken: 'teal-850' },
    { label: 'Teal 900', variable: '--teal-900', token: 'teal-900', darkToken: 'teal-900' },
    { label: 'Teal 950', variable: '--teal-950', token: 'teal-950', darkToken: 'teal-950' },
    { label: 'Teal 975', variable: '--teal-975', token: 'teal-975', darkToken: 'teal-975' },
  ],
  violet: [
    { label: 'Violet 025', variable: '--violet-025', token: 'violet-025', darkToken: 'violet-025' },
    { label: 'Violet 050', variable: '--violet-050', token: 'violet-050', darkToken: 'violet-050' },
    { label: 'Violet 100', variable: '--violet-100', token: 'violet-100', darkToken: 'violet-100' },
    { label: 'Violet 150', variable: '--violet-150', token: 'violet-150', darkToken: 'violet-150' },
    { label: 'Violet 200', variable: '--violet-200', token: 'violet-200', darkToken: 'violet-200' },
    { label: 'Violet 300', variable: '--violet-300', token: 'violet-300', darkToken: 'violet-300' },
    { label: 'Violet 400', variable: '--violet-400', token: 'violet-400', darkToken: 'violet-400' },
    { label: 'Violet 500', variable: '--violet-500', token: 'violet-500', darkToken: 'violet-500' },
    { label: 'Violet 600', variable: '--violet-600', token: 'violet-600', darkToken: 'violet-600' },
    { label: 'Violet 700', variable: '--violet-700', token: 'violet-700', darkToken: 'violet-700' },
    { label: 'Violet 800', variable: '--violet-800', token: 'violet-800', darkToken: 'violet-800' },
    { label: 'Violet 850', variable: '--violet-850', token: 'violet-850', darkToken: 'violet-850' },
    { label: 'Violet 900', variable: '--violet-900', token: 'violet-900', darkToken: 'violet-900' },
    { label: 'Violet 950', variable: '--violet-950', token: 'violet-950', darkToken: 'violet-950' },
    { label: 'Violet 975', variable: '--violet-975', token: 'violet-975', darkToken: 'violet-975' },
  ],
};

export default function ColorsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
          <StatusBadge status="ready" />
        </div>
        <p className="text-lg text-muted-foreground">
          Our color system includes both semantic tokens for UI components and a foundational color scale.
        </p>
      </div>

      <section id="semantic-colors">
        <Collapsible defaultOpen className="space-y-6">
          <div className="flex items-center space-x-4">
            <CollapsibleTrigger className="group flex items-center space-x-2 hover:text-muted-foreground transition-colors">
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:rotate-[-90deg]" />
              <h2 className="text-2xl font-semibold">Semantic Colors</h2>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="[&_tr_td]:py-0">
              <ColorTable colors={semanticColors} showModes={true} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section id="color-scale">
        <Collapsible defaultOpen className="space-y-6">
          <div className="flex items-center space-x-4">
            <CollapsibleTrigger className="group flex items-center space-x-2 hover:text-muted-foreground transition-colors">
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:rotate-[-90deg]" />
              <h2 className="text-2xl font-semibold">Color Scale</h2>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            {Object.entries(colorScales).map(([name, colors]) => (
              <div key={name} className="mb-8">
                <h3 className="text-lg font-semibold capitalize mb-4">{name}</h3>
                <div className="[&_tr_td]:py-0">
                  <ColorTable colors={colors} />
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </section>
    </div>
  );
}