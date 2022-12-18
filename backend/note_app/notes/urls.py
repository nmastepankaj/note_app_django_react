from django.urls import path, include
from rest_framework.routers import DefaultRouter

from notes import views


router = DefaultRouter()
router.register('note', views.NoteViewSet)

app_name = 'notes'

urlpatterns = [
    path('', include(router.urls))
]
