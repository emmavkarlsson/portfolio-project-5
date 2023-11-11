from django.db import models
from django.contrib.auth.models import User

REPORT_STATUS = (
    ("awaiting_review", "Awaiting Review"),
    ("reviewed", "Reviewed"),
    ("closed", "Closed"),
)

REPORT_REASON_CHOICES = (
    ("spam", "It's spam"),
    ("hate_speech", "Hate speech or symbols"),
    ("false_information", "False information"),
    ("bullying_or_harassment", "Bullying or harassment"),
    ("other", "Other reason"),
)


class Reports(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    report_status = models.CharField(max_length=15, choices=REPORT_STATUS, default="awaiting_review")
    report_reason = models.CharField(max_length=25, choices=REPORT_REASON_CHOICES)

    class Meta:
        ordering = ['-updated_on']

    def __str__(self):
        return f'{self.id}'