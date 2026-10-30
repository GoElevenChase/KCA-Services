import { siteContent } from "@/content/site";
import { photo } from "@/content/images";
import { Accordion, Arrow, ContactForm, MailIcon, PhoneIcon, PinIcon, SiteHeader, type QA } from "@/components/shared";
import { Motion, type Rule } from "@/components/motion";
import "@/app/design-two.css";
import "@/app/design-two.motion.css";

const nav = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#capabilities" },
  { label: "Service Area", href: "#contact" },
  { label: "Contact", href: "#contact" },
] as const;

const { business, serviceAreas } = siteContent;

const rules: readonly Rule[] = [
  { sel: ".two-strip li", fx: "up", stagger: 130 },
  { sel: ".two-split-copy > *", fx: "up", stagger: 110 },
  { sel: ".two-section-copy > *", fx: "up", stagger: 110 },
  { sel: ".two-capabilities details, .two-faq details", fx: "left", stagger: 90 },
  { sel: ".two-process-intro > *", fx: "up", stagger: 110 },
  { sel: ".two-steps li", fx: "up", stagger: 150 },
  { sel: ".two-contact-copy > *", fx: "up", stagger: 110 },
  { sel: ".service-form > *", fx: "up", stagger: 70 },
  { sel: ".two-footer-grid > *", fx: "up", stagger: 100 },
];
const parallax = [".two-hero-photo"];


const capabilities: readonly QA[] = [
  { question: "AC Repair & Installation", answer: <p>Repair, installation and replacement for residential and commercial cooling systems.</p> },
  { question: "Seasonal Maintenance", answer: <p>Routine maintenance to help keep your heating and cooling dependable through the year.</p> },
  { question: "Heating Repair & Installation", answer: <p>Heating service, repairs and installation for your home.</p> },
  { question: "Plumbing Repairs", answer: <p>Everyday plumbing repairs, from garbage disposals to faucet replacements.</p> },
  { question: "Water Heaters", answer: <p>Water heater service and replacement.</p> },
  { question: "Drain Services", answer: <p>Drain cleaning and related plumbing service.</p> },
];

const faqs: readonly QA[] = [
  { question: "How quickly can you get to my home?", answer: <p>Availability depends on our schedule and the type of service. Call {business.phone} and we’ll confirm what we can do.</p> },
  { question: "Do you offer emergency service?", answer: <p>For urgent needs, please call {business.phone} rather than using the form so we can talk through your situation.</p> },
  { question: "What brands do you work with?", answer: <p>Our website lists Carrier, Trane, Daikin, Mitsubishi Electric and American Standard. Call us to ask about your specific system.</p> },
  { question: "Do you provide free estimates?", answer: <p>Call {business.phone} or send the form to ask about an estimate for your project.</p> },
  { question: "Are your technicians licensed and insured?", answer: <p>Please call {business.phone} and we’ll confirm licensing and insurance details for the service you need.</p> },
];

export function DesignTwo() {
  return <div className="design-two" id="top">
    <Motion rules={rules} parallax={parallax} />
    <SiteHeader variant="two" nav={nav} />
    <main id="main-content">
      <section className="two-hero" aria-labelledby="two-hero-title">
        <img data-parallax fetchPriority="high" className="two-hero-photo" src={photo("b-hero", 2400)} alt="A technician servicing an outdoor air conditioning unit" width="1956" height="1244" />
        <div className="two-hero-copy"><p className="two-eyebrow">HVAC &amp; PLUMBING SERVICES</p><h1 id="two-hero-title">Comfort that works as hard as you do.</h1><p>Heating, cooling and plumbing for homes across Boerne and greater San Antonio.</p><div className="two-hero-actions"><a className="two-button" href="#contact">REQUEST SERVICE <Arrow /></a><a className="two-button is-ghost" href="#services">EXPLORE SERVICES</a></div></div>
      </section>

      <ul className="two-strip" id="services" aria-label="Services">{[["01", "COOLING", "Air Conditioning", "#air-conditioning"], ["02", "HEATING", "Heating", "#heating"], ["03", "PLUMBING", "Plumbing", "#plumbing"]].map(([n, kicker, title, href]) => <li key={n}><a href={href}><b>{n}</b><span><small>{kicker}</small>{title}</span><Arrow /></a></li>)}</ul>

      <section className="two-split is-dark" id="air-conditioning" aria-labelledby="two-ac"><img src={photo("b-ac")} alt="A worker beside a large outdoor air conditioning unit" width="1620" height="868" /><div className="two-split-copy"><p className="two-eyebrow">01 / AIR CONDITIONING</p><h2 id="two-ac">Stay cool when it matters most.</h2><p>From fast repairs to full system installations, our team keeps your home comfortable through the hottest Texas days.</p><a className="two-button" href="#contact">AC SERVICES <Arrow /></a></div></section>
      <section className="two-split is-light is-flip" id="heating" aria-labelledby="two-heat"><div className="two-split-copy"><p className="two-eyebrow is-muted">02 / HEATING</p><h2 id="two-heat">Reliable warmth all season long.</h2><p>We service and install high-efficiency heating systems to keep your home safe, comfortable and energy efficient.</p><a className="two-button" href="#contact">HEATING SERVICES <Arrow /></a></div><img src={photo("b-furnace")} alt="A cast iron stove providing home heat" width="1612" height="752" /></section>
      <section className="two-split is-dark" id="plumbing" aria-labelledby="two-plumb"><img src={photo("b-plumbing")} alt="A plumber fixing a water heater" width="1620" height="816" /><div className="two-split-copy"><p className="two-eyebrow">03 / PLUMBING</p><h2 id="two-plumb">Clean water. Healthy homes.</h2><p>From leaky faucets to water heater replacement, our plumbers deliver dependable solutions for your home.</p><a className="two-button" href="#contact">PLUMBING SERVICES <Arrow /></a></div></section>

      <section className="two-capabilities" id="capabilities" aria-labelledby="two-cap-title"><div className="two-section-copy"><p className="two-eyebrow is-muted">OUR CAPABILITIES</p><h2 id="two-cap-title">Complete home comfort solutions.</h2><p>We offer a full range of HVAC and plumbing services to keep your home running smoothly.</p><a className="two-link" href="#contact">VIEW ALL SERVICES <Arrow /></a></div><Accordion items={capabilities} label="Our capabilities" /></section>

      <section className="two-process" aria-labelledby="two-process-title"><div className="two-process-intro"><p className="two-eyebrow">OUR PROCESS</p><h2 id="two-process-title">A clearer path to comfort.</h2><p>Getting the right solution is simple. Our streamlined process makes it easy to get the service you need.</p><span className="two-rule" aria-hidden="true" /></div><ol className="two-steps">{[["01", "Tell us what you need.", "Call or fill out our form with a few details about your service request."], ["02", "Schedule your service.", "We’ll find a time that works for your schedule and confirm your appointment."], ["03", "Get back to comfortable.", "Our skilled technicians arrive on time and get the job done right."]].map(([n, title, text]) => <li key={n}><b>{n}</b><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

      <section className="two-faq" id="faq" aria-labelledby="two-faq-title"><div className="two-section-copy"><p className="two-eyebrow is-muted">FREQUENTLY ASKED QUESTIONS</p><h2 id="two-faq-title">Answers to your most common questions.</h2><p>Find quick answers to the questions we get most often about our services, scheduling and more.</p><a className="two-link" href="#contact">ASK US A QUESTION <Arrow /></a></div><Accordion items={faqs} label="Frequently asked questions" /></section>

      <section className="two-contact" id="contact" aria-labelledby="two-contact-title">
        <div className="two-contact-photo"><img src="/images/b-van.webp" alt="A KCA Services van parked outside a home at dusk" width="832" height="704" /><div className="two-contact-copy"><p className="two-eyebrow">GET IN TOUCH</p><h2 id="two-contact-title">Ready for reliable home comfort?</h2><p>Contact our team today to schedule service, request an estimate or ask a question.</p><a className="two-phone" href={business.phoneHref}><PhoneIcon /> {business.phone}</a></div></div>
        <div className="two-contact-form"><ContactForm variant="two" /></div>
      </section>
    </main>
    <footer className="two-footer">
      <div className="two-footer-grid">
        <div className="two-footer-brand"><a href="#top" className="brand brand-two" aria-label="Back to top"><b>KCA</b> SERVICES</a><p className="two-footer-tag">HEATING <i>/</i> COOLING <i>/</i> PLUMBING</p></div>
        <div className="two-footer-col"><h3>Quick Links</h3><ul>{[["Air Conditioning", "#air-conditioning"], ["Heating", "#heating"], ["Plumbing", "#plumbing"], ["About", "#capabilities"], ["Contact", "#contact"]].map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></div>
        <div className="two-footer-col"><h3>Contact</h3><ul className="two-footer-contact"><li><PhoneIcon /><a href={business.phoneHref}>{business.phone}</a></li><li><PinIcon />{business.city}</li><li><MailIcon /><a href={`mailto:${business.email}`}>{business.email}</a></li></ul></div>
        <div className="two-footer-col"><h3>Service Area</h3><ul>{serviceAreas.map(area => <li key={area}>{area}</li>)}</ul></div>
        <p className="two-footer-since">Serving local homeowners since {business.founded}.</p>
      </div>
      <div className="two-footer-bottom"><span>© {new Date().getFullYear()} KCA Services. All rights reserved.</span><span>Prepared by ElevenChase</span></div>
    </footer>
  </div>;
}
