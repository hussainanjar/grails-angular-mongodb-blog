'use strict';

/* Controllers */

var dashboardController = angular.module('gambApp');

dashboardController.controller('DashboardController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('../admin/v1/dashboard')
            .success(function (data, status, headers, config) {
                console.log("Dashboard", data)
                $scope.dashboard = data;
            }).error(function (data, status, headers, config) {
                console.log("Error while loading dashboard ", status)
            });
    }]);
