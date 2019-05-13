from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from .serializers import NoteSerializer
from noteapp.models import Note
#from noteapp.permissions import IsAdminOrReadOnly

class NoteViewSet(viewsets.ModelViewSet):
	serializer_class = NoteSerializer
	queryset = Note.objects.all()
	authentication_classes = [TokenAuthentication]
	permission_classes = [IsAuthenticated]
	
	def get_queryset(self):
		user = self.request.user
		return Note.objects.filter(auth = user.id)
"""
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
"""	



