# Generated by Django 4.2.2 on 2023-06-15 23:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0007_rename_teecolor_review_remove_golfcourse_tee_colors_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="golfcourse",
            name="review",
        ),
    ]
