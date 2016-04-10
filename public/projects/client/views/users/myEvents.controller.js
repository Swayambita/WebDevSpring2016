
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("MyEvents",MyEvents);

    function MyEvents($location,UserEventService,$rootScope){

        var vm=this;
        vm.message=null;
        vm.updateEvent=updateEvent;
        vm.selectEvent=selectEvent;
        vm.deleteEvent=deleteEvent;
        vm.goLive=goLive;

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
                        console.log("my events response*****", response.data);
                    });
            }
        }
        init();


         function deleteEvent(index){
             vm.eventIndexSelected = index;
             var eventToDelete=vm.events[index]._id;
             UserEventService.deleteEventById(eventToDelete,currentUser._id)
                 .then(function(response){
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
            vm.sTime=vm.events[index].sTime;
            vm.eDate=vm.events[index].eDate;
            vm.eTime=vm.events[index].eTime;
        }
        function updateEvent(eName,eDesc,newSDate,newSTime,newEDate,newETime) {

            if (eName == null || eDesc == null) {
                vm.alertMessage = "Enter the required fields";
            }

            else {
                var eventId = vm.events[vm.eventIndexSelected]._id;
                var prevEvent = vm.events[vm.eventIndexSelected];

                var changedEvent = {"eName": eName,
                    "sDate": newSDate, "eDate": newEDate, "createdBy": prevEvent.createdBy,
                    "desc": eDesc, "image": prevEvent.image,
                    "sTime":newSTime,"eTime":newETime};

                UserEventService.updateEventById(eventId,changedEvent)
                    .then(finalList);
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
                        vm.newSTime=null;
                        vm.newEDate=null;
                        vm.newETime=null;
                    }
                },
                function(error){
                    vm.message="error";
                });

        }

        function goLive(index){
            vm.eventIndexSelected = index;
            var eventSelected = vm.events[index];
            UserEventService.goLive(eventSelected._id,eventSelected)
                .then(function(response){
                        vm.message="event is live now";
                },
                function(error){
                    vm.message="error";
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