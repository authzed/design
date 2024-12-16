export type PageStatus = "ready" | "draft" | "deprecated" | "under-review";

export interface PageStatusConfig {
  [key: string]: PageStatus;
}

export const pageStatus: PageStatusConfig = {
  // Foundations
  "/colors": "ready",
  "/typography": "under-review",
  "/logo": "ready",
  "/icons": "draft",

  // Components
  "/components/buttons": "ready",
  "/components/forms": "under-review",
  "/components/cards": "under-review",
  "/components/navigation": "under-review",
  "/components/layout": "under-review",
  "/components/feedback": "under-review",
  "/components/data-display": "under-review",
  "/components/overlays": "under-review",
  "/components/inputs": "under-review",
  "/components/data-entry": "under-review",
  "/components/toggle": "under-review",

  // Guidelines
  "/guidelines/voice-tone": "draft",
  "/guidelines/photography": "draft",
  "/guidelines/animation": "draft",

  // Assets
  "/assets/banners": "ready",
};
