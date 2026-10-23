import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { detectCategory, buildUpsell } from "./upsell";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are the creative engine for Balamonis Media, an AI-augmented production studio.
Given a brand brief, you generate a complete, ready-to-shoot multi-format campaign.
You are bold, specific, and cinematic. No filler, no generic marketing-speak. Every line should feel produced.

Return ONLY valid JSON (no markdown, no backticks, no preamble) matching exactly this shape:
{
  "campaignName": "string — a short, memorable campaign name",
  "tagline": "string — one punchy line under 9 words",
  "director_note": "string — 1-2 sentences on the creative direction / vibe",
  "ads": [
    { "format": "string e.g. 'Instagram Static' or 'Billboard'", "hook": "string", "body": "string — 1-2 sentences", "cta": "string — short" }
  ],
  "video": {
    "title": "string",
    "platform": "string e.g. 'Reels / TikTok / Shorts'",
    "runtime": "string e.g. '0:22'",
    "hook": "string — the first 2 seconds, what stops the scroll",
    "shots": [ { "tc": "string timecode e.g. '0:00–0:04'", "visual": "string — what we see", "text": "string — on-screen text", "audio": "string — VO or sound" } ]
  },
  "track": {
    "title": "string",
    "genre": "string — genre + mood",
    "bpm": "string e.g. '92 BPM'",
    "hookLyric": "string — the catchiest 1-2 lines",
    "verse": "string — a short verse, 2-4 lines"
  },
  "social": [ { "platform": "string", "caption": "string", "hashtags": "string — space-separated #tags" } ]
}

Provide exactly 3 ads, exactly 5 shots in the video, and exactly 3 social posts.`;


export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Missing ANTHROPIC_API_KEY. Add it in your Netlify site settings (Site configuration → Environment variables), or in .env.local for local dev." },
      { status: 500 }
    );
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { brand, what, audience, vibe } = payload ?? {};
  if (!brand || !what) {
    return NextResponse.json(
      { error: "Tell us the brand name and what it does to start." },
      { status: 400 }
    );
  }

  // Server-side category detection for the Lexora AI cross-sell.
  const upsell = buildUpsell(detectCategory(brand, what));

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const userBrief = `BRAND: ${brand}
WHAT IT DOES: ${what}
TARGET AUDIENCE: ${audience || "Decide what fits best."}
DESIRED VIBE / TONE: ${vibe || "Decide what fits best."}

Generate the full campaign now. JSON only.`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2200,
      system: SYSTEM,
      messages: [{ role: "user", content: userBrief }],
    });

    const text = msg.content
      .filter((b): b is Extract<(typeof msg.content)[number], { type: "text" }>)
      .map((b) => b.text)
      .join("")
      .trim();

    const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

    let data: unknown;
    try {
      data = JSON.parse(cleaned);
    } catch {
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("no json");
      data = JSON.parse(cleaned.slice(start, end + 1));
    }

    return NextResponse.json({ campaign: data, upsell });
  } catch (err: any) {
    const message =
      err?.status === 401
        ? "Your ANTHROPIC_API_KEY was rejected. Check the key in your environment settings."
        : "The engine hit a snag generating this campaign. Try again in a moment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
