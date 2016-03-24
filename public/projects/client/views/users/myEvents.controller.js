
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("MyEvents",MyEvents);

    function MyEvents($location,UserEventService,$rootScope){

        //var currentUserEvents=[];
        //var eventIndexSelected;
       /* $scope.deleteEvent=deleteEvent;
        $scope.selectEvent=selectEvent;
        $scope.updateEvent=updateEvent;
        $scope.alertMessage=null;*/

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



           // eventIndexSelected=index;
            //UserEvent.deleteEventById(currentUserEvents[index]._id,renderEventsAfterAction);
        }


        function selectEvent(index) {
            vm.eventIndexSelected = index;
            vm.eName = vm.events[index].eName;
            vm.eDesc = vm.events[index].desc;
            vm.sDate=vm.events[index].sDate;
        }
        function updateEvent(eName,eDesc) {

            if (eName == null || eDesc == null) {
                vm.alertMessage = "Enter the required fields";
            }

            else {
                var eventId = vm.events[vm.eventIndexSelected]._id;
                var prevEvent = vm.events[vm.eventIndexSelected];
                var changedEvent = {
                    "_id": prevEvent._id, "eName": eName,
                    "sDate": prevEvent.sDate, "eDate": prevEvent.eDate, "userId": prevEvent.userId,
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
                        vm.eventIndexSelected=null;
                        vm.eName=null;
                        vm.eDesc=null;
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