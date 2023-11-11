from rest_framework import serializers
from .models import UserMessage

class UserMessageSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = UserMessage
        fields = ['id', 'owner', 'is_owner', 'receiver', 'content', 'created_at']
