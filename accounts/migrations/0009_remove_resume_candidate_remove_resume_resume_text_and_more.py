# Generated by Django 5.0.6 on 2025-02-23 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resume',
            name='candidate',
        ),
        migrations.RemoveField(
            model_name='resume',
            name='resume_text',
        ),
        migrations.AddField(
            model_name='resume',
            name='job_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resume',
            name='resume_content',
            field=models.FileField(default='', upload_to='resumes/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resume',
            name='user_name',
            field=models.CharField(default='unknown', max_length=255),
            preserve_default=False,
        ),
    ]
