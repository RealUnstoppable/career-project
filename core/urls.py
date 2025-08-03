from django.urls import path
from . import views

urlpatterns = [
    path('calculate/', views.calculate_view),
    path('saved-jobs/', views.saved_job_view),
    path('goals/', views.goal_view),
]