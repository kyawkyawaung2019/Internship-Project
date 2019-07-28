from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework import serializers

from Application.models import Student, Course

#class StudentSerializer(serializers.HyperlinkedModelSerializer):
class StudentSerializer(serializers.ModelSerializer):
	#owner = serializers.ReadOnlyField(source='owner.username')
	#highlight = serializers.HyperlinkedIdentityField(view_name='student-highlight', format='html')
	class Meta:
		model=Student
		fields = ('id', 'student_name', 'age', 'gender', 'gender', 'address', 'course_id')

#class CourseSerializer(serializers.HyperlinkedModelSerializer):
class CourseSerializer(serializers.ModelSerializer):
	#owner = serializers.ReadOnlyField(source='owner.username')
	#highlight = serializers.HyperlinkedIdentityField(view_name='course-highlight', format='html')
	student_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model=Course
		fields = ('id', 'course_name', 'major', 'student_id')

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'password')
