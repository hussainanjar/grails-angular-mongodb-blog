'use strict';

/* Services */

var appService = angular.module('gambApp');

appService.factory('SettingsApi', ['$resource',
    function ($resource) {
        return {
            Setting: $resource('v1/settings', {}, {
                'setting': { method: 'GET' }
            })
        };
    }]);