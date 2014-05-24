'use strict';

/* Controllers */

var pageController = angular.module('gambApp');

pageController.controller('PageDetailController', ['$scope', '$routeParams', 'PageApi',
    function ($scope, $routeParams, PageApi) {
        $scope.page = PageApi.Page.get({pageId: $routeParams.pageId}, function (page) {
            console.log("page object", page.slug)
        });
    }]);