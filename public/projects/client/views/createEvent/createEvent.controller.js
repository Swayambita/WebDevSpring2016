
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent($scope,UserEvent){

        $scope.message=null;
        $scope.createEvent=createEvent;

        function createEvent(event){

            if(event==null){
                $scope.message = "Not a valid entry";
                return;
            }

            if(event.Name == null){
                $scope.message ="Enter a event name";
                return;
            }

            console.log(event);
            if(event.location == null){
                $scope.message = "Enter a event location";
                return;
            }

            if(event.startDate == null){
                $scope.message = "Enter a event start date and time";
                return;
            }

            if(event.endDate== null){
                $scope.message = "Enter a event end date and time";
                return;
            }

            if(event.desc == null){
                $scope.message = "Enter a event description";
                return;
            }

            UserEvent.createNewEvent(event,render);

            function render(){
                $scope.message = "Your event is created";
                $scope.event=null;

            }
        }
    }
})();
