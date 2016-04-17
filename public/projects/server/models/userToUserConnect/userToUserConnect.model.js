var mongoose=require("mongoose");
var q= require("q");

module.exports= function(db) {

    var UserToUserConnect = require("./userToUserConnect.schema.server.js")();
    UserToUserConnect = mongoose.model("UserToUserConnect", UserToUserConnect);

    var api = {
        followUser: followUser,
        getFollowers:getFollowers,
        getWhomAmFollowing:getWhomAmFollowing,
        checkConnect:checkConnect,
        unFollowUser:unFollowUser
    }

    return api;


    function checkConnect(user,follower){
        var deferred = q.defer();
        UserToUserConnect.findOne({
                "userId": user,
                "follower": follower,
                },
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;

    }

    function followUser(loggedInUser,userToFollow,userToFollowName,followerName) {
        var deferred = q.defer();
        UserToUserConnect.create({
            "userId": userToFollow,
            "follower": loggedInUser,
            "userName":userToFollowName,
            "followerName":followerName},
            function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    }

    function getFollowers(userId){
        var deferred = q.defer();
        UserToUserConnect.find({"userId": userId},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function getWhomAmFollowing(userId){
        var deferred = q.defer();
        UserToUserConnect.find({"follower": userId},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;
    }

    function unFollowUser(followerId,userId){
        var deferred = q.defer();
        UserToUserConnect.remove({"follower": followerId,
        "userId":userId},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;

    }


   /* function checkConnect(loggedInUser,followerName){
        var deferred = q.defer();
        UserToUserConnect.find({"follower": loggedInUser,
        "user":},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res);
                }
            });
        return deferred.promise;



    }*/
}