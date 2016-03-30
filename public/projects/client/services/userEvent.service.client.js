
(function (){
    angular.module("EventBuilderApp")
        .factory("UserEventService",UserEventService);

    function UserEventService($rootScope,$http){

        var model = {
            findEventsFoCurrentUser : findEventsFoCurrentUser,
            deleteEventById : deleteEventById,
            updateEventById :updateEventById,
            createNewEvent : createNewEvent,
            userLikesEvent : userLikesEvent
        }
        return model;


        function findEventsFoCurrentUser(userId){
           return $http.get("/api/project/getAllEvent/user/"+userId);
        }


        function deleteEventById(eventId,userId){
            return $http.delete("/api/project/deleteEventById/"+eventId+"/"+userId);
        }

        function updateEventById(eventId, event){
            return $http.put("/api/project/updateEvent/"+eventId,event);
        }


        function createNewEvent(newEvent){
            var currentUser=$rootScope.currentUser;
            return $http.post("/api/project/createEvent/"+currentUser._id,newEvent);
        }

        function userLikesEvent(){
            return $http.post("api/project/userLikesEvent/"+currentUser._id,eventId);
        }
    }
})();