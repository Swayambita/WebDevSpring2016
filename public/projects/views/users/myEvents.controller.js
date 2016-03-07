
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("MyEvents",MyEvents);

    function MyEvents($rootScope,$location,UserEvent,$scope){

        var currentUserEvents=[];
        var eventIndexSelected;
     //   console.log($rootScope.currentUser.firstName);

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
            $scope.eventSelected=currentUserEvents[index];
        }

        function updateEvent(eSelected){

            if(eSelected.ename == null || eSelected.sDate == null || eSelected.eDate== null){
                $scope.alertMessage="Enter details all the required fields";
            }

            else{
                var newESelected = currentUserEvents[eventIndexSelected];
                newESelected.eName = eSelected.eName;
                newESelected.sDate= eSelected.sDate;
                newESelected.eDate=eSelected.eDate;
                FormService.updateEventById(newESelected._id, newESelected, renderEventsAfterAction);
                $scope.eventSelected = null;
                console.log("done");
            }
        }
    }
})();