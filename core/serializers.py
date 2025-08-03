from rest_framework import serializers
from .models import SavedJob, Goal

class SavedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedJob
        fields = ['id', 'job_title', 'company_name', 'state', 'estimated_salary', 'job_url']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'title', 'target_metric', 'target_value', 'status']