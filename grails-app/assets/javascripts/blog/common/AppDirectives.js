var appDirectives = angular.module('gambApp');


appDirectives.directive('whenActive', ['$location',
    function ($location) {
        return {
            scope: true,
            link: function (scope, element, attrs) {
                scope.$on('$routeChangeSuccess', function () {
                    if ('#'+$location.path() == element.children().attr('href')) {
                        element.addClass('active');
                    }
                    else {
                        element.removeClass('active');
                    }
                });
            }
        };
    }]);