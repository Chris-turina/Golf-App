# Generated by Django 4.2.2 on 2023-06-19 15:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0020_alter_tee_unique_together_remove_teecolor_color_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="hole",
            unique_together={("number", "course")},
        ),
        migrations.RemoveField(
            model_name="hole",
            name="name",
        ),
    ]
