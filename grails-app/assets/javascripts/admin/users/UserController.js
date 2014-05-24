'use strict';

/* Controllers */

var userController = angular.module('gambApp');

userController.controller('UserDetailController', ['$scope', 'UserApi',
    function ($scope, UserApi) {
        $scope.user = UserApi.User.profile();

        $scope.updateProfile = function () {
            console.log("Admin updating project", $scope.user);
            var user = $scope.user;
            var res = UserApi.User.updateProfile({}, user,
                function (resp) {
                    console.log("success " + resp);
                    $scope.message = "Profile updated successfully"
                }, function (resp1) {
                    console.log("failure errors " + Object.keys(resp1));
                    $scope.user.errors = resp1.data.errors;
                });
            console.log(res);
        };
    }]);

userController.controller('UserPasswordController', ['$scope', 'UserApi',
    function ($scope, UserApi) {

        $scope.userPassword = {}
        $scope.updatePassword = function () {
            console.log("Admin updating project", $scope.userPassword);
            var userPassword = $scope.userPassword;
            var res = UserApi.User.password({}, userPassword,
                function (resp) {
                    console.log("success " + resp);
                    $scope.message = "Password updated successfully"
                }, function (resp1) {
                    console.log("failure errors " + Object.keys(resp1));
                    $scope.userPassword.errors = resp1.data.errors;
                });
            console.log(res);
        };
    }]);
