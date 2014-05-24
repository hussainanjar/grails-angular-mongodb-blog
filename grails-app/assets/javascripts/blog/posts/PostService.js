'use strict';

/* Services */

var postService = angular.module('gambApp');

postService.factory('PostApi', ['$resource',
    function ($resource) {

        return {
            Post: $resource('v1/posts/:postId', {postId: '@id'}),
            PostComments: $resource('v1/posts/:postId/comments', {postId: '@id'}),
            PostTags: $resource('v1/posts/tags/:tag', {tag: '@id'})
        };

    }]);