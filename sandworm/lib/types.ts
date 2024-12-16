export type LogoVariant = "color" | "color-light" | "color-dark" | "slate-050" | "slate-850";

export type LogoFormat = {
  png: string;
  svg: string;
};

export type WordmarkVariants = {
  'color-light': LogoFormat;
  'color-dark': LogoFormat;
  'slate-050': LogoFormat;
  'slate-850': LogoFormat;
};

export type LogoMarkVariants = {
  'color': LogoFormat;
  'slate-050': LogoFormat;
  'slate-850': LogoFormat;
};

export type LogoSet = {
  name: string;
  description?: string;
  variants: WordmarkVariants | LogoMarkVariants;
};

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