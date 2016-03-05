
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent($scope){

        $scope.message=null;
        $scope.create=create;

        function create(event){



        }
    }


})();
