
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent(UserEventService){

        var vm=this;
        vm.message=null;
        vm.createEvent=createEvent;

        function createEvent(event){

            if(event==null){
                $scope.message = "Not a valid entry";
                return;
            }

            if(event.Name == null){
                $scope.message ="Enter a event name";
                return;
            }

            if(event.location == null){
                $scope.message = "Enter a event location";
                return;
            }

            console.log("date in htmlformat",event.startDate);
            console.log("date in htmlformat after substring",event.startDate.getDate());


            if(event.startDate == null){
                $scope.message = "Enter a event start date and time";
                return;
            }

            var date=event.startDate.getDate()
            var month=event.startDate.getMonth();
            var year=event.startDate.getFullYear();

            var entireSDate=new Date(year,month,date);
            event.entireSDate=entireSDate;



            if(event.endDate== null){
                $scope.message = "Enter a event end date and time";
                return;
            }

            if(event.desc == null){
                $scope.message = "Enter a event description";
                return;
            }

            UserEventService.createNewEvent(event)
                .then(function(response){
                    vm.message="your event is created";
                    vm.event=null;
                })
        }
    }
})();
