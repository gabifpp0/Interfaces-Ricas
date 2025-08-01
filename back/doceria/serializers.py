from rest_framework import serializers
from .models import Doce, Usuario
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

class DoceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doce
        fields = ['id', 'nome', 'preco', 'disponivel']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class UsuarioSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()

    class Meta:
        model = Usuario
        fields = ('usuario', 'telefone')

    def create(self, validated_data):
        user_data = validated_data.pop('usuario')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()
            usuario = Usuario.objects.create(usuario=user, **validated_data)
            return usuario

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adiciona claims personalizadas se necessário
        token['username'] = user.username
        return token