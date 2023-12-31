from django.db import IntegrityError
from rest_framework import serializers
from saved.models import SavePost


class SavedSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = SavePost
        fields = ["id", "owner", "post", "created_at"]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({"detail": "possible duplicate"})
