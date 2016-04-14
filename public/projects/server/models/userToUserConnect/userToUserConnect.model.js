var mongoose=require("mongoose");
var q= require("q");

module.exports= function(db) {

    var UserToUserConnect = require("./userToUserConnect.schema.server.js")();
    UserToUserConnect = mongoose.model("UserToUserConnect", UserToUserConnect);

    var api = {
        followUser: followUser
    }

    return api;

    function followUser(loggedInUser,followerName,userToFollow,userToFollowName) {
        var deferred = q.defer();

        console.log("*****",loggedInUser);
        console.log("*****",userToFollow);
        console.log("*****",userToFollowName);
        console.log("*****",followerName);

        UserToUserConnect.create({
            "userId": userToFollow,
            "follower": loggedInUser,
            "userName":userToFollow,
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
}