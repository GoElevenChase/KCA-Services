"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { siteContent } from "@/content/site";
import { siteSettings } from "@/lib/site-settings";
import { buildEmailDraft, isAcceptedResponse, validateInquiry, type Inquiry } from "@/lib/contact";

type Variant = "one" | "two";

export function Arrow({ direction = "right" }: { direction?: "right" | "up" }) {
  return <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={direction === "up" ? { transform: "rotate(-45deg)" } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function PhoneIcon() {
  return <svg className="icon-phone" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" /></svg>;
}

export function PinIcon() {
  return <svg className="icon-pin" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>;
}

export function MailIcon() {
  return <svg className="icon-mail" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.5 7v.1L12 12.4 19.5 7.1V7z" /></svg>;
}

/** Text wordmark matching the mock-ups. The artwork logo was not available to save. */
export function Brand({ variant, inverse = false }: { variant: Variant; inverse?: boolean }) {
  return variant === "one"
    ? inverse ? <span className="brand brand-one is-inverse">KCA SERVICES</span> : <span className="brand brand-one"><img src="/brand/kca-logo.webp" alt="KCA Services — Heating, Cooling, Plumbing" width="240" height="89" /></span>
    : <span className="brand brand-two"><b>KCA</b> SERVICES</span>;
}

export function SiteHeader({ variant, nav }: { variant: Variant; nav: readonly { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className={`site-header header-${variant}`}>
    <a className="brand-link" href="#top" aria-label={`${siteContent.business.name} home`}><Brand variant={variant} /></a>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item, index) => <a key={item.href + item.label} href={item.href} aria-current={variant === "two" && index === 0 ? "true" : undefined}>{item.label}</a>)}</nav>
    {variant === "two" && <a className="header-phone" href={siteContent.business.phoneHref}><PhoneIcon /> {siteContent.business.phone}</a>}
    <a className="header-cta" href="#contact">{variant === "one" ? "Request Service" : <>REQUEST SERVICE</>}</a>
    <button ref={trigger} type="button" className="mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    {open && <div id="mobile-navigation" ref={panel} className="mobile-navigation"><nav aria-label="Mobile navigation">{nav.map(item => <a key={item.href + item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}<a href={siteContent.business.phoneHref}>Call {siteContent.business.phone}</a><a href="#contact" onClick={() => setOpen(false)}>Request Service</a></nav></div>}
  </header>;
}

export interface QA { readonly question: string; readonly answer: ReactNode }

export function Accordion({ items, label }: { items: readonly QA[]; label: string }) {
  return <div className="accordion" role="list" aria-label={label}>{items.map((item, index) => <details key={item.question} role="listitem"><summary><span className="acc-number">0{index + 1}</span><span className="acc-title">{item.question}</span><span className="acc-plus" aria-hidden="true" /></summary><div className="acc-body">{item.answer}</div></details>)}</div>;
}

export function ContactForm({ variant }: { variant: Variant }) {
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "draft" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // An unhydrated form must not fall back to a native GET with inquiry text
  // in the URL. Direct phone and email links remain available without JavaScript.
  useEffect(() => { setHydrated(true); }, []);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || status === "working") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const inquiry: Inquiry = { name: String(values.get("name") || ""), phone: String(values.get("phone") || ""), service: String(values.get("service") || ""), message: String(values.get("message") || ""), website: String(values.get("website") || "") };
    const error = validateInquiry(inquiry);
    if (error) { setStatus("error"); setMessage(error); return; }
    if (siteSettings.contactMode === "email") {
      window.location.href = buildEmailDraft(siteContent.business.email, inquiry);
      setStatus("draft"); setMessage(`Your email draft is ready. Send it from your email app to complete your request. If no app opened, call ${siteContent.business.phone} or email ${siteContent.business.email}.`);
      return;
    }
    setStatus("working"); setMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(siteSettings.contactEndpoint!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...inquiry, formId: "service-request", submissionId: crypto.randomUUID() }), signal: controller.signal, credentials: "omit" });
      const result: unknown = await response.json();
      if (!response.ok || !isAcceptedResponse(result)) throw new Error("The server did not confirm your request.");
      setStatus("success"); setMessage("Your request was received. Thank you; our team will be in touch."); form.reset();
    } catch {
      setStatus("error"); setMessage(`We couldn’t confirm delivery. Please try again or call ${siteContent.business.phone}. Your message is still here.`);
    } finally { window.clearTimeout(timeout); }
  }
  const one = variant === "one";
  return <form className={`service-form form-${variant}`} onSubmit={onSubmit} aria-label="Request service">
    <div className="form-row"><label><span>{one ? "Name *" : "Full Name *"}</span><input name="name" autoComplete="name" placeholder={one ? "" : "Your name"} required minLength={2} maxLength={120} /></label><label><span>{one ? "Phone *" : "Phone Number *"}</span><input name="phone" type="tel" autoComplete="tel" placeholder={one ? "" : "(xxx) xxx-xxxx"} required maxLength={40} /></label></div>
    <label><span>{one ? "Service Needed *" : "Service Needed *"}</span><select name="service" defaultValue="">{!one && <option value="">Select a service</option>}{one && <option value="">Select a service</option>}{siteContent.services.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}<option value="Water Heater">Water Heater</option><option value="Drain Services">Drain Services</option></select></label>
    <label><span>Message</span><textarea name="message" rows={4} maxLength={4000} placeholder={one ? "" : "How can we help you?"} /></label>
    <div className="honey-field" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button type="submit" className="form-submit" disabled={!hydrated || status === "working"}>{status === "working" ? "Sending…" : one ? "Request Service" : <>SEND MESSAGE <Arrow /></>}</button>
    <p className="form-helper">{siteSettings.contactMode === "email" ? "This opens your email app with your request. Nothing is sent until you press Send there." : "Your details are sent to our configured request service when you submit."}</p>
    <noscript><p className="form-helper">Call <a href={siteContent.business.phoneHref}>{siteContent.business.phone}</a> or email <a href={`mailto:${siteContent.business.email}`}>{siteContent.business.email}</a>.</p></noscript>
    <p className={`form-status status-${status}`} role="status" aria-live="polite">{message}</p>
  </form>;
}

export function DesignSwitcher({ active }: { active: "design-1" | "design-2" }) {
  if (siteSettings.isProduction) return null;
  return <nav className="design-switcher" aria-label="Design review navigation"><Link className="switcher-back" href="/" aria-label="Back to both designs">All choices</Link><span className="switcher-divider" /><Link href="/design-1/" aria-current={active === "design-1" ? "page" : undefined}>Choice A</Link><Link href="/design-2/" aria-current={active === "design-2" ? "page" : undefined}>Choice B</Link></nav>;
}
