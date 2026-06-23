from django.core.management.base import BaseCommand

from content.models import HomePage
from content.seed import seed


class Command(BaseCommand):
    help = "Imports the initial CMS content when the site has not been seeded yet."

    def handle(self, *args, **options):
        if HomePage.objects.exists():
            self.stdout.write("CMS content already exists; skipping seed.")
            return

        result = seed()
        self.stdout.write(self.style.SUCCESS(f"CMS content seeded: {result}"))
