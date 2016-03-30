(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("MainController",MainController);

    function MainController($scope, $location,UserLocationService,$rootScope)
    {
      /*  console.log("hi from main");
        $scope.$location = $location;
        UserLocationService.getLocation();

        console.log("from main",$rootScope.latitude);*/
    }
})();