import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Creates the initial CMS superuser from environment variables."

    def handle(self, *args, **options):
        username = os.getenv("CMS_ADMIN_USERNAME")
        email = os.getenv("CMS_ADMIN_EMAIL")
        password = os.getenv("CMS_ADMIN_PASSWORD")

        if not all((username, email, password)):
            self.stdout.write("CMS admin variables are not set; skipping admin creation.")
            return

        user_model = get_user_model()
        if user_model.objects.filter(username=username).exists():
            self.stdout.write("CMS admin already exists; skipping admin creation.")
            return

        user_model.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )
        self.stdout.write(self.style.SUCCESS("CMS admin created."))
