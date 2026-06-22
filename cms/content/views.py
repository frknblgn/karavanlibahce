from django.http import Http404, JsonResponse
from wagtail.models import Site

from .models import BlogPost, ContactSettings, Facility, GalleryImage, HomePage, NearbyAttraction, Review, FAQ, SiteSettings


def image_url(request, image):
    return request.build_absolute_uri(image.file.url) if image else None


def response(data):
    return JsonResponse(data, json_dumps_params={"ensure_ascii": False})


def site_settings(request):
    settings = SiteSettings.objects.first()
    if not settings:
        return response({})
    return response({"site_name": settings.site_name, "logo": image_url(request, settings.logo), "phone": settings.phone, "whatsapp_number": settings.whatsapp_number, "email": settings.email, "instagram_url": settings.instagram_url, "address": settings.address, "google_maps_url": settings.google_maps_url, "seo_title": settings.seo_title, "seo_description": settings.seo_description, "navigation": {"experience": settings.nav_experience, "facilities": settings.nav_facilities, "nearby": settings.nav_nearby, "blog": settings.nav_blog, "gallery": settings.nav_gallery, "contact": settings.nav_contact, "cta": settings.reservation_cta_label}, "footer": {"tagline": settings.footer_tagline, "rights": settings.footer_rights}})


def home(request):
    page = HomePage.objects.live().first()
    if not page:
        return response({})
    return response({"hero_title": page.hero_title, "hero_subtitle": page.hero_subtitle, "hero_description": page.hero_description, "hero_image": image_url(request, page.hero_image), "hero_video": page.hero_video, "primary_cta_label": page.primary_cta_label, "primary_cta_url": page.primary_cta_url, "secondary_cta_label": page.secondary_cta_label, "secondary_cta_url": page.secondary_cta_url})


def facilities(request):
    return response({"items": [{"id": item.pk, "title": item.title, "description": item.description, "icon_name": item.icon_name, "image": image_url(request, item.image), "sort_order": item.sort_order} for item in Facility.objects.filter(is_active=True)]})


def nearby_attractions(request):
    return response({"items": [{"id": item.pk, "title": item.title, "description": item.description, "distance": item.distance, "image": image_url(request, item.image), "sort_order": item.sort_order} for item in NearbyAttraction.objects.filter(is_active=True)]})


def gallery(request):
    return response({"items": [{"id": item.pk, "title": item.title, "image": image_url(request, item.image), "category": item.category, "alt_text": item.alt_text or item.title, "sort_order": item.sort_order} for item in GalleryImage.objects.filter(is_active=True)]})


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
