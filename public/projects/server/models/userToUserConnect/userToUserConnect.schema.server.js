var mongoose= require("mongoose");

module.exports =function(){
    var UserToUserConnect =mongoose.Schema(
        {
            userId:String,
            userName:String,
            follower:String,
            followerName:String
        },
        {collection :'UserEventConnect'});
    return UserToUserConnect;
};