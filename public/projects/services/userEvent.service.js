
(function (){
    angular.module("EventBuilderApp")
        .factory("UserEvent",UserEvent);

    function UserEvent($rootScope){

        var events=[
            {"_id": "000", "eName": "Adam Levine Live Concert",
                "sDate": "2016-06-05T23:00:00","eDate" :"2016-06-05T23:00:00", "userId": 123,
            "desc":null, "image": null},
            {"_id": "010", "eName": "Bussiness Management Conference", "sDate": "11/10/2016","eDate" :"12/10/2016", "userId": 123,
                "desc":null, "image": null},
            {"_id": "020", "eName": "Hackathon","sDate": "11/11/2016","eDate" :"11/11/2016","userId": 234,
                "desc":null, "image": null},
        ];

        var model = {
            findEventsFoCurrentUser : findEventsFoCurrentUser,
            deleteEventById : deleteEventById,
            updateEventById :updateEventById,
            createNewEvent : createNewEvent
        }
        return model;


        function findEventsFoCurrentUser(currentUserId,callback){
            var userEvents=[];
            for(e in events){
                if(events[e].userId==currentUserId){
                    userEvents.push(events[e]);
                }
            }
            callback(userEvents);
        }

        function deleteEventById(eventId,callback){
            for(e in events){
                if(events[e]._id==eventId){
                    events.splice(e, 1);
                    break;
                }
            }
            callback(events);

        }

        function updateEventById(eventId, event, callback){
            for(e in events){
                if(events[e]._id==eventId){
                    events[e].eName=event.eName;
                    events[e].sDate=event.sDate;
                    events[e].eDate=event.eDate;
                }
            }
            callback(forms[e]);

        }

        function createNewEvent(newEvent,callback){

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
        }
    }
})();