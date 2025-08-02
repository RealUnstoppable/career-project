from django.db import models
from django.contrib.auth.models import User

# Extends the built-in User model with app-specific info
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_state = models.CharField(max_length=50, blank=True, null=True)
    current_annual_income = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

# Stores information about a job a user saves
class SavedJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=50)
    estimated_salary = models.IntegerField()
    job_url = models.URLField(max_length=500, null=True, blank=True)
    date_saved = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

# Model for user-defined goals
class Goal(models.Model):
    STATUS_CHOICES = [
        ('NOT_STARTED', 'Not Started'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    target_metric = models.CharField(max_length=100, help_text="e.g., Target Salary, Skill to Learn")
    target_value = models.CharField(max_length=100, help_text="e.g., $120000, Python")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NOT_STARTED')
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title