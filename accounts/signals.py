from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, HR

@receiver(post_save, sender=CustomUser)
def create_hr_profile(sender, instance, created, **kwargs):
    if created and instance.user_type == 'HR':
        HR.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_hr_profile(sender, instance, **kwargs):
    if instance.user_type == 'HR':
        instance.hr.save()