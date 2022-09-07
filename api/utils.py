from rest_framework.response import Response
from .models import Serie
from .serializers import SerieSerializer


def getSeriesList(request):
    series = Serie.objects.all().order_by('-updated')
    serializer = SerieSerializer(series, many=True)
    return Response(serializer.data)


def getSerieDetail(request, pk):
    serie = Serie.objects.get(id=pk)
    serializer = SerieSerializer(serie, many=False)
    return Response(serializer.data)


def createSerie(request):
    data = request.data
    serie = Serie.objects.create(
        body=data['body']
    )
    serializer = SerieSerializer(serie, many=False)
    return Response(serializer.data)

def updateSerie(request, pk):
    data = request.data
    serie = Serie.objects.get(id=pk)
    serializer = SerieSerializer(instance=serie, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def deleteSerie(request, pk):
    serie = Serie.objects.get(id=pk)
    serie.delete()
    return Response('Note was deleted!')
