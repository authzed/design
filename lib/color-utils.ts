export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[0, 8, 4].map(n => 
    Math.round(255 * f(n))
      .toString(16)
      .padStart(2, '0')
  ).join('')}`;
}

export function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const rgb = [0, 8, 4].map(n => Math.round(255 * f(n)));
  return `rgb(${rgb.join(', ')})`;
}

export function getColorValues(variable: string): {
  hsl: string;
  hex: string;
  rgb: string;
} | null {
  if (typeof window === 'undefined') return null;
  
  const style = getComputedStyle(document.documentElement);
  const variableName = variable.startsWith('--') ? variable : `--${variable}`;
  const rawValue = style.getPropertyValue(variableName).trim();
  
  if (!rawValue) return null;
  
  // Parse the HSL values from the CSS variable
  const [h, s, l] = rawValue.split(' ').map(v => parseFloat(v));
  
  if (isNaN(h) || isNaN(s) || isNaN(l)) return null;
  
  return {
    hsl: `${h} ${s}% ${l}%`,
    hex: hslToHex(h, s, l),
    rgb: hslToRgb(h, s, l)
  };
}