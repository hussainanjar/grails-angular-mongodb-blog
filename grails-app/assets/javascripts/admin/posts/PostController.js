'use strict';

/* Controllers */

var postController = angular.module('gambApp');

postController.controller('PostListController', ['$scope', 'PostApi',
    function ($scope, PostApi) {

        $scope.posts = PostApi.Post.query();
        $scope.orderProp = 'title';

        $scope.deletePost = function (index, id) {
            console.log("deleting  post", index);
            PostApi.Post.delete({postId: id},
                function (resp) {
                    console.log("success " + resp);
                    $scope.posts.splice(index, 1);
                }, function (resp) {
                    console.log("failure errors " + Object.keys(resp));
                });
        };


    }]);

postController.controller('PostTagController', ['$scope', '$routeParams', 'PostApi',
    function ($scope, $routeParams, PostApi) {

        PostApi.PostTags.query({tag: $routeParams.tag}, function (resp) {
            $scope.posts = resp;
        });

    }]);

postController.controller('PostDetailController', ['$scope', '$routeParams', '$location', 'PostApi',
    function ($scope, $routeParams, $location, PostApi) {
        $scope.post = {}
        $scope.tags = [];
        if ($routeParams.postId) {
            PostApi.Post.get({postId: $routeParams.postId}, function (post) {
                console.log("Post object", post.slug)

                if (post.tags) {
                    $scope.tags = post.tags
                }
                $scope.post = post
                $scope.comment = {
                    slug: post.slug
                };
            });
        }

        $scope.savePost = function () {
            console.log("Admin saving post", $scope.post);
            var post = $scope.post;
            post.tags = $scope.tags
            var res = PostApi.Post.save({}, post,
                function (resp) {
                    console.log("success " + resp);
                    $location.path('/posts/');
                }, function (resp) {
                    console.log("failure errors " + Object.keys(resp));
                    $scope.post.errors = resp.data.errors;
                });
            console.log(res);
        };

        $scope.updatePost = function () {
            console.log("Admin updating post", $scope.tags);
            var post = $scope.post;
            post.tags = $scope.tags
            var res = PostApi.Post.update({postId: $scope.post.id}, post,
                function (resp) {
                    console.log("success " + resp);
                    $location.path('/posts/');
                }, function (resp) {
                    console.log("failure errors " + Object.keys(resp));
                    $scope.post.errors = resp.data.errors;
                });
            console.log(res);
        };
    }]);
