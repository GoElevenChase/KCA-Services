import Link from "next/link";
import { Arrow, PhoneIcon } from "@/components/shared";
import { Motion, type Rule } from "@/components/motion";
import { siteContent } from "@/content/site";
import "@/app/chooser.css";

const rules: readonly Rule[] = [
  { sel: ".chooser-hero-copy > *", fx: "up", stagger: 110 },
  { sel: ".chooser-aside", fx: "fade" },
  { sel: ".choice-card", fx: "up", stagger: 160 },
  { sel: ".chooser-note > *", fx: "up", stagger: 90 },
  { sel: ".chooser-footer > *", fx: "fade", stagger: 80 },
];

const choices = [
  { n: "01", href: "/design-1/", title: "Comfort at Home", mood: "LIGHT · WARM · EDITORIAL", text: "Bright, warm, and editorial. A serif headline, a calm service overview, and a clear path from an everyday comfort problem to a conversation with KCA.", feel: "Warm white · Serif display · Soft, welcoming motion", image: "/previews/design-a.webp", alt: "Preview of Design 1: a light homepage with a serif headline and a technician beside an air conditioning unit", cls: "is-light" },
  { n: "02", href: "/design-2/", title: "Comfort That Works", mood: "BOLD · CINEMATIC · PRECISE", text: "Confident and cinematic. Full-bleed photography, bold display type, and a technical rhythm built for getting the right help fast.", feel: "Deep navy · Bold sans display · Cinematic motion", image: "/previews/design-b.webp", alt: "Preview of Design 2: a dark navy homepage with a bold sans headline and a full-width technician photo", cls: "is-dark" },
] as const;

export function DesignChooser() {
  return <main className="chooser" id="main-content">
    <Motion rules={rules} />
    <header className="chooser-header site-header"><a className="chooser-logo" href="/" aria-label="KCA Services home"><img src="/brand/kca-logo.webp" alt="KCA Services — Heating, Cooling, Plumbing" width="240" height="89" fetchPriority="high" /></a><span className="chooser-divider" aria-hidden="true" /><span className="chooser-by">Prepared by ElevenChase</span><nav className="chooser-nav" aria-label="Design directions"><a href="#directions">All choices</a><Link href="/design-1/">Design 1</Link><Link href="/design-2/">Design 2</Link></nav><a className="chooser-call" href={siteContent.business.phoneHref}><PhoneIcon /> {siteContent.business.phone}</a></header>

    <section className="chooser-hero" aria-labelledby="chooser-title">
      <div className="chooser-hero-copy">
        <p className="chooser-eyebrow"><i aria-hidden="true" /> A FRESH PERSPECTIVE</p>
        <h1 id="chooser-title"><span>Two fresh directions</span><span>for <em>KCA Services.</em></span></h1>
        <p className="chooser-lede">The same local care, expressed two ways. Explore each complete homepage and choose the direction that feels right.</p>
      </div>
      <a className="chooser-aside" href="#directions">ONE LOCAL TEAM. TWO POSSIBILITIES. <Arrow /></a>
    </section>

    <section className="chooser-grid" id="directions" aria-label="Choose a homepage design">{choices.map((choice, i) => <Link key={choice.n} href={choice.href} className={`choice-card ${choice.cls}`}>
      <div className="choice-window"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>KCA SERVICES — DESIGN {i + 1}</span></div><div className="choice-shot"><img src={choice.image} alt={choice.alt} width="960" height="2200" fetchPriority={i === 0 ? "high" : "auto"} decoding="async" /><span className="choice-go" aria-hidden="true"><Arrow direction="up" /></span></div></div>
      <div className="choice-body">
        <div className="choice-top"><span>DESIGN {choice.n}</span><span>{choice.mood}</span></div>
        <h2>{choice.title}</h2>
        <p>{choice.text}</p>
        <p className="choice-feel">{choice.feel}</p>
        <span className="choice-link">Explore Design {i + 1} <Arrow direction="up" /></span>
      </div>
    </Link>)}</section>

    <section className="chooser-note" aria-labelledby="chooser-note-title">
      <h2 id="chooser-note-title">Different first impressions. <em>The same KCA care.</em></h2>
      <p>Each direction is a complete, responsive homepage. Use the floating bar to switch designs or return here. The request form is a local preview that opens an email draft, and call links lead to {siteContent.business.phone}.</p>
    </section>

    <footer className="chooser-footer"><span>Thoughtfully prepared for KCA Services.</span><span>Two homepage concepts · October 2026</span><span>Presentation only · Excluded from search</span></footer>
  </main>;
}
