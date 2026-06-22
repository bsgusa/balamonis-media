"use client";

import { useState } from "react";

type Ad = { format: string; hook: string; body: string; cta: string };
type Shot = { tc: string; visual: string; text: string; audio: string };
type Social = { platform: string; caption: string; hashtags: string };
type Campaign = {
  campaignName: string;
  tagline: string;
  director_note: string;
  ads: Ad[];
  video: { title: string; platform: string; runtime: string; hook: string; shots: Shot[] };
  track: { title: string; genre: string; bpm: string; hookLyric: string; verse: string };
  social: Social[];
};

const PRESETS = [
  { brand: "Lexora AI", what: "AI that automates immigration paperwork for families and students", audience: "Immigrants and F1 students in the US", vibe: "Hopeful, modern, trustworthy" },
  { brand: "Aurum Coffee", what: "A specialty single-origin coffee roaster", audience: "Urban professionals 25–40", vibe: "Warm, crafted, slightly luxurious" },
  { brand: "Pulse Athletic", what: "Performance running shoes for everyday athletes", audience: "Gen-Z runners", vibe: "High-energy, kinetic, bold" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-marquee text-gold/70 uppercase">{children}</span>
  );
}

export default function Page() {
  const [brand, setBrand] = useState("");
  const [what, setWhat] = useState("");
  const [audience, setAudience] = useState("");
  const [vibe, setVibe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  function loadPreset(p: (typeof PRESETS)[number]) {
    setBrand(p.brand);
    setWhat(p.what);
    setAudience(p.audience);
    setVibe(p.vibe);
  }

  async function generate() {
    setError("");
    if (!brand.trim() || !what.trim()) {
      setError("Give us at least a brand name and what it does.");
      return;
    }
    setLoading(true);
    setCampaign(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, what, audience, vibe }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setCampaign(json.campaign);
      setTimeout(
        () => document.getElementById("reel")?.scrollIntoView({ behavior: "smooth" }),
        120
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* ── Top bar ───────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-line px-6 py-5 md:px-12">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl text-cream">Balamonis</span>
          <span className="font-mono text-[10px] tracking-marquee text-muted">MEDIA</span>
        </div>
        <span className="hidden font-mono text-[10px] tracking-marquee text-gold/70 md:block animate-flicker">
          ● REC — STUDIO ONLINE
        </span>
      </header>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative px-6 pb-20 pt-24 text-center md:px-12 md:pt-32">
        <div className="animate-fade-up">
          <Label>Reel 01 — The AI Creative Engine</Label>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl leading-[1.05] text-cream md:text-7xl lg:text-8xl">
            Type a brief.
            <br />
            <span className="text-gold">We&apos;ll direct the rest.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            One line about your brand becomes a full campaign — ad concepts, a shot-listed video,
            an original track, and social — produced in seconds, not weeks.
          </p>
          <a
            href="#studio"
            className="group mt-12 inline-flex items-center gap-3 border border-gold/40 bg-gold/5 px-7 py-3.5 font-mono text-xs tracking-marquee text-gold transition hover:bg-gold hover:text-ink"
          >
            ENTER THE STUDIO
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
        <div className="mx-auto mt-20 flex max-w-3xl items-center justify-center gap-6 font-mono text-[10px] tracking-marquee text-muted/60">
          <span>ADS</span><span className="text-line">/</span>
          <span>VIDEO</span><span className="text-line">/</span>
          <span>MUSIC</span><span className="text-line">/</span>
          <span>SOCIAL</span>
        </div>
      </section>

      {/* ── Studio / Brief ────────────────────────── */}
      <section id="studio" className="border-t border-line px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <Label>The Slate</Label>
              <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">Set the scene</h2>
            </div>
            <span className="font-mono text-[10px] tracking-marquee text-muted">BMS — 001</span>
          </div>

          {/* presets */}
          <div className="mb-8 flex flex-wrap gap-2">
            <span className="mr-1 self-center font-mono text-[10px] tracking-marquee text-muted">
              TRY:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.brand}
                onClick={() => loadPreset(p)}
                className="border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition hover:border-gold/50 hover:text-gold"
              >
                {p.brand}
              </button>
            ))}
          </div>

          <div className="space-y-6 border border-line bg-panel/60 p-6 md:p-8">
            <Field label="Brand name" value={brand} onChange={setBrand} placeholder="e.g. Balamonis Media" />
            <Field
              label="What it does"
              value={what}
              onChange={setWhat}
              placeholder="e.g. An AI-augmented production studio for ads, film, and music"
              textarea
            />
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Audience (optional)" value={audience} onChange={setAudience} placeholder="Who's watching?" />
              <Field label="Vibe (optional)" value={vibe} onChange={setVibe} placeholder="Bold? Warm? Luxe?" />
            </div>

            {error && (
              <p className="font-mono text-xs text-teal">⚠ {error}</p>
            )}

            <button
              onClick={generate}
              disabled={loading}
              className="group relative w-full overflow-hidden border border-gold bg-gold px-6 py-4 font-mono text-xs tracking-marquee text-ink transition hover:bg-goldsoft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="absolute inset-x-0 top-0 h-full bg-cream/20 animate-scan" />
              )}
              <span className="relative">
                {loading ? "ROLLING…  DIRECTING YOUR CAMPAIGN" : "ACTION — GENERATE CAMPAIGN"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── The Reel (output) ─────────────────────── */}
      {campaign && (
        <section id="reel" className="border-t border-line px-6 py-20 md:px-12">
          <div className="mx-auto max-w-5xl space-y-12">
            {/* Title card */}
            <div className="animate-fade-up text-center">
              <Label>Final Cut — {brand}</Label>
              <h2 className="mt-5 font-display text-4xl text-cream md:text-6xl">
                {campaign.campaignName}
              </h2>
              <p className="mt-4 font-display text-xl text-gold md:text-2xl">
                &ldquo;{campaign.tagline}&rdquo;
              </p>
              {campaign.director_note && (
                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
                  <span className="font-mono text-[10px] tracking-marquee text-gold/70">
                    DIRECTOR&apos;S NOTE —{" "}
                  </span>
                  {campaign.director_note}
                </p>
              )}
            </div>

            {/* Ads */}
            <Block tag="BMS.ADS" title="The Ads">
              <div className="grid gap-px bg-line md:grid-cols-3">
                {campaign.ads?.map((ad, i) => (
                  <div key={i} className="bg-panel p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-marquee text-gold/70">
                        AD.0{i + 1}
                      </span>
                      <span className="font-mono text-[10px] text-muted">{ad.format}</span>
                    </div>
                    <p className="font-display text-2xl leading-tight text-cream">{ad.hook}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{ad.body}</p>
                    <p className="mt-5 inline-block border border-gold/40 px-3 py-1.5 font-mono text-[11px] text-gold">
                      {ad.cta}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {/* Video shot list */}
            {campaign.video && (
              <Block tag="BMS.REEL" title="The Video">
                <div className="border border-line bg-panel">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-6">
                    <div>
                      <p className="font-display text-2xl text-cream">{campaign.video.title}</p>
                      <p className="mt-1 text-sm text-muted">{campaign.video.platform}</p>
                    </div>
                    <span className="font-mono text-sm text-gold">⏱ {campaign.video.runtime}</span>
                  </div>
                  <div className="border-b border-line bg-panel2 p-6">
                    <span className="font-mono text-[10px] tracking-marquee text-gold/70">
                      THE HOOK
                    </span>
                    <p className="mt-2 font-display text-xl text-cream">{campaign.video.hook}</p>
                  </div>
                  <div className="divide-y divide-line">
                    {campaign.video.shots?.map((s, i) => (
                      <div key={i} className="grid gap-3 p-5 md:grid-cols-[90px_1fr] md:gap-6">
                        <span className="font-mono text-xs text-gold">{s.tc}</span>
                        <div className="space-y-1.5">
                          <p className="text-sm text-cream">{s.visual}</p>
                          {s.text && (
                            <p className="text-xs text-muted">
                              <span className="text-gold/60">TEXT:</span> {s.text}
                            </p>
                          )}
                          {s.audio && (
                            <p className="text-xs text-muted">
                              <span className="text-gold/60">AUDIO:</span> {s.audio}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Block>
            )}

            {/* Track */}
            {campaign.track && (
              <Block tag="BMS.TRACK" title="The Track">
                <div className="border border-line bg-gradient-to-br from-panel2 to-panel p-8">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-3xl text-cream">{campaign.track.title}</p>
                      <p className="mt-1 font-mono text-xs tracking-wide text-muted">
                        {campaign.track.genre}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-gold">♪ {campaign.track.bpm}</span>
                  </div>
                  <div className="mt-8 border-l-2 border-gold/50 pl-5">
                    <span className="font-mono text-[10px] tracking-marquee text-gold/70">HOOK</span>
                    <p className="mt-2 font-display text-2xl italic leading-snug text-cream">
                      {campaign.track.hookLyric}
                    </p>
                  </div>
                  {campaign.track.verse && (
                    <div className="mt-6 pl-5">
                      <span className="font-mono text-[10px] tracking-marquee text-muted">VERSE</span>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">
                        {campaign.track.verse}
                      </p>
                    </div>
                  )}
                </div>
              </Block>
            )}

            {/* Social */}
            <Block tag="BMS.SOCIAL" title="The Social">
              <div className="grid gap-px bg-line md:grid-cols-3">
                {campaign.social?.map((s, i) => (
                  <div key={i} className="bg-panel p-6">
                    <span className="font-mono text-[10px] tracking-marquee text-gold/70">
                      {s.platform}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-cream">{s.caption}</p>
                    <p className="mt-4 font-mono text-[11px] leading-relaxed text-teal">
                      {s.hashtags}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            <div className="pt-4 text-center">
              <button
                onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-line px-6 py-3 font-mono text-xs tracking-marquee text-muted transition hover:border-gold/50 hover:text-gold"
              >
                ↺ ROLL ANOTHER
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ────────────────────────────────── */}
      <footer className="border-t border-line px-6 py-10 text-center md:px-12">
        <p className="font-display text-xl text-cream">Balamonis Media</p>
        <p className="mt-2 font-mono text-[10px] tracking-marquee text-muted">
          AI-AUGMENTED PRODUCTION · ADS · FILM · MUSIC · OTT
        </p>
      </footer>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-marquee text-gold/70 uppercase">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="mt-2 w-full resize-none border border-line bg-ink px-4 py-3 text-cream placeholder:text-muted/40 focus:border-gold/60 focus:outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full border border-line bg-ink px-4 py-3 text-cream placeholder:text-muted/40 focus:border-gold/60 focus:outline-none"
        />
      )}
    </label>
  );
}

function Block({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex items-baseline gap-4">
        <span className="font-mono text-[10px] tracking-marquee text-gold/70">{tag}</span>
        <h3 className="font-display text-2xl text-cream md:text-3xl">{title}</h3>
        <span className="h-px flex-1 bg-line" />
      </div>
      {children}
    </div>
  );
}
