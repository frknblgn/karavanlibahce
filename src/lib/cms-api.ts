// The public CMS endpoint is a production default. An environment variable can
// still override it for local or preview deployments.
const baseUrl = (
  process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://karavanlibahce-cms.onrender.com/api"
).replace(/\/$/, "");

export async function getCmsData<T>(path: string): Promise<T | null> {
  if (!baseUrl) return null;
  try {
    const response = await fetch(`${baseUrl}${path}`, { next: { revalidate: 60 } });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

export interface CmsCollection<T> { items: T[] }
export interface CmsFacility { id: number; title: string; description: string; icon_name: string; image: string | null }
export interface CmsNearbyAttraction { id: number; title: string; description: string; distance: string; image: string | null }
export interface CmsGalleryImage { id: number; title: string; image: string; category: string; alt_text: string }
export interface CmsReview { id: number; name: string; comment: string; rating: number; source: string }
export interface CmsFaq { id: number; question: string; answer: string }
export interface CmsHome { hero_title: string; hero_subtitle: string; hero_description: string; hero_image: string | null; hero_video: string; primary_cta_label: string; primary_cta_url: string; secondary_cta_label: string; secondary_cta_url: string }
export interface CmsContact { heading: string; description: string; phone: string; whatsapp_number: string; email: string; address: string; google_maps_embed_url: string }
export interface CmsBlogPost { title: string; slug: string; excerpt: string; cover_image: string | null; category: string; published_date: string; body: string; seo_title: string; seo_description: string }
