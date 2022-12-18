from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from notes import serializers
from notes.models import Note

# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.NoteSerializer
    queryset = Note.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)