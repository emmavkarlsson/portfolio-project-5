from rest_framework import serializers
from .models import Reports

class ReportsSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    report_status = serializers.SerializerMethodField()
    report_reason = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_report_status(self, obj):
        return obj.get_report_status_display()

    def get_report_reason(self, obj):
        return obj.get_report_reason_display()

    class Meta:
        model = Reports
        fields = ['owner', 'created_on', 'updated_on', 'subject',
                  'message', 'report_status', 'report_reason', 'is_owner', 'id']