var appDirectives = angular.module('gambApp');


appDirectives.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0], {
                height: '360px',
                width: '80%'
            });

            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });

            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
});

appDirectives.directive('tagManager', function () {
    return {
        restrict: 'E',
        scope: { tags: '=' },
        template: '<input type="text" placeholder="Add a tag..." class="form-control" ng-model="new_value"></input> ' +
            '<div class="tags">' +
            '<span class="help-block"><a ng-repeat="(idx, tag) in tags" class="label label-info" ng-click="remove(idx)">{{tag}}</a>' +
            '</div></span>',
        link: function ($scope, $element) {

            // This adds the new tag to the tags array
            $scope.add = function () {
                $scope.tags.push($scope.new_value);
                $scope.new_value = "";
            };

            // This is the ng-click handler to remove an item
            $scope.remove = function (idx) {
                $scope.tags.splice(idx, 1);
            };

            // Capture all keypresses
            $element.bind('keydown keypress', function (event) {
                // But we only care when Enter was pressed
                if (event.keyCode == 13 || event.keyCode == 9) {
                    // There's probably a better way to handle this...
                    $scope.$apply($scope.add);

                    event.preventDefault();
                }
            });
        }
    };
});

gambApp.directive('confirmationNeeded', function () {
    return {
        priority: 1,
        terminal: true,
        link: function (scope, element, attrs) {
            var msg = attrs.confirmationNeeded || "Are you sure?";
            var clickAction = attrs.ngClick;
            element.bind('click', function () {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction);
                }

                return false;
            });
        }
    };
});

gambApp.directive("slug", function () {
    return {
        restrict: "E",
        scope: {
            to: "=",
        },
        transclude: true,
        replace: true,
        template: "<div ng-transclude></div>",
        link: function (scope, elem, attrs) {
            if (!attrs.from) {
                throw "must set attribute 'from'";
            }
            scope.$parent.$watch(attrs.from, function (s) {
                if (!s) return "";
                var slug;
                var ch, cp;
                for (var i = 0; i < s.length; i++) {
                    if ((cp = s.charCodeAt(i)) < 0x180) {
                        ch = String.fromCharCode(cp);
                    }
                }
                s = s.replace(/[^\w\s-]/g, "").trim().toLowerCase();
                slug = s.replace(/[-\s]+/g, "-");
                scope.to = slug;
            });
        }
    };
});