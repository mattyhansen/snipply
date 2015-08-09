var snippyApp = angular.module('snippyApp', [
    'ngRoute',
    'snippetControllers'
]);

snippyApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/list', {
        templateUrl: 'app/views/list.html',
        controller: 'ListController'
    }).
    when('/details/:itemId', {
            templateUrl: 'app/views/details.html',
            controller: 'DetailsController'
        }).
    otherwise({
        redirectTo: '/list'
    });
}]);

// this is for prism
snippyApp.directive('nagPrism', ['$compile', function($compile) {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            source: '@'
        },
        link: function(scope, element, attrs, controller, transclude) {
            scope.$watch('source', function(v) {
                element.find("code").html(v);

                Prism.highlightElement(element.find("code")[0]);
            });

            transclude(function(clone) {
                if (clone.html() !== undefined) {
                    element.find("code").html(clone.html());
                    $compile(element.contents())(scope.$parent);
                }
            });
        },
        template: "<code></code>"
    };
}]);