//var eventMock = require("./event.mock.json");
var mongoose=require("mongoose");
var q= require("q");

module.exports= function(uuid,db) {

    var UserSchema=require("./user.schema.server.js")();
    var User=mongoose.model("User",UserSchema);

    var api = {
        findEventsFoCurrentUser: findEventsFoCurrentUser,
        deleteEventById: deleteEventById,
        updateEventById: updateEventById,
        createNewEvent: createNewEvent
    }
    return api;

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
            "sDate":newEvent.entireSDate,
            "eDate" :newEvent.endDate,
            "userId": userId,
            "desc":newEvent.desc,
            "image":newEvent.image
        }
        console.log("the new event created looks like this",nEvent);

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
                console.log("from server model after updation",eventMock[e]);
                return eventMock[e];
            }
        }
    }


}


