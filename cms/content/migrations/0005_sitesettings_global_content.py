from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("content", "0004_homepage_hero_video_file")]

    operations = [
        migrations.AddField(model_name="sitesettings", name="instagram_handle", field=models.CharField(blank=True, max_length=120)),
        migrations.AddField(model_name="sitesettings", name="nav_pricing", field=models.CharField(blank=True, max_length=80)),
        migrations.AddField(model_name="sitesettings", name="whatsapp_message", field=models.TextField(blank=True)),
    ]
