
(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("SideBarController",SideBarController);

    function SideBarController($scope,$location){
        $scope.$location=$location;
        console.log("sidebar",currentUser);

    }
})();

