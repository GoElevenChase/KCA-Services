import Link from "next/link";
import { siteContent } from "@/content/site";

export default function NotFound() {
  return <main id="main-content" className="not-found"><span>404 / PAGE NOT FOUND</span><h1>We couldn’t find<br />that page.</h1><p>Call {siteContent.business.phone} and we’ll point you in the right direction.</p><Link href="/">Back to the homepage</Link></main>;
}
