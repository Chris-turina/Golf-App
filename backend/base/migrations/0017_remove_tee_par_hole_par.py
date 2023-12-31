# Generated by Django 4.2.2 on 2023-09-19 21:16

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0016_alter_hole_handicap_alter_tee_par_alter_tee_yards"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="tee",
            name="par",
        ),
        migrations.AddField(
            model_name="hole",
            name="par",
            field=models.IntegerField(
                default=4,
                null=True,
                validators=[
                    django.core.validators.MaxValueValidator(5),
                    django.core.validators.MinValueValidator(3),
                ],
            ),
        ),
    ]
