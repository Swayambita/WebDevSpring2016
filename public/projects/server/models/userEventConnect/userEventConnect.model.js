var mongoose=require("mongoose");
var q= require("q");

module.exports= function(db) {

    var UserLikesEvent=require("./../userEventConnect.schema.server.js")();
    UserLikesEvent=mongoose.model("UserLikesEvent",UserLikesEvent);

    var api = {
        addLike: addLike
    }
    return api;

    function addLike(like){
        var deferred= q.defer();

        UserLikesEvent.create(like,function(err,res){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(resp);
            }
        });
        return deferred.promise;

    }

}


