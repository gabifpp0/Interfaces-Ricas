from rest_framework import serializers
from .models import Doce

class DoceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doce
        fields = ['id', 'nome', 'preco', 'disponivel']