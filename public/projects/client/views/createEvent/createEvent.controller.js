
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent(UserEventService,$location){

        var vm=this;
        var entireSDate;
        vm.maxDate=new Date().date;
        vm.message=null;
        vm.createEvent=createEvent;
        vm.cancel=cancel;

        function createEvent(event){

            if(event==null){
                vm.message = "Not a valid entry";
                return;
            }

            if(event.Name == null){
                vm.message ="Enter a event name";
                return;
            }

            if(event.location == null){
                vm.message = "Enter a event location";
                return;
            }

            if(event.startDate == null){
                vm.message = "Enter a event start date and time";
                return;
            }

            if(event.startDate<new Date().date){
                vm.message = "Start date is not valid";
                return;
            }

            if(event.endDate== null){
                vm.message = "Enter a event end date and time";
                return;
            }

            if(event.startDate>event.endDate){
                vm.message ="Start and end dates are not valid.";
                return;
            }

            if(event.desc == null){
                vm.message = "Enter a event description";
                return;
            }

            if(event.genre == null){
                vm.message = "Enter a event genre";
                return;
            }

            event.genre=event.genre.toLowerCase();
            event.location=event.location.toLowerCase();
            UserEventService.createNewEvent(event)
                .then(function(response){
                    vm.message="your event is created";
                    vm.event=null;
                        $location.url("/myEvents");
                },
                function(err){
                    vm.message="your event couldnot be created";
                })
        }

        function cancel(){
            vm.event=null;
        }
    }
})();
