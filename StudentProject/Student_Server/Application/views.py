from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions, renderers, viewsets
from rest_framework.response import Response

from Application.models import Student, Course
from Application.serializers import StudentSerializer, CourseSerializer
from Application.permissions import IsOwnerOrReadOnly

class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	serializer_class = StudentSerializer
	# For Authentication
	'''
	permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, )
	@detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
	def highlight(self, request, *args, **kwargs): 
		brand = self.get_object()
		return Response(student.highlighted)
	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
	'''

class CourseViewSet(viewsets.ModelViewSet):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	# For Authentication
	'''
	permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, )
	@detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
	def highlight(self, request, *args, **kwargs): 
		person = self.get_object()
		return Response(course.highlighted)
	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
	'''