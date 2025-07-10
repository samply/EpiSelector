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
@permission_classes([IsAuthenticated])
def save_request(request):
    data = request.data

    SavedRRequest.objects.create(
        user=request.user,
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
    return Response({"message": "Request saved."}, status=201)


# List of saved calls, excluding datasets
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_requests(request):
    saved = SavedRRequest.objects.filter(user=request.user).order_by('-created_at')
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
@permission_classes([IsAuthenticated])
def get_request(request, request_id):
    try:
        saved = SavedRRequest.objects.get(id=request_id, user=request.user)
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
@permission_classes([IsAuthenticated])
def delete_request(request, pk):
    try:
        r_request = SavedRRequest.objects.get(pk=pk, user=request.user)
        r_request.delete()
        return Response({'message': 'Eintrag erfolgreich gelöscht.'}, status=status.HTTP_200_OK)
    except SavedRRequest.DoesNotExist:
        return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)



