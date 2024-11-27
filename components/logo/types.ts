export type LogoVariant = "color-light" | "color-dark" | "slate-050" | "slate-850";

export interface LogoSet {
  name: string;
  variants: {
    [key in LogoVariant]: string;
  };
}