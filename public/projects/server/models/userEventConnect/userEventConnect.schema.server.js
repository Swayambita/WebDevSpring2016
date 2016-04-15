var mongoose= require ("mongoose");

module.exports =function(){

    var UserEventConnect =mongoose.Schema(
        {userId:String,
        eventId:String,
        like:Boolean,
        comment:String,
        bookMark:Boolean,
        username:String,
        source:String,
        eName:String
        },
        {collection :'UserEventConnect'});
    return UserEventConnect;
};