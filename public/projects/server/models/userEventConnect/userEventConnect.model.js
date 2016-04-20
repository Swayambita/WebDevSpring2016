var mongoose=require("mongoose");
var q= require("q");

module.exports= function(db) {

    var UserEventConnect=require("./userEventConnect.schema.server.js")();
    UserEventConnect=mongoose.model("UserEventConnect",UserEventConnect);

    var api = {
        findConnection: findConnection,
        newLike:newLike,
        addLike:addLike,
        addBookMark:addBookMark,
        newBookMark:newBookMark,
        allUserLikeThisEvent:allUserLikeThisEvent,
        getFavEvents:getFavEvents,
        unlikeEvent:unlikeEvent,
        unbookmarkEvent:unbookmarkEvent,
        checkWhetherToDelete:checkWhetherToDelete,
        deleteEntry:deleteEntry
    }

    return api;

    function findConnection(userId,eventId){
        var deferred= q.defer();
        UserEventConnect.findOne({"userId":userId,"eventId":eventId},function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function newLike(userId,eventId,user,eName,source){
        var deferred= q.defer();
        var details={"userId":userId,"eventId":eventId,"username":user.username,"like":true,
            "eName":eName,"source":source};

        UserEventConnect.create(details,
            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function addLike(id,details){
        var deferred= q.defer();
        UserEventConnect.update({"_id":id},
            {$set: {"userId":details.userId,
                "eventId":details.eventId,
                "like":true,
                "comment":details.email,
                "username":details.username,
                "bookMark":details.bookMar,
                "source":details.source,
                "eName":details.eName}},

            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function newBookMark(userId,eventId,user,eName,source){
        var deferred= q.defer();
        var details={"userId":userId,"eventId":eventId,"bookMark":true,"username":user.username,
            "eName":eName,"source":source};

        UserEventConnect.create(details,
            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function addBookMark(id,details){
        var deferred= q.defer();
        UserEventConnect.update({"_id":id},
            {$set: {"userId":details.userId,
                "eventId":details.eventId,
                "like":details.like,
                "comment":details.email,
                "username":details.username,
                "bookMark":true,
                "source":details.source,
                "eName":details.eName}},

            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function allUserLikeThisEvent(eventId){
        var deferred= q.defer();
        UserEventConnect.find({"eventId":eventId,"like":true},
            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function getFavEvents(userId){
        var deferred= q.defer();
        UserEventConnect.find({"userId":userId},
            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function unlikeEvent(id,details){
        var deferred= q.defer();
        UserEventConnect.update({"_id":id},
            {$set: {"userId":details.userId,
                "eventId":details.eventId,
                "like":false,
                "comment":details.email,
                "username":details.username,
                "bookMark":details.bookMark,
                "source":details.source,
                "eName":details.eName}},

            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function unbookmarkEvent(id,details){
        var deferred= q.defer();
        UserEventConnect.update({"_id":id},
            {$set: {"userId":details.userId,
                "eventId":details.eventId,
                "like":details.like,
                "comment":details.email,
                "username":details.username,
                "bookMark":false,
                "source":details.source,
                "eName":details.eName}},

            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function checkWhetherToDelete(eventId,userId){
        var deferred= q.defer();
        UserEventConnect.findOne(
            {"userId":userId,
                "eventId":eventId,
                "like":false,
                "bookMark":false},
            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;

    }

    function deleteEntry(eventId,userId){
        var deferred= q.defer();
        UserEventConnect.remove(
            {"userId":userId,
                "eventId":eventId},
            function(err,res){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }
}


