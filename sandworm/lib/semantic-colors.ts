export const semanticColorMappings = {
  background: { token: 'stone-025', darkToken: 'stone-975' },
  foreground: { token: 'stone-975', darkToken: 'stone-025' },
  card: { token: 'stone-025', darkToken: 'stone-975' },
  'card-foreground': { token: 'stone-975', darkToken: 'stone-025' },
  popover: { token: 'stone-025', darkToken: 'stone-975' },
  'popover-foreground': { token: 'stone-975', darkToken: 'stone-025' },
  primary: { token: 'stone-900', darkToken: 'stone-025' },
  'primary-foreground': { token: 'stone-025', darkToken: 'stone-975' },
  secondary: { token: 'stone-050', darkToken: 'stone-900' },
  'secondary-foreground': { token: 'stone-975', darkToken: 'stone-050' },
  muted: { token: 'stone-050', darkToken: 'stone-850' },
  'muted-foreground': { token: 'stone-700', darkToken: 'stone-400' },
  accent: { token: 'stone-050', darkToken: 'stone-900' },
  'accent-foreground': { token: 'stone-900', darkToken: 'stone-050' },
  success: { token: 'teal-050', darkToken: 'teal-900' },
  'success-foreground': { token: 'teal-900', darkToken: 'teal-050' },
  info: { token: 'blue-050', darkToken: 'blue-900' },
  'info-foreground': { token: 'blue-900', darkToken: 'blue-050' },
  warning: { token: 'sand-050', darkToken: 'sand-900' },
  'warning-foreground': { token: 'sand-900', darkToken: 'sand-050' },
  error: { token: 'red-100', darkToken: 'red-900' },
  'error-foreground': { token: 'red-900', darkToken: 'red-050' },
  creative: { token: 'violet-050', darkToken: 'violet-900' },
  'creative-foreground': { token: 'violet-900', darkToken: 'violet-050' },
  destructive: { token: 'red-200', darkToken: 'red-900' },
  'destructive-foreground': { token: 'red-800', darkToken: 'red-050' },
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
  label: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  variable: `--${key}`,
  token: value.token,
  darkToken: value.darkToken,
}));