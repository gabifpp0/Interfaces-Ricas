from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication 
from .models import Doce, Usuario
from .serializers import DoceSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated  
from .serializers import UsuarioSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class DoceViewSet(viewsets.ModelViewSet):
    queryset = Doce.objects.all()
    serializer_class = DoceSerializer
    permission_classes = [AllowAny]

    #def perform_create(self, serializer):
    #    serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return Doce.objects.all()


class UserView(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Usuario.objects.all()

class RegisterView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Usuário criado com sucesso!"},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = [AllowAny]