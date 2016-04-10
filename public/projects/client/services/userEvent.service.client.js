
(function (){
    angular.module("EventBuilderApp")
        .factory("UserEventService",UserEventService);

    function UserEventService($rootScope,$http){

        var model = {
            findEventsFoCurrentUser : findEventsFoCurrentUser,
            deleteEventById : deleteEventById,
            updateEventById :updateEventById,
            createNewEvent : createNewEvent,
            userLikesEvent : userLikesEvent,
            userBookMarksEvent:userBookMarksEvent,
            userCommentsEvent:userCommentsEvent,
            goLive:goLive,
            getLiveEventsForGenre:getLiveEventsForGenre
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
            return $http.post("/api/project/createEvent/"+currentUser._id,newEvent);
        }

        function userLikesEvent(userId,eventId){
            return $http.post("/api/project/userLikesEvent/"+userId+"/event/"+eventId);
        }

        function userBookMarksEvent(userId,eventId){
            return $http.post("/api/project/userBookMarksEvent/"+userId+"/event/"+eventId);
        }

        function userCommentsEvent(userId,eventId,comment){
            return $http.post("/api/project/userCommentsEvent/"+userId+"/event/"+eventId,comment);
        }

        function goLive(eventId,eventSelected){
            console.log("in client service golive",eventId,eventSelected);
            return $http.put("/api/project/goLive/"+eventId,eventSelected);
        }

        function getLiveEventsForGenre(category,city){
            return $http.get("/api/project/getLive/"+category+"/"+city);
        }
    }
})();