from django.urls import path, include
from rest_framework.routers import DefaultRouter
from noteapp.api.views import NoteViewSet

router =  DefaultRouter()
router.register('note', NoteViewSet, base_name = 'data')

urlpatterns = router.urls