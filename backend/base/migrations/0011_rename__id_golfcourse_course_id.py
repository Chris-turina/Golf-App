# Generated by Django 4.2.2 on 2023-06-16 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0010_rename_review_teecolor"),
    ]

    operations = [
        migrations.RenameField(
            model_name="golfcourse",
            old_name="_id",
            new_name="course_id",
        ),
    ]
