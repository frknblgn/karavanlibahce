from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0003_sitesettings_footer_rights_and_more"),
        ("wagtaildocs", "0014_alter_document_file_size"),
    ]

    operations = [
        migrations.AddField(
            model_name="homepage",
            name="hero_video_file",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="+", to="wagtaildocs.document"),
        ),
    ]
