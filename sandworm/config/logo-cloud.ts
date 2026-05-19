import type { LogoCloudSet } from "@/lib/types";

export const logoCloudLastUpdated = "2026-05-19";

export const logoCloud: LogoCloudSet = {
  name: "Customer Logo Cloud",
  description:
    "Customer-logo composition with surrounding industry pills. Use as a hero, slide, or social asset. Palette snaps to stone-975 / stone-025; transparent variants pair with light or dark surfaces. Stills exported at 2× (3840×2160).",
  frames: {
    logos: {
      "dark": { png: "/images/logo-cloud/dark-logos.png" },
      "light": { png: "/images/logo-cloud/light-logos.png" },
      "transparent-white": { png: "/images/logo-cloud/transparent-white-logos.png" },
      "transparent-dark": { png: "/images/logo-cloud/transparent-dark-logos.png" },
    },
    cloud: {
      "dark": { png: "/images/logo-cloud/dark-cloud.png" },
      "light": { png: "/images/logo-cloud/light-cloud.png" },
      "transparent-white": { png: "/images/logo-cloud/transparent-white-cloud.png" },
      "transparent-dark": { png: "/images/logo-cloud/transparent-dark-cloud.png" },
    },
  },
  dimensions: {
    width: 1920,
    height: 1080,
  },
};
