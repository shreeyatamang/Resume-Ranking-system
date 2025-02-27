from rest_framework import serializers
from .models import HR, Candidate
from django.contrib.auth.hashers import make_password, check_password

class HRSerializer(serializers.ModelSerializer):
    class Meta:
        model = HR
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

# HR Registration Serializer
class HRRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        # Create HR instance with hashed password
        validated_data['password'] = make_password(validated_data['password'])
        hr = HR.objects.create(**validated_data)
        return hr

# Candidate Registration Serializer
class CandidateRegistrationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        # Create Candidate instance with hashed password
        validated_data['password'] = make_password(validated_data['password'])
        candidate = Candidate.objects.create(**validated_data)
        return candidate

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = None

        # Check if user is HR or Candidate
        try:
            user = HR.objects.get(email=email)
        except HR.DoesNotExist:
            try:
                user = Candidate.objects.get(email=email)
            except Candidate.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

        # Validate password
        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid credentials")

        return {'email': user.email, 'role': 'HR' if isinstance(user, HR) else 'Candidate'}