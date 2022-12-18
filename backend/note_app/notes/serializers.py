from rest_framework import serializers

from notes.models import Note


class NoteSerializer(serializers.ModelSerializer):
    """Serializer for tag objects"""

    class Meta:
        model = Note
        fields = ('id','title','description','tag','date')
        read_only_fields = ('id','user',)