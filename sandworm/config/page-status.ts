export type PageStatus = "ready" | "draft" | "deprecated" | "under-review";

export interface PageStatusConfig {
  [key: string]: PageStatus;
}

export const pageStatus: PageStatusConfig = {
  // Foundations
  "/colors": "ready",
  "/typography": "ready",
  "/gradients": "ready",
  "/logo": "ready",
  "/icons": "ready",

  // Components
  "/components/buttons": "ready",
  "/components/forms": "ready",
  "/components/cards": "ready",
  "/components/navigation": "ready",
  "/components/layout": "ready",
  "/components/feedback": "ready",
  "/components/data-display": "ready",
  "/components/overlays": "ready",
  "/components/inputs": "ready",
  "/components/data-entry": "ready",
  "/components/toggle": "ready",

  // Patterns
  "/diagrams": "ready",
  "/dataviz": "ready",

  // Guidelines
  "/accessibility": "ready",
  "/guidelines/voice-tone": "ready",
  "/guidelines/photography": "draft",
  "/guidelines/animation": "ready",

  // Assets
  "/assets/banners": "ready",
  "/assets/logo-cloud": "ready",

  // Tools
  "/tools/slack-theme": "ready",
  "/tools/email-signature": "ready",
};
