from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

class Student(models.Model):
	student_name = models.CharField(max_length=100)
	age = models.IntegerField(default="0")
	gender = models.CharField(max_length=50)
	address = models.CharField(max_length=100)
	course_id = models.ForeignKey('Course', related_name='student_id', on_delete=models.CASCADE)
	#owner = models.ForeignKey('auth.User', related_name='student', on_delete=models.CASCADE)
	#highlighted = models.TextField()
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Student, self).save(*args, **kwargs)

class Course(models.Model):
	course_name = models.CharField(max_length=100)
	major = models.CharField(max_length=100)
	#owner = models.ForeignKey('auth.User', related_name='course', on_delete=models.CASCADE)
	#highlighted = models.TextField()
	class Meta:
		ordering = ('id',)
	def save(self, *args, **kwargs):
		super(Course, self).save(*args, **kwargs)

