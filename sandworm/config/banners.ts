import type { BannerSet } from "@/lib/types";

export const bannerSets: BannerSet[] = [
  {
    name: "SpiceDB",
    description: "Official SpiceDB banner for marketing and promotional materials",
    variants: {
      "light": {
        svg: "/images/Banners/SpiceDB-1600x400-Banner-Light.svg",
        png: "/images/Banners/SpiceDB-1600x400-Banner-Light@2x.png",
      },
      "dark": {
        svg: "/images/Banners/SpiceDB-1600x400-Banner.svg",
        png: "/images/Banners/SpiceDB-1600x400-Banner@2x.png",
      },
    },
    dimensions: {
      width: 1600,
      height: 400,
    },
  },
];
