from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView

from app.like.models import Like
from app.like.serializer import LikeSerializer
from app.restaurant.models import Restaurant
from app.restaurant.permissions import IsUserOrReadOnly
from app.review.models import Review
from app.review.serializers import ReviewSerializer


class CreateReviewView(CreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def post(self, request, *args, **kwargs):
        currentUser = self.request.user
        SearchRestaurant = Restaurant.objects.get(id=kwargs['pk'])

        review = Review.objects.create(restaurant=SearchRestaurant, user=currentUser,
                                       text_content=request.data['text_content'], rating=request.data['rating'])
        review.save()
        return HttpResponse('New Review created', status=200)


class GetRestaurantReviewView(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(restaurant__id=self.kwargs['pk'])


class GetUserReviewView(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(user__id=self.kwargs['pk'])


class GetReviewView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsUserOrReadOnly]

    def get_queryset(self):
        return Review.objects.filter(id=self.kwargs['pk'])


class ToggleLikeView(CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):
        currentUser = self.request.user
        searchReview = Review.objects.get(id=kwargs['pk'])
        likePost = Like.objects.filter(review=searchReview, user=currentUser)

        if likePost:
            likePost.delete()
            return HttpResponse(status=200)
        else:
            like = Like(review=searchReview, user=currentUser)
            like.save()
            return HttpResponse(status=200)


class GetCurrentUserReviewView(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(likes__user=self.request.user)


class GetCurrentUserCommentReviewView(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(comments__user=self.request.user)

