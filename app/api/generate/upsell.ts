/**
 * Strategic upsell module for Balamonis Media → Lexora AI cross-sell.
 *
 * Separated from the campaign generation route so the core engine stays
 * focused on creative output and the upsell can be toggled or rebranded
 * independently.
 */

export interface StrategicUpsell {
  detected_category: string;
  upsell_text: string;
  cta_link: string;
}

const CATEGORY_KEYWORDS = {
  "Professional Services": ["consulting", "agency", "law", "legal", "accounting", "advisory"],
  "Tech": ["saas", "software", "platform", "api", "tech", "app"],
  "Global Mobility": ["visa", "immigration", "relocation", "global", "mobility", "residency"],
  "High-Net-Worth": ["wealth", "family office", "private equity", "investment", "luxury"],
} as const;

export function detectCategory(brand: string, what: string): string {
  const text = `${brand} ${what}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => text.includes(k))) {
      return category;
    }
  }
  return "Other";
}

export function buildUpsell(category: string): StrategicUpsell {
  const base = "https://balamonis.group/pricing";

  const messages: Record<string, string> = {
    "Professional Services":
      "Scale your practice with Lexora AI — the legal intelligence platform that reduces contract review time by up to 97%. Get a professional mobility and legal review tailored to your firm.",
    Tech:
      "Protect your IP and scale globally with Lexora AI. From prior art search to regulatory compliance across 47 jurisdictions, get a Pathway Review built for tech companies.",
    "Global Mobility":
      "Navigate global expansion with confidence. Lexora AI covers 47 jurisdictions — get a personalized immigration and legal pathway review for your team.",
    "High-Net-Worth":
      "Preserve and structure your wealth with Lexora AI. Bespoke legal review for high-net-worth individuals and family offices.",
    Other:
      "See how Lexora AI can support your business with AI-powered legal and compliance review. Request a Pathway Review.",
  };

  return {
    detected_category: category,
    upsell_text: messages[category] || messages.Other,
    cta_link: base,
  };
}
