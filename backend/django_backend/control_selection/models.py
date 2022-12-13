from django.db import models



class Mask(models.Model):
    mask_name = models.CharField(max_length=200)
    data = models.CharField(max_length=200)
    method_propensity_score = models.ForeignKey
    method_exact_matching = models.ForeignKey


class MethodPropensityScore(models.Model):
    target_variable = models.CharField(max_length=200)
    control_variable = models.CharField(max_length=200)

class Variable(models.Model):
    name = models.CharField(max_length=200)


