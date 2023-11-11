# Generated by Django 3.2.22 on 2023-11-11 21:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reports',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_on', models.DateField(auto_now=True)),
                ('created_on', models.DateField(auto_now_add=True)),
                ('subject', models.CharField(max_length=255)),
                ('message', models.TextField()),
                ('report_status', models.CharField(choices=[('awaiting_review', 'Awaiting Review'), ('reviewed', 'Reviewed'), ('closed', 'Closed')], default='awaiting_review', max_length=15)),
                ('report_reason', models.CharField(choices=[('spam', "It's spam"), ('hate_speech', 'Hate speech or symbols'), ('false_information', 'False information'), ('bullying_or_harassment', 'Bullying or harassment'), ('other', 'Other reason')], max_length=25)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-updated_on'],
            },
        ),
    ]
