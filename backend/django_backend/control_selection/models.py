from django.db import models
from django.contrib.auth.models import User

class SavedRRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Parameter
    groupindicator = models.CharField(max_length=100, null=True, blank=True)
    controllvariables = models.JSONField(null=True, blank=True)  # list of strings
    mmethod = models.CharField(max_length=50, null=True, blank=True)
    mdistance = models.CharField(max_length=50, null=True, blank=True)
    mreplace = models.BooleanField(null=True, blank=True) 
    mratio = models.IntegerField(null=True, blank=True)
    mcaliper = models.JSONField(null=True, blank=True) 
    mcalipervariables = models.JSONField(null=True, blank=True) 
    
    # dataset as JSON-String
    dataset_json = models.TextField()  # LONG JSON

    def __str__(self):
        return f"{self.user.username} - {self.created_at}"



