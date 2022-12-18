from django.urls import path 

from accounts import views
from django.conf.urls.static import static
from django.conf import settings


app_name = 'user'

urlpatterns = [
    path('create/',views.CreateUserView.as_view(),name = "create"),
    path('token/',views.CreateTokenView.as_view(),name = "token"),
    path('me/',views.ManageUserView.as_view(),name="me")
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)