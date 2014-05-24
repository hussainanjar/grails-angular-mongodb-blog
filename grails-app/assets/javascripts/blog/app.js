'use strict';

/* App Module */

var gambApp = angular.module('gambApp', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'angulartics',
    'angulartics.google.analytics'
]);

gambApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/posts', {
                templateUrl: 'blog/views/post/list.html',
                controller: 'PostListController'
            }).
            when('/posts/:postId', {
                templateUrl: 'blog/views/post/show.html',
                controller: 'PostDetailController'
            }).
            when('/posts/tags/:tag', {
                templateUrl: 'blog/views/post/list.html',
                controller: 'PostTagController'
            }).
            when('/:pageId', {
                templateUrl: 'blog/views/page/show.html',
                controller: 'PageDetailController'
            }).
            otherwise({
                redirectTo: '/posts'
            });
    }]);
