# Generated by Django 4.2.2 on 2023-06-15 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_alter_tee_color"),
    ]

    operations = [
        migrations.RenameField(
            model_name="golfcourse",
            old_name="tee_colors",
            new_name="teecolors",
        ),
    ]
