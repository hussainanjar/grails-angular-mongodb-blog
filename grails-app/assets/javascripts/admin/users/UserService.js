'use strict';

/* Services */

var userService = angular.module('gambApp');

userService.factory('UserApi', ['$resource',
    function ($resource) {
        return {
            User: $resource('v1/users', {}, {
                'profile': { method: 'GET', url: 'v1/users/profile' },
                'updateProfile': { method: 'PUT', url: 'v1/users/updateProfile' },
                'password': { method: 'PUT', url: 'v1/users/password' }
            })
        };
    }]);