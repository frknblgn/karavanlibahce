from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):
    dependencies = [("content", "0005_sitesettings_global_content")]

    operations = [
        migrations.AddField(model_name="homepage", name="hero_eyebrow", field=models.CharField(blank=True, max_length=120)),
        migrations.AddField(model_name="homepage", name="hero_image_alt", field=models.CharField(blank=True, max_length=255)),
        migrations.CreateModel(
            name="HeroStat",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("sort_order", models.IntegerField(blank=True, editable=False, null=True)),
                ("value", models.CharField(max_length=80)),
                ("label", models.CharField(max_length=120)),
                ("page", modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name="hero_stats", to="content.homepage")),
            ],
            options={"ordering": ["sort_order"]},
        ),
    ]
