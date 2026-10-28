import { siteContent } from "@/content/site";
import { photo } from "@/content/images";
import { Accordion, Arrow, ContactForm, MailIcon, PhoneIcon, PinIcon, SiteHeader, type QA } from "@/components/shared";
import { Motion, type Rule } from "@/components/motion";
import "@/app/design-one.css";
import "@/app/design-one.motion.css";

const nav = [
  { label: "Air Conditioning", href: "#air-conditioning" },
  { label: "Heating", href: "#heating" },
  { label: "Plumbing", href: "#plumbing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const { business, serviceAreas } = siteContent;

const rules: readonly Rule[] = [
  { sel: ".one-intro-head > *", fx: "up", stagger: 120 },
  { sel: ".one-pillar", fx: "up", stagger: 140 },
  { sel: ".one-tabs li", fx: "fade", stagger: 90 },
  { sel: ".one-row-copy > *", fx: "up", stagger: 110 },
  { sel: ".one-approach-copy > *", fx: "up", stagger: 110 },
  { sel: ".one-solutions-list > *", fx: "up", stagger: 100 },
  { sel: ".one-solutions-list li", fx: "left", stagger: 90 },
  { sel: ".one-solutions-quote > *", fx: "up", stagger: 160 },
  { sel: ".one-area-copy > *", fx: "up", stagger: 110 },
  { sel: ".one-area-list > *, .one-area-list li", fx: "left", stagger: 80 },
  { sel: ".one-since", fx: "up" },
  { sel: ".one-faq > div > *", fx: "up", stagger: 110 },
  { sel: ".one-faq details", fx: "left", stagger: 90 },
  { sel: ".one-contact-copy > *", fx: "up", stagger: 110 },
  { sel: ".service-form > *", fx: "up", stagger: 70 },
  { sel: ".one-footer-grid > *", fx: "up", stagger: 90 },
];
const parallax = [".one-hero-photo img"];


const faqs: readonly QA[] = [
  { question: "What areas do you serve?", answer: <p>We serve homeowners in Boerne, San Antonio, Helotes, Fair Oaks Ranch and Bulverde.</p> },
  { question: "Do you repair and replace AC systems?", answer: <p>Yes. KCA Services handles air conditioning repair, installation, replacement and maintenance.</p> },
  { question: "Can I request heating and plumbing service?", answer: <p>Yes. We provide heating and plumbing service as well as air conditioning. Use the form below or call {business.phone}.</p> },
  { question: "How do I schedule service?", answer: <p>Call {business.phone} or send the request form and our team will get back to you. For requests after hours or on the weekend, calling is best.</p> },
];

const pillars = [
  { id: "air-conditioning", n: "01", title: "Heating & Cooling", text: "Keep your home comfortable in every season with expert HVAC service.", icon: <path d="M4 12 12 4l8 8M6.5 10.5V20h11v-9.5M10 20v-5h4v5" /> },
  { id: "plumbing", n: "02", title: "Plumbing", text: "From repairs to installations, we keep your water flowing.", icon: <path d="M12 3c3 4.2 5.5 7 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10 9 7.200 12 3z" /> },
  { id: "heating", n: "03", title: "Heating", text: "Reliable heating solutions for your family’s comfort.", icon: <path d="M12 3c.4 3-1.800 4.300-3.200 6.300C7.500 11.200 7 12.700 7 14a5 5 0 0 0 10 0c0-1.800-.8-3.200-1.800-4.400-.4 1.300-1 2-1.900 2.200.6-3.300-.2-6.600-1.300-8.800z" /> },
] as const;

export function DesignOne() {
  return <div className="design-one" id="top">
    <Motion rules={rules} parallax={parallax} />
    <SiteHeader variant="one" nav={nav} />
    <main id="main-content">
      <section className="one-hero" aria-labelledby="one-hero-title">
        <div className="one-hero-copy">
          <p className="one-eyebrow">HEATING · COOLING · PLUMBING</p>
          <h1 id="one-hero-title">Comfort at home. Confidence in every season.</h1>
          <p className="one-hero-text">Reliable home HVAC and plumbing service in Boerne and the greater San Antonio area.</p>
          <div className="one-hero-actions"><a className="one-button" href="#contact">Request Service</a><a className="one-call" href={business.phoneHref}><PhoneIcon /> Call {business.phone}</a></div>
        </div>
        <div className="one-hero-photo"><img data-parallax fetchPriority="high" src={photo("a-hero", 1800)} alt="A technician connecting a hose to an outdoor air conditioning unit" width="1744" height="944" /><span className="one-hero-tag">PROFESSIONAL SERVICE.<br />LASTING COMFORT.</span></div>
      </section>

      <section className="one-intro" aria-labelledby="one-intro-title">
        <div className="one-intro-head"><p className="one-index"><b>01</b> / THE RIGHT SERVICE FOR YOUR HOME</p><h2 id="one-intro-title">Different needs.<br />One trusted team.</h2></div>
        <div className="one-pillars">{pillars.map(pillar => <a key={pillar.id} href={`#${pillar.id}`} className="one-pillar"><span className="one-pillar-n">{pillar.n}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{pillar.icon}</svg><h3>{pillar.title}</h3><p>{pillar.text}</p></a>)}</div>
        <ul className="one-tabs" aria-label="Services"><li><a href="#air-conditioning">Air Conditioning</a></li><li><a href="#heating">Heating</a></li><li><a href="#plumbing">Plumbing</a></li></ul>
      </section>

      <div className="one-rows">
        <section className="one-row" id="air-conditioning" aria-labelledby="one-ac"><img src={photo("a-ac")} alt="Outdoor air conditioning unit beside a home" width="1396" height="592" /><div className="one-row-copy"><p className="one-index"><b>01</b> / AIR CONDITIONING</p><h2 id="one-ac">Stay cool when Texas heats up.</h2><p>Beat the Texas heat with energy-efficient AC systems, expert repairs, and professional installation.</p><a className="one-more" href="#contact">Learn More <Arrow /></a></div></section>
        <section className="one-row is-flip" id="heating" aria-labelledby="one-heat"><div className="one-row-copy"><p className="one-index"><b>02</b> / HEATING</p><h2 id="one-heat">Warmth you can count on.</h2><p>Stay cozy through the cold with reliable heating service, maintenance, and repairs.</p><a className="one-more" href="#contact">Learn More <Arrow /></a></div><img src={photo("a-furnace")} alt="A warm fire glowing in a home heater" width="1392" height="580" /></section>
        <section className="one-row" id="plumbing" aria-labelledby="one-plumb"><img src={photo("a-plumbing")} alt="A plumber working on a pipe" width="1396" height="564" /><div className="one-row-copy"><p className="one-index"><b>03</b> / PLUMBING</p><h2 id="one-plumb">Plumbing that keeps life moving.</h2><p>From everyday repairs to major installations, our plumbing services keep your home running smoothly.</p><a className="one-more" href="#contact">Learn More <Arrow /></a></div></section>
      </div>

      <section className="one-approach" id="about" aria-labelledby="one-approach-title">
        <div className="one-approach-copy"><p className="one-index"><b>02</b> / OUR APPROACH</p><h2 id="one-approach-title">Good service starts with listening.</h2><p>We take the time to understand your needs, provide honest recommendations, and deliver quality work that lasts. Your comfort is our priority.</p><a className="one-button is-small" href="#contact">Learn More About Us</a></div>
        <img src={photo("a-living")} alt="A bright, comfortable living room with a sectional sofa" width="1392" height="620" />
      </section>

      <section className="one-solutions" aria-labelledby="one-solutions-title">
        <img src={photo("a-comfort")} alt="An air conditioning unit mounted on a home wall" width="944" height="528" />
        <div className="one-solutions-list"><p className="one-index"><b>03</b> / OUR COMFORT SOLUTIONS</p><h2 id="one-solutions-title">Complete comfort for your home.</h2><ul>{["AC repair and installation", "Seasonal tune-ups", "Indoor air quality", "Water heaters", "Drain cleaning"].map(item => <li key={item}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.500" strokeWidth="1.600" /><path d="m8 12.500 3 3 5-6" /></svg>{item}</li>)}</ul></div>
        <div className="one-solutions-quote"><p className="one-index is-gold">BUILT FOR TEXAS HOMES</p><p className="one-quote">Trusted heating, cooling and plumbing solutions.</p></div>
      </section>

      <section className="one-area" aria-labelledby="one-area-title">
        <img src={photo("a-hills")} alt="Green hills under a blue sky" width="944" height="416" />
        <div className="one-area-copy"><p className="one-index"><b>04</b> / SERVICE AREA</p><h2 id="one-area-title">Rooted in Boerne. Ready for the greater San Antonio area.</h2><p>We proudly serve homeowners in Boerne, San Antonio, Helotes, Fair Oaks Ranch and Bulverde.</p></div>
        <div className="one-area-list"><p>Proudly serving</p><ul>{serviceAreas.map(area => <li key={area}>{area}</li>)}</ul></div>
      </section>

      <p className="one-since">Serving local homeowners since <span data-count={business.founded} data-from="1900">{business.founded}</span>.</p>

      <section className="one-faq" id="faq" aria-labelledby="one-faq-title"><div><p className="one-index"><b>05</b> / FAQ</p><h2 id="one-faq-title">Quick answers to common questions.</h2></div><Accordion items={faqs} label="Frequently asked questions" /></section>

      <section className="one-contact" id="contact" aria-labelledby="one-contact-title">
        <div className="one-contact-copy"><p className="one-index"><b>06</b> / GET IN TOUCH</p><h2 id="one-contact-title">Let’s make your home comfortable.</h2><a className="one-phone" href={business.phoneHref}><PhoneIcon /> {business.phone}</a><p>Our team is ready to help. Call today or fill out the form and we’ll get back to you soon.</p></div>
        <ContactForm variant="one" />
      </section>
    </main>
    <footer className="one-footer">
      <div className="one-footer-grid">
        <div className="one-footer-brand"><a href="#top" className="brand brand-one is-inverse">KCA SERVICES</a><p>Heating <i>·</i> Cooling <i>·</i> Plumbing</p></div>
        <nav aria-label="Quick links"><h3>Quick Links</h3><ul>{["Air Conditioning", "Heating", "Plumbing", "About", "Contact"].map((label, i) => <li key={label}><a href={nav[i].href}>{label}</a></li>)}</ul></nav>
        <div><h3>Contact</h3><ul className="one-footer-contact"><li><PhoneIcon /><a href={business.phoneHref}>{business.phone}</a></li><li><PinIcon />{business.city}</li><li><MailIcon /><a href={`mailto:${business.email}`}>{business.email}</a></li></ul></div>
        <div><h3>Service Area</h3><ul>{serviceAreas.map(area => <li key={area}>{area}</li>)}</ul></div>
        <p className="one-footer-since">Serving local homeowners since {business.founded}.</p>
      </div>
      <div className="one-footer-bottom"><span>© {new Date().getFullYear()} KCA Services. All rights reserved.</span></div>
    </footer>
  </div>;
}
