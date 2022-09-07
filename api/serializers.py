from rest_framework.serializers import ModelSerializer
from .models import Serie


class SerieSerializer(ModelSerializer):
    class Meta:
        model = Serie
        fields = '__all__'