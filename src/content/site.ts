/**
 * The shared business content for both visual directions.
 * Facts here come from kcaservices.net and the approved design mock-ups.
 * Keep genuine business information here so changing a design never changes the offer.
 */
export interface SiteContent {
  readonly business: {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly phoneHref: string;
    readonly url: string;
    readonly tagline: string;
    readonly description: string;
    readonly city: string;
    readonly founded: string;
  };
  readonly services: readonly { readonly id: string; readonly title: string }[];
  readonly serviceAreas: readonly string[];
}

export const siteContent: SiteContent = {
  business: {
    name: "KCA Services",
    email: "info@kcaservices.net",
    phone: "(210) 675-8366",
    phoneHref: "tel:+12106758366",
    url: "https://kcaservices.net",
    tagline: "Comfort at home. Confidence in every season.",
    description:
      "Reliable air conditioning, heating and plumbing service for homes in Boerne, Texas and the greater San Antonio area. Serving local homeowners since 1973.",
    city: "Boerne, TX",
    founded: "1973",
  },
  services: [
    { id: "air-conditioning", title: "Air Conditioning" },
    { id: "heating", title: "Heating" },
    { id: "plumbing", title: "Plumbing" },
  ],
  serviceAreas: ["Boerne", "San Antonio", "Helotes", "Fair Oaks Ranch", "Bulverde"],
};
