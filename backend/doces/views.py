from rest_framework import viewsets
from .models import Doce
from .serializers import DoceSerializer

class DoceViewSet(viewsets.ModelViewSet):
    queryset = Doce.objects.all()
    serializer_class = DoceSerializer

