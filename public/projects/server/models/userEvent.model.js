var eventMock = require("./event.mock.json");

module.exports= function(uuid) {

    var api = {
        findEventsFoCurrentUser: findEventsFoCurrentUser,
        deleteEventById: deleteEventById,
        updateEventById: updateEventById,
        createNewEvent: createNewEvent
    }
    return api;

  /*  function findEventsFoCurrentUser(userId) {
        var userEvents = [];
        for (e in eventMock) {
            if (eventMock[e].userId == userId) {

               var eventStartDate=new Date(eventMock[e].sYear,eventMock[e].sMon,eventMock[e].sDate1);
                var eventEndDate=new Date(eventMock[e].eYear,eventMock[e].eMon,eventMock[e].eDate1);

                eventMock[e].sDate=eventStartDate;
                eventMock[e].eDate=eventEndDate;
                userEvents.push(eventMock[e]);
            }
        }
        return userEvents;
    }*/

    function findEventsFoCurrentUser(userId) {
        var userEvents = [];
        for (e in eventMock) {
            if (eventMock[e].userId == userId) {
                userEvents.push(eventMock[e]);
            }
        }
        return userEvents;
    }

    function createNewEvent(userId,newEvent){
        var nEvent= { "_id": uuid.v1(),
            "eName": newEvent.Name,
            "sDate":newEvent.startDate,
            "eDate" :newEvent.endDate,
            "userId": userId,
            "desc":newEvent.desc,
            "image":newEvent.image
        }

        eventMock.push(nEvent);
        return "event added";
    }


    function deleteEventById(eventId,userId){
        for (e in eventMock) {
            if(eventMock[e]._id==eventId){
                eventMock.splice(e, 1);
               break;
            }
        }
       var events= findEventsFoCurrentUser(userId)
        return events;
    }

    function updateEventById(eventId,event){
        console.log("in server model");
        for (e in eventMock) {
            if(eventMock[e]._id==eventId){
                eventMock[e]=event;
                return eventMock[e];
            }
        }
    }


}


