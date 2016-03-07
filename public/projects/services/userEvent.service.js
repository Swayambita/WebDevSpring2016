
(function (){
    angular.module("EventBuilderApp")
        .factory("UserEvent",UserEvent);

    function UserEvent(){

        var events=[
            {"_id": "000", "eName": "Adam Levine Live Concert","sDate": "2013-05-23","eDate" :"2013-05-23", "userId": 123},
            {"_id": "010", "eName": "Bussiness Management Conference", "sDate": "11/10/2016","eDate" :"12/10/2016", "userId": 123},
            {"_id": "020", "eName": "Hackathon","sDate": "11/11/2016","eDate" :"11/11/2016","userId": 234},
        ];

        var model = {
            findEventsFoCurrentUser : findEventsFoCurrentUser,
            deleteEventById : deleteEventById,
            updateEventById :updateEventById

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

    }
})();