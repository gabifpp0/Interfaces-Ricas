from django.db import models
from django.contrib.auth.models import User

class Doce(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    disponivel = models.BooleanField(default=True)

    def __str__(self):
        return self.nome

class Usuario(models.Model):
    usuario = models.OneToOneField(User,  on_delete=models.CASCADE, related_name='usuario_profile')
    telefone = models.CharField(max_length=20, null=True, blank=True, verbose_name='Telefone')
 
    def __str__(self):
        return self.usuario
