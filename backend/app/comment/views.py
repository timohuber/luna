from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.generics import CreateAPIView, RetrieveDestroyAPIView, ListAPIView
User = get_user_model()
from app.comment.models import Comment
from app.comment.serializers import CommentSerializer
from app.restaurant.permissions import IsUserOrReadOnly
from app.review.models import Review


class CreateCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def post(self, request, *args, **kwargs):
        currentUser = self.request.user
        searchReview = Review.objects.get(id=kwargs['pk'])

        comment = Comment.objects.create(review=searchReview, user=currentUser,
                                         text_content=request.data['text_content'])
        comment.save()
        return HttpResponse('New comment created', status=200)


class GetDestroyCommentView(RetrieveDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsUserOrReadOnly]

    def get_queryset(self):
        if self.request.method == 'GET':
            return Comment.objects.filter(user=self.request.user)
        if self.request.method == 'DELETE':
            return Comment.objects.filter(id=self.kwargs['pk'])


class GetUserReviews(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(user=User.objects.get(id=self.kwargs['pk']))


class ListCommentView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(review=Review.objects.get(id=self.kwargs['pk']))
