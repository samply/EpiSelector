from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db import models
from django.contrib.auth.models import User
import requests as r
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import SavedRRequest
from django.http import JsonResponse
from datetime import datetime



# Specify IP and Port for R Backend
ip_address = "127.0.0.1:3420"


@api_view(['GET'])
def index(request):
    print("Here I am: " + request.method)

    if request.method == 'GET':
        print("looking for you")
        name = request.query_params.get('name', None)
        body = request.data.get('reason')
        print(body)
        base_url = "http://" + ip_address + "/test"
        print("--------------------------------------------------------------------------------------------------------------            Dies ist die URL " +  base_url)
        req = r.get(base_url, proxies = {'http': '','https': '',})
        data = req.json()
        print(data)
        return Response(data)



def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request):
    return HttpResponse("You're voting on question.")

@api_view(['POST'])
def boolean_columns(request):
    body = request.data
    base_url = "http://" + ip_address + "/boolean_columns"
    req = r.get(base_url, proxies = {'http': '','https': '',}, json=body)
    data = req.json()
    print(data)
    return Response(data)


@api_view(['POST'])
def numeric_columns(request):
    body = request.data
    base_url = "http://" + ip_address + "/numeric_columns"
    req = r.get(base_url, proxies = {'http': '','https': '',}, json=body)
    data = req.json()
    print(data)
    return Response(data)


@api_view(['POST'])
def histogram(request):
    body = request.data
    groupindicator = request.query_params.get("groupindicator")
    controllvariables = request.query_params.get("controllvariables")
    print(f"Controllvariables {controllvariables}")
    mmethod = request.query_params.get("mmethod")
    mdistance = request.query_params.get("mdistance")
    mreplace = request.query_params.get("mreplace")
    mcaliper = request.query_params.get("mcaliper")
    mratio = request.query_params.get("mratio")
    controllvariable = request.query_params.get("controllvariable")
    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio, 'controllvariable':controllvariable}
    base_url = "http://" + ip_address + "/histogram"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    return Response(data)


@api_view(['POST'])
def pie_chart(request):
    body = request.data
    groupindicator = request.query_params.get("groupindicator")
    controllvariables = request.query_params.get("controllvariables")
    mmethod = request.query_params.get("mmethod")
    mdistance = request.query_params.get("mdistance")
    mreplace = request.query_params.get("mreplace")
    mcaliper = request.query_params.get("mcaliper")
    mratio = request.query_params.get("mratio")
    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio}
    base_url = "http://" + ip_address + "/pie_chart"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    return Response(data)


@api_view(['POST'])
def summary(request):
    body = request.data
    groupindicator = request.query_params.get("groupindicator")
    controllvariables = request.query_params.get("controllvariables")
    mmethod = request.query_params.get("mmethod")
    mdistance = request.query_params.get("mdistance")
    mreplace = request.query_params.get("mreplace")
    mcaliper = request.query_params.get("mcaliper")
    mratio = request.query_params.get("mratio")
    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio}
    base_url = "http://" + ip_address + "/summary"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    return Response(data)

@api_view(['POST'])
def result_data(request):
    body = request.data
    groupindicator = request.query_params.get("groupindicator")
    controllvariables = request.query_params.get("controllvariables")
    mmethod = request.query_params.get("mmethod")
    mdistance = request.query_params.get("mdistance")
    mreplace = request.query_params.get("mreplace")
    mcaliper = request.query_params.get("mcaliper")
    mratio = request.query_params.get("mratio")
    mcalipervariables = request.query_params.get("mcalipervariables")
    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio, 'mcalipervariables': mcalipervariables}
    base_url = "http://" + ip_address + "/result_data"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    return Response(data)

@api_view(['POST'])
def boxplot(request):
    body = request.data
    groupindicator = request.query_params.get("groupindicator")
    controllvariables = request.query_params.get("controllvariables")
    controllvariable = request.query_params.get("controllvariable")
    mmethod = request.query_params.get("mmethod")
    mdistance = request.query_params.get("mdistance")
    mreplace = request.query_params.get("mreplace")
    mcaliper = request.query_params.get("mcaliper")
    mratio = request.query_params.get("mratio")

    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'controllvariable':controllvariable, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio}
    base_url = "http://" + ip_address + "/boxplot"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    print(data)
    return Response(data)


# save R-Call
@api_view(['POST'])
def save_request(request):
    try:
        data = request.data
        
        print(f"💾 DEBUG: Received data keys: {data.keys()}")
        print(f"💾 DEBUG: Data type: {type(data)}")

        # User-Handling ohne Token-Validierung
        user = None
        
        # Falls ein User-ID in den Daten ist, verwende diesen
        user_id = data.get('user_id')
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                print(f"💾 DEBUG: Using user from data: {user.username}")
            except User.DoesNotExist:
                print(f"💾 DEBUG: User {user_id} not found, using anonymous")
                user = None
        
        # Falls kein User, verwende authenticated user oder anonymous
        if not user:
            if hasattr(request, 'user') and request.user.is_authenticated:
                user = request.user
                print(f"💾 DEBUG: Using authenticated user: {user.username}")
            else:
                # Erstelle oder hole anonymous user
                user, created = User.objects.get_or_create(
                    username='anonymous',
                    defaults={'password': 'anonymous123'}  # Vereinfachte defaults
                )
                print(f"💾 DEBUG: Using anonymous user (created: {created})")

        # Erstelle SavedRRequest
        saved_request = SavedRRequest.objects.create(
            user=user,
            groupindicator=data.get("groupindicator"),
            controllvariables=data.get("controllvariables"),
            mmethod=data.get("mmethod"),
            mdistance=data.get("mdistance"),
            mreplace=data.get("mreplace", False),
            mratio=data.get("mratio"),
            mcaliper=data.get("mcaliper"),
            mcalipervariables=data.get("mcalipervariables"),
            dataset_json=data.get("dataset_json"),
        )
        
        print(f"💾 DEBUG: Successfully saved request ID: {saved_request.id}")
        return Response({"message": "Request saved.", "id": saved_request.id}, status=201)
        
    except Exception as e:
        print(f"❌ ERROR in save_request: {str(e)}")
        print(f"❌ ERROR type: {type(e)}")
        import traceback
        traceback.print_exc()
        return Response({"error": f"Fehler beim Speichern: {str(e)}"}, status=500)


# List of saved calls, excluding datasets
@api_view(['GET'])
def list_requests(request):
    # Wenn ein User im Request ist, verwende ihn, ansonsten alle Requests
    if hasattr(request, 'user') and request.user.is_authenticated:
        saved = SavedRRequest.objects.filter(user=request.user).order_by('-created_at')
    else:
        # Falls kein authentifizierter User, zeige alle Requests oder filtere nach user_id Parameter
        user_id = request.GET.get('user_id')
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                saved = SavedRRequest.objects.filter(user=user).order_by('-created_at')
            except User.DoesNotExist:
                saved = SavedRRequest.objects.none()
        else:
            # Zeige alle Requests (falls gewünscht) oder nur anonymous
            saved = SavedRRequest.objects.filter(user__username='anonymous').order_by('-created_at')
    
    result = [{
        "id": r.id,
        "created_at": r.created_at,
        "groupindicator": r.groupindicator,
        "controllvariables": r.controllvariables,
        "mmethod": r.mmethod,
        "mdistance": r.mdistance,
        "mreplace": r.mreplace,
        "mratio": r.mratio,
        "mcaliper": r.mcaliper,
        "mcalipervariables": r.mcalipervariables,
    } for r in saved]
    return Response(result)


# Full call including dataset
@api_view(['GET'])
def get_request(request, request_id):
    try:
        # Wenn ein User authentifiziert ist, filtere nach dem User
        if hasattr(request, 'user') and request.user.is_authenticated:
            saved = SavedRRequest.objects.get(id=request_id, user=request.user)
        else:
            # Ohne Authentifizierung, hole den Request ohne User-Filter
            saved = SavedRRequest.objects.get(id=request_id)
    except SavedRRequest.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    return Response({
        "id": saved.id,
        "created_at": saved.created_at,
        "groupindicator": saved.groupindicator,
        "controllvariables": saved.controllvariables,
        "mmethod": saved.mmethod,
        "mdistance": saved.mdistance,
        "mreplace": saved.mreplace,
        "mratio": saved.mratio,
        "mcaliper": saved.mcaliper,
        "mcalipervariables": saved.mcalipervariables,
        "dataset_json": saved.dataset_json,
    })


# Delete R call
@api_view(['DELETE'])
def delete_request(request, pk):
    try:
        # Wenn ein User authentifiziert ist, filtere nach dem User
        if hasattr(request, 'user') and request.user.is_authenticated:
            r_request = SavedRRequest.objects.get(pk=pk, user=request.user)
        else:
            # Ohne Authentifizierung, hole den Request ohne User-Filter
            r_request = SavedRRequest.objects.get(pk=pk)
        
        r_request.delete()
        return Response({'message': 'Eintrag erfolgreich gelöscht.'}, status=status.HTTP_200_OK)
    except SavedRRequest.DoesNotExist:
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)


# Get user's saved processes for profile page
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_saved_processes(request, user_id):
    """Get all saved matching processes for a specific user"""
    if request.user.id != user_id and not request.user.is_staff:
        return Response({'error': 'Zugriff verweigert.'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        saved_processes = SavedRRequest.objects.filter(user_id=user_id).order_by('-created_at')
        
        processes_data = []
        for process in saved_processes:
            # Convert model data to the format expected by frontend
            process_data = {
                'id': process.id,
                'name': f"{process.mmethod} - {process.groupindicator}" if process.groupindicator else f"Matching {process.id}",
                'created_at': process.created_at.isoformat() if process.created_at else None,
                'matching_method': process.mmethod or 'Unbekannt',
                'algorithm': process.mdistance or 'nearest',
                'target_variable': process.groupindicator or 'Unbekannt',
                'control_variables': process.controllvariables or [],
                'result_count': estimate_result_count(process),
                'status': 'completed'  # For now, assume all saved processes are completed
            }
            processes_data.append(process_data)
        
        return Response(processes_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': f'Fehler beim Laden der Daten: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def estimate_result_count(process):
    """Estimate result count based on saved data"""
    try:
        # This is a simple estimation - in a real implementation you might parse the dataset_json
        # or store the actual result count as a separate field
        if process.dataset_json:
            # Simple estimation based on ratio and method
            base_count = 100
            if process.mratio:
                base_count *= process.mratio
            return base_count
        return 0
    except:
        return 0


# Save a new matching process
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_matching_process(request):
    """Save a new matching process with results"""
    try:
        data = request.data
        
        # Create new SavedRRequest
        saved_request = SavedRRequest.objects.create(
            user=request.user,
            groupindicator=data.get('groupindicator'),
            controllvariables=data.get('controllvariables', []),
            mmethod=data.get('mmethod'),
            mdistance=data.get('mdistance'),
            mreplace=data.get('mreplace', False),
            mratio=data.get('mratio', 1),
            mcaliper=data.get('mcaliper'),
            mcalipervariables=data.get('mcalipervariables'),
            dataset_json=data.get('dataset_json', '{}')
        )
        
        return Response({
            'id': saved_request.id,
            'message': 'Matching-Prozess erfolgreich gespeichert.'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': f'Fehler beim Speichern: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Download results for a saved process
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_process_results(request, process_id):
    """Download results for a saved process as CSV"""
    try:
        saved_process = SavedRRequest.objects.get(id=process_id, user=request.user)
        
        # In a real implementation, you would generate/retrieve the actual CSV data
        # For now, return a placeholder response
        response = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': f'attachment; filename="matching_results_{process_id}.csv"'},
        )
        
        # Placeholder CSV content
        csv_content = "ID,Group,Variable1,Variable2\n1,Treatment,Value1,Value2\n2,Control,Value3,Value4\n"
        response.write(csv_content)
        
        return response
        
    except SavedRRequest.DoesNotExist:
        return Response({'error': 'Prozess nicht gefunden.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Download fehlgeschlagen: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



