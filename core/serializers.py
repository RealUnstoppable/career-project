from rest_framework import serializers
from .models import SavedJob

class SavedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedJob
        fields = ['id', 'job_title', 'company_name', 'state', 'estimated_salary', 'job_url']
        from .models import SavedJob, Goal # Add Goal to this import

from .models import SavedJob, Goal # Add Goal to this import

# Add this new serializer
class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'title', 'target_metric', 'target_value', 'status']