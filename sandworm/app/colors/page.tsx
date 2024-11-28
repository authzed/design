import { ColorCard } from '@/components/color-card';
import { semanticColors } from '@/lib/semantic-colors';

interface ColorSwatch {
  label: string;
  variable: string;
  className?: string;
}

const colorScales = {
  stone: [
    { label: '025', variable: '--stone-025' },
    { label: '050', variable: '--stone-050' },
    { label: '100', variable: '--stone-100' },
    { label: '150', variable: '--stone-150' },
    { label: '200', variable: '--stone-200' },
    { label: '300', variable: '--stone-300' },
    { label: '400', variable: '--stone-400' },
    { label: '500', variable: '--stone-500' },
    { label: '600', variable: '--stone-600' },
    { label: '700', variable: '--stone-700' },
    { label: '800', variable: '--stone-800' },
    { label: '850', variable: '--stone-850' },
    { label: '900', variable: '--stone-900' },
    { label: '950', variable: '--stone-950' },
    { label: '975', variable: '--stone-975' },
  ],
  sand: [
    { label: '025', variable: '--sand-025' },
    { label: '050', variable: '--sand-050' },
    { label: '100', variable: '--sand-100' },
    { label: '150', variable: '--sand-150' },
    { label: '200', variable: '--sand-200' },
    { label: '300', variable: '--sand-300' },
    { label: '400', variable: '--sand-400' },
    { label: '500', variable: '--sand-500' },
    { label: '600', variable: '--sand-600' },
    { label: '700', variable: '--sand-700' },
    { label: '800', variable: '--sand-800' },
    { label: '850', variable: '--sand-850' },
    { label: '900', variable: '--sand-900' },
    { label: '950', variable: '--sand-950' },
    { label: '975', variable: '--sand-975' },
  ],
  red: [
    { label: '025', variable: '--red-025' },
    { label: '050', variable: '--red-050' },
    { label: '100', variable: '--red-100' },
    { label: '150', variable: '--red-150' },
    { label: '200', variable: '--red-200' },
    { label: '300', variable: '--red-300' },
    { label: '400', variable: '--red-400' },
    { label: '500', variable: '--red-500' },
    { label: '600', variable: '--red-600' },
    { label: '700', variable: '--red-700' },
    { label: '800', variable: '--red-800' },
    { label: '850', variable: '--red-850' },
    { label: '900', variable: '--red-900' },
    { label: '950', variable: '--red-950' },
    { label: '975', variable: '--red-975' },
  ],
  magenta: [
    { label: '025', variable: '--magenta-025' },
    { label: '050', variable: '--magenta-050' },
    { label: '100', variable: '--magenta-100' },
    { label: '150', variable: '--magenta-150' },
    { label: '200', variable: '--magenta-200' },
    { label: '300', variable: '--magenta-300' },
    { label: '400', variable: '--magenta-400' },
    { label: '500', variable: '--magenta-500' },
    { label: '600', variable: '--magenta-600' },
    { label: '700', variable: '--magenta-700' },
    { label: '800', variable: '--magenta-800' },
    { label: '850', variable: '--magenta-850' },
    { label: '900', variable: '--magenta-900' },
    { label: '950', variable: '--magenta-950' },
    { label: '975', variable: '--magenta-975' },
  ],
  violet: [
    { label: '025', variable: '--violet-025' },
    { label: '050', variable: '--violet-050' },
    { label: '100', variable: '--violet-100' },
    { label: '150', variable: '--violet-150' },
    { label: '200', variable: '--violet-200' },
    { label: '300', variable: '--violet-300' },
    { label: '400', variable: '--violet-400' },
    { label: '500', variable: '--violet-500' },
    { label: '600', variable: '--violet-600' },
    { label: '700', variable: '--violet-700' },
    { label: '800', variable: '--violet-800' },
    { label: '850', variable: '--violet-850' },
    { label: '900', variable: '--violet-900' },
    { label: '950', variable: '--violet-950' },
    { label: '975', variable: '--violet-975' },
  ],
  teal: [
    { label: '025', variable: '--teal-025' },
    { label: '050', variable: '--teal-050' },
    { label: '100', variable: '--teal-100' },
    { label: '150', variable: '--teal-150' },
    { label: '200', variable: '--teal-200' },
    { label: '300', variable: '--teal-300' },
    { label: '400', variable: '--teal-400' },
    { label: '500', variable: '--teal-500' },
    { label: '600', variable: '--teal-600' },
    { label: '700', variable: '--teal-700' },
    { label: '800', variable: '--teal-800' },
    { label: '850', variable: '--teal-850' },
    { label: '900', variable: '--teal-900' },
    { label: '950', variable: '--teal-950' },
    { label: '975', variable: '--teal-975' },
  ],
  blue: [
    { label: '025', variable: '--blue-025' },
    { label: '050', variable: '--blue-050' },
    { label: '100', variable: '--blue-100' },
    { label: '150', variable: '--blue-150' },
    { label: '200', variable: '--blue-200' },
    { label: '300', variable: '--blue-300' },
    { label: '400', variable: '--blue-400' },
    { label: '500', variable: '--blue-500' },
    { label: '600', variable: '--blue-600' },
    { label: '700', variable: '--blue-700' },
    { label: '800', variable: '--blue-800' },
    { label: '850', variable: '--blue-850' },
    { label: '900', variable: '--blue-900' },
    { label: '950', variable: '--blue-950' },
    { label: '975', variable: '--blue-975' },
  ],
};

function ColorScale({
  name,
  colors,
}: {
  name: string;
  colors: { label: string; variable: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold capitalize">{name}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {colors.map((color) => (
          <ColorCard
            key={color.variable}
            label={color.label}
            variable={color.variable}
          />
        ))}
      </div>
    </div>
  );
}

function SemanticColorGrid({ colors }: { colors: typeof semanticColors }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((color) => (
        <ColorCard
          key={color.variable}
          label={color.label}
          variable={color.variable}
          showSemanticValue={true}
          semanticMapping={{
            token: color.token,
            darkToken: color.darkToken,
          }}
        />
      ))}
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Our color system is designed to be accessible, consistent, and
          adaptable across different themes and contexts.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Semantic Colors</h2>
          <SemanticColorGrid colors={semanticColors} />
        </div>

        <div className="space-y-12">
          <h2 className="text-2xl font-semibold">Color Scales</h2>
          {Object.entries(colorScales).map(([name, colors]) => (
            <ColorScale key={name} name={name} colors={colors} />
          ))}
        </div>
      </div>
    </div>
  );
}