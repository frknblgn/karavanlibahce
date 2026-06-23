from django.urls import path

from . import views

urlpatterns = [
    path("site-settings/", views.site_settings),
    path("home/", views.home),
    path("homepage-sections/", views.homepage_sections),
    path("experiences/", views.experiences),
    path("pricing/", views.pricing),
    path("facilities/", views.facilities),
    path("nearby-attractions/", views.nearby_attractions),
    path("gallery/", views.gallery),
    path("gallery-page/", views.gallery_page),
    path("contact-page/", views.contact_page),
    path("blog/", views.blog_list),
    path("blog/<slug:slug>/", views.blog_detail),
    path("reviews/", views.reviews),
    path("faqs/", views.faqs),
    path("contact/", views.contact),
]
