from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests as r




@api_view(['GET'])
def index(request):
    print("Here I am: " + request.method)
    
    if request.method == 'GET':
        print("looking for you")
        name = request.query_params.get('name', None)
        body = request.data.get('reason')
        print(body)
        base_url = "http://127.0.0.1:3699/test"
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
    base_url = "http://127.0.0.1:3699/boolean_columns"
    req = r.get(base_url, proxies = {'http': '','https': '',}, json=body)
    data = req.json()
    return Response(data)


@api_view(['POST'])
def numeric_columns(request):
    body = request.data
    base_url = "http://127.0.0.1:3699/numeric_columns"
    req = r.get(base_url, proxies = {'http': '','https': '',}, json=body)
    data = req.json()
    return Response(data)


@api_view(['POST'])
def histogram(request):
    body = request.data
    groupindicator = request.query_params.get("groupindicator")
    controllvariables = request.query_params.get("controllvariables")
    mmethod = request.query_params.get("mmethod")
    mdistance = request.query_params.get("mdistance")
    mreplace = request.query_params.get("mreplace")
    mcaliper = request.query_params.get("mcaliper")
    mratio = request.query_params.get("mratio")
    controllvariable = request.query_params.get("controllvariable")
    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio, 'controllvariable':controllvariable}
    base_url = "http://127.0.0.1:3699/histogram"
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
    base_url = "http://127.0.0.1:3699/pie_chart"
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
    base_url = "http://127.0.0.1:3699/summary"
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
    params = {'groupindicator':groupindicator, 'controllvariables':controllvariables, 'mmethod':mmethod, 'mdistance':mdistance, 'mreplace':mreplace, 'mcaliper':mcaliper, 'mratio':mratio}
    base_url = "http://127.0.0.1:3699/result_data"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    return Response(data)

@api_view(['POST'])
def boxplot(request):
    body = request.data
    variable_x_axis = request.query_params.get("variable_x_axis")
    variable_y_axis = request.query_params.get("variable_y_axis")
    params = {'variable_x_axis': variable_x_axis, 'variable_y_axis': variable_y_axis}
    base_url = "http://127.0.0.1:3699/boxplot"
    req = r.post(base_url, proxies = {'http': '','https': '',}, json=body, params=params)
    data = req.json()
    return Response(data)




