from django.urls import path

from . import views
from .views import delete_request 

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('vote', views.vote, name='vote'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/

    path('boolean_columns', views.boolean_columns),
    path('numeric_columns', views.numeric_columns),
    path('histogram', views.histogram),
    path('pie_chart', views.pie_chart),
    path('summary', views.summary),
    path('result_data', views.result_data),
    path('boxplot', views.boxplot),
    path('save-request/', views.save_request, name='save-request'),
    path('list-requests/', views.list_requests, name='list-requests'),
    path('get-request/<int:request_id>/', views.get_request, name='get-request'),
    path('delete-request/<int:pk>/', delete_request, name='delete-request'),

]