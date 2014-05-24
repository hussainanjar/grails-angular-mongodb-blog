'use strict';

/* Services */

var pageService = angular.module('gambApp');

pageService.factory('PageApi', ['$resource',
    function ($resource) {
        return {
            Page: $resource('v1/pages/:pageId', {pageId: '@id'}, {
                'menu': { method: 'GET', url: 'v1/pages/menu', isArray: true }
            })
        };
    }]);