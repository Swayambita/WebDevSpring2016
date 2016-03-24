
(function (){
    angular.module("EventBuilderApp")
        .factory("UserEventService",UserEventService);

    function UserEventService($rootScope,$http){

        var currentUser=$rootScope.currentUser;

        var model = {
            findEventsFoCurrentUser : findEventsFoCurrentUser,
            deleteEventById : deleteEventById,
            updateEventById :updateEventById,
            createNewEvent : createNewEvent
        }
        return model;

        /*function findEventsFoCurrentUser(currentUserId,callback){
            var userEvents=[];
            for(e in events){
                if(events[e].userId==currentUserId){
                    userEvents.push(events[e]);
                }
            }
            callback(userEvents);
        }*/

        function findEventsFoCurrentUser(userId){
           return $http.get("/api/project/getAllEvent/user/"+userId);
        }


        function deleteEventById(eventId,userId){
            return $http.delete("/api/project/deleteEventById/"+eventId+"/"+userId);
        }

        function updateEventById(eventId, event){
            return $http.put("/api/project/updateEvent/"+eventId,event);
        }

      /*  function createNewEvent(newEvent,callback){

            var nEvent= { "_id": "000",
                "eName": newEvent.Name,
                "sDate":newEvent.startDate,
                "eDate" :newEvent.endDate,
                "userId": $rootScope.currentUser._id,
                "desc":newEvent.desc,
                "image":newEvent.image
            }

            console.log(nEvent);
            console.log(events);
            events.push(nEvent);
            callback();
        }*/


        function createNewEvent(newEvent){
            return $http.post("/api/project/createEvent/"+currentUser._id,newEvent);
        }
    }
})();