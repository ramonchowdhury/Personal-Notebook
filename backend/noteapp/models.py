from django.db import models
from django.contrib.auth.models import User
class Note(models.Model):
	auth = models.ForeignKey(User, on_delete = models.CASCADE)
	title = models.CharField(max_length=120)
	body = models.TextField()
	create_at = models.DateTimeField(auto_now_add = True)
	updated_at = models.DateTimeField(auto_now_add = True)

	class Meta:
		ordering = ('-create_at', )

	def __str__(self):
		return self.title
