'use strict';

/* Controllers */

var pageController = angular.module('gambApp');

pageController.controller('PageListController', ['$scope', 'PageApi',
    function ($scope, PageApi) {

        $scope.pages = PageApi.Page.query();
        $scope.orderProp = 'title';

        $scope.deletePage = function (index, id) {
            console.log("deleting  page", index);
            PageApi.Page.delete({pageId: id},
                function (resp) {
                    console.log("success " + resp);
                    $scope.pages.splice(index, 1);
                }, function (resp) {
                    console.log("failure errors " + Object.keys(resp));
                });
        };


    }]);

pageController.controller('PageDetailController', ['$scope', '$routeParams', '$location', 'PageApi',
    function ($scope, $routeParams, $location, PageApi) {
        $scope.page = {}
        if ($routeParams.pageId) {
            PageApi.Page.get({pageId: $routeParams.pageId}, function (page) {
                console.log("Page object", page.slug)
                $scope.page = page
            });
        }

        $scope.savePage = function () {
            console.log("Admin saving page", $scope.page);
            var page = $scope.page;
            var res = PageApi.Page.save({}, page,
                function (resp) {
                    console.log("success " + resp);
                    $location.path('/pages/');
                }, function (resp) {
                    console.log("failure errors " + Object.keys(resp));
                    $scope.page.errors = resp.data.errors;
                });
            console.log(res);
        };

        $scope.updatePage = function () {
            console.log("Admin updating page", $scope.page);
            var page = $scope.page;
            var res = PageApi.Page.update({pageId: $scope.page.id}, page,
                function (resp) {
                    console.log("success " + resp);
                    $location.path('/pages/');
                }, function (resp) {
                    console.log("failure errors " + Object.keys(resp.data));
                    $scope.page.errors = resp.data.errors;
                });
            console.log(res);
        };
    }]);
