export type LogoVariant = "color-light" | "color-dark" | "slate-050" | "slate-850";

export interface LogoSet {
  name: string;
  variants: {
    [key in LogoVariant]: string;
  };
}

export interface GuidelineItem {
  text: string;
}

export type BannerVariant = "light" | "dark";

export interface BannerAsset {
  svg: string;
  png: string;
}

export interface BannerSet {
  name: string;
  description: string;
  variants: Record<BannerVariant, BannerAsset>;
  dimensions: {
    width: number;
    height: number;
  };
}