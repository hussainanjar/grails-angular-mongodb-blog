'use strict';

/* Services */

var settingsService = angular.module('gambApp');

settingsService.factory('SettingsApi', ['$resource',
    function ($resource) {
        return {
            Setting: $resource('v1/settings', {}, {
                'setting': { method: 'GET' },
                'update': { method: 'PUT', url: 'v1/settings/update'}
            })
        };
    }]);