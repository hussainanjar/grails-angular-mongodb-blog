'use strict';

/* Controllers */

var appController = angular.module('gambApp');

appController.controller('AppController', ['$scope', '$location', 'SettingsApi', 'PageApi',
    function ($scope, $location, SettingsApi, PageApi) {

        $scope.settings = SettingsApi.Setting.setting();
        $scope.menu = PageApi.Page.menu();

    }]);
