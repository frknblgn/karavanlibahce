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
export interface CmsHome { hero_eyebrow: string; hero_title: string; hero_subtitle: string; hero_description: string; hero_image: string | null; hero_image_alt: string; hero_video: string; primary_cta_label: string; primary_cta_url: string; secondary_cta_label: string; secondary_cta_url: string; facilities_image: string | null; facilities_image_alt: string; facilities_badge_title: string; facilities_badge_subtitle: string; stats: Array<{ value: string; label: string }> }
export interface CmsContact { heading: string; description: string; phone: string; whatsapp_number: string; email: string; address: string; google_maps_embed_url: string }
export interface CmsGalleryPage { intro_title: string; intro_text: string; cta_title: string; cta_text: string; cta_label: string }
export interface CmsContactPage { intro_title: string; intro_text: string; reservation_title: string; reservation_text: string; faq_title: string; faq_text: string }
export interface CmsHomepageSection { key: string; eyebrow: string; title: string; lead: string; aside_title: string; aside_text: string; cta_label: string; note: string }
export interface CmsExperience { id: number; title: string; description: string; image: string | null; alt_text: string }
export interface CmsPricing { id: number; title: string; subtitle: string; icon_name: string; features: string[]; featured: boolean }
export interface CmsBlogPost { title: string; slug: string; excerpt: string; cover_image: string | null; category: string; published_date: string; body: string; seo_title: string; seo_description: string }
export interface CmsSiteSettings { site_name: string; logo: string | null; phone: string; whatsapp_number: string; whatsapp_message: string; instagram_url: string; instagram_handle: string; navigation: Record<string, string>; footer: { tagline: string; rights: string } }
