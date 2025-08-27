from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")

        if not username or not password or not email:
            return Response({"error": "Username, Email und Passwort sind erforderlich."}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Benutzername existiert bereits."}, status=400)
            
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email existiert bereits."}, status=400)

        user = User.objects.create_user(
            username=username, 
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            "message": "Benutzer erfolgreich registriert.",
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "created_at": user.date_joined.isoformat()
            }
        }, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Anmeldung erfolgreich.",
                "token": token.key,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "created_at": user.date_joined.isoformat()
                }
            })
        else:
            return Response({"error": "Ungültige Anmeldedaten."}, status=401)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user by deleting their token"""
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({"message": "Erfolgreich abgemeldet."}, status=200)
    except Token.DoesNotExist:
        return Response({"message": "Erfolgreich abgemeldet."}, status=200)


