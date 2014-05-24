'use strict';

/* Services */

var postService = angular.module('gambApp');

postService.factory('PostApi', ['$resource',
    function ($resource) {
        return {
            Post: $resource('v1/posts/:postId', {postId: '@id'}, {
                'update': { method: 'PUT' }
            })
        };

    }]);