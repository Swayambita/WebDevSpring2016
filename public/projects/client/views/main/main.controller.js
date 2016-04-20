(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("MainController",MainController);

    function MainController($scope, $location,UserLocationService,$rootScope)
    {
        $scope.$location = $location;

    }
})();