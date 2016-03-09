
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("MyEvents",MyEvents);

    function MyEvents($rootScope,$location,UserEvent,$scope){

        var currentUserEvents=[];
        var eventIndexSelected;

        $scope.deleteEvent=deleteEvent;
        $scope.selectEvent=selectEvent;
        $scope.updateEvent=updateEvent;
        $scope.alertMessage=null;

        if($rootScope.currentUser==null){
            $location.url("/home");
        }
        else{
        var currentUser=$rootScope.currentUser;
         UserEvent.findEventsFoCurrentUser(currentUser._id,renderEvents);
        }

        function renderEvents(userEvents){
            $scope.events=userEvents;
            currentUserEvents=userEvents;
        }

        function deleteEvent(index){
            eventIndexSelected=index;
            UserEvent.deleteEventById(currentUserEvents[index]._id,renderEventsAfterAction);
        }

        function renderEventsAfterAction(userEvents){
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
        }
    }
})();