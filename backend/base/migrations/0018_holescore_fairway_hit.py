# Generated by Django 4.2.2 on 2023-10-03 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0017_remove_tee_par_hole_par"),
    ]

    operations = [
        migrations.AddField(
            model_name="holescore",
            name="fairway_hit",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
