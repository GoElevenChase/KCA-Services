import type { ReactNode } from "react";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";
import "./motion.css";

export const metadata = siteMetadata;

// Runs before first paint so entrance animations never flash. Skipped when the
// visitor prefers reduced motion; without it the page is simply static.
const motionGate = "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}";

export default function RootLayout({ children }: { children: ReactNode }) {
  // suppressHydrationWarning: the inline script above intentionally adds `js-motion` to <html> before hydration.
  return <html lang="en" suppressHydrationWarning><head><link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" /><link rel="preload" href="/fonts/Manrope.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /><script dangerouslySetInnerHTML={{ __html: motionGate }} /></head><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
