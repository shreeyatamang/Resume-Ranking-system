from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='ranking',
            field=models.IntegerField(default=0),
        ),
    ]
