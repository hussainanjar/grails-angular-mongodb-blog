'use strict';

/* Controllers */

var settingsController = angular.module('gambApp');

settingsController.controller('SettingsController', ['$scope', '$location', 'SettingsApi',
    function ($scope, $location, SettingsApi) {
        $scope.settings = SettingsApi.Setting.setting();

        $scope.updateSettings = function () {
            console.log("Admin updating settings", $scope.settings);
            var settings = $scope.settings;
            var res = SettingsApi.Setting.update({}, settings,
                function (resp) {
                    console.log("success " + resp);
                    $scope.message = "Setting updated successfully"

                }, function (resp1) {
                    console.log("failure errors " + Object.keys(resp1));
                    $scope.settings.errors = resp1.data.errors;
                });
            console.log(res);
        };

    }]);
