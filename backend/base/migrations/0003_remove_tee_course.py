# Generated by Django 4.2.2 on 2023-07-10 22:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_tee_course"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="tee",
            name="course",
        ),
    ]
