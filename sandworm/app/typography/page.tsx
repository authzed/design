export default function TypographyPage() {
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
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Typography</h1>
        <p className="text-muted-foreground">
          Our typography system uses Inter as the primary font and JetBrains Mono Light as the monospace font, with carefully crafted sizes and styles.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Primary Font (Inter)</h2>
          <div className="space-y-8">
            {sizes.map((size) => (
              <div key={size.class} className="border-b pb-4">
                <div className={size.class}>
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded">.{size.class}</code>
                  <span className="ml-2">{size.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Monospace Font (JetBrains Mono Light)</h2>
          <div className="space-y-8">
            {monoSizes.map((size) => (
              <div key={size.class} className="border-b pb-4">
                <div className={size.class}>
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded">.{size.class}</code>
                  <span className="ml-2">{size.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Font Weights</h2>
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
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Text Styles</h2>
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
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Combined Examples</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="text4xlarge light">
                Light Heading Example
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <code className="bg-muted px-1 py-0.5 rounded">.text4xlarge.light</code>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="text2xlarge medium italic">
                Subheading Example
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <code className="bg-muted px-1 py-0.5 rounded">.text2xlarge.medium.italic</code>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="mono-base">
                Code Example: const greeting = "Hello, World!";
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <code className="bg-muted px-1 py-0.5 rounded">.mono-base</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}