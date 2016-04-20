
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
            getLiveEventsForGenre:getLiveEventsForGenre,
            getDetailsOfEvent:getDetailsOfEvent,
            allUsersWhoLikeThisEvent:allUsersWhoLikeThisEvent,
            getFavEvents:getFavEvents,
            unlikeEvent:unlikeEvent,
            unbookmarkEvent:unbookmarkEvent
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
            var userId=$rootScope.currentUser._id;
            return $http.post("/api/project/createEvent/"+userId,newEvent);
        }

        function userLikesEvent(userId,eventId,currentUser,detailName,fetchFrom){
            return $http.post("/api/project/userLikeEvent/"+userId+"/event/"+eventId+"/"+detailName+"/"+fetchFrom,currentUser);
        }

        function userBookMarksEvent(userId,eventId,currentUser,detailName,fetchFrom){
            return $http.post("/api/project/userBookmarkEvent/"+userId+"/event/"+eventId+"/"+detailName+"/"+fetchFrom,currentUser);
        }

        function userCommentsEvent(userId,eventId,currentUser,comment,detailName,fetchFrom){
            return $http.post("/api/project/userCommentsEvent/"+userId+"/event/"+eventId+"/"+detailName+"/"+fetchFrom,currentUser,comment);
        }

        function goLive(eventId,eventSelected){
            return $http.put("/api/project/goLive/"+eventId,eventSelected);
        }

        function getLiveEventsForGenre(category,city){
            return $http.get("/api/project/getLive/"+category+"/"+city);
        }

        function getDetailsOfEvent(eventId){
            return $http.get("/api/project/getEventInfo/"+eventId);
        }

        function allUsersWhoLikeThisEvent(eventId){
            return $http.get("/api/project/allUserLikeThisEvent/"+eventId);
        }

        function getFavEvents(userId){
            return $http.get("/api/project/getFavEvents/"+userId);
        }

        function unlikeEvent(eventId,userId){
            return $http.put("/api/project/unlikeEvent/"+eventId+"/"+userId);
        }

        function unbookmarkEvent(eventId,userId){
            return $http.put("/api/project/unbookmarkEvent/"+eventId+"/"+userId);
        }
    }
})();