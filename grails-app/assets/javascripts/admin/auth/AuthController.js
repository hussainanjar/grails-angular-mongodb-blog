'use strict';

/* Controllers */

var authController = angular.module('gambApp');

authController.controller('LoginController', ['$rootScope', '$scope', '$http', 'authService',
    function ($rootScope, $scope, $http, authService) {
        console.log('loginController called');

        $scope.logIn = function () {
            console.log('logIn called');

            $http.post('../auth/api/login', { username: $scope.authData.username, password: $scope.authData.password }, getAuthenticateHttpConfig).
                success(function (data) {
                    console.log('authentication token: ' + data.token);
                    console.log('authentication username: ' + data.username);
                    $rootScope.isAuthenticated = true;
                    $rootScope.currentUser = data.username;
                    setLocalToken(data.token);
                    authService.loginConfirmed({}, function (config) {
                        if (!config.headers["X-Auth-Token"]) {
                            console.log('X-Auth-Token not on original request; adding it');
                            config.headers["X-Auth-Token"] = getLocalToken();
                        }
                        return config;
                    });
                }).
                error(function (data) {
                    console.log('login error: ' + data);
                    $rootScope.$broadcast('event:auth-loginFailed', data);
                });
        }
    }]);
