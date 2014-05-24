'use strict';

/* Controllers */

var postController = angular.module('gambApp');

postController.controller('PostListController', ['$scope', 'PostApi',
    function ($scope, PostApi) {

        $scope.posts = PostApi.Post.query();
        $scope.orderProp = 'title';

        console.log("Loading Posts ", $scope.posts);


    }]);

postController.controller('PostTagController', ['$scope', '$routeParams', 'PostApi',
    function ($scope, $routeParams, PostApi) {

        PostApi.PostTags.query({tag: $routeParams.tag}, function (resp) {
            $scope.posts = resp;
        });

    }]);

postController.controller('PostDetailController', ['$scope', '$routeParams', 'PostApi',
    function ($scope, $routeParams, PostApi) {
        $scope.post = PostApi.Post.get({postId: $routeParams.postId}, function (post) {
            console.log("Post object", post.slug)
            $scope.comment = {
                slug: post.slug
            };
        });


        $scope.addComment = function () {
            console.log("Add comments", $scope.comment);
            var comment = $scope.comment;
            var res = PostApi.PostComments.save({postId: comment.slug}, comment,
                function (resp) {
                    console.log(resp);
                    $scope.post.comments.push(comment)
                }, function (resp) {
                    console.log(resp);
                });
            console.log(res);
        };
    }]);
