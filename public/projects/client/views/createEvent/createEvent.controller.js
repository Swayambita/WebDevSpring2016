
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent(UserEventService){

        var vm=this;
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

            console.log("date in htmlformat",event.startDate);
            console.log("date in htmlformat after substring",event.startDate.getDate());


            if(event.startDate == null){
                vm.message = "Enter a event start date and time";
                return;
            }

            var date=event.startDate.getDate()
            var month=event.startDate.getMonth();
            var year=event.startDate.getFullYear();

            var entireSDate=new Date(year,month,date);
            event.entireSDate=entireSDate;

            if(event.endDate== null){
                vm.message = "Enter a event end date and time";
                return;
            }

            if(event.desc == null){
                vm.message = "Enter a event description";
                return;
            }

            console.log("the create event is as follows",event);
            UserEventService.createNewEvent(event)
                .then(function(response){
                        console.log("the response for create event is as follows",response);
                    vm.message="your event is created";
                    vm.event=null;
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
