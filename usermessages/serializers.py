from rest_framework import serializers
from .models import UserMessage


class UserMessageSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")
    receiver_profile_image = serializers.ReadOnlyField(
        source="receiver.profile.image.url"
    )
    receiver_username = serializers.ReadOnlyField(source="receiver.username")
    receiver_profile_id = serializers.ReadOnlyField(
        source="receiver.profile.id"
        )

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    class Meta:
        model = UserMessage
        fields = [
            "id",
            "owner",
            "is_owner",
            "receiver",
            "content",
            "created_at",
            "profile_image",
            "profile_id",
            "receiver_profile_id",
            "receiver_profile_image",
            "receiver_username",
        ]
