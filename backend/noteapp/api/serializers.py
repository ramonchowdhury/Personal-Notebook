from rest_framework import serializers
from django.contrib.auth.models import User
from noteapp.models import Note

class NoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Note
		fields = ('id', 'title', 'body', 'create_at')
		read_only_fields = ('create_at', )

	def	create(self, validated_data):
		auth = self.context['request'].user
		return  Note.objects.create(auth = auth, **validated_data)

"""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'email', 'username')
"""