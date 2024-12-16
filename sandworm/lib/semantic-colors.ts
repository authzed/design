export const semanticColorMappings = {
  background: { token: 'stone-025', darkToken: 'stone-975' },
  foreground: { token: 'stone-975', darkToken: 'stone-025' },
  primary: { token: 'stone-900', darkToken: 'stone-025' },
  secondary: { token: 'stone-050', darkToken: 'stone-900' },
  muted: { token: 'stone-050', darkToken: 'stone-850' },
  accent: { token: 'stone-050', darkToken: 'stone-900' },
  success: { token: 'teal-050', darkToken: 'teal-900' },
  warning: { token: 'sand-050', darkToken: 'sand-900' },
  error: { token: 'red-050', darkToken: 'red-900' },
  creative: { token: 'violet-050', darkToken: 'violet-900' },
  destructive: { token: 'stone-975', darkToken: 'stone-025' },
  border: { token: 'stone-150', darkToken: 'stone-850' },
  input: { token: 'stone-150', darkToken: 'stone-850' },
  ring: { token: 'stone-150', darkToken: 'stone-800' },
};

export interface SemanticColor {
  label: string;
  variable: string;
  token: string;
  darkToken: string;
}

export const semanticColors: SemanticColor[] = Object.entries(semanticColorMappings).map(([key, value]) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  variable: `--${key}`,
  token: value.token,
  darkToken: value.darkToken,
}));