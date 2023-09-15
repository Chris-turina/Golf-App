# Generated by Django 4.2.2 on 2023-09-14 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0013_alter_tee_hole_alter_tee_yards"),
    ]

    operations = [
        migrations.AlterField(
            model_name="teebox",
            name="back_nine_yards",
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name="teebox",
            name="front_nine_yards",
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name="teebox",
            name="handicap",
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name="teebox",
            name="par",
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name="teebox",
            name="slope",
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name="teebox",
            name="total_yards",
            field=models.IntegerField(default=0, null=True),
        ),
    ]
