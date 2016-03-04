(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("MainController",MainController);

    function MainController($scope, $location)
    {
        $scope.$location = $location;
    }
})();