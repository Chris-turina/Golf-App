# Generated by Django 4.2.2 on 2023-06-19 16:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0022_alter_hole_unique_together"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="hole",
            unique_together={("number", "course")},
        ),
    ]
