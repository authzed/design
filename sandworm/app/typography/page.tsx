'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

  const weights = [
    { name: 'Light', class: 'light', weight: '300' },
    { name: 'Regular', class: 'regular', weight: '400' },
    { name: 'Medium', class: 'medium', weight: '500' },
    { name: 'Semibold', class: 'semibold', weight: '600' },
    { name: 'Bold', class: 'bold', weight: '700' },
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
          <StatusBadge status="ready" />
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
              A variety of font weights—from light to bold—create typographic hierarchy, helping
              users distinguish important content at a glance.
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
                      <code className="bg-muted px-1 py-0.5 rounded">.{weight.class}</code>
                      <span className="ml-2">Font Weight: {weight.weight}</span>
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
