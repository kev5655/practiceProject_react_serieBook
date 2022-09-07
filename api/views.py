from django.shortcuts import render
from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Serie
from api import serializers
from .serializers import SerieSerializer
from .utils import updateSerie, getSerieDetail, deleteSerie, getSeriesList, createSerie
# Create your views here.

# Create your views here.


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/series/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of series'
        },
        {
            'Endpoint': '/series/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single serie object'
        },
        {
            'Endpoint': '/series/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new serie with data sent in post request'
        },
        {
            'Endpoint': '/series/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing serie with data sent in post request'
        },
        {
            'Endpoint': '/series/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting serie'
        },
    ]
    return Response(routes)


# /series GET
# /series POST
# /series/<id> GET
# /series/<id> PUT
# /series/<id> DELETE

@api_view(['GET', 'POST'])
def getSeries(request):
    if request.method == 'GET':
        return getSeriesList(request)

    if request.method == 'POST':
        print("Incoming POST", request)
        return createSerie(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getSerie(request, pk):

    if request.method == 'GET':

        return getSerieDetail(request, pk)

    if request.method == 'PUT':
        return updateSerie(request, pk)

    if request.method == 'DELETE':
        return deleteSerie(request, pk)


#@api_view(['POST'])
#def createSerie(request):
#    data = request.data
#    serie = Serie.objects.create(
#        body=data['body']
#    )
#    serializer = SerieSerializer(serie, many=False)
#    return Response(serializer.data)


# @api_view(['PUT'])
# def updateSerie(request, pk):
#     data = request.data
#     serie = Serie.objects.get(id=pk)
#     serializer = SerieSerializer(instance=serie, data=data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(['DELETE'])
# def deleteSerie(request, pk):
#     serie = Serie.objects.get(id=pk)
#     serie.delete()
#     return Response('Serie was deleted!')