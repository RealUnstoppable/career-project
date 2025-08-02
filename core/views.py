# FIX: Imports are now cleaned up and combined
from .models import SavedJob, Goal
from .serializers import SavedJobSerializer, GoalSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# --- Simplified Data ---
STATE_TAX_RATES = {
    'CA': 0.0725, 'NY': 0.0685, 'TX': 0.0, 'FL': 0.0, 'IL': 0.0495,
    'PA': 0.0307, 'OH': 0.0399, 'GA': 0.0575, 'NC': 0.0499, 'MI': 0.0425,
}
COST_OF_LIVING_INDEX = {
    'CA': 138.6, 'NY': 125.1, 'TX': 92.1, 'FL': 102.8, 'IL': 94.3,
    'PA': 99.4, 'OH': 91.5, 'GA': 92.2, 'NC': 95.7, 'MI': 91.1,
}
FEDERAL_TAX_RATE = 0.22
FICA_TAX_RATE = 0.0765

# --- The Calculation Function ---
def calculate_analysis(gross_income, state):
    state_code = state.strip().upper()
    state_tax = STATE_TAX_RATES.get(state_code, 0.05)
    col_index = COST_OF_LIVING_INDEX.get(state_code, 100)
    federal_tax_amount = gross_income * FEDERAL_TAX_RATE
    fica_tax_amount = gross_income * FICA_TAX_RATE
    state_tax_amount = gross_income * state_tax
    total_tax = federal_tax_amount + fica_tax_amount + state_tax_amount
    net_income = gross_income - total_tax
    purchasing_power = net_income / (col_index / 100)
    return {
        'gross_income': round(gross_income),
        'state': state_code,
        'net_income': round(net_income),
        'purchasing_power': round(purchasing_power),
        'cost_of_living_index': col_index,
    }

# --- The API Views ---
@api_view(['POST'])
def calculate_view(request):
    try:
        current_income = float(request.data.get('currentIncome'))
        current_state = request.data.get('currentState')
        new_income = float(request.data.get('newIncome'))
        new_state = request.data.get('newState')

        current_analysis = calculate_analysis(current_income, current_state)
        new_analysis = calculate_analysis(new_income, new_state)

        mock_jobs = [
            {'job_title': 'Software Engineer', 'company_name': 'Tech Solutions Inc.', 'state': new_state, 'estimated_salary': new_income},
            {'job_title': 'Product Manager', 'company_name': 'Innovate Co.', 'state': new_state, 'estimated_salary': new_income - 10000},
            {'job_title': 'UX Designer', 'company_name': 'Creative Minds LLC', 'state': new_state, 'estimated_salary': new_income - 15000},
        ]

        return Response({
            'current': current_analysis,
            'new': new_analysis,
            'jobs': mock_jobs,
        })
    except (ValueError, TypeError):
        return Response(
            {'error': 'Invalid input. Please provide all required numbers and strings.'},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def saved_job_view(request):
    if request.method == 'GET':
        jobs = SavedJob.objects.filter(user=request.user)
        serializer = SavedJobSerializer(jobs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SavedJobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# FIX: goal_view is now correctly placed at the top level of the file,
# not inside the saved_job_view function.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def goal_view(request):
    if request.method == 'GET':
        goals = Goal.objects.filter(user=request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)