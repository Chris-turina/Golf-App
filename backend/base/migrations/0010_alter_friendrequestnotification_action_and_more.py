# Generated by Django 4.2.2 on 2023-07-20 22:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("base", "0009_alter_friendrequestnotification_receiver_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="friendrequestnotification",
            name="action",
            field=models.IntegerField(
                choices=[
                    (1, "REQUEST"),
                    (2, "ACCEPTED"),
                    (3, "REJECT"),
                    (4, "UNFRIEND"),
                ]
            ),
        ),
        migrations.AlterField(
            model_name="holescore",
            name="hole",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="base.hole"
            ),
        ),
        migrations.AlterField(
            model_name="holescore",
            name="roundStat",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="base.round"
            ),
        ),
        migrations.AlterField(
            model_name="holescore",
            name="tee",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="base.tee"
            ),
        ),
        migrations.AlterField(
            model_name="round",
            name="course",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="base.golfcourse",
            ),
        ),
        migrations.AlterField(
            model_name="round",
            name="teeColorUsed",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="base.teecolor",
            ),
        ),
        migrations.AlterField(
            model_name="round",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="roundstats",
            name="roundStat",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="base.round"
            ),
        ),
        migrations.AlterField(
            model_name="roundstats",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="tee",
            name="color",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="base.teecolor",
            ),
        ),
        migrations.AlterField(
            model_name="teecolor",
            name="course",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="base.golfcourse",
            ),
        ),
    ]
