# Generated by Django 4.2.2 on 2023-06-28 20:07

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0031_roundstats"),
    ]

    operations = [
        migrations.AddField(
            model_name="roundstats",
            name="totalDistance",
            field=models.IntegerField(
                null=True,
                validators=[
                    django.core.validators.MaxValueValidator(10000),
                    django.core.validators.MinValueValidator(1),
                ],
            ),
        ),
    ]
