/**
 * Section photos, hosted on the Unsplash CDN (free to use under the Unsplash License).
 * They are generic stock photos, not pictures of KCA staff, vehicles or jobs.
 * Replace with KCA's own photography when it is available.
 */
const photos = {
  "a-hero": "photo-1792799881226-e841c0f9c125",
  "b-hero": "photo-1792799888905-8696bd32a11a",
  "b-ac": "photo-1591357167522-61d54313c8a4",
  "a-ac": "photo-1665826254141-bfa10685e002",
  "a-comfort": "photo-1757219525975-03b5984bc6e8",
  "a-furnace": "photo-1738597965969-791bf9fb7def",
  "b-furnace": "photo-1780277521170-6f7b723cfb8d",
  "a-plumbing": "photo-1676210134188-4c05dd172f89",
  "b-plumbing": "photo-1676210134190-3f2c0d5cf58d",
  "a-living": "photo-1770736158887-9a0f3702416e",
  "a-hills": "photo-1592190057402-2bf1ee02118d",
} as const;

export type PhotoName = keyof typeof photos;

/** HD, auto-formatted (WebP/AVIF where supported) and cropped by the CDN to the width requested. */
export function photo(name: PhotoName, width = 1400, quality = 78): string {
  return `https://images.unsplash.com/${photos[name]}?w=${width}&q=${quality}&auto=format&fit=crop`;
}
