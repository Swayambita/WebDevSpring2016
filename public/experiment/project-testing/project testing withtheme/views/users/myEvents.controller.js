
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("MyEvents",MyEvents);

    function MyEvents($location,UserEventService,$rootScope){

        var vm=this;
        vm.alertMessage=null;
        vm.updateEvent=updateEvent;
        vm.selectEvent=selectEvent;
        vm.deleteEvent=deleteEvent;

        var currentUser=$rootScope.currentUser;

        function init()
        {
            if ($rootScope.currentUser == null) {
                $location.url("/home");
            }
            else {
                var currentUser = $rootScope.currentUser;
                UserEventService.findEventsFoCurrentUser(currentUser._id)
                    .then(function (response) {
                       vm.events = response.data;

                        console.log("bitchesss",response.data);

                       //just for displaying the date..we are removing the time zone details
                        for(var e in vm.events){
                            var date1=vm.events[e].sDate.substring(0,10);
                            console.log("date1",date1);
                            vm.events[e].sDate=date1;

                            var date2=vm.events[e].eDate.substring(0,10);
                            console.log("date2",date2);
                            vm.events[e].eDate=date2;
                        }
                        console.log("******",vm.events);
                    });
            }
        }
        init();


         function deleteEvent(index){
             vm.eventIndexSelected = index;
             var eventToDelete=vm.events[index]._id;
             UserEventService.deleteEventById(eventToDelete,currentUser._id)
                 .then(function(response){
                     console.log("after deletion",response.data);
                     vm.events=response.data;
                     vm.eventIndexSelected=null;
                     vm.eName=null;
                 })
         }


        function selectEvent(index) {
            vm.eventIndexSelected = index;
            vm.eName = vm.events[index].eName;
            vm.eDesc = vm.events[index].desc;

            vm.sDate=vm.events[index].sDate;
            vm.eDate=vm.events[index].eDate;
        }
        function updateEvent(eName,eDesc,newSDate,newEDate) {

            if (eName == null || eDesc == null) {
                vm.alertMessage = "Enter the required fields";
            }

            else {
                var eventId = vm.events[vm.eventIndexSelected]._id;
                var prevEvent = vm.events[vm.eventIndexSelected];
                console.log("new start date from view",newSDate);

                var changedEvent = {
                    "_id": prevEvent._id, "eName": eName,
                    "sDate": newSDate, "eDate": newEDate, "userId": prevEvent.userId,
                    "desc": eDesc, "image": prevEvent.image};

                UserEventService.updateEventById(eventId,changedEvent)
                    .then(finalList)
            }
        }

        function finalList(response){
            UserEventService.findEventsFoCurrentUser(currentUser._id)
                .then(function(response){
                    if(response.data) {
                        vm.events=response.data;
                        for(var e in vm.events){
                            var date1=vm.events[e].sDate.substring(0,10);
                            console.log("date1",date1);
                            vm.events[e].sDate=date1;

                            var date2=vm.events[e].eDate.substring(0,10);
                            console.log("date2",date2);
                            vm.events[e].eDate=date2;
                        }
                        vm.eventIndexSelected=null;
                        vm.eName=null;
                        vm.eDesc=null;
                        vm.newSDate=null;
                        vm.newEDate=null;
                    }
                });

        }
       /* function renderEventsAfterAction(userEvents){
            UserEvent.findEventsFoCurrentUser(currentUser._id,renderEvents);
        }

        function selectEvent(index){
            eventIndexSelected = index;
            $scope.eventSelected=
            {"_id": currentUserEvents[index]._id,
                "eName": currentUserEvents[index].eName,
                "sDate": currentUserEvents[index].sDate,
                "eDate" :currentUserEvents[index].eDate,
                "userId": currentUserEvents[index].userId
            };
        }

        function updateEvent(eSelected){
         //   if(eSelected.ename == null || eSelected.sDate == null || eSelected.eDate== null){
            if(eSelected.eName == null){
                $scope.alertMessage="Enter details of all the required fields";
            }
            else{
                currentUserEvents[eventIndexSelected].eName=eSelected.eName;
                currentUserEvents[eventIndexSelected].sDate=eSelected.sDate;
                currentUserEvents[eventIndexSelected].eDate=eSelected.eDate;
                $scope.eventSelected = null;
            }
        }*/
    }
})();