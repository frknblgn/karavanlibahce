from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import RichTextField
from wagtail.models import Orderable, Page
from wagtail.snippets.models import register_snippet


@register_setting
class SiteSettings(BaseSiteSetting):
    site_name = models.CharField(max_length=120, default="Bursa Karavanlı Bahçe")
    logo = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    phone = models.CharField(max_length=50, blank=True)
    whatsapp_number = models.CharField(max_length=32, blank=True, help_text="Country code included, digits only")
    whatsapp_message = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    instagram_url = models.URLField(blank=True)
    instagram_handle = models.CharField(max_length=120, blank=True)
    address = models.TextField(blank=True)
    google_maps_url = models.URLField(blank=True)
    seo_title = models.CharField(max_length=160, blank=True)
    seo_description = models.TextField(blank=True)
    nav_experience = models.CharField(max_length=80, blank=True)
    nav_facilities = models.CharField(max_length=80, blank=True)
    nav_nearby = models.CharField(max_length=80, blank=True)
    nav_blog = models.CharField(max_length=80, blank=True)
    nav_gallery = models.CharField(max_length=80, blank=True)
    nav_contact = models.CharField(max_length=80, blank=True)
    nav_pricing = models.CharField(max_length=80, blank=True)
    reservation_cta_label = models.CharField(max_length=80, blank=True)
    footer_tagline = models.CharField(max_length=255, blank=True)
    footer_rights = models.CharField(max_length=255, blank=True)

    panels = [
        MultiFieldPanel([FieldPanel("site_name"), FieldPanel("logo")], "Brand"),
        MultiFieldPanel([FieldPanel("phone"), FieldPanel("whatsapp_number"), FieldPanel("whatsapp_message"), FieldPanel("email"), FieldPanel("instagram_url"), FieldPanel("instagram_handle"), FieldPanel("address"), FieldPanel("google_maps_url")], "Contact"),
        MultiFieldPanel([FieldPanel("seo_title"), FieldPanel("seo_description")], "SEO"),
        MultiFieldPanel([FieldPanel("nav_experience"), FieldPanel("nav_facilities"), FieldPanel("nav_nearby"), FieldPanel("nav_pricing"), FieldPanel("nav_blog"), FieldPanel("nav_gallery"), FieldPanel("nav_contact"), FieldPanel("reservation_cta_label")], "Navigation"),
        MultiFieldPanel([FieldPanel("footer_tagline"), FieldPanel("footer_rights")], "Footer"),
    ]


@register_setting
class ContactSettings(BaseSiteSetting):
    heading = models.CharField(max_length=160, default="Yeriniz sizi bekliyor")
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    whatsapp_number = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    google_maps_embed_url = models.URLField(blank=True)

    panels = [FieldPanel(field_name) for field_name in ("heading", "description", "phone", "whatsapp_number", "email", "address", "google_maps_embed_url")]


class HomePage(Page):
    hero_eyebrow = models.CharField(max_length=120, blank=True)
    hero_title = models.CharField(max_length=255, blank=True)
    hero_subtitle = models.CharField(max_length=255, blank=True)
    hero_description = models.TextField(blank=True)
    hero_image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    hero_image_alt = models.CharField(max_length=255, blank=True)
    hero_video = models.URLField(blank=True)
    hero_video_file = models.ForeignKey("wagtaildocs.Document", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    primary_cta_label = models.CharField(max_length=80, blank=True)
    primary_cta_url = models.CharField(max_length=255, blank=True)
    secondary_cta_label = models.CharField(max_length=80, blank=True)
    secondary_cta_url = models.CharField(max_length=255, blank=True)

    content_panels = Page.content_panels + [
        MultiFieldPanel([FieldPanel("hero_eyebrow"), FieldPanel("hero_title"), FieldPanel("hero_subtitle"), FieldPanel("hero_description"), FieldPanel("hero_image"), FieldPanel("hero_image_alt"), FieldPanel("hero_video_file"), FieldPanel("hero_video")], "Hero"),
        MultiFieldPanel([FieldPanel("primary_cta_label"), FieldPanel("primary_cta_url"), FieldPanel("secondary_cta_label"), FieldPanel("secondary_cta_url")], "Calls to action"),
        InlinePanel("hero_stats", label="Hero statistics"),
    ]


class HeroStat(Orderable):
    page = ParentalKey(HomePage, on_delete=models.CASCADE, related_name="hero_stats")
    value = models.CharField(max_length=80)
    label = models.CharField(max_length=120)

    panels = [FieldPanel("value"), FieldPanel("label")]


class GalleryPage(Page):
    intro_title = models.CharField(max_length=160, default="Bahçeden anlar")
    intro_text = models.TextField(blank=True)
    cta_title = models.CharField(max_length=160, blank=True)
    cta_text = models.TextField(blank=True)
    cta_label = models.CharField(max_length=80, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro_title"), FieldPanel("intro_text"),
        MultiFieldPanel([FieldPanel("cta_title"), FieldPanel("cta_text"), FieldPanel("cta_label")], "Reservation call to action"),
    ]
    parent_page_types = ["content.HomePage"]


class ContactPage(Page):
    intro_title = models.CharField(max_length=160, default="Yeriniz sizi bekliyor")
    intro_text = models.TextField(blank=True)
    reservation_title = models.CharField(max_length=160, blank=True)
    reservation_text = models.TextField(blank=True)
    faq_title = models.CharField(max_length=160, blank=True)
    faq_text = models.TextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro_title"), FieldPanel("intro_text"),
        MultiFieldPanel([FieldPanel("reservation_title"), FieldPanel("reservation_text")], "Reservation information"),
        MultiFieldPanel([FieldPanel("faq_title"), FieldPanel("faq_text")], "FAQ teaser"),
    ]
    parent_page_types = ["content.HomePage"]


class SortableActive(models.Model):
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ["sort_order", "id"]


@register_snippet
class HomepageSection(SortableActive):
    key = models.CharField(max_length=40, unique=True, help_text="experience, facilities, nearby, pricing, reviews or faq")
    eyebrow = models.CharField(max_length=120, blank=True)
    title = models.CharField(max_length=160, blank=True)
    lead = models.TextField(blank=True)
    aside_title = models.CharField(max_length=160, blank=True)
    aside_text = models.TextField(blank=True)
    cta_label = models.CharField(max_length=100, blank=True)
    note = models.TextField(blank=True)
    panels = [FieldPanel(name) for name in ("key", "eyebrow", "title", "lead", "aside_title", "aside_text", "cta_label", "note", "sort_order", "is_active")]

    def __str__(self):
        return self.key


@register_snippet
class ExperienceCard(SortableActive):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    alt_text = models.CharField(max_length=255, blank=True)
    panels = [FieldPanel(name) for name in ("title", "description", "image", "alt_text", "sort_order", "is_active")]

    def __str__(self): return self.title


@register_snippet
class PricingCard(SortableActive):
    title = models.CharField(max_length=160)
    subtitle = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, blank=True)
    features = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    panels = [FieldPanel(name) for name in ("title", "subtitle", "icon_name", "features", "featured", "sort_order", "is_active")]

    def __str__(self): return self.title


@register_snippet
class Facility(SortableActive):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, blank=True)
    image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    panels = [FieldPanel("title"), FieldPanel("description"), FieldPanel("icon_name"), FieldPanel("image"), FieldPanel("sort_order"), FieldPanel("is_active")]

    def __str__(self):
        return self.title


@register_snippet
class NearbyAttraction(SortableActive):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    distance = models.CharField(max_length=50, blank=True)
    image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    panels = [FieldPanel("title"), FieldPanel("description"), FieldPanel("distance"), FieldPanel("image"), FieldPanel("sort_order"), FieldPanel("is_active")]

    def __str__(self):
        return self.title


@register_snippet
class GalleryImage(SortableActive):
    CATEGORY_CHOICES = [("caravan", "Karavan Alanı"), ("nature", "Doğa"), ("fire", "Ateş Başı"), ("nearby", "Çevre")]
    title = models.CharField(max_length=160)
    image = models.ForeignKey("wagtailimages.Image", on_delete=models.CASCADE, related_name="+")
    category = models.CharField(max_length=24, choices=CATEGORY_CHOICES, default="nature")
    alt_text = models.CharField(max_length=255, blank=True)
    panels = [FieldPanel("title"), FieldPanel("image"), FieldPanel("category"), FieldPanel("alt_text"), FieldPanel("sort_order"), FieldPanel("is_active")]

    def __str__(self):
        return self.title


@register_snippet
class Review(SortableActive):
    name = models.CharField(max_length=120)
    comment = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    source = models.CharField(max_length=120, blank=True)
    panels = [FieldPanel("name"), FieldPanel("comment"), FieldPanel("rating"), FieldPanel("source"), FieldPanel("sort_order"), FieldPanel("is_active")]

    def __str__(self):
        return self.name


@register_snippet
class FAQ(SortableActive):
    question = models.CharField(max_length=255)
    answer = RichTextField()
    panels = [FieldPanel("question"), FieldPanel("answer"), FieldPanel("sort_order"), FieldPanel("is_active")]

    def __str__(self):
        return self.question


class BlogPost(Page):
    excerpt = models.TextField(blank=True)
    cover_image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    category = models.CharField(max_length=100, blank=True)
    published_date = models.DateField()
    body = RichTextField()
    seo_description = models.TextField(blank=True)
    is_published = models.BooleanField(default=True)

    content_panels = Page.content_panels + [
        FieldPanel("excerpt"), FieldPanel("cover_image"), FieldPanel("category"), FieldPanel("published_date"), FieldPanel("body"),
        MultiFieldPanel([FieldPanel("seo_title"), FieldPanel("seo_description"), FieldPanel("is_published")], "SEO and publication"),
    ]
    parent_page_types = ["content.HomePage"]
