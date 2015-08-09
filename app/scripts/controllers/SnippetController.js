var snippetControllers = angular.module('snippetControllers', ['ngAnimate']);

snippetControllers.controller('ListController', ['$scope', '$http', function ($scope, $http) {
    $http.get('app/data/data.json').success(function(data) {
        $scope.snippets = data;
        $scope.snippetOrder = 'title';
        $scope.ascendingClass = 'success';
        $scope.descendingClass = 'primary';
        $scope.bodyClass = 'layout-list';
    });
}]);

snippetControllers.controller('DetailsController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('app/data/data.json').success(function(data) {
        $scope.snippets = data;
        $scope.whichItem = $routeParams.itemId;
        $scope.bodyClass = 'layout-detail';

        // previous item
        if ($routeParams.itemId > 0) {
            $scope.prevItem = Number($routeParams.itemId)-1;
        } else {
            $scope.prevItem = $scope.snippets.length-1;
        }

        // next item
        if ($routeParams.itemId < $scope.snippets.length-1) {
            $scope.nextItem = Number($routeParams.itemId)+1;
        } else {
            $scope.nextItem = 0;
        }

    });
}]);