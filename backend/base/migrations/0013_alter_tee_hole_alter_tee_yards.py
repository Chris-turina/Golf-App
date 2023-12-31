# Generated by Django 4.2.2 on 2023-09-01 21:50

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0012_rename_numofholes_golfcourse_num_of_holes_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tee",
            name="hole",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="base.hole"
            ),
        ),
        migrations.AlterField(
            model_name="tee",
            name="yards",
            field=models.IntegerField(
                default=0,
                validators=[
                    django.core.validators.MaxValueValidator(1000),
                    django.core.validators.MinValueValidator(1),
                ],
            ),
        ),
    ]
