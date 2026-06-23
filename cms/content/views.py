from django.http import Http404, JsonResponse
from wagtail.models import Site

from .models import BlogPost, ContactSettings, ExperienceCard, Facility, GalleryImage, HomepageSection, HomePage, NearbyAttraction, PricingCard, Review, FAQ, SiteSettings


def image_url(request, image):
    return request.build_absolute_uri(image.file.url) if image else None


def response(data):
    return JsonResponse(data, json_dumps_params={"ensure_ascii": False})


def site_settings(request):
    settings = SiteSettings.objects.first()
    if not settings:
        return response({})
    return response({"site_name": settings.site_name, "logo": image_url(request, settings.logo), "phone": settings.phone, "whatsapp_number": settings.whatsapp_number, "whatsapp_message": settings.whatsapp_message, "email": settings.email, "instagram_url": settings.instagram_url, "instagram_handle": settings.instagram_handle, "address": settings.address, "google_maps_url": settings.google_maps_url, "seo_title": settings.seo_title, "seo_description": settings.seo_description, "navigation": {"experience": settings.nav_experience, "facilities": settings.nav_facilities, "nearby": settings.nav_nearby, "pricing": settings.nav_pricing, "blog": settings.nav_blog, "gallery": settings.nav_gallery, "contact": settings.nav_contact, "cta": settings.reservation_cta_label}, "footer": {"tagline": settings.footer_tagline, "rights": settings.footer_rights}})


def home(request):
    page = HomePage.objects.live().first()
    if not page:
        return response({})
    hero_video = request.build_absolute_uri(page.hero_video_file.file.url) if page.hero_video_file else page.hero_video
    return response({"hero_eyebrow": page.hero_eyebrow, "hero_title": page.hero_title, "hero_subtitle": page.hero_subtitle, "hero_description": page.hero_description, "hero_image": image_url(request, page.hero_image), "hero_image_alt": page.hero_image_alt, "hero_video": hero_video, "primary_cta_label": page.primary_cta_label, "primary_cta_url": page.primary_cta_url, "secondary_cta_label": page.secondary_cta_label, "secondary_cta_url": page.secondary_cta_url, "stats": [{"value": item.value, "label": item.label} for item in page.hero_stats.all()]})


def facilities(request):
    return response({"items": [{"id": item.pk, "title": item.title, "description": item.description, "icon_name": item.icon_name, "image": image_url(request, item.image), "sort_order": item.sort_order} for item in Facility.objects.filter(is_active=True)]})


def homepage_sections(request):
    return response({"items": [{"key": item.key, "eyebrow": item.eyebrow, "title": item.title, "lead": item.lead, "aside_title": item.aside_title, "aside_text": item.aside_text, "cta_label": item.cta_label, "note": item.note} for item in HomepageSection.objects.filter(is_active=True)]})


def experiences(request):
    return response({"items": [{"id": item.pk, "title": item.title, "description": item.description, "image": image_url(request, item.image), "alt_text": item.alt_text or item.title} for item in ExperienceCard.objects.filter(is_active=True)]})


def pricing(request):
    return response({"items": [{"id": item.pk, "title": item.title, "subtitle": item.subtitle, "icon_name": item.icon_name, "features": item.features, "featured": item.featured} for item in PricingCard.objects.filter(is_active=True)]})


def nearby_attractions(request):
    return response({"items": [{"id": item.pk, "title": item.title, "description": item.description, "distance": item.distance, "image": image_url(request, item.image), "sort_order": item.sort_order} for item in NearbyAttraction.objects.filter(is_active=True)]})


def gallery(request):
    return response({"items": [{"id": item.pk, "title": item.title, "image": image_url(request, item.image), "category": item.category, "alt_text": item.alt_text or item.title, "sort_order": item.sort_order} for item in GalleryImage.objects.filter(is_active=True)]})


def gallery_page(request):
    page = GalleryPage.objects.live().first()
    return response({"intro_title": page.intro_title, "intro_text": page.intro_text, "cta_title": page.cta_title, "cta_text": page.cta_text, "cta_label": page.cta_label} if page else {})


def contact_page(request):
    page = ContactPage.objects.live().first()
    return response({"intro_title": page.intro_title, "intro_text": page.intro_text, "reservation_title": page.reservation_title, "reservation_text": page.reservation_text, "faq_title": page.faq_title, "faq_text": page.faq_text} if page else {})


def blog_payload(request, post):
    return {"title": post.title, "slug": post.slug, "excerpt": post.excerpt, "cover_image": image_url(request, post.cover_image), "category": post.category, "published_date": post.published_date.isoformat(), "body": post.body, "seo_title": post.seo_title, "seo_description": post.seo_description}


def blog_list(request):
    posts = BlogPost.objects.live().filter(is_published=True).order_by("-published_date")
    return response({"items": [blog_payload(request, post) for post in posts]})


def blog_detail(request, slug):
    post = BlogPost.objects.live().filter(slug=slug, is_published=True).first()
    if not post:
        raise Http404
    return response(blog_payload(request, post))


def reviews(request):
    return response({"items": [{"id": item.pk, "name": item.name, "comment": item.comment, "rating": item.rating, "source": item.source, "sort_order": item.sort_order} for item in Review.objects.filter(is_active=True)]})


def faqs(request):
    return response({"items": [{"id": item.pk, "question": item.question, "answer": item.answer, "sort_order": item.sort_order} for item in FAQ.objects.filter(is_active=True)]})


def contact(request):
    settings = ContactSettings.objects.first()
    if not settings:
        return response({})
    return response({"heading": settings.heading, "description": settings.description, "phone": settings.phone, "whatsapp_number": settings.whatsapp_number, "email": settings.email, "address": settings.address, "google_maps_embed_url": settings.google_maps_embed_url})
