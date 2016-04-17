var mongoose=require("mongoose");
var q= require("q");

module.exports= function(uuid,db) {

     var EventSchema=require("./eventDetails.schema.server.js")();
     var Event=mongoose.model("Event",EventSchema);

    var api = {
       findEventsFoCurrentUser: findEventsFoCurrentUser,
        deleteEventById: deleteEventById,
        updateEventById: updateEventById,
        createNewEvent: createNewEvent,
        goLive:goLive,
        getLive:getLive,
        findEventById:findEventById
    }
    return api;

    function findEventsFoCurrentUser(userId) {
        var deferred= q.defer();

        Event.find({"createdBy":userId},function(err,res){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function createNewEvent(userId,newEvent){
        var deferred= q.defer();
        console.log("$$$$$$",newEvent);
        var nEvent= {
            "eName": newEvent.Name,
            "sDate":newEvent.entireSDate,
            "sTime":newEvent.startTime,
            "eDate" :newEvent.endDate,
            "eTime":newEvent.endTime,
            "desc":newEvent.desc,
            "image":newEvent.image,
            "createdBy":userId,
            "genre":newEvent.genre,
            "live":false,
            "location":newEvent.location
        }

        Event.create(nEvent,function(err,res){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function deleteEventById(eventId,userId){
        var deferred= q.defer();
        Event.remove({"_id":eventId},function(err,res){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function updateEventById(eventId,event){
        var deferred= q.defer();
        Event.update(
            {"_id":eventId},
            {$set: {"eName":event.eName,
                "desc":event.desc,
            "sDate":event.sDate,
            "sTime":event.sTime,
            "eDate":event.eDate,
                "eTime":event.eTime,
                "image":event.image,
                "genre":event.genre,
                "createdBy":event.createdBy,
            "location":event.location}}
            ,function(err,res){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function goLive(eventId,event){
        var deferred= q.defer();

        Event.update(
            {"_id":eventId},
            {$set: {"eName":event.eName,
                "desc":event.desc,
                "sDate":event.sDate,
                "sTime":event.sTime,
                "eDate":event.eDate,
                "eTime":event.eTime,
                "image":event.image,
                "genre":event.genre,
                "createdBy":event.createdBy,
                "live":true,
                 "location":event.location}}
            ,function(err,res){
                if(err){
                    console.log("response error for go live",err);
                    deferred.reject(err);
                }
                else {

                    console.log("response for go live",res);
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function getLive(category,loc){
        var deferred= q.defer();
        Event.find(
            {"genre":category,"location":loc,"live":true}
            ,function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function findEventById(eventId){
        var deferred= q.defer();
        Event.findOne(
            {"_id":eventId}
            ,function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;

    }
}


