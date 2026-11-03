# DESIGN.md — Proposal demo for [Friend's Business Name]
Built by Tiyan Digital for lead: Rishabh Manmohan Mishra (FB post 2026-11-03, "professional website for my friends business, budget is good").
Framing: this site IS the pitch — a working demo of the quality bar we'd build the friend's site to. Business type unknown → all content is marked placeholder.

## Frontmatter
- canvas: #FAF7F1 · ink: #181410 · body: #453D33 · muted: #6F6557 · accent: #0E5E46 (deep green, all CTA work) · hairline: rgba(24,20,16,.14)
- Type: Fraunces (display 500/600 + italic) · Inter (body) · ui-monospace (labels)
- Radius: 10px · Depth: hairlines only, zero shadows · Accent <5% of any screen

## Overview
Warm, assured, editorial. A premium generic-business demo that proves craft instead of claiming it. One chromatic color (deep green) does all CTA work; everything else is paper, ink, and hairlines.

## Psychology brief
- Visitor: Rishabh, skimming ~11 identical vendor pitches, choosing who to trust with his friend's business.
- Pain: fear of paying for a cheap template site; every vendor says "professional".
- One action: start a conversation (contact page / reply to the pitch).
- Trust gap: claims are cheap → the demo must PROVE craft at first glance.
- Emotion: assured confidence — "this studio operates at a different standard."

## Layout ideas (rotate per page)
- Home: asymmetric split hero (text left, framed photo right) → marquee strip → numbered editorial services → SIGNATURE slider → full-bleed image break → real-proof card (bluedhaka.com) → process timeline → FAQ → final CTA.
- Services: numbered editorial rows with hover highlight.
- Work: featured real case (text-led, live link) + honest empty slots.
- Testimonials: honest "we don't invent reviews" framing + SAMPLE-badged layout cards.
- Contact: form left, "what happens next" right. Footer: designed ending — big CTA scene, not link columns alone.

## Signature idea (ONE, Home §"The difference craft makes")
Interactive before/after drag slider: same fictional business content rendered twice.
- LEFT ("Typical template"): deliberately mediocre DOM mock — purple gradient hero, centered everything, 3 identical cards, lorem-ish copy. This is a quotation of cheap, not our design.
- RIGHT ("How we'd build it"): the same content in this site's real design language — single centered column (mono kicker, Fraunces headline, one green CTA, mini strip), so the message survives any divider position.
- Spec: container aspect-ratio 16/10 (desktop) / 4/3 (phone); right panel clipped by `clip-path: inset(0 0 0 X%)` driven by handle position (default 50%); handle = 48px circular grip, draggable via Pointer Events, keyboard arrows ±5%; mono labels above each side ("TYPICAL TEMPLATE" / "HOW WE'D BUILD IT"); live region announces position for screen readers. Built with real DOM, no images.

## Supporting techniques (quiet, 2–4 only)
1. Masked line-rise headline entrances (overflow-hidden masks, 100ms stagger, expo.out).
2. Scroll reveals: opacity 0→1 + translateY(24px), 0.8s cubic-bezier(0.16,1,0.3,1), stagger 0.1s via IntersectionObserver. `.js` class gates hidden state → no-JS/rest state always visible.
3. Services marquee strip (linear, 30s loop, duplicated content, pause on reduced motion).
4. Full-bleed image break with subtle scroll scale (1→1.06, decoration only).

## Type numbers
- Display H1: clamp(2.9rem, 6.4vw, 5.5rem), Fraunces 500, lh 0.98, tracking -0.03em, hand-broken to 2–3 lines.
- H2: clamp(1.9rem, 3.6vw, 3rem), lh 1.05, tracking -0.02em. H3: 1.35rem. Body: 1.0625rem/1.65. Small: 0.875rem.
- Mono labels: 0.6875rem, uppercase, +0.22em tracking, 60% ink.
- Max 2 families + mono. Emphasis via italic serif, never bold. Headlines ≤2 lines at every width.

## Colour numbers
- 1 bg + 1 ink + greys + 1 accent. Hierarchy via opacity (100/80/60/40), borders 10–20% ink. Selection: accent bg, white text. Near-black #181410, off-white #FAF7F1. No purple/indigo gradients, no glow, no blobs (except inside the deliberate "template" mock).

## Motion numbers
- Entrance order: nav → eyebrow → H1 → sub → CTA → strip, 0.12s steps from 0.05s, done by ~1.2s.
- Base: opacity 0→1 + translateY(24px), 0.8s, cubic-bezier(0.16,1,0.3,1). Hovers ≤1.02 scale / 200ms, :active 0.97.
- prefers-reduced-motion: everything static and visible; marquee paused; no line-rise (plain text).

## Honesty (design material)
- ONE swappable constant: `BUSINESS_NAME = "[Friend's Business Name]"` in js/site.js, applied to all `[data-biz]` spans; no-JS fallback = literal placeholder text in HTML.
- Placeholder badge component `.ph` ("SAMPLE") on every invented block: services copy, about story, testimonial cards, stats (none invented — no stats section at all).
- Proof: ONE real card — bluedhaka.com, "full e-commerce website, designed + built by Tiyan Digital", live link. No other claims.
- Contact form: demo notice ("Preview form — not wired to an inbox yet"), real consent checkbox, JS thank-you state only.
- Photos: licensed Unsplash placeholders (images/CREDITS.md); every captioned photo notes "placeholder photography".
- Legal: Privacy + Terms pages, plain language, marked as preview templates. No cookies/analytics on this demo → no banner. Google Fonts disclosed in Privacy.

## Do's and Don'ts
- DO: one dominant element per viewport; one primary CTA per section; nav ≤7 items; 44px+ touch targets; labels on all form fields; focus-visible rings; skip link.
- DON'T: fake reviews/stats/awards; lorem ipsum; emoji icons; centered-everything; dead links; placeholder-only form labels.

## Known gaps
- No real business name, copy, photos, or prices — placeholders throughout.
- Fonts self-hosted (Fraunces + Inter variable woff2, latin) — zero third-party requests.
- Contact form has no backend (demo thank-you state).
- Mobile menu + slider verified via headless screenshots; real-device check recommended before client handoff.
