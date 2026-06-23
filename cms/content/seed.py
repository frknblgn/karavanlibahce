"""Import the repository's current fallback content into Wagtail once."""

import json
import re
from datetime import date
from pathlib import Path

from django.core.files import File
from wagtail.images import get_image_model
from wagtail.models import Page, Site

from .models import BlogPost, ContactPage, ContactSettings, Facility, FAQ, GalleryImage, GalleryPage, HeroStat, HomePage, NearbyAttraction, Review, SiteSettings

REPO_ROOT = Path(__file__).resolve().parents[2]


def load_json(relative_path):
    return json.loads((REPO_ROOT / relative_path).read_text(encoding="utf-8"))


def get_image(relative_url):
    if not relative_url:
        return None
    source = REPO_ROOT / "public" / relative_url.lstrip("/")
    if not source.exists() or source.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        return None
    Image = get_image_model()
    existing = Image.objects.filter(title=source.name).first()
    if existing:
        return existing
    with source.open("rb") as image_file:
        return Image.objects.create(title=source.name, file=File(image_file, name=source.name))


def seed():
    site_data = load_json("src/content/cms/site.json")
    site = Site.objects.get(is_default_site=True)
    settings, _ = SiteSettings.objects.get_or_create(site=site)
    settings.site_name = site_data["name"]
    settings.phone = site_data["contact"]["phone"]
    settings.whatsapp_number = site_data["contact"]["whatsapp"]
    settings.email = site_data["contact"]["email"]
    settings.instagram_url = site_data["social"]["instagram"]
    settings.address = site_data["address"]["full"]
    settings.google_maps_url = site_data["mapsUrl"]
    settings.seo_title = site_data["seo"]["defaultTitle"]["tr"]
    settings.seo_description = site_data["description"]["tr"]
    settings.logo = get_image(site_data["branding"]["logo"])
    dictionary = load_json("src/content/cms/dictionaries/tr.json")
    settings.nav_experience = dictionary["nav"]["experience"]
    settings.nav_facilities = dictionary["nav"]["facilities"]
    settings.nav_nearby = dictionary["nav"]["nearby"]
    settings.nav_blog = dictionary["nav"]["blog"]
    settings.nav_gallery = dictionary["nav"]["gallery"]
    settings.nav_contact = dictionary["nav"]["contact"]
    settings.reservation_cta_label = dictionary["nav"]["cta"]
    settings.footer_tagline = dictionary["footer"]["tagline"]
    settings.footer_rights = dictionary["footer"]["rights"]
    settings.save()

    contact, _ = ContactSettings.objects.get_or_create(site=site)
    contact.heading = "Yeriniz sizi bekliyor"
    contact.description = "Rezervasyon ve sorularınız için en hızlı yol WhatsApp."
    contact.phone = settings.phone
    contact.whatsapp_number = settings.whatsapp_number
    contact.email = settings.email
    contact.address = settings.address
    contact.google_maps_embed_url = settings.google_maps_url
    contact.save()

    home = HomePage.objects.first()
    if not home:
        root = Page.get_first_root_node()
        home = HomePage(title="Ana Sayfa", slug="ana-sayfa")
        root.add_child(instance=home)
        home.save_revision().publish()
        site.root_page = home
        site.save()
    home.hero_title = dictionary["hero"]["title"]
    home.hero_eyebrow = dictionary["hero"]["eyebrow"]
    home.hero_subtitle = dictionary["hero"]["eyebrow"]
    home.hero_description = dictionary["hero"]["subtitle"]
    home.hero_image = get_image(site_data["hero"]["image"])
    home.hero_image_alt = site_data["hero"]["alt"]
    home.primary_cta_label = dictionary["hero"]["primaryCta"]
    home.primary_cta_url = "/contact"
    home.secondary_cta_label = dictionary["hero"]["secondaryCta"]
    home.secondary_cta_url = "/gallery"
    home.save_revision().publish()
    home.hero_stats.all().delete()
    for index, stat in enumerate(dictionary["hero"]["stats"]):
        HeroStat.objects.create(page=home, value=stat["value"], label=stat["label"], sort_order=index)

    gallery_page = GalleryPage.objects.first()
    if not gallery_page:
        gallery_page = GalleryPage(title="Galeri", slug="gallery")
        home.add_child(instance=gallery_page)
    gallery_page.intro_title = dictionary["galleryPage"]["title"]
    gallery_page.intro_text = dictionary["galleryPage"]["lead"]
    gallery_page.cta_title = dictionary["galleryPage"]["ctaTitle"]
    gallery_page.cta_text = dictionary["galleryPage"]["ctaText"]
    gallery_page.cta_label = dictionary["galleryPage"]["ctaButton"]
    gallery_page.save_revision().publish()

    contact_page = ContactPage.objects.first()
    if not contact_page:
        contact_page = ContactPage(title="İletişim", slug="contact")
        home.add_child(instance=contact_page)
    contact_page.intro_title = contact.heading
    contact_page.intro_text = contact.description
    contact_page.reservation_title = dictionary["contactPage"]["reservationTitle"]
    contact_page.reservation_text = dictionary["contactPage"]["reservationText"]
    contact_page.faq_title = dictionary["contactPage"]["faqTitle"]
    contact_page.faq_text = dictionary["contactPage"]["faqText"]
    contact_page.save_revision().publish()

    for index, item in enumerate(load_json("src/content/cms/data/facilities.json")["items"]):
        Facility.objects.update_or_create(title=item["tr"], defaults={"description": item["en"], "icon_name": item["icon"], "sort_order": index, "is_active": True})
    for index, item in enumerate(load_json("src/content/cms/data/nearby.json")["items"]):
        NearbyAttraction.objects.update_or_create(title=item["tr"]["title"], defaults={"description": item["tr"]["description"], "distance": item["distance"], "image": get_image(item["image"]), "sort_order": index, "is_active": True})
    for index, item in enumerate(load_json("src/content/cms/data/gallery.json")["items"]):
        GalleryImage.objects.update_or_create(title=item["tr"], defaults={"image": get_image(item["image"]), "category": item.get("category", "nature"), "alt_text": item["tr"], "sort_order": index, "is_active": True})
    for index, item in enumerate(load_json("src/content/cms/data/reviews.json")["items"]):
        Review.objects.update_or_create(name=item["name"], defaults={"comment": item["text"]["tr"], "rating": 5, "source": item["role"]["tr"], "sort_order": index, "is_active": True})
    for index, item in enumerate(load_json("src/content/cms/data/faq.json")["items"]):
        FAQ.objects.update_or_create(question=item["tr"]["q"], defaults={"answer": f"<p>{item['tr']['a']}</p>", "sort_order": index, "is_active": True})

    for source in (REPO_ROOT / "src/content/blog").glob("*.mdx"):
        raw = source.read_text(encoding="utf-8")
        frontmatter = raw.split("---", 2)[1] if raw.startswith("---") else ""
        body = raw.split("---", 2)[2].strip() if raw.startswith("---") else raw
        values = dict(re.findall(r'^([a-z_]+):\s*"?([^"\n]+)"?$', frontmatter, re.MULTILINE))
        slug = values.get("slug", source.stem)
        post = BlogPost.objects.filter(slug=slug).first()
        if not post:
            post = BlogPost(title=values.get("title", slug), slug=slug, excerpt=values.get("description", ""), category=values.get("category", ""), published_date=date.fromisoformat(values.get("date", "2026-01-01")), body=f"<p>{body}</p>", is_published=True)
            home.add_child(instance=post)
            post.save_revision().publish()

    return {"home": HomePage.objects.count(), "gallery_pages": GalleryPage.objects.count(), "contact_pages": ContactPage.objects.count(), "facilities": Facility.objects.count(), "nearby": NearbyAttraction.objects.count(), "gallery": GalleryImage.objects.count(), "reviews": Review.objects.count(), "faqs": FAQ.objects.count(), "blogs": BlogPost.objects.count()}
