
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent($scope){

        $scope.message=null;
        $scope.createEvent=createEvent;

        function createEvent(event){


        }
    }


})();
