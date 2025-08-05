from django.db import migrations
from django.contrib.auth import get_user_model
import os

def create_superuser(apps, schema_editor):
    User = get_user_model()
    
    # Correctly check if the user you are about to create already exists.
    # This prevents errors on subsequent deployments.
    if not User.objects.filter(username=os.environ.get('DJANGO_SUPERUSER_USERNAME', 'catalinandrian')).exists():
        
        # Using environment variables for credentials is a security best practice.
        # Make sure to set these in your Render environment settings.
        User.objects.create_superuser(
            username=os.environ.get('DJANGO_SUPERUSER_USERNAME', 'catalinandrian'),
            email=os.environ.get('DJANGO_SUPERUSER_EMAIL', 'catalinandrian1@gmail.com'),
            password=os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'Catalin2004#')
        )

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]