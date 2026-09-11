'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { usePageStatus } from '@/hooks/use-page-status';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function TypographyPage() {
  const [openSections, setOpenSections] = useState({
    inter: true,
    mono: true,
    weights: true,
    styles: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sizes = [
    { name: 'Extra Small', class: 'textextrasmall', specs: '12px / 15.6px' },
    { name: 'Small', class: 'textsmall', specs: '14px / 18.2px' },
    { name: 'Base', class: 'textbase', specs: '16px / 20.8px' },
    { name: 'Large', class: 'textlarge', specs: '18px / 23.4px' },
    { name: 'Extra Large', class: 'textextralarge', specs: '20px / 24px' },
    { name: '2X Large', class: 'text2xlarge', specs: '24px / 28.8px' },
    { name: '3X Large', class: 'text3xlarge', specs: '30px / 30px' },
    { name: '4X Large', class: 'text4xlarge', specs: '36px / 36px' },
    { name: '5X Large', class: 'text5xlarge', specs: '48px / 48px' },
    { name: '6X Large', class: 'text6xlarge', specs: '60px / 57px' },
    { name: '7X Large', class: 'text7xlarge', specs: '72px / 64.8px' },
    { name: '8X Large', class: 'text8xlarge', specs: '96px / 86.4px' },
    { name: '9X Large', class: 'text9xlarge', specs: '128px / 115.2px' },
  ];

  const monoSizes = [
    { name: 'Mono Extra Small', class: 'mono-extrasmall', specs: '12px / 15.6px' },
    { name: 'Mono Small', class: 'mono-small', specs: '14px / 18.2px' },
    { name: 'Mono Base', class: 'mono-base', specs: '16px / 20.8px' },
    { name: 'Mono Large', class: 'mono-large', specs: '18px / 23.4px' },
    { name: 'Mono Extra Large', class: 'mono-extralarge', specs: '20px / 24px' },
  ];

  // Ordered by real shipped frequency in authzed.com, not by numeric weight.
  // Sandworm is a two-weight pairing (light sets up, semibold lands), not a five-weight ramp.
  const weights = [
    { name: 'Light', class: 'light', tw: 'font-light', weight: '300', uses: 295,
      role: 'Headlines and marketing body. The brand default.' },
    { name: 'Semibold', class: 'semibold', tw: 'font-semibold', weight: '600', uses: 223,
      role: 'The emphasis clause in a headline. UI labels.' },
    { name: 'Medium', class: 'medium', tw: 'font-medium', weight: '500', uses: 161,
      role: 'Dense UI only \u2014 table headers, small controls.' },
    { name: 'Bold', class: 'bold', tw: 'font-bold', weight: '700', uses: 51,
      role: 'Off-system for marketing. Use Semibold instead.' },
    { name: 'Regular', class: 'regular', tw: 'font-normal', weight: '400', uses: 29,
      role: 'Rare. Product UI body where light is too airy.' },
  ];

  const styles = [
    { name: 'Italic', class: 'italic' },
    { name: 'Underlined', class: 'underlined' },
    { name: 'Strikethrough', class: 'strikethrough' },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Typography</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <h2 className="text-2xl">Clear Communication Through Type</h2>
        <p className="text-lg text-muted-foreground">
          Our typography system is built on Inter for its exceptional readability and JetBrains Mono for code. 
          This combination delivers optimal legibility across all screen sizes while maintaining a professional, 
          modern aesthetic that aligns with our brand identity.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Headline Pairing</h2>
            <p className="mt-2 text-muted-foreground">
              The most load-bearing rule in the system. A display headline is two clauses: a{' '}
              <code className="bg-muted px-1 py-0.5 rounded">font-light</code> setup and a{' '}
              <code className="bg-muted px-1 py-0.5 rounded">font-semibold</code> payoff. The weight
              change carries the hierarchy, so the type size does not have to.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="text-4xl leading-none">
              <span className="font-light">
                AI Moves Fast.
                <br />
                <span className="font-semibold">Permissions Must Keep Up.</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The canonical hero, from{' '}
              <code className="bg-muted px-1 py-0.5 rounded">
                projects/web/src/app/(main)/page.tsx:18
              </code>
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-600/30 bg-green-600/5 p-5">
              <h3 className="font-semibold text-green-700 dark:text-green-500">Do</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Light setup, semibold payoff. Two weights, never more.</li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded">leading-none</code> on display
                  sizes. The light weight needs tight leading to read as one block.
                </li>
                <li>Title Case.</li>
                <li>
                  Break lines explicitly with{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">&lt;br /&gt;</code>. The semibold
                  clause starts its own line and is never split by a wrap.
                </li>
                <li>
                  Emphasis is neutral (
                  <code className="bg-muted px-1 py-0.5 rounded">text-white</code> /{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">text-stone-050</code>) or the brand
                  gradient via <code className="bg-muted px-1 py-0.5 rounded">bg-clip-text</code>.
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-600/30 bg-red-600/5 p-5">
              <h3 className="font-semibold text-red-700 dark:text-red-500">Don&apos;t</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  No weights above 600.{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">font-extrabold</code> ships 4 times
                  in the entire site. Treat 700+ as off-system.
                </li>
                <li>
                  Don&apos;t exceed{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">tracking-tight</code> (&minus;0.025em)
                  on a display headline. Tracking is capped, not banned &mdash; the homepage hero sets
                  none, the industry heroes use tracking-tight, and both are in-system. Roughly double
                  the ceiling reads as generic tech-poster.
                </li>
                <li>
                  Don&apos;t let a display headline auto-wrap. A wrap that orphans one word of the
                  semibold clause breaks the pairing.
                </li>
                <li>
                  Don&apos;t use solid{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">text-magenta-600</code> for headline
                  emphasis. That is the eyebrow pattern (uppercase, tracking-widest, small) and
                  ships zero times as headline emphasis.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Primary Font (Inter)</h2>
            <p className="mt-2 text-muted-foreground">
              Inter is the primary typeface, versatile and modern. It supports a full range of text
              sizes, from small descriptors to large, attention-grabbing headlines.
            </p>
          </div>
          <Collapsible open={openSections.inter} onOpenChange={() => toggleSection('inter')}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Click to {openSections.inter ? 'hide' : 'show'} all sizes
              </p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.inter ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="space-y-8">
                {sizes.map((size) => (
                  <div key={size.class} className="border-b pb-4">
                    <div className={size.class}>The quick brown fox jumps over the lazy dog</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <code className="bg-muted px-1 py-0.5 rounded">.{size.class}</code>
                      <span className="ml-2">{size.specs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Monospace Font (JetBrains Mono Light)</h2>
            <p className="mt-2 text-muted-foreground">
              For code snippets and technical information, we use JetBrains Mono Light. Its clean
              shapes and balanced spacing ensure legibility, clearly distinguishing it from our
              primary text.
            </p>
          </div>
          <Collapsible open={openSections.mono} onOpenChange={() => toggleSection('mono')}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Click to {openSections.mono ? 'hide' : 'show'} all sizes
              </p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.mono ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="space-y-8">
                {monoSizes.map((size) => (
                  <div key={size.class} className="border-b pb-4">
                    <div className={size.class}>The quick brown fox jumps over the lazy dog</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <code className="bg-muted px-1 py-0.5 rounded">.{size.class}</code>
                      <span className="ml-2">{size.specs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Font Weights</h2>
            <p className="mt-2 text-muted-foreground">
              Sandworm is a two-weight pairing, not a five-weight ramp. Light sets up, Semibold
              lands. Each weight below is listed with how many times it actually ships in
              authzed.com, so the ramp is ranked by real use rather than shown as five equal
              options.
            </p>
          </div>
          <Collapsible open={openSections.weights} onOpenChange={() => toggleSection('weights')}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Click to {openSections.weights ? 'hide' : 'show'} all weights
              </p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.weights ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="space-y-6">
                {weights.map((weight) => (
                  <div key={weight.class} className="border-b pb-4">
                    <div className={`text2xlarge ${weight.class}`}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <code className="bg-muted px-1 py-0.5 rounded">{weight.tw}</code>
                      <span className="ml-2">Weight {weight.weight}</span>
                      <span className="ml-2">· {weight.uses} uses in authzed.com</span>
                      <div className="mt-1">{weight.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Text Styles</h2>
            <p className="mt-2 text-muted-foreground">
              Italics, underlines, and strikethroughs provide subtle emphasis, highlight interactive
              elements, or convey revisions.
            </p>
          </div>
          <Collapsible open={openSections.styles} onOpenChange={() => toggleSection('styles')}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Click to {openSections.styles ? 'hide' : 'show'} all styles
              </p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.styles ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="space-y-6">
                {styles.map((style) => (
                  <div key={style.class} className="border-b pb-4">
                    <div className={`text2xlarge ${style.class}`}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <code className="bg-muted px-1 py-0.5 rounded">.{style.class}</code>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Expressive Typography</h2>
            <h3 className="text-xl mt-2 mb-4">Setting the Tone Beyond the Product</h3>
            <p className="text-lg text-muted-foreground">
              When we move beyond product interfaces—such as in presentations, marketing materials,
              and our website—typography becomes a more expressive tool. It can capture attention,
              set a mood, and communicate personality at a glance. In these contexts, we lean into
              the flexibility of our type system to highlight key messages, evoke emotion, and
              establish a distinct brand presence.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div className="rounded-lg border bg-card p-8 space-y-8">
              <h3 className="text-xl font-semibold mb-4">Key Considerations</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Playful Scale & Rhythm</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow more generous spacing, larger headlines, and tiered sizing to create a
                    sense of depth and hierarchy.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Color & Contrast</h4>
                  <p className="text-sm text-muted-foreground">
                    Incorporate our accent colors more prominently in headings and display text,
                    making critical points stand out while retaining readability.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Type Pairings</h4>
                  <p className="text-sm text-muted-foreground">
                    Use both Inter and JetBrains Mono Light in tandem. For example, a bold, colorful
                    Inter headline can be paired with a more reserved JetBrains Mono subheading,
                    adding subtle visual texture.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Contextual Adaptability</h4>
                  <p className="text-sm text-muted-foreground">
                    Tailor the typography to the medium. A high-impact presentation slide might
                    feature a bold, dynamic headline, while a website hero section may use softer
                    gradients and gently emphasized headings to draw users in.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Legibility Remains Paramount</h4>
                  <p className="text-sm text-muted-foreground">
                    Even in expressive applications, ensure all text can be read easily. Good
                    typography maintains its clarity, no matter how large, colorful, or stylized it
                    becomes.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Brand Emphasis Modes — Live Demo</h3>
              <p className="text-muted-foreground mb-4">
                Two ways to add brand emphasis inside a headline. Use solid magenta-600 for in-prose punchlines;
                reserve the gradient text-fill for the page&apos;s hero brand mark (once per hero, never in body paragraphs).
              </p>
              <div className="space-y-4">
                <Card className="p-6 space-y-3">
                  <p className="font-mono text-xs font-medium uppercase tracking-widest text-stone-400 mb-2">
                    Solid magenta-600 semibold — in-prose emphasis
                  </p>
                  <p className="text-3xl font-light leading-snug">
                    Every authorization use case.{" "}
                    <span className="font-semibold text-magenta-600">One system.</span>
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    font-light + <span className="text-magenta-600">font-semibold text-magenta-600</span> — standard in-prose emphasis
                  </p>
                </Card>

                <Card className="p-6 space-y-3">
                  <p className="font-mono text-xs font-medium uppercase tracking-widest text-stone-400 mb-2">
                    Brand-gradient text-fill — hero brand mark
                  </p>
                  <p className="text-3xl font-light leading-snug">
                    Built for teams that{" "}
                    <span
                      className="font-semibold bg-gradient-to-r from-sand-300 via-red-400 to-violet-600 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
                    >
                      can&apos;t afford to get it wrong.
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    bg-gradient-to-r from-sand-300 via-red-400 to-violet-600 · bg-clip-text text-transparent · Safari: -webkit-background-clip -webkit-text-fill-color
                  </p>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Gradient text-fill is <strong>hero-only</strong> — never in body paragraphs. Use solid{" "}
                <code className="bg-muted px-1 py-0.5 rounded">text-magenta-600</code> for in-prose emphasis.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Example Applications</h3>
              <p className="text-muted-foreground">
                By applying these principles, we transform typography from a simple means of
                conveying information into a powerful storytelling device—engaging viewers,
                reinforcing our brand, and making a lasting impression outside of everyday product
                interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[160px]">
              <div className="md:col-span-8 md:row-span-2 relative overflow-hidden  rounded-lg">
                <Image
                  src="/images/Examples/Typography/LinkedIn-Transaction_Metadata@2x.png"
                  alt="Typography example showing technical typography in a transaction context"
                  fill
                  className="object-cover object-left"
                />
              </div>

              <div className="row-span-4 md:col-span-4 relative overflow-hidden rounded-lg">
                <Image
                  src="/images/Examples/Typography/AuthZed-Popup_33x78.png"
                  alt="Typography example showing UI typography in a popup context"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
